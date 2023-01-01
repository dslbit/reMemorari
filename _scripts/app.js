//
// Model
//

// TODO: save the currently note the user is reading to load in a new session if needed
// TODO: split content into paragraphs (using the newline separator)
let gNotes = [
  {
  	id: 'id-01',
  	title: 'Lorem Ipsum 1',
  	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.\
  	Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.\
  	Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.\
  	Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.\
  	Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.',
  	createdDate: '00/00/0000'
  },
{
  	id: 'id-02',
  	title: 'Lorem Ipsum 2',
  	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.\
  	Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.\
  	Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.\
  	Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.\
  	Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.',
  	createdDate: '00/00/0000'
  },

  {
  	id: 'id-03',
  	title: 'Lorem Ipsum 3',
  	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.\
  	Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.\
  	Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.\
  	Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.\
  	Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.',
  	createdDate: '00/00/0000'
  },

  {
  	id: 'id-04',
  	title: 'Lorem Ipsum 3',
  	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.\
  	Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.\
  	Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.\
  	Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.\
  	Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.',
  	createdDate: '00/00/0000'
  },

  {
  	id: 'id-05',
  	title: 'Lorem Ipsum 4',
  	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.\
  	Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.\
  	Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.\
  	Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.\
  	Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
  	sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
  	Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
  	nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
  	reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
  	pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\
  	culpa qui officia deserunt mollit anim id est laborum.',
  	createdDate: '00/00/0000'
  },
];

let gTimeoutFadeEffectInMs = 90;

function notesRemove(noteId) {
	gNotes = gNotes.filter(function(note) {
		if(noteId == note.id) {
			return false;
		} else {
			return true;
		}
	});
}

//
// First Run
//
renderNotes(gNotes);

//
// View
//
function renderNotes(notes) {
	let noteSection;
	const notesContainer = document.getElementById('main-content');
	
	// fade-in (notesList)
	{
		const notesList = document.getElementById('notes-list');
		notesList.classList.add('invisible');
		// notesList.innerHTML = ''
		
		setTimeout(function() {
			notesList.classList.add('visible');
		}, gTimeoutFadeEffectInMs*2);
	}
	
	notesContainer.innerHTML = '';
	gNotes.forEach(function(note) {
		// console.log(note);
		const noteSection = document.createElement('section');
		noteSection.classList.add('note');
		noteSection.dataset.id = note.id;
		notesContainer.appendChild(noteSection);
		// noteSection.classList.add('invisible');

		const noteTitle = document.createElement('div');
		noteTitle.innerText = note.title;
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
			noteContentPreview.innerText = note.content.slice(0, endContentStrIndex) + '...';
		}
		noteContentPreview.classList.add('note-preview');
		noteSection.appendChild(noteContentPreview);

		const noteDate = document.createElement('div');
		noteDate.innerText = 'Created: ' + note.createdDate;
		noteDate.classList.add('note-date');
		noteSection.appendChild(noteDate);
	});

	const addActionContainer = document.createElement('div');
	addActionContainer.innerText = '';
	addActionContainer.setAttribute('id', 'add-action');
	notesContainer.appendChild(addActionContainer);
}




//
// Controller
//
const gMainContent = document.getElementById('main-content');
const gNoteViewContainer = document.getElementById('note-view');
const gNotesListContainer = document.getElementById('notes-list');

//
// Click event: add action
//
gMainContent.addEventListener('click', function(event) {
	if(event.target.classList.contains('add-action')) {

		// create a new note and its default data

		// get an unique id using the date object

		// use dataset to apply the id to the note container
	}
});

//
// Click event: note
//
gMainContent.addEventListener('click', function(event) {
	if(event.target.classList.contains('note')) {
		// Use the dataset and get the note unique id to identify in the Model section the note data, then
		//   render it in the 'note-view' container and hide the notes container

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
				const noteViewTitle = document.createElement('h1');
				noteViewTitle.innerText = gNotes[i].title;
				noteViewTitleContainer.appendChild(noteViewTitle);
				noteViewSection.appendChild(noteViewTitleContainer);

				const noteViewContent = document.createElement('div');
				noteViewContent.innerText = gNotes[i].content;
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

//
// Click event: go back (from note view to note list) & delete note
// 
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

	// Delete note action
	if(event.target.classList.contains('note-view-delete-action')) {
		// TODO: 'Are you sure?' confirmation box
		// fade-out note view container, fade-in notes list
		{
			gNoteViewContainer.classList.remove('visible');
			const noteViewSectionToRemove = document.getElementById('note-view-section');
			const noteIdToRemove = noteViewSectionToRemove.dataset.id;
			notesRemove(noteIdToRemove);

			setTimeout(function() {
				noteViewSectionToRemove.remove();
				gNoteViewContainer.classList.add('hidden-container');
				gNotesListContainer.classList.remove('hidden-container');
			}, gTimeoutFadeEffectInMs*2);

			setTimeout(function() {
				for(let i = 0; i < gMainContent.childNodes.length; ++i) {
					if(gMainContent.childNodes[i].dataset.id === noteIdToRemove) {
						gMainContent.childNodes[i].remove();
						break;
					}
				}
				gNotesListContainer.classList.add('visible');
			}, gTimeoutFadeEffectInMs*3);
		}
	}
});

//
// Click event: add a new note
// NOTE: Why after deleting a note it doesn't work anymore?
//
gNoteCreationContainer = document.getElementById('note-creation');
btnAddAction = document.getElementById('add-action');
btnAddAction.addEventListener('click', function(event) {
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

btnCancelNoteCreation = document.querySelector('.cancel-btn');
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
