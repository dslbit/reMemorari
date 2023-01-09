//
// Model
//


// TODO: save the current note the user is reading to load in a new session if needed
// TODO: split content into paragraphs (using the newline separator or something like that)
const gNotesKey = 'notesAppByDSLDataInLocalStorage';
let gNotes = []; // feed in preRenderSetup()
/*let gNotes = [
  {
  	id: 'id-01',
  	title: 'Lorem Ipsum 1',
  	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.',
  	createdDate: '00/00/0000'
  },
];
*/

const gTimeoutFadeEffectInMs = 90;

function noteCreate(noteId, noteTitle, noteContent, noteCreatedDate) {
	gNotes.unshift({
		id: noteId,
		title: noteTitle,
		content: noteContent,
		createdDate: noteCreatedDate
	});
	notesSaveToLocalStorage();
}

function noteRemove(noteId) {
	gNotes = gNotes.filter(function(note) {
		if(noteId == note.id) {
			return false;
		} else {
			return true;
		}
	});
	notesSaveToLocalStorage();
}

function notesSaveToLocalStorage() {
	localStorage.setItem(gNotesKey, JSON.stringify(gNotes));
}

function notesLoad(importedNotes) {
	if(importedNotes) {
		gNotes = importedNotes;
	}
	notesSaveToLocalStorage();
}

function notesClear() {
	gNotes = [];
	notesSaveToLocalStorage();
}

function noteEdit(noteId, newNoteData) {
	for(let i = 0; i < gNotes.length; ++i) {
		if(gNotes[i].id === noteId) {
			// edit data and save
			gNotes[i] = newNoteData;
			notesSaveToLocalStorage();
			break;
		}
	}
}

function noteGetById(noteId) {
	for(let i = 0; i < gNotes.length; ++i) {
		if(gNotes[i].id === noteId) {
			return gNotes[i];
			break;
		}
	}
}



//
// First Run
//
preRenderSetup();
renderAllNotes(gNotes);

//
// View
// TODO: Only setup global variables again only if pre-redenred items gets cleared
// TODO: move every priece of code in this app that changes the html to this place (View)
// TODO: buttons and mouse actions labels (on hover effect)
//
function renderAllNotes() {
	// NOTE: Should I render all pre-rendered html here? If I do that I don't need global variables with addEventListeners,
	// but on the other hand I would need to pre-render everything here instead of using static html, otherwise things
	// can get more ugly.

	const appMainContainer = document.getElementById('app-main-container');

	// Modal box (cancel, confirm) for actions
	// If static html for the modal box doesn't exist
	if(document.getElementById('modal-box-container') === null) {
		const modalBoxContainer = document.createElement('div');
		modalBoxContainer.setAttribute('id', 'modal-box-container');
		modalBoxContainer.classList.add('invisible', 'hidden-container');
		modalBoxContainer.appendChild(document.createElement('div'));
		appMainContainer.appendChild(modalBoxContainer);
	}

	// If static html for the buttons action doesn't exist
	if(document.getElementById('btn-actions-container') === null) {
		const btnActionsContainer = document.createElement('div');
		btnActionsContainer.setAttribute('id', 'btn-actions-container');
		appMainContainer.appendChild(btnActionsContainer);

		// Create note action container
		const addActionContainer = document.createElement('div');
		addActionContainer.innerText = '';
		addActionContainer.setAttribute('id', 'add-action');
		addActionContainer.classList.add('btn');
		addActionContainer.onclick = addNoteAction;
		btnActionsContainer.appendChild(addActionContainer);

		// Clear all notes action container
		const clearAllNotesActionContainer = document.createElement('div');
		clearAllNotesActionContainer.innerText = '';
		clearAllNotesActionContainer.setAttribute('id', 'clear-action');
		clearAllNotesActionContainer.classList.add('btn');
		clearAllNotesActionContainer.onclick = clearAllNotesAction;
		btnActionsContainer.appendChild(clearAllNotesActionContainer);

		// Backup action container
		const backupActionContainer = document.createElement('div');
		backupActionContainer.innerText = '';
		backupActionContainer.setAttribute('id', 'backup-action');
		backupActionContainer.classList.add('btn');
		backupActionContainer.onclick = backupNotes;
		btnActionsContainer.appendChild(backupActionContainer);
	}
	
	let noteSection;
	const notesContainer = document.getElementById('main-content');
	notesContainer.innerHTML = '';
	
	// fade-in (notesList) manually
	{
		const notesList = document.getElementById('notes-list');
		notesList.classList.add('invisible');
		
		setTimeout(function() {
			notesList.classList.add('visible');
		}, gTimeoutFadeEffectInMs*2);
	}
	
	gNotes.forEach(function(note) {
		// console.log(note);
		const noteSection = document.createElement('section');
		noteSection.classList.add('note');
		noteSection.dataset.id = note.id;
		notesContainer.appendChild(noteSection);
		// noteSection.classList.add('invisible');

		const noteTitle = document.createElement('div');
		noteTitle.textContent = note.title;
		noteTitle.classList.add('note-title');
		noteSection.appendChild(noteTitle);

		// NOTE: this piece of code is coppied more than 2 times, what can I do with it?
		const noteContentPreview = document.createElement('div');
		{
			let endContentStrIndex;
			let addThreeDots = false;
			if(note.content.length < 280) {
				endContentStrIndex = note.content.length;
			} else {
				endContentStrIndex = 280;
				addThreeDots = true;
			}
			if(addThreeDots) {
				noteContentPreview.textContent = note.content.slice(0, endContentStrIndex) + '...';
			} else {
				noteContentPreview.textContent = note.content.slice(0, endContentStrIndex)
			}
		}
		noteContentPreview.classList.add('note-preview');
		noteSection.appendChild(noteContentPreview);

		const noteDate = document.createElement('div');
		noteDate.textContent = 'Created: ' + note.createdDate;
		noteDate.classList.add('note-date');
		noteSection.appendChild(noteDate);
	});
}



//
// Controller
//
let gMainContentContainer = document.getElementById('main-content');
let gNoteViewContainer = document.getElementById('note-view');
let gNotesListContainer = document.getElementById('notes-list');

function preRenderSetup() {

	// Checking if there's data to be loaded from local storage
	{
		const notesAppByDSLDataInLocalStorage = JSON.parse(localStorage.getItem(gNotesKey));
		if(notesAppByDSLDataInLocalStorage != null) {
			gNotes = notesAppByDSLDataInLocalStorage;
			console.log('data key: ' + gNotesKey + '\nloaded: ' + gNotes.length + ' objetcts');
		}
	}

	let noteCreationTitleInput = document.getElementById('note-creation-title-input');
	// console.log(noteCreationTitleInput.maxLength);

	let userDeviceWidth = window.innerWidth;
	if(userDeviceWidth >= 360 && userDeviceWidth < 400) {
		noteCreationTitleInput.maxLength = 19;
	} else if(userDeviceWidth >= 400 && userDeviceWidth < 430) {
		noteCreationTitleInput.maxLength = 22;
	} else if(userDeviceWidth >= 460 && userDeviceWidth < 500) {
		noteCreationTitleInput.maxLength = 24;
	} else if(userDeviceWidth >= 500) {
		noteCreationTitleInput.maxLength = 26;
	}
}

// NOTE: Fade-out and fade-in containers on the page
function fadeOutInEffect(containerToFadeOut, containerToFadeIn) {
	if(containerToFadeOut === null || containerToFadeIn === null) {
		return console.error('Container to fade-out is null!');
	}

	containerToFadeOut.classList.add('invisible');
	containerToFadeOut.classList.remove('visible');
	document.body.style = 'overflow: hidden;';
	setTimeout(function() {
		containerToFadeIn.classList.remove('hidden-container');
		containerToFadeOut.classList.add('hidden-container');
		document.body.style = 'overflow-y: auto;';
	}, gTimeoutFadeEffectInMs*2);

	setTimeout(function() {
		containerToFadeIn.classList.add('visible');
	}, gTimeoutFadeEffectInMs*3);
}

// NOTE: Fade-out container
function fadeOutEffect(container) {
	container.classList.add('invisible');
	container.classList.remove('visible');
	setTimeout(function() {
		container.classList.add('hidden-container');
	}, gTimeoutFadeEffectInMs*2);
}

// NOTE: Fade-in container
function fadeInEffect(container) {
	container.classList.remove('hidden-container');
	setTimeout(function() {
		container.classList.add('visible');
	}, gTimeoutFadeEffectInMs*2);
}

// NOTE: Click event -> modal box (GENERAL CANCEL or CLOSE action)
function modalBoxCancelDefaultBehaviour() {
	fadeOutEffect(document.getElementById('modal-box-container'));
	document.body.style = 'overflow: auto;';
}

// NOTE: Click event -> modal box (dark area / close action)
document.getElementById('modal-box-container').addEventListener('click', function(event) {
	if(event.target.id === 'modal-box-container') {
		modalBoxCancelDefaultBehaviour();
	}
});

// NOTE: Click event -> view note
gMainContentContainer.addEventListener('click', function(event) {
	if(event.target.classList.contains('note')) {
		// Use the dataset and get the note unique id to identify in the Model section the note data, then
		//   render it in the 'note-view' container and hide the notes container

		// TODO: move to the view section
		for(let i = 0; i < gNotes.length; ++i) {
			if(event.target.dataset.id === gNotes[i].id) {
				// console.log(event.target);
				const noteViewSection = document.createElement('section');
				noteViewSection.setAttribute('id', 'note-view-section');
				noteViewSection.dataset.id = gNotes[i].id;
				noteViewSection.classList.add('invisible');
				gNoteViewContainer.appendChild(noteViewSection);

				const noteViewTitleContainer = document.createElement('div');
				noteViewTitleContainer.classList.add('note-view-title');
				const noteViewTitle = document.createElement('h2');
				noteViewTitle.innerText = gNotes[i].title;
				noteViewTitleContainer.appendChild(noteViewTitle);
				noteViewSection.appendChild(noteViewTitleContainer);

				const noteViewContent = document.createElement('div');
				noteViewContent.innerHTML = gNotes[i].content.replaceAll('\n', '<br>');
				noteViewContent.classList.add('note-view-content');
				noteViewSection.appendChild(noteViewContent);

				const noteDate = document.createElement('div');
				noteDate.innerText = 'Created: ' + gNotes[i].createdDate;
				noteDate.classList.add('note-date-created');
				noteViewSection.appendChild(noteDate);

				break;
			}
		}

		fadeOutInEffect(gNotesListContainer, gNoteViewContainer);
		fadeInEffect(document.getElementById('note-view-section'));
		fadeOutEffect(document.getElementById('btn-actions-container'));
	}
});

function deleteNoteModalBoxConfirmation() {
	const noteViewSectionToRemove = document.getElementById('note-view-section');
	const noteIdToRemove = noteViewSectionToRemove.dataset.id;
	noteRemove(noteIdToRemove);

	fadeOutInEffect(gNoteViewContainer, gNotesListContainer);
	fadeInEffect(document.getElementById('btn-actions-container'));

	setTimeout(function() {
		noteViewSectionToRemove.remove();
		for(let i = 0; i < gMainContentContainer.childNodes.length; ++i) {
			if(gMainContentContainer.childNodes[i].dataset.id === noteIdToRemove) {
				gMainContentContainer.childNodes[i].remove();
				break;
			}
		}
	}, gTimeoutFadeEffectInMs*2);

	fadeOutEffect(document.getElementById('modal-box-container'));
	document.body.style = 'overflow: auto;';
}

// NOTE: Click event -> go back (from note view to note list)
// NOTE: Click event -> delete note
// NOTE: Click event -> edit note
gNoteViewContainer.addEventListener('click', function(event) {
	// Go back Action
	if(event.target.classList.contains('note-view-go-back-action')) {
		const noteViewSectionToRemove = document.getElementById('note-view-section');
		fadeOutInEffect(gNoteViewContainer, gNotesListContainer);
		fadeInEffect(document.getElementById('btn-actions-container'));

		setTimeout(function() {
			noteViewSectionToRemove.remove();
		}, gTimeoutFadeEffectInMs*3);
	}

	// Edit note action
	if(event.target.classList.contains('note-view-edit-action')) {
		const noteId = document.getElementById('note-view-section').dataset.id;
		let note = noteGetById(noteId);
		
		const noteTitle = document.querySelector('.note-view-title');
		const noteTitleMaxLength = document.getElementById('note-creation-title-input').maxlength;
		noteTitle.innerHTML = '';
		const titleInput = document.createElement('input');
		titleInput.id = 'note-edit-title-input';
		titleInput.type = 'text';
		titleInput.name = 'note-title';
		titleInput.minlength = 3;
		titleInput.maxlength = noteTitleMaxLength;
		titleInput.value = note.title;
		noteTitle.appendChild(titleInput);
		
		const noteContent = document.querySelector('.note-view-content');
		noteContent.innerHTML = '';
		const contentTextArea = document.createElement('textarea');
		contentTextArea.id = 'note-edit-content-input';
		contentTextArea.type = 'text';
		contentTextArea.name = 'note-content';
		contentTextArea.spellcheck = false;
		contentTextArea.wrap = 'soft';
		contentTextArea.textContent = note.content;
		noteContent.appendChild(contentTextArea);

		const buttonsContainer = document.createElement('div');
		buttonsContainer.classList.add('note-editing-buttons-container');
		noteContent.appendChild(buttonsContainer);

		// Cancel note editing
		const cancelBtn = document.createElement('button');
		cancelBtn.id = 'cancel-note-editing-btn';
		cancelBtn.classList.add('btn');
		cancelBtn.onclick = noteEditingCanceled;
		cancelBtn.innerText = 'cancel';
		buttonsContainer.appendChild(cancelBtn);

		// Confirm note editing
		const confirmBtn = document.createElement('button');
		confirmBtn.id = 'confirm-note-editing-btn';
		confirmBtn.classList.add('btn');
		confirmBtn.onclick = noteEditingConfirmed;
		confirmBtn.innerText = 'confirm';
		buttonsContainer.appendChild(confirmBtn);
	}

	// Delete note action
	if(event.target.classList.contains('note-view-delete-action')) {
		// TODO: 'Are you sure?' confirmation box

		const modalBox = document.getElementById('modal-box-container');
		if(modalBox === null) {
			return console.error(`Modal box doesn't exist, WTF?`);
		}
		// console.log(modalBox);
		modalBox.innerHTML = '';
		
		const modalBoxSection = document.createElement('div');
		modalBoxSection.classList.add('modal-box-section');
		modalBox.appendChild(modalBoxSection);

		const modalBoxTitleSection = document.createElement('div');
		modalBoxTitleSection.innerText = 'Are you sure you want to erase this note permanently?';
		modalBoxTitleSection.classList.add('modal-box-title-section');
		modalBoxSection.appendChild(modalBoxTitleSection);
		
		const buttonsSection = document.createElement('div');
		buttonsSection.classList.add('modal-box-buttons-section');
		modalBoxSection.appendChild(buttonsSection);

		const btnCancel = document.createElement('div');
		btnCancel.innerText = 'cancel';
		btnCancel.setAttribute('id', 'modal-box-cancel-btn');
		btnCancel.classList.add('btn');
		btnCancel.onclick = modalBoxCancelDefaultBehaviour;
		buttonsSection.appendChild(btnCancel);

		const btnConfirm = document.createElement('div');
		btnConfirm.innerText = 'confirm';
		btnConfirm.setAttribute('id', 'modal-box-confirm-btn');
		btnConfirm.classList.add('btn');
		btnConfirm.onclick = deleteNoteModalBoxConfirmation;
		buttonsSection.appendChild(btnConfirm);

		fadeInEffect(modalBox);
		window.scrollTo(0, 0);
		/*window.scrollTo({
			top: document.body.clientHeight/2.3,
			left: 0,
			behavior: 'smooth',
		});
		*/
		// document.body.style = 'overflow: hidden;';

		
	}
});

function noteEditingCanceled() {
	// console.log('editing canceled!');
	const noteId = document.getElementById('note-view-section').dataset.id;
	const note = noteGetById(noteId);

	const noteViewTitleContainer = document.querySelector('.note-view-title');
	noteViewTitleContainer.innerHTML = '';
	const noteTitle = document.createElement('h2');
	noteTitle.innerText = note.title;
	noteViewTitleContainer.appendChild(noteTitle);

	const noteViewContentContainer = document.querySelector('.note-view-content');
	noteViewContentContainer.innerHTML = note.content.replaceAll('\n', '<br>');
}

function noteEditingConfirmed() {
	const noteId = document.getElementById('note-view-section').dataset.id;
	const oldNote = noteGetById(noteId);

	const noteViewTitleContainer = document.querySelector('.note-view-title');
	const noteTitle = document.createElement('h2');
	noteTitle.innerText = document.getElementById('note-edit-title-input').value;
	noteViewTitleContainer.innerHTML = '';
	noteViewTitleContainer.appendChild(noteTitle);

	const noteViewContentContainer = document.querySelector('.note-view-content');
	const noteContentInput = document.getElementById('note-edit-content-input');
	noteViewContentContainer.innerHTML = noteContentInput.value.replaceAll('\n', '<br>');;
	// noteViewContentContainer.textContent = noteContentInput.value;

	const newNoteContent = {
		id: noteId,
		title: noteTitle.innerText,
		content: noteContentInput.value,
		createdDate: oldNote.createdDate
	}
	noteEdit(noteId, newNoteContent);

	// update note preview in note-list section
	{
		const notes = document.querySelectorAll('.note');
		let noteSectionToChange;
		for(let i = 0; i < notes.length; ++i) {
			if(notes[i].dataset.id === noteId) {
				noteSectionToChange = notes[i];
				break;
			}
		}

		noteSectionToChange.innerHTML = '';

		const newNoteTitle = document.createElement('div');
		newNoteTitle.textContent = newNoteContent.title;
		newNoteTitle.classList.add('note-title');
		noteSectionToChange.appendChild(newNoteTitle);
		
		const newNotePreview = document.createElement('div');
		{
			let endContentStrIndex = 0;
			let addThreeDots = false;
			if(newNoteContent.content.length < 280) {
				endContentStrIndex = newNoteContent.content.length;
			} else {
				endContentStrIndex = 280;
				addThreeDots = true;
			}
			if(addThreeDots) {
				newNotePreview.textContent = newNoteContent.content.slice(0, endContentStrIndex) + '...';
			} else {
				newNotePreview.textContent = newNoteContent.content.slice(0, endContentStrIndex)
			}
		}
		newNotePreview.classList.add('note-preview');
		noteSectionToChange.appendChild(newNotePreview);

		const newNoteDate = document.createElement('div');
		newNoteDate.textContent = 'Created: ' + newNoteContent.createdDate;
		newNoteDate.classList.add('note-date');
		noteSectionToChange.appendChild(newNoteDate);
	}
}

// NOTE: Click event -> add a new note
function addNoteAction(event) {
	document.getElementById('note-creation-title-input').value = '';
	document.getElementById('note-creation-content-input').value = '';
	noteCreationContainer = document.getElementById('note-creation');
	
	fadeOutInEffect(gNotesListContainer, noteCreationContainer);
	fadeOutEffect(document.getElementById('btn-actions-container'));
}

function clearAllNotesModalBoxConfirmation() {
	notesClear();
	fadeOutEffect(document.getElementById('modal-box-container'));
	renderAllNotes();
}

// NOTE: Click event -> clear all notes
function clearAllNotesAction(event) {
	// 'Are you sure?' confirmation modal box
	const modalBox = document.getElementById('modal-box-container');
	if(modalBox === null) {
		return console.error(`Modal box doesn't exist, WTF?`);
	}
	// console.log(modalBox);
	modalBox.innerHTML = '';
	
	const modalBoxSection = document.createElement('div');
	modalBoxSection.classList.add('modal-box-section');
	modalBox.appendChild(modalBoxSection);

	const modalBoxTitleSection = document.createElement('div');
	modalBoxTitleSection.innerText = 'Are you sure you want to erase all notes permanently?';
	modalBoxTitleSection.classList.add('modal-box-title-section');
	modalBoxSection.appendChild(modalBoxTitleSection);
	
	const buttonsSection = document.createElement('div');
	buttonsSection.classList.add('modal-box-buttons-section');
	modalBoxSection.appendChild(buttonsSection);

	const btnCancel = document.createElement('div');
	btnCancel.innerText = 'cancel';
	btnCancel.setAttribute('id', 'modal-box-cancel-btn');
	btnCancel.classList.add('btn');
	btnCancel.onclick = modalBoxCancelDefaultBehaviour;
	buttonsSection.appendChild(btnCancel);

	const btnConfirm = document.createElement('div');
	btnConfirm.innerText = 'confirm';
	btnConfirm.setAttribute('id', 'modal-box-confirm-btn');
	btnConfirm.classList.add('btn');
	btnConfirm.onclick = clearAllNotesModalBoxConfirmation;
	buttonsSection.appendChild(btnConfirm);

	fadeInEffect(modalBox);
	window.scrollTo(0, 0);
	document.body.style = 'overflow: hidden;';
}

// @continue
// NOTE: Click event -> import notes
function modalBoxImportDataAction(event) {
	const file = event.target.files[0];
	const reader = new FileReader();

	if(file !== null) {
		reader.readAsText(file);
	}

	reader.addEventListener('load', function() {
		if(reader.result) {
			notesLoad(JSON.parse(reader.result));
			renderAllNotes();
			modalBoxCancelDefaultBehaviour(); // modal box fade-out effect
		}
	});
}

// NOTE: Click event -> export notes
function modalBoxExportDataAction(event) {
	// console.log('export data here');

	const dataAsFile = new Blob([JSON.stringify(gNotes)], {type: 'octet-stream'});
	const hrefURL = URL.createObjectURL(dataAsFile);

	const currentDate = new Date();
	const link = document.createElement('a');
	link.href = hrefURL;
	link.style = 'display: none;';
	link.download = 'notes_data_exported_' + currentDate.getDate() + '_' + (currentDate.getMonth()+1) + '_' + currentDate.getFullYear() + '.json';
	document.body.appendChild(link);
	link.click();

	// TODO: Modal box auto msg (from top to screen center) saying that the data exported (downloaded)

	URL.revokeObjectURL(hrefURL);
	link.remove();
}

// NOTE: Click event -> backup notes 
function backupNotes(event) {
	// TODO: modal box (import data, export data, save to?[disk, drive, dropbox], close)

	const modalBox = document.getElementById('modal-box-container');
	if(modalBox === null) {
		return console.error(`Modal box doesn't exist, WTF?`);
	}
	// console.log(modalBox);
	modalBox.innerHTML = '';
	
	const modalBoxSection = document.createElement('div');
	modalBoxSection.classList.add('modal-box-section');
	modalBox.appendChild(modalBoxSection);

	const titleSection = document.createElement('div');
	titleSection.innerText = 'Import or Export/Save your Notes';
	titleSection.classList.add('modal-box-title-section');
	modalBoxSection.appendChild(titleSection);

	const buttonsSection = document.createElement('div');
	buttonsSection.classList.add('modal-box-buttons-section');
	modalBoxSection.appendChild(buttonsSection);

	const btnImportData = document.createElement('label');
	const btnImportDataInput = document.createElement('input');
	btnImportDataInput.id = 'modal-box-import-data-input-btn';
	btnImportDataInput.type = 'file';
	btnImportDataInput.accept = '.json, .txt';
	btnImportDataInput.multiple = false;
	btnImportData.for = 'modal-box-import-data-input-btn';
	btnImportData.id = 'modal-box-import-data-btn';
	btnImportData.classList.add('btn');
	btnImportData.appendChild(btnImportDataInput);
	btnImportData.onchange = modalBoxImportDataAction;
	buttonsSection.appendChild(btnImportData);

	const btnExportData = document.createElement('div');
	btnExportData.id = 'modal-box-export-data-btn';
	btnExportData.onclick = modalBoxExportDataAction;
	btnExportData.classList.add('btn');
	buttonsSection.appendChild(btnExportData);

	const btnClose = document.createElement('div');
	btnClose.id = 'modal-box-close-btn';
	btnClose.classList.add('btn');
	btnClose.onclick = modalBoxCancelDefaultBehaviour;
	buttonsSection.appendChild(btnClose);

	// const importExportSection = document.createElement('div');

	fadeInEffect(modalBox);
	window.scrollTo(0, 0);
	document.body.style = 'overflow: hidden;';
}

// NOTE: Click event -> cancel new note creation
let gBtnCancelNoteCreation = document.querySelector('.cancel-btn');
gBtnCancelNoteCreation.addEventListener('click', function(event) {
	fadeOutInEffect(document.getElementById('note-creation'), gNotesListContainer);
	fadeInEffect(document.getElementById('btn-actions-container'));
});

// NOTE: Click event -> create note (button)
let gBtnCreateNote = document.querySelector('.create-btn');
gBtnCreateNote.addEventListener('click', function(event) {
	// Note title validation
	const noteTitleInput = document.getElementById('note-creation-title-input');
	{
		if(noteTitleInput.value.length < 3) {
			console.log('The note title must be greater than 3.');
			// TODO: modal box
			return;
		}

		for(let i = 0; i < gNotes.length; ++i) {
			if(gNotes[i].title === noteTitleInput.value) {
				console.log('Note title already exist.');
				return;
			}
		}
	}

	const noteContentInput = document.getElementById('note-creation-content-input');
	const notesContent = noteContentInput.value;
	// const notesContent = noteContentInput.value.replaceAll('\n', '<br>');
	// console.log(notesContent);

	// Generating note date and ID info
	let noteDate = new Date();
	let noteId = '' + Date.parse(noteDate) + Math.floor(Math.random() * 100000);
	// console.log(noteId);
	let noteCreatedDateAsStr = '';
	{
		let noteDateDay = (noteDate.getDate() < 10) ? ('0' + (noteDate.getDate())) : noteDate.getDate();
		let noteDateMonth = (noteDate.getMonth() + 1 < 10) ? ('0' + (noteDate.getMonth() + 1)) : noteDate.getMonth() + 1;
		const noteDateYear = noteDate.getFullYear();
		let noteDateHour = (noteDate.getHours() < 10) ? ('0' + noteDate.getHours()) : noteDate.getHours();
		let noteDateMinutes = (noteDate.getMinutes() < 10) ? ('0' + noteDate.getMinutes()) : noteDate.getMinutes();
		noteCreatedDateAsStr = `${noteDateMonth}/${noteDateDay}/${noteDateYear} ${noteDateHour}:${noteDateMinutes}`;
		// console.log(noteCreatedDateAsStr);
	}
	
	noteCreate(noteId, noteTitleInput.value, notesContent, noteCreatedDateAsStr);

	// TODO: move this to the view section
	// render new added note to the notes list
	{
		const newNoteSection = document.createElement('section');
		newNoteSection.dataset.id = noteId;
		newNoteSection.classList.add('note');

		const newNoteTitle = document.createElement('div');
		newNoteTitle.textContent = noteTitleInput.value;
		newNoteTitle.classList.add('note-title');
		newNoteSection.appendChild(newNoteTitle);
		
		const newNotePreview = document.createElement('div');

		{
			let endContentStrIndex = 0;
			let addThreeDots = false;
			if(notesContent.length < 280) {
				endContentStrIndex = notesContent.length;
			} else {
				endContentStrIndex = 280;
				addThreeDots = true;
			}
			if(addThreeDots) {
				newNotePreview.textContent = notesContent.slice(0, endContentStrIndex) + '...';
			} else {
				newNotePreview.textContent = notesContent.slice(0, endContentStrIndex);
			}
		}
		newNotePreview.classList.add('note-preview');
		newNoteSection.appendChild(newNotePreview);

		const newNoteDate = document.createElement('div');
		newNoteDate.textContent = 'Created: ' + noteCreatedDateAsStr;
		newNoteDate.classList.add('note-date');
		newNoteSection.appendChild(newNoteDate);

		gMainContentContainer.prepend(newNoteSection);
	}

	fadeOutInEffect(document.getElementById('note-creation'), gNotesListContainer);
	fadeInEffect(document.getElementById('btn-actions-container'));
});
