
const msg = new SpeechSynthesisUtterance();
let voices = [];

const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

const rate = document.querySelector('[name="rate"]');
const pitch = document.querySelector('[name="pitch"]');
const text = document.querySelector('[name="text"]');

// Get available voices
function getVoices() {
  voices = window.speechSynthesis.getVoices();

  voicesDropdown.innerHTML = '<option value="">Select A Voice</option>';

  voices.forEach((voice, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voicesDropdown.appendChild(option);
  });
}

getVoices();
window.speechSynthesis.onvoiceschanged = getVoices;

// Speak function
function speak() {
  window.speechSynthesis.cancel();

  // Set text before speaking
  msg.text = text.value;

  // Set rate and pitch BEFORE speaking
  msg.rate = Number(rate.value);
  msg.pitch = Number(pitch.value);

  // Apply the selected voice
  const selectedVoice = voices[voicesDropdown.value];

  if (selectedVoice) {
    msg.voice = selectedVoice;
  }

  // Start speech
  window.speechSynthesis.speak(msg);
}

// Speak button
speakButton.addEventListener('click', speak);

// Stop button
stopButton.addEventListener('click', () => {
  window.speechSynthesis.cancel();
});


const msg = new SpeechSynthesisUtterance();
let voices = [];

const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

const rate = document.querySelector('[name="rate"]');
const pitch = document.querySelector('[name="pitch"]');
const text = document.querySelector('[name="text"]');

// Load available voices
function getVoices() {
  voices = window.speechSynthesis.getVoices();

  const previousVoice = voicesDropdown.value;
  voicesDropdown.innerHTML = '<option value="">Select A Voice</option>';

  voices.forEach((voice, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voicesDropdown.appendChild(option);
  });

  if (previousVoice !== '' && voices[previousVoice]) {
    voicesDropdown.value = previousVoice;
  }
}

getVoices();
window.speechSynthesis.onvoiceschanged = getVoices;

// Speak function
function speak() {
  const textValue = text.value.trim();

  // Prevent empty text
  if (textValue === '') {
    window.speechSynthesis.cancel();
    return;
  }

  // Stop previous speech
  window.speechSynthesis.cancel();

  // Set speech properties BEFORE speaking
  msg.text = textValue;
  msg.rate = Number(rate.value);
  msg.pitch = Number(pitch.value);

  // Set selected voice
  const selectedVoice = voices[voicesDropdown.value];

  if (selectedVoice) {
    msg.voice = selectedVoice;
  }

  window.speechSynthesis.speak(msg);
}

// Speak button
speakButton.addEventListener('click', speak);

// Stop button
stopButton.addEventListener('click', () => {
  window.speechSynthesis.cancel();
});

// Update rate while adjusting the slider
rate.addEventListener('input', () => {
  msg.rate = Number(rate.value);
});

// Update pitch and apply it to the current text
pitch.addEventListener('input', () => {
  msg.pitch = Number(pitch.value);

  if (window.speechSynthesis.speaking) {
    speak();
  }
});

// Switch voice and restart current text
voicesDropdown.addEventListener('change', () => {
  if (text.value.trim() !== '') {
    speak();
  }
});
