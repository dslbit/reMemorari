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
	gNotes.push({
		id: noteId,
		title: noteTitle,
		content: noteContent,
		createdDate: noteCreatedDate
	});
}

function noteRemove(noteId) {
	gNotes = gNotes.filter(function(note) {
		if(noteId == note.id) {
			return false;
		} else {
			return true;
		}
	});
}

function notesSaveToLocalStorage() {
	localStorage.setItem(gNotesKey, JSON.stringify(gNotes));
}

//
// First Run
//
preRenderSetup();
renderAllNotes(gNotes);

//
// View
// TODO: fade-in / fade-out helper functions
// TODO: render notes list?
// TODO: render note view
// TODO: render note creation
// TODO: render note editing
// TODO: move every priece of code in this app that changes the html to this place (View)
//
function renderAllNotes(notes) {
	let noteSection;
	const notesContainer = document.getElementById('main-content');
	notesContainer.innerHTML = '';

	const addActionContainer = document.createElement('div');
	addActionContainer.innerText = '';
	addActionContainer.setAttribute('id', 'add-action');
	notesContainer.appendChild(addActionContainer);
	
	// fade-in (notesList)
	{
		const notesList = document.getElementById('notes-list');
		notesList.classList.add('invisible');
		// notesList.innerHTML = ''
		
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

		const noteContentPreview = document.createElement('div');
		{
			let endContentStrIndex;
			if(note.content.length < 280) {
				endContentStrIndex = note.content.length;
			} else {
				endContentStrIndex = 280;
			}
			noteContentPreview.textContent = note.content.slice(0, endContentStrIndex) + '...';
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
const gMainContentContainer = document.getElementById('main-content');
const gNoteViewContainer = document.getElementById('note-view');
const gNotesListContainer = document.getElementById('notes-list');

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

		// fade-out notes list and fade-in of note-view
		{
			gNotesListContainer.classList.remove('visible');
			document.body.style = 'overflow: hidden;';
			gNoteViewContainer.classList.remove('hidden-container');

			setTimeout(function() {
				gNotesListContainer.classList.add('hidden-container');
				document.body.style = 'overflow: auto;';
				window.scrollTo(0,0);
				gNoteViewContainer.classList.add('visible');
				document.getElementById('note-view-section').classList.add('visible');
			}, gTimeoutFadeEffectInMs*2);
		}
	}
});

// NOTE: Click event -> go back (from note view to note list) & delete note
gNoteViewContainer.addEventListener('click', function(event) {
	// Go back Action
	if(event.target.classList.contains('note-view-go-back-action')) {
		const noteViewSectionToRemove = document.getElementById('note-view-section');
		gNoteViewContainer.classList.remove('visible');
		document.body.style = 'overflow: hidden;';
		setTimeout(function() {
			noteViewSectionToRemove.remove();
			gNotesListContainer.classList.remove('hidden-container');
			gNoteViewContainer.classList.add('hidden-container');
			document.body.style = 'overflow: auto;';
		}, gTimeoutFadeEffectInMs*2);
		
		setTimeout(function() {
			gNotesListContainer.classList.add('visible');
		}, gTimeoutFadeEffectInMs*3);
	}

	// TODO: edit action

	// Delete note action
	if(event.target.classList.contains('note-view-delete-action')) {
		// TODO: 'Are you sure?' confirmation box
		// fade-out note view container, fade-in notes list
		{
			gNoteViewContainer.classList.remove('visible');
			const noteViewSectionToRemove = document.getElementById('note-view-section');
			const noteIdToRemove = noteViewSectionToRemove.dataset.id;
			noteRemove(noteIdToRemove);
			notesSaveToLocalStorage();

			setTimeout(function() {
				noteViewSectionToRemove.remove();
				gNoteViewContainer.classList.add('hidden-container');
				gNotesListContainer.classList.remove('hidden-container');
			}, gTimeoutFadeEffectInMs*2);

			setTimeout(function() {
				for(let i = 0; i < gMainContentContainer.childNodes.length; ++i) {
					if(gMainContentContainer.childNodes[i].dataset.id === noteIdToRemove) {
						gMainContentContainer.childNodes[i].remove();
						break;
					}
				}
				gNotesListContainer.classList.add('visible');
			}, gTimeoutFadeEffectInMs*3);
		}
	}
});

// NOTE: Click event -> add a new note
const gNoteCreationContainer = document.getElementById('note-creation');
const btnAddAction = document.getElementById('add-action');
btnAddAction.addEventListener('click', function(event) {
	document.getElementById('note-creation-title-input').value = '';
	document.getElementById('note-creation-content-input').value = '';
	// fade-out notes list container, fade-in note creation container
	{
		gNotesListContainer.classList.add('invisible');
		gNotesListContainer.classList.remove('visible');
		document.body.style = 'overflow: hidden;';
		gNoteCreationContainer.classList.remove('hidden-container');
		setTimeout(function() {
			document.body.style = 'overflow-y: auto;';
			gNotesListContainer.classList.add('hidden-container');
			gNoteCreationContainer.classList.add('visible');
		}, gTimeoutFadeEffectInMs*2); // *2 because we need to wait for the fade-out animation to finish
	}
});

// NOTE: Click event -> cancel new note creation
const btnCancelNoteCreation = document.querySelector('.cancel-btn');
btnCancelNoteCreation.addEventListener('click', function(event) {
	// fade-out note creation container, fade-in notes list
	{
		gNoteCreationContainer.classList.remove('visible');
		document.body.style = 'overflow: hidden;';
		setTimeout(function() {
			document.body.style = 'overflow-y: auto;';
			gNotesListContainer.classList.remove('hidden-container');
			gNoteCreationContainer.classList.add('hidden-container');
		}, gTimeoutFadeEffectInMs*2);

		setTimeout(function() {
			gNotesListContainer.classList.add('visible');	
		}, gTimeoutFadeEffectInMs*3);
	}
});

// NOTE: Click event -> create note (button)
const btnCreateNote = document.querySelector('.create-btn');
btnCreateNote.addEventListener('click', function(event) {
	// Note title validation
	const noteTitleInput = document.getElementById('note-creation-title-input');
	{
		if(noteTitleInput.value.length < 3) {
			console.log('The note title must be greater than 3.');
			// TODO: model box
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
	notesSaveToLocalStorage();

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
			if(notesContent.length < 280) {
				endContentStrIndex = notesContent.length;
			} else {
				endContentStrIndex = 280;
			}
			newNotePreview.textContent = notesContent.slice(0, endContentStrIndex) + '...';
		}
		newNotePreview.classList.add('note-preview');
		newNoteSection.appendChild(newNotePreview);

		const newNoteDate = document.createElement('div');
		newNoteDate.textContent = 'Created: ' + noteCreatedDateAsStr;
		newNoteDate.classList.add('note-date');
		newNoteSection.appendChild(newNoteDate);

		gMainContentContainer.appendChild(newNoteSection);
	}

	// fade-out note creation container and fade-in notes list
	{
		gNoteCreationContainer.classList.remove('visible');

		setTimeout(function() {
			gNoteCreationContainer.classList.add('hidden-container');
			gNotesListContainer.classList.remove('hidden-container');
			
		}, gTimeoutFadeEffectInMs*2);

		setTimeout(function() {
			gNotesListContainer.classList.add('visible');
			// renderNotes(gNotes);

			
		}, gTimeoutFadeEffectInMs*3);
	}

	// use dataset to apply the id to the note container

});
