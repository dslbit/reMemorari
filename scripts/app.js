// TODO: do a better job in renderNoteView() when rendering the content. Use something better than just <br>
// TODO: msg of the day: You haven't done a backup of your notes in a while. Do you want to backup your notes now?
// TODO: note view info: #paragraphs, #lines, #characters, #avg-reading-time
// TODO: save the current note the user is reading to load in a new session if needed
// TODO: save note creation state in case of user closing the app before confirmation
// TODO: split content into paragraphs (using the newline separator or something like that)
// TODO: more backup options (Google Drive/Dropbox/...)

import {
	gTimeoutFadeEffectInMs,
	renderFadeOutInEffect,
	renderFadeOutEffect,
	renderFadeInEffect
} from './fadein_fadeout_effects.js';

//
// Model
//

const gMonths = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

let gMainContentContainer = document.getElementById('main-content');
let gNoteViewContainer = document.getElementById('note-view');
let gNotesListContainer = document.getElementById('notes-list');

const gModalBoxMessageTypes = {
	msgInfo: 0,
	msgSuccess: 1,
	msgFailure: 2
};

const gRememorariAppNotesKey = 'rememorariAppNotes';
let gNotes = []; // fed in preRenderSetup()
/*
let gNotes = [
  {
  	id: 'id-01',
  	title: 'Lorem Ipsum 1',
  	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  	createdDate: '00/00/0000'
  },
];
*/

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
	localStorage.setItem(gRememorariAppNotesKey, JSON.stringify(gNotes));
}

function notesLoad(importedNotes) {
	if(importedNotes) {
		gNotes = importedNotes;
	}
	notesSaveToLocalStorage();
}

function notesClear() {
	gNotes = [];
	localStorage.clear(gRememorariAppNotesKey);
}

function noteEdit(noteId, newNoteData) {
	for(let i = 0; i < gNotes.length; ++i) {
		if(gNotes[i].id === noteId) {
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
//
function renderAllNotes() {
	// NOTE: I'm using as much as I can from the static html code for readibilitty, because reading html text in a js file is horrible.

	const appMainContainer = document.getElementById('app-main-container');

	// If static html for the modal box doesn't exist
	if(document.getElementById('modal-box-container') === null) {
		const modalBoxContainer = document.createElement('div');
		modalBoxContainer.setAttribute('id', 'modal-box-container');
		modalBoxContainer.classList.add('invisible', 'hidden-container');
		modalBoxContainer.appendChild(document.createElement('div'));
		appMainContainer.appendChild(modalBoxContainer);
	}

	// If static html for the modal box auto-closing message doesn't exist
	if(document.getElementById('modal-box-msg-container') === null) {
		const modalBoxMsgContainer = document.createElement('div');
		modalBoxMsgContainer.setAttribute('id', 'modal-box-msg-container');
		modalBoxMsgContainer.classList.add('invisible', 'hidden-container');
		modalBoxMsgContainer.appendChild(document.createElement('div'));
		appMainContainer.appendChild(modalBoxMsgContainer);
	}

	// If static html for the buttons action (add, clear-all-notes, backup-notes) doesn't exist
	if(document.getElementById('btn-actions-container') === null) {
		const btnActionsContainer = document.createElement('div');
		btnActionsContainer.setAttribute('id', 'btn-actions-container');
		appMainContainer.appendChild(btnActionsContainer);

		// Create new note action container
		const createNewNoteActionContainer = document.createElement('div');
		createNewNoteActionContainer.innerText = '';
		createNewNoteActionContainer.id = 'create-action';
		createNewNoteActionContainer.classList.add('btn');
		createNewNoteActionContainer.onclick = renderCreateNewNote; // NOTE: Click event -> create new note
		btnActionsContainer.appendChild(createNewNoteActionContainer);

		// Create new note _label_
		const createNewNoteLabelContainer = document.createElement('div');
		createNewNoteLabelContainer.innerText = 'create new note';
		createNewNoteLabelContainer.classList.add('btn-label');
		createNewNoteActionContainer.appendChild(createNewNoteLabelContainer);

		// Clear all notes action container
		const clearAllNotesActionContainer = document.createElement('div');
		clearAllNotesActionContainer.innerText = '';
		clearAllNotesActionContainer.setAttribute('id', 'clear-action');
		clearAllNotesActionContainer.classList.add('btn');
		clearAllNotesActionContainer.onclick = clearAllNotes;
		btnActionsContainer.appendChild(clearAllNotesActionContainer);

		// Clear all notes _label_
		const clearAllNotesLabelContainer = document.createElement('div');
		clearAllNotesLabelContainer.innerText = 'clear all notes';
		clearAllNotesLabelContainer.classList.add('btn-label');
		clearAllNotesActionContainer.appendChild(clearAllNotesLabelContainer);

		// Backup action container
		const backupActionContainer = document.createElement('div');
		backupActionContainer.innerText = '';
		backupActionContainer.setAttribute('id', 'backup-action');
		backupActionContainer.classList.add('btn');
		backupActionContainer.onclick = renderBackupNotes; // NOTE: Click event -> backup notes
		btnActionsContainer.appendChild(backupActionContainer);

		// Backup notes _label_
		const backupNotesLabelContainer = document.createElement('div');
		backupNotesLabelContainer.innerText = 'backup notes';
		backupNotesLabelContainer.classList.add('btn-label');
		backupActionContainer.appendChild(backupNotesLabelContainer);

		const authorContainer = document.createElement('div');
		const authorLink = document.createElement('a');
		authorLink.innerHTML = 'by <span>douglas lima</span>';
		authorLink.href = 'https://github.com/dslbit';
		authorLink.target = '_blank';
		authorContainer.innerText = '';
		authorContainer.classList.add('author-label-container');
		authorContainer.appendChild(authorLink);
		btnActionsContainer.appendChild(authorContainer);
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
		const noteSection = document.createElement('section');
		noteSection.classList.add('note');
		noteSection.dataset.id = note.id;
		notesContainer.appendChild(noteSection);

		const noteTitle = document.createElement('div');

		// copy the note title to the rendering, but if it's too large copy just a piece
		{
			let endTitleStrIndex;
			if(note.title.length > 60) {
				endTitleStrIndex = 60;
				noteTitle.textContent = note.title.slice(0, endTitleStrIndex) + '...';
			} else {
				endTitleStrIndex = note.title.length;
				noteTitle.textContent = note.title.slice(0, endTitleStrIndex);
			}
		}
		// noteTitle.textContent = note.title;
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

		const dateSplit = note.createdDate.split('/');
		if(dateSplit.length != 3) {
			console.error('wtf? date format is incorrect!');
		}
		noteDate.textContent = 'Created: ' + gMonths[Number(dateSplit[0])-1] + ' ' + dateSplit[1] + ', ' + dateSplit[2];
		noteDate.classList.add('note-date');
		noteSection.appendChild(noteDate);

		
	});

	// NOTE: Auto-closing test msg
	/*
	{
		const msg = 'Welcome, User!';
		const timeOnScreenInMs = 2500; // 2.5s
		renderModalBoxMessage(msg, gModalBoxMessageTypes.msgFailure, timeOnScreenInMs);
	}
	*/
}

function renderModalBoxMessage(msg, msgType, timeOnScreenInMs) {
	const modalBoxMsg = document.getElementById('modal-box-msg-container');
	if(modalBoxMsg === null) {
		return console.error(`Modal box MSG doesn't exist, WTF?`);
	}
	modalBoxMsg.innerHTML = '';

	const modalBoxMsgSection = document.createElement('div');
	modalBoxMsgSection.classList.add('off-screen-x-left', 'modal-box-msg-section');
	modalBoxMsg.appendChild(modalBoxMsgSection);

	switch(msgType) {
		case gModalBoxMessageTypes.msgInfo: {
			modalBoxMsgSection.classList.add('modal-box-msg-info');
		} break;

		case gModalBoxMessageTypes.msgSuccess: {
			modalBoxMsgSection.classList.add('modal-box-msg-success');
		} break;

		case gModalBoxMessageTypes.msgFailure: {
			modalBoxMsgSection.classList.add('modal-box-msg-failure');
		} break;

		default: {
			console.error('Modal Box Message: message type undefined!');
		}
	}

	const modalBoxMsgText = document.createElement('p');
	modalBoxMsgText.innerText = msg;
	modalBoxMsgSection.appendChild(modalBoxMsgText);

	window.scrollTo(0, 0);
	modalBoxMsg.classList.remove('hidden-container');
	document.body.style = 'overflow: hidden;';
	setTimeout(function() {
		modalBoxMsg.classList.add('visible');
		modalBoxMsgSection.classList.add('on-screen-x');
	}, gTimeoutFadeEffectInMs*2);

	setTimeout(function() {
		modalBoxMsgSection.classList.remove('on-screen-x');
		modalBoxMsgSection.classList.add('off-screen-x-right');
	}, timeOnScreenInMs + 1000);

	setTimeout(function() {
		modalBoxMsg.classList.remove('visible');
		document.body.style = 'overflow: auto;';
		modalBoxMsg.classList.add('hidden-container');
	}, timeOnScreenInMs + 1500);
}

function renderModalBox(title, cancelText, confirmText, funcClickConfirmationAction) {
	const modalBox = document.getElementById('modal-box-container');
	if(modalBox === null) {
		return console.error(`Modal box doesn't exist, WTF?`);
	}
	modalBox.innerHTML = '';
	
	const modalBoxSection = document.createElement('div');
	modalBoxSection.classList.add('modal-box-section');
	modalBox.appendChild(modalBoxSection);

	const modalBoxTitleSection = document.createElement('div');
	modalBoxTitleSection.innerText = title;
	modalBoxTitleSection.classList.add('modal-box-title-section');
	modalBoxSection.appendChild(modalBoxTitleSection);
	
	const buttonsSection = document.createElement('div');
	buttonsSection.classList.add('modal-box-buttons-section');
	modalBoxSection.appendChild(buttonsSection);

	const btnCancel = document.createElement('div');
	btnCancel.innerText = cancelText;
	btnCancel.setAttribute('id', 'modal-box-cancel-btn');
	btnCancel.classList.add('btn');
	btnCancel.onclick = renderModalBoxCancelAction;
	buttonsSection.appendChild(btnCancel);

	const btnConfirm = document.createElement('div');
	btnConfirm.innerText = confirmText;
	btnConfirm.setAttribute('id', 'modal-box-confirm-btn');
	btnConfirm.classList.add('btn');
	btnConfirm.onclick = funcClickConfirmationAction;
	buttonsSection.appendChild(btnConfirm);

	document.body.style = 'overflow: hidden;';
	renderFadeInEffect(modalBox);
	window.scrollTo(0, 0);
	/*window.scrollTo({
		top: document.body.clientHeight/2.3,
		left: 0,
		behavior: 'smooth',
	});
	*/
}

// NOTE: Click event -> modal box (GENERAL CANCEL or CLOSE action)
function renderModalBoxCancelAction() {
	renderFadeOutEffect(document.getElementById('modal-box-container'));
	document.body.style = 'overflow: auto;';
}

function renderCreateNewNote(event) {
	document.getElementById('note-creation-title-input').value = '';

	const textArea = document.getElementById('note-creation-content-input');
	textArea.value = '';
	textArea.oninput = renderNoteTextarea;
	textArea.cols = 30;
	const noteCreationContainer = document.getElementById('note-creation');
	
	renderFadeOutInEffect(gNotesListContainer, noteCreationContainer);
	renderFadeOutEffect(document.getElementById('btn-actions-container'));
	// console.debug('Click event -> Create new note');
}

function renderNewNoteToNotesList(note) {
	const newNoteSection = document.createElement('section');
	newNoteSection.dataset.id = note.id;
	newNoteSection.classList.add('note');

	const newNoteTitle = document.createElement('div');
	// newNoteTitle.textContent = note.title;
	// copy the note title to the rendering, but if it's too large copy just a piece
	{
		let endTitleStrIndex;
		if(note.title.length > 60) {
			endTitleStrIndex = 60;
			newNoteTitle.textContent = note.title.slice(0, endTitleStrIndex) + '...';
		} else {
			endTitleStrIndex = note.title.length;
			newNoteTitle.textContent = note.title.slice(0, endTitleStrIndex);
		}
	}
	newNoteTitle.classList.add('note-title');
	newNoteSection.appendChild(newNoteTitle);
	
	const newNotePreview = document.createElement('div');

	{
		let endContentStrIndex = 0;
		let addThreeDots = false;
		if(note.content.length < 280) {
			endContentStrIndex = note.content.length;
		} else {
			endContentStrIndex = 280;
			addThreeDots = true;
		}
		if(addThreeDots) {
			newNotePreview.textContent = note.content.slice(0, endContentStrIndex) + '...';
		} else {
			newNotePreview.textContent = note.content.slice(0, endContentStrIndex);
		}
	}
	newNotePreview.classList.add('note-preview');
	newNoteSection.appendChild(newNotePreview);

	const newNoteDate = document.createElement('div');
	newNoteDate.textContent = 'Created: ' + note.createdDate;
	newNoteDate.classList.add('note-date');
	newNoteSection.appendChild(newNoteDate);

	gMainContentContainer.prepend(newNoteSection);

	renderFadeOutInEffect(document.getElementById('note-creation'), gNotesListContainer);
	renderFadeInEffect(document.getElementById('btn-actions-container'));
	window.scrollTo(0, 0);
}

function renderNoteTextarea(event) {
	// console.log(event);
	event.target.style = 'height: ' + event.target.scrollHeight + 'px;';
	// console.log();
}

function renderNoteView(note) {
	const noteViewSection = document.createElement('section');
	noteViewSection.setAttribute('id', 'note-view-section');
	noteViewSection.dataset.id = note.id;
	noteViewSection.classList.add('invisible');
	gNoteViewContainer.appendChild(noteViewSection);

	const noteViewTitleContainer = document.createElement('div');
	noteViewTitleContainer.classList.add('note-view-title');
	const noteViewTitle = document.createElement('h2');
	noteViewTitle.innerText = note.title;
	noteViewTitleContainer.appendChild(noteViewTitle);
	noteViewSection.appendChild(noteViewTitleContainer);

	const noteViewContent = document.createElement('div');
	noteViewContent.innerHTML = note.content.replaceAll('\n', '<br>');
	noteViewContent.classList.add('note-view-content');
	noteViewSection.appendChild(noteViewContent);

	const noteDate = document.createElement('div');
	const dateSplit = note.createdDate.split('/');
	if(dateSplit.length != 3) {
		console.error('wtf? date format is incorrect!');
	}
	noteDate.textContent = 'Created: ' + gMonths[Number(dateSplit[0])-1] + ' ' + dateSplit[1] + ', ' + dateSplit[2];
	noteDate.classList.add('note-date-created');
	noteViewSection.appendChild(noteDate);
}

function renderEditNote(note) {
	const noteTitle = document.querySelector('.note-view-title');
	// const noteTitleMaxLength = document.getElementById('note-creation-title-input').maxlength;
	noteTitle.innerHTML = '';
	const titleInput = document.createElement('input');
	titleInput.id = 'note-edit-title-input';
	titleInput.type = 'text';
	titleInput.name = 'note-title';
	titleInput.minlength = 3;
	// titleInput.maxlength = noteTitleMaxLength;
	titleInput.value = note.title;
	noteTitle.appendChild(titleInput);
	
	const noteContent = document.querySelector('.note-view-content');
	noteContent.innerHTML = '';
	const contentTextArea = document.createElement('textarea');
	contentTextArea.id = 'note-edit-content-input';
	contentTextArea.name = 'note-content';
	contentTextArea.spellcheck = false;
	contentTextArea.wrap = 'soft';
	contentTextArea.cols = 30;
	contentTextArea.textContent = note.content;
	contentTextArea.oninput = renderNoteTextarea;
	noteContent.appendChild(contentTextArea);
	contentTextArea.style = 'height: ' + contentTextArea.scrollHeight + 'px;';
	window.scrollTo(0, document.body.clientHeight);

	const buttonsContainer = document.createElement('div');
	buttonsContainer.classList.add('note-editing-buttons-container');
	noteContent.appendChild(buttonsContainer);

	// Cancel note editing
	const cancelBtn = document.createElement('button');
	cancelBtn.id = 'cancel-note-editing-btn';
	cancelBtn.classList.add('btn');
	cancelBtn.onclick = renderEditNoteCancelAction;
	cancelBtn.innerText = 'cancel';
	buttonsContainer.appendChild(cancelBtn);

	// Confirm note editing
	const confirmBtn = document.createElement('button');
	confirmBtn.id = 'confirm-note-editing-btn';
	confirmBtn.classList.add('btn');
	confirmBtn.onclick = renderEditNoteConfirmAction;
	confirmBtn.innerText = 'confirm';
	buttonsContainer.appendChild(confirmBtn);
}

function renderEditNoteCancelAction() {
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

function renderEditNoteConfirmAction() {
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
		// newNoteTitle.textContent = newNoteContent.title;
		// copy the note title to the rendering, but if it's too large copy just a piece
		{
			let endTitleStrIndex;
			if(newNoteContent.title.length > 60) {
				endTitleStrIndex = 60;
				newNoteTitle.textContent = newNoteContent.title.slice(0, endTitleStrIndex) + '...';
			} else {
				endTitleStrIndex = newNoteContent.title.length;
				newNoteTitle.textContent = newNoteContent.title.slice(0, endTitleStrIndex);
			}
		}
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
	window.scrollTo(0, document.body.clientHeight);

	// console.debug('Click event -> Edit note confirmation | id: ' + noteId);
}

function renderDeleteNote() {
	const noteViewSectionToRemove = document.getElementById('note-view-section');
	const noteIdToRemove = noteViewSectionToRemove.dataset.id;
	noteRemove(noteIdToRemove);

	renderFadeOutInEffect(gNoteViewContainer, gNotesListContainer);
	renderFadeInEffect(document.getElementById('btn-actions-container'));


	setTimeout(function() {
		noteViewSectionToRemove.remove();
		for(let i = 0; i < gMainContentContainer.childNodes.length; ++i) {
			if(gMainContentContainer.childNodes[i].dataset.id === noteIdToRemove) {
				gMainContentContainer.childNodes[i].remove();
				break;
			}
		}
	}, gTimeoutFadeEffectInMs*2);

	renderFadeOutEffect(document.getElementById('modal-box-container'));
	document.body.style = 'overflow: auto;';

	// console.debug('Click event -> Delete note confirmation | id: ' + noteIdToRemove);
}

function renderClearAllNotes() {
	notesClear();
	renderFadeOutEffect(document.getElementById('modal-box-container'));
	renderAllNotes();

	// console.debug('Click event -> Delete all notes confirmation');
}

//
// NOTE: Click event -> backup notes
//
function renderBackupNotes(event) {
	// Render a custom modal box with more than just cancel/confirm buttons
	const modalBox = document.getElementById('modal-box-container');
	if(modalBox === null) {
		return console.error(`Modal box doesn't exist, WTF?`);
	}
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

	// Import notes _label_
	const importNotesLabelContainer = document.createElement('div');
	importNotesLabelContainer.innerText = 'upload';
	importNotesLabelContainer.classList.add('btn-label');
	btnImportData.appendChild(importNotesLabelContainer);

	const btnExportData = document.createElement('div');
	btnExportData.id = 'modal-box-export-data-btn';
	btnExportData.onclick = modalBoxExportDataAction;
	btnExportData.classList.add('btn');
	buttonsSection.appendChild(btnExportData);

	// Import notes _label_
	const exportNotesLabelContainer = document.createElement('div');
	exportNotesLabelContainer.innerText = 'download';
	exportNotesLabelContainer.classList.add('btn-label');
	btnExportData.appendChild(exportNotesLabelContainer);

	const btnClose = document.createElement('div');
	btnClose.id = 'modal-box-close-btn';
	btnClose.classList.add('btn');
	btnClose.onclick = renderModalBoxCancelAction;
	buttonsSection.appendChild(btnClose);

	// Import notes _label_
	const closeLabelContainer = document.createElement('div');
	closeLabelContainer.innerText = 'close';
	closeLabelContainer.classList.add('btn-label');
	btnClose.appendChild(closeLabelContainer);

	renderFadeInEffect(modalBox);
	window.scrollTo(0, 0);
	document.body.style = 'overflow: hidden;';

	// console.debug('Click event -> Backup notes');
}

//
// Controller
//

function preRenderSetup() {
	// Checking if there's data to be loaded from local storage
	{
		const notesAppByDSLDataInLocalStorage = JSON.parse(localStorage.getItem(gRememorariAppNotesKey));
		if(notesAppByDSLDataInLocalStorage !== null) {
			gNotes = notesAppByDSLDataInLocalStorage;
			// console.debug('reMemorari App: notes, data key: ' + gRememorariAppNotesKey + '\nloaded: ' + gNotes.length + ' objects');
		} else {
			// console.debug('reMemorari App: no local data stored (yet).');
		}
	}

	/*
	let noteCreationTitleInput = document.getElementById('note-creation-title-input');

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
	*/
}

//
// NOTE: Click event -> modal box (dark area / close action)
//
document.getElementById('modal-box-container').addEventListener('click', function(event) {
	if(event.target.id === 'modal-box-container') {
		renderModalBoxCancelAction();
	}
});

//
// NOTE: Click event -> Create new note confirm action
//
document.querySelector('.create-btn').addEventListener('click', function(event) {
	// Note title validation
	const noteTitleInput = document.getElementById('note-creation-title-input');
	{
		if(noteTitleInput.value.length < 2) {
			// NOTE: Auto-closing msg
			{
				const msg = 'The note title must be at least 2 characters long.';
				const timeOnScreenInMs = 1500;
				renderModalBoxMessage(msg, gModalBoxMessageTypes.msgFailure, timeOnScreenInMs);
			}
			return;
		}

		for(let i = 0; i < gNotes.length; ++i) {
			if(gNotes[i].title === noteTitleInput.value) {
				// NOTE: Auto-closing msg
				{
					const msg = 'Note title already exist. Please, try again choosing another title.';
					const timeOnScreenInMs = 1500;
					renderModalBoxMessage(msg, gModalBoxMessageTypes.msgFailure, timeOnScreenInMs);
				}
				return;
			}
		}
	}

	const noteContentInput = document.getElementById('note-creation-content-input');
	const notesContent = noteContentInput.value;

	// Generating note date and ID info
	let noteDate = new Date();
	let noteId = '' + Date.parse(noteDate) + Math.floor(Math.random() * 100000);
	let noteCreatedDateAsStr = '';
	{
		let noteDateDay = (noteDate.getDate() < 10) ? ('0' + (noteDate.getDate())) : noteDate.getDate();
		let noteDateMonth = (noteDate.getMonth() + 1 < 10) ? ('0' + (noteDate.getMonth() + 1)) : noteDate.getMonth() + 1;
		const noteDateYear = noteDate.getFullYear();
		let noteDateHour = (noteDate.getHours() < 10) ? ('0' + noteDate.getHours()) : noteDate.getHours();
		let noteDateMinutes = (noteDate.getMinutes() < 10) ? ('0' + noteDate.getMinutes()) : noteDate.getMinutes();
		noteCreatedDateAsStr = `${noteDateMonth}/${noteDateDay}/${noteDateYear} ${noteDateHour}:${noteDateMinutes}`;
	}
	
	noteCreate(noteId, noteTitleInput.value, notesContent, noteCreatedDateAsStr);

	// render new added note to the notes list
	const note = noteGetById(noteId);
	renderNewNoteToNotesList(note);

	// console.debug('Click event -> Create new note confirmation | id: ' + note.id);
});

//
// NOTE: Click event -> cancel new note cancel action
//
document.querySelector('.cancel-btn').addEventListener('click', function(event) {
	renderFadeOutInEffect(document.getElementById('note-creation'), gNotesListContainer);
	renderFadeInEffect(document.getElementById('btn-actions-container'));
});

//
// NOTE: Click event -> view note
//
gMainContentContainer.addEventListener('click', function(event) {
	if(event.target.classList.contains('note')) {
		for(let i = 0; i < gNotes.length; ++i) {
			if(event.target.dataset.id === gNotes[i].id) {
				renderNoteView(gNotes[i]);
				// console.debug('Click event -> View note | id: ' + gNotes[i].id);
				break;
			}
		}

		renderFadeOutInEffect(gNotesListContainer, gNoteViewContainer);
		renderFadeInEffect(document.getElementById('note-view-section'));
		renderFadeOutEffect(document.getElementById('btn-actions-container'));
	}
});

gNoteViewContainer.addEventListener('click', function(event) {
	//
	// NOTE: Click event -> go back (from note view to note list)
	//
	if(event.target.classList.contains('note-view-go-back-action')) {
		const noteViewSectionToRemove = document.getElementById('note-view-section');
		renderFadeOutInEffect(gNoteViewContainer, gNotesListContainer);
		renderFadeInEffect(document.getElementById('btn-actions-container'));

		setTimeout(function() {
			noteViewSectionToRemove.remove();
		}, gTimeoutFadeEffectInMs*3);

		// console.debug('Click event -> Go back to notes list');
	}

	//
	// NOTE: Click event -> edit note
	//
	if(event.target.classList.contains('note-view-edit-action')) {
		const noteId = document.getElementById('note-view-section').dataset.id;
		let note = noteGetById(noteId);
		renderEditNote(note);
		// console.debug('Click event -> Edit note | id: ' + noteId);
	}

	//
	// NOTE: Click event -> delete note
	//
	if(event.target.classList.contains('note-view-delete-action')) {
		const modalBoxTitle = 'Are you sure you want to permanently delete this note?';
		const cancelActionText = 'cancel';
		const confirmActionText = 'delete';
		renderModalBox(modalBoxTitle, cancelActionText, confirmActionText, renderDeleteNote);
		// console.debug('Click event -> Delete note | id: ' + document.getElementById('note-view-section').dataset.id);
	}
});

//
// NOTE: Click event -> clear all notes
//
function clearAllNotes(event) {
	const modalBoxTitle = 'Are you sure you want to delete all notes permanently?';
	const cancelActionText = 'cancel';
	const confirmActionText = 'delete all';
	renderModalBox(modalBoxTitle, cancelActionText, confirmActionText, renderClearAllNotes);
	// console.debug('Click event -> Clear all notes');
}

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
			renderModalBoxCancelAction(); // modal box fade-out effect
			// NOTE: Auto-closing msg
			{
				const msg = 'Your notes has been uploaded and updated!';
				const timeOnScreenInMs = 1500;
				renderModalBoxMessage(msg, gModalBoxMessageTypes.msgSuccess, timeOnScreenInMs);
			}
			// console.debug('Click event -> Import notes | File data has been read');
		}
	});
}

// NOTE: Click event -> export notes
function modalBoxExportDataAction(event) {
	const dataAsFile = new Blob([JSON.stringify(gNotes)], {type: 'octet-stream'});
	const hrefURL = URL.createObjectURL(dataAsFile);

	const currentDate = new Date();
	const link = document.createElement('a');
	link.href = hrefURL;
	link.style = 'display: none;';
	link.download = 'notes_data_exported_' + currentDate.getDate() + '_' + (currentDate.getMonth()+1) + '_' + currentDate.getFullYear() + '.json';
	document.body.appendChild(link);
	link.click();

	// NOTE: Auto-closing msg
	{
		const msg = 'Your notes has been downloaded to your device!';
		const timeOnScreenInMs = 1500;
		renderModalBoxMessage(msg, gModalBoxMessageTypes.msgSuccess, timeOnScreenInMs);
	}

	URL.revokeObjectURL(hrefURL);
	link.remove();

	// console.debug('Click event -> Export notes | Downloading note\'s data as a .json file');
}


