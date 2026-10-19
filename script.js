
const msg = new SpeechSynthesisUtterance();
let voices = [];

const voicesDropdown = document.querySelector('[name="voice"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

const rate = document.querySelector('[name="rate"]');
const pitch = document.querySelector('[name="pitch"]');
const text = document.querySelector('[name="text"]');

// Load available voices
function getVoices() {
  voices = window.speechSynthesis.getVoices();

  const previousVoice = voicesDropdown.value;
  voicesDropdown.innerHTML =
    '<option value="">Select A Voice</option>';

  voices.forEach((voice, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voicesDropdown.appendChild(option);
  });

  // Preserve the previously selected voice
  if (previousVoice !== '' && voices[previousVoice]) {
    voicesDropdown.value = previousVoice;
  }
}

// Initialize voices
getVoices();
window.speechSynthesis.addEventListener(
  'voiceschanged',
  getVoices
);

// Speak function
function speak() {
  const textValue = text.value.trim();

  if (textValue === '') {
    window.speechSynthesis.cancel();
    return;
  }

  // Stop any previous speech
  window.speechSynthesis.cancel();

  // Set speech properties
  msg.text = textValue;
  msg.rate = Number(rate.value);
  msg.pitch = Number(pitch.value);

  // Apply the selected voice
  const selectedVoice = voices[voicesDropdown.value];

  if (selectedVoice) {
    msg.voice = selectedVoice;
  }

  // Start speaking
  window.speechSynthesis.speak(msg);
}

// Speak button
speakButton.addEventListener('click', speak);

// Stop button
stopButton.addEventListener('click', () => {
  window.speechSynthesis.cancel();
});

// Update speech rate when the slider changes
rate.addEventListener('input', () => {
  if (window.speechSynthesis.speaking) {
    speak();
  }
});

// Update pitch when the slider changes
pitch.addEventListener('input', () => {
  if (window.speechSynthesis.speaking) {
    speak();
  }
});

// Change voice and restart speech
voicesDropdown.addEventListener('change', () => {
  if (text.value.trim() !== '') {
    speak();
  }
});
