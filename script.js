// Your script here.

const msg = new SpeechSynthesisUtterance();
let voices = [];

const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// 1. Get all available voices
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

// 2. Load voices
getVoices();

window.speechSynthesis.onvoiceschanged = getVoices;

// 3. Speak the text
function speak() {
  // Stop previous speech
  window.speechSynthesis.cancel();

  // Set the text
  msg.text = document.querySelector('[name="text"]').value;

  // Set the selected voice
  const selectedVoice = voices[voicesDropdown.value];

  if (selectedVoice) {
    msg.voice = selectedVoice;
  }

  // Set rate and pitch
  msg.rate = document.querySelector('[name="rate"]').value;
  msg.pitch = document.querySelector('[name="pitch"]').value;

  // Start speaking
  window.speechSynthesis.speak(msg);
}

// 4. Speak button
speakButton.addEventListener('click', speak);

// 5. Stop button
stopButton.addEventListener('click', () => {
  window.speechSynthesis.cancel();
});

// 6. Update settings when sliders or text change
options.forEach(option => {
  option.addEventListener('change', () => {
    if (window.speechSynthesis.speaking) {
      speak();
    }
  });
});

// 7. Change voice when the dropdown changes
voicesDropdown.addEventListener('change', speak);

