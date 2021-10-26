const audioNotesMap = {
	"c": "./assets/audio/c.mp3",
	"d": "./assets/audio/d.mp3",
	"e": "./assets/audio/e.mp3",
	"f": "./assets/audio/f.mp3",
	"g": "./assets/audio/g.mp3",
	"a": "./assets/audio/a.mp3",
	"b": "./assets/audio/b.mp3",

	"c♯": "./assets/audio/c♯.mp3",
	"d♯": "./assets/audio/d♯.mp3",
	"f♯": "./assets/audio/f♯.mp3",
	"g♯": "./assets/audio/d♯.mp3",
	"a♯": "./assets/audio/a♯.mp3",
};

const keyPairs = {
	KeyD: "D",
	KeyF: "F",
	KeyG: "G",
	KeyH: "H",
	KeyJ: "J",
	KeyK: "K",
	KeyL: "L",
	KeyR: "R",
	KeyT: "T",
	KeyU: "U",
	KeyI: "I",
	KeyO: "O",
};

function handlerSoundPlay(sndNum) {
	const audio = new Audio();
	audio.src = audioNotesMap[sndNum];
	audio.currentTime = 0;
	audio.play();
}

function handlerOnMouseLeave(event) {
	event.target.classList.remove("piano-key-active");
}

function toggleHoveringListener(swither) {
	if (swither === true) {
		for (const domNodeCurrent of keysPiano) {
			domNodeCurrent.addEventListener("mouseenter", handlerOnMouseEnter);
			domNodeCurrent.addEventListener("mouseleave", handlerOnMouseLeave);
		}
	} else if (swither === false) {
		for (const domNodeCurrent of keysPiano) {
			domNodeCurrent.removeEventListener(
				"mouseenter",
				handlerOnMouseEnter,
			);
			domNodeCurrent.removeEventListener(
				"mouseenter",
				handlerOnMouseLeave,
			);
		}
	}
}

function handlerOnMouseEnter(event) {
	handlerSoundPlay(event.target.getAttribute("data-note"));
	event.target.classList.add("piano-key-active");
}

function eventHandlerMouseDown(event) {
	handlerSoundPlay(event.target.getAttribute("data-note"));
	event.target.classList.add("piano-key-active");
	toggleHoveringListener(true);
}

function eventHandlerMouseUp(event) {
	event.target.classList.remove("piano-key-active");
	toggleHoveringListener(false);
}

const piano = document.querySelector("div.piano");
const keysPiano = document.querySelectorAll("div.piano-key");
piano.addEventListener("mousedown", eventHandlerMouseDown);
document.addEventListener("mouseup", eventHandlerMouseUp);

document.addEventListener("keydown", handlerKeyDown);
document.addEventListener("keyup", handlerKeyUp);

function handlerKeyDown(event) {
	for (const domNodeCurrentKey of keysPiano) {
		if (
			domNodeCurrentKey.getAttribute("data-letter") ===
			keyPairs[event.code]
		) {
			if (event.repeat === true) {
				return;
			}
			handlerSoundPlay(domNodeCurrentKey.getAttribute("data-note"));
			domNodeCurrentKey.classList.add("piano-key-active");
		}
	}
}

function handlerKeyUp(event) {
	for (const domNodeCurrentKey of keysPiano) {
		if (
			domNodeCurrentKey.getAttribute("data-letter") ===
			keyPairs[event.code]
		) {
			domNodeCurrentKey.classList.remove("piano-key-active");
		}
	}
}

const fullscreenButton = document.querySelector("button.fullscreen");
fullscreenButton.addEventListener("click", handlerToggleFullScreen);

function handlerToggleFullScreen() {
	if (document.fullscreenElement === null) {
		document.documentElement.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
}

const btnNotes = document.querySelector("button.btn-notes");
const btnLetters = document.querySelector("button.btn-letters");
btnNotes.addEventListener("click", handlerNotesAndLettersSwitch);
btnLetters.addEventListener("click", handlerNotesAndLettersSwitch);

function handlerNotesAndLettersSwitch(event) {
	btnLetters.classList.remove("btn-active");
	btnNotes.classList.remove("btn-active");
	event.target.classList.add("btn-active");
	if (event.target.innerHTML === "Letters") {
		for (const pianoKeyCurrent of keysPiano) {
			pianoKeyCurrent.classList.add("piano-key-letter");
		}
	} else if (event.target.innerHTML === "Notes") {
		for (const pianoKeyCurrent of keysPiano) {
			pianoKeyCurrent.classList.remove("piano-key-letter");
		}
	}
}
