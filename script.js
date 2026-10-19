const msg = new SpeechSynthesisUtterance();   // reusable utterance object
let voices = [];                               // will hold SpeechSynthesisVoice objects

const voicesDropdown = document.querySelector('[name="voice"]');
const rateSlider      = document.querySelector('[name="rate"]');
const pitchSlider     = document.querySelector('[name="pitch"]');
const textArea        = document.querySelector('[name="text"]');
const speakButton     = document.querySelector('#speak');
const stopButton      = document.querySelector('#stop');

function updateSpeakButtonState() {
  const hasText = textArea.value.trim().length > 0;
  speakButton.disabled = !hasText;
}
textArea.addEventListener('input', updateSpeakButtonState);
updateSpeakButtonState();   // initial check

function populateVoices() {
  voices = window.speechSynthesis.getVoices();

  // Reset dropdown (keep placeholder)
  voicesDropdown.innerHTML = '<option value="">Select A Voice</option>';

  if (voices.length === 0) {
    showNoVoiceMessage();
    speakButton.disabled = true;
    return;
  }

  removeNoVoiceMessage();

  voices.forEach((voice, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;                     // store index, not name
    opt.textContent = `${voice.name} (${voice.lang})`;
    voicesDropdown.appendChild(opt);
  });
  updateSpeakButtonState();
}

function showNoVoiceMessage() {
  let msgEl = document.getElementById('voice-msg');
  if (!msgEl) {
    msgEl = document.createElement('p');
    msgEl.id = 'voice-msg';
    msgEl.style.color = 'red';
    msgEl.style.marginTop = '0.5rem';
    voicesDropdown.parentNode.insertBefore(msgEl, voicesDropdown);
  }
  msgEl.textContent = 'No speech‑synthesis voices are available on this device.';
}
function removeNoVoiceMessage() {
  const msgEl = document.getElementById('voice-msg');
  if (msgEl) msgEl.remove();
}

function speak() {
  const text = textArea.value.trim();
  if (text === '') {
    window.speechSynthesis.cancel();   // nothing to say
    return;
  }
  if (voicesDropdown.value === '') {
    console.warn('Please select a voice before speaking.');
    return;
  }

  window.speechSynthesis.cancel();

  msg.text  = text;
  msg.rate  = Number(rateSlider.value);
  msg.pitch = Number(pitchSlider.value);
  msg.voice = voices[Number(voicesDropdown.value)];

  window.speechSynthesis.speak(msg);
}

speakButton.addEventListener('click', speak);

stopButton.addEventListener('click', () => {
  window.speechSynthesis.cancel();
});
rateSlider.addEventListener('input', () => {
  if (window.speechSynthesis.speaking) {
    speak();
  }
});

pitchSlider.addEventListener('input', () => {
  if (window.speechSynthesis.speaking) {
    speak();
  }
});

voicesDropdown.addEventListener('change', () => {
  if (textArea.value.trim() !== '') {
    speak();
  }
});

populateVoices();   // first attempt
window.speechSynthesis.addEventListener('voiceschanged', populateVoices);