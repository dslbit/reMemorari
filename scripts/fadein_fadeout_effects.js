export const gTimeoutFadeEffectInMs = 90;

// NOTE: Fade-out a container and fade-in another container on the page
export function renderFadeOutInEffect(containerToFadeOut, containerToFadeIn) {
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

// NOTE: Fade-out a container
export function renderFadeOutEffect(container) {
	container.classList.add('invisible');
	container.classList.remove('visible');
	setTimeout(function() {
		container.classList.add('hidden-container');
	}, gTimeoutFadeEffectInMs*2);
}

// NOTE: Fade-in a container
export function renderFadeInEffect(container) {
	container.classList.remove('hidden-container');
	setTimeout(function() {
		container.classList.add('visible');
	}, gTimeoutFadeEffectInMs*2);
}


