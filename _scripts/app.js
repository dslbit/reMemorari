//
// Model
//
let gNotes = [
  {
  	id: 'id-01',
  	title: 'Test Title',
  	content: 'foo bar',
  	createdDate: '00/00/0000'
  },

  {
  	id: 'id-02',
  	title: 'Test Title 2',
  	content: 'foo bar 2',
  	createdDate: '11/11/1111'
  },
];




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
		
		setTimeout(function() {
			notesList.classList.add('visible');
		}, 150);
	}
	

	gNotes.forEach(function(note) {
		// console.log(note);
		const noteSection = document.createElement('section');
		noteSection.classList.add('note');
		noteSection.dataset.id = note.id;
		notesContainer.appendChild(noteSection);
		noteSection.classList.add('invisible');

		const noteTitle = document.createElement('div');
		noteTitle.innerText = note.title;
		noteTitle.classList.add('note-title');
		noteSection.appendChild(noteTitle);

		const noteContentPreview = document.createElement('div');
		{
			let endContentStrIndex;
			if(note.content.length < 132) {
				endContentStrIndex = note.content.length;
			} else {
				note.content.length = 132;
			}
			noteContentPreview.innerText = note.content.slice(0, endContentStrIndex);
		}
		noteContentPreview.innerText.concat('...');
		noteContentPreview.classList.add('note-preview');
		noteSection.appendChild(noteContentPreview);

		const noteDate = document.createElement('div');
		noteDate.innerText = note.createdDate;
		noteDate.classList.add('note-date');
		noteSection.appendChild(noteDate);
		// console.log(noteSection);

		// fade-in (notes)
		setTimeout(function() {
			noteSection.classList.add('visible');
			// noteViewContainer.classList
		}, 150);
	});

	const addActionContainer = document.createElement('div');
	addActionContainer.innerText = 'add';
	addActionContainer.classList.add('add-action');
	notesContainer.appendChild(addActionContainer);
}




//
// Controller
//
const mainContent = document.getElementById('main-content');
const noteViewContainer = document.getElementById('note-view');
// Click event: add action
mainContent.addEventListener('click', function(event) {
	if(event.target.classList.contains('add-action')) {

		// create a new note and its default data

		// get an unique id using the date object

		// use dataset to apply the id to the note container
	}
});

// Click event: note
mainContent.addEventListener('click', function(event) {
	if(event.target.classList.contains('note')) {
		// Use the dataset and get the note unique id to identify in the Model section the note data, then
		//   render it in the 'note-view' container and hide the notes container
		const notesListContainer = document.getElementById('notes-list');
		if(!(notesListContainer.classList.contains('hidden-container'))) {
			notesListContainer.classList.add('hidden-container');
			notesListContainer.classList.remove('visible');
		}

		// noteViewContainer.innerHTML = '';
		if(noteViewContainer.classList.contains('hidden-container')) {
			noteViewContainer.classList.remove('hidden-container');
		}
		noteViewContainer.classList.add('invisible');
		// noteViewContainer.style = 'opacity: 1;';

		/*
		const noteViewHeader = document.createElement('header');
		noteViewHeader.setAttribute('id', 'note-view-header');
		const goBackActionContainer = document.createElement('div');
		goBackActionContainer.classList.add('note-view-go-back-action');
		noteViewHeader.appendChild(goBackActionContainer);
		const goBackImg = document.createElement('img');
		goBackImg.src = '_icons/icon_home.png';
		goBackImg.alt = 'Go back';
		noteViewHeader.appendChild(goBackImg);
		noteViewContainer.appendChild(noteViewHeader);
		*/

		for(let i = 0; i < gNotes.length; ++i) {
			if(event.target.dataset.id === gNotes[i].id) {
				console.log(event.target);
				const noteViewSection = document.createElement('section');
				noteViewSection.setAttribute('id', 'note-view-section');
				noteViewContainer.appendChild(noteViewSection);

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

		// fade-in
		setTimeout(function() {
			noteViewContainer.classList.add('visible');
			// noteViewContainer.classList
		}, 150);
	}
});

noteViewContainer.addEventListener('click', function(event) {
	if(event.target.classList.contains('note-view-go-back-action')) {
		const notesListContainer = document.getElementById('notes-list');
		if(notesListContainer.classList.contains('hidden-container')) {
			notesListContainer.classList.remove('hidden-container');

			// fade-in
			setTimeout(function() {
				notesListContainer.classList.add('visible');
			}, 150);
		}

		if(!(noteViewContainer.classList.contains('hidden-container'))) {
			noteViewContainer.classList.add('hidden-container');
		}
		noteViewContainer.classList.remove('visible');

		const noteViewSectionToRemove = document.getElementById('note-view-section');
		// console.log(noteViewSectionToRemove);
		noteViewSectionToRemove.remove();
	}
});


//
// Run
//
renderNotes(gNotes);
