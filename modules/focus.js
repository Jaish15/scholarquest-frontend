/* ==========================================
   ScholarQuest Focus Arena Module
   Handles Pomodoro Timer & Ambient Sound Loop Engine
   Synced with Session Timer (Start/Pause/Stop at 00:00)
   ========================================== */

import { state, addXP, addCoins, saveState, updateUI } from '../app.js';

// Timer State
let timerInterval = null;
let totalDuration = 25 * 60; // 25 minutes default
let timeRemaining = 25 * 60;
let isRunning = false;
let currentMultiplier = 1.0;
let activePreset = 25;

// Web Audio Ambient Engine State
let audioCtx = null;
let activeSoundType = 'rain'; // 'rain', 'nature', 'thunder', 'whitenoise', 'fire', 'lofi'
let isAudioMuted = false;
let masterVolume = 0.5;
let masterGainNode = null;
let activeSynthNodes = {}; // Active AudioNode objects

export function initFocus() {
  setupTimerUI();
  setupPresets();
  setupAmbientSoundsUI();
}

function setupTimerUI() {
  const toggleBtn = document.getElementById('btn-toggle-timer');
  const resetBtn = document.getElementById('btn-reset-timer');

  if (toggleBtn) toggleBtn.addEventListener('click', toggleTimer);
  if (resetBtn) resetBtn.addEventListener('click', resetTimer);

  updateTimerDisplay();
}

function setupPresets() {
  const presets = document.querySelectorAll('.preset-btn');
  presets.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isRunning) {
        if (!confirm('Focus session in progress. Swapping presets will reset your timer. Proceed?')) {
          return;
        }
      }

      presets.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');

      const minutes = parseInt(btn.getAttribute('data-time'));
      activePreset = minutes;
      totalDuration = minutes * 60;
      timeRemaining = totalDuration;
      pauseTimer();
      updateTimerDisplay();
    });
  });
}

function toggleTimer() {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  const icon = document.getElementById('btn-timer-icon');
  if (icon) {
    icon.setAttribute('data-lucide', 'pause');
    if (window.lucide) window.lucide.createIcons();
  }

  const statusEl = document.getElementById('timer-status');
  if (statusEl) statusEl.innerText = activePreset === 25 ? 'FOCUSING...' : 'RESTING...';

  // Start or Resume Ambient Audio Sync
  playAmbientLoop();

  timerInterval = setInterval(() => {
    timeRemaining--;
    updateTimerDisplay();

    if (timeRemaining <= 0) {
      completeFocusSession();
    }
  }, 1000);
}

function pauseTimer() {
  isRunning = false;
  clearInterval(timerInterval);

  const icon = document.getElementById('btn-timer-icon');
  if (icon) {
    icon.setAttribute('data-lucide', 'play');
    if (window.lucide) window.lucide.createIcons();
  }

  const statusEl = document.getElementById('timer-status');
  if (statusEl) statusEl.innerText = 'PAUSED';

  // Pause Ambient Audio Sync
  stopAmbientLoop();
}

function resetTimer() {
  pauseTimer();
  timeRemaining = totalDuration;
  currentMultiplier = 1.0;
  updateMultiplierUI();
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const m = Math.floor(timeRemaining / 60);
  const s = timeRemaining % 60;
  const timeStr = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

  const textEl = document.getElementById('timer-time');
  if (textEl) textEl.innerText = timeStr;

  const ring = document.getElementById('timer-ring-progress');
  if (ring) {
    const pct = timeRemaining / totalDuration;
    const offset = 753.98 * (1 - pct);
    ring.style.strokeDashoffset = offset;
  }
}

function updateMultiplierUI() {
  const multEl = document.getElementById('focus-multiplier');
  if (multEl) multEl.innerText = `Multiplier: ${currentMultiplier.toFixed(1)}x`;
}

function completeFocusSession() {
  pauseTimer();

  // AUTOMATIC AUDIO STOP AT EXACTLY 00:00
  stopAmbientLoop();

  let xpAward = 0;
  let coinAward = 0;
  let description = '';

  if (activePreset === 25) {
    xpAward = Math.round(40 * currentMultiplier);
    coinAward = Math.round(15 * currentMultiplier);
    description = 'Completed Focus Quest';
    currentMultiplier = Math.min(currentMultiplier + 0.1, 2.0);
    state.stats.focusMinutes = (state.stats.focusMinutes || 0) + 25;
  } else {
    xpAward = 10;
    coinAward = 0;
    description = 'Recharged Mind during Break';
  }

  // Apply Pet Companion Passive Perk
  const equippedPet = state.equipped ? state.equipped.pet : 'none';
  if (equippedPet === 'magic_cat' && xpAward > 0) {
    xpAward += Math.max(1, Math.round(xpAward * 0.02));
  }

  updateMultiplierUI();
  addXP(xpAward);
  addCoins(coinAward);
  logFocusEvent(description, activePreset, xpAward);

  timeRemaining = totalDuration;
  updateTimerDisplay();

  alert(`🔔 Session Complete! Audio stopped automatically at 00:00. Rewards: +${xpAward} XP / +${coinAward} Coins!`);
}

function logFocusEvent(desc, duration, xpReward) {
  const container = document.getElementById('focus-logs');
  if (!container) return;

  const emptyLog = container.querySelector('.empty-log');
  if (emptyLog) emptyLog.remove();

  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const logEl = document.createElement('div');
  logEl.className = 'log-item';
  logEl.innerHTML = `
    <span class="log-date">${timeStr}</span>
    <span class="log-desc">${desc} (${duration}m)</span>
    <span class="log-reward">+${xpReward} XP</span>
  `;
  container.insertBefore(logEl, container.firstChild);
}

/* ============================================================
   AMBIENT AUDIO PLAYER ENGINE (Web Audio API Procedural Synth)
   ============================================================ */

function initAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGainNode = audioCtx.createGain();
    masterGainNode.gain.setValueAtTime(isAudioMuted ? 0 : masterVolume, audioCtx.currentTime);
    masterGainNode.connect(audioCtx.destination);
  }
}

function setupAmbientSoundsUI() {
  // Sound Selector Cards
  const cards = document.querySelectorAll('.sound-select-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      activeSoundType = card.getAttribute('data-sound');

      // If timer is actively running, restart sound loop with new sound choice
      if (isRunning) {
        stopAmbientLoop();
        playAmbientLoop();
      }
    });
  });

  // Mute Button
  const muteBtn = document.getElementById('btn-mute-sound');
  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      isAudioMuted = !isAudioMuted;
      if (masterGainNode && audioCtx) {
        masterGainNode.gain.setValueAtTime(isAudioMuted ? 0 : masterVolume, audioCtx.currentTime);
      }
      muteBtn.innerHTML = isAudioMuted 
        ? '<i data-lucide="volume-x"></i> Unmute' 
        : '<i data-lucide="volume-2"></i> Mute';
      if (window.lucide) window.lucide.createIcons();
    });
  }

  // Volume Slider
  const volSlider = document.getElementById('ambient-volume-slider');
  if (volSlider) {
    volSlider.addEventListener('input', (e) => {
      masterVolume = parseFloat(e.target.value);
      if (masterGainNode && audioCtx && !isAudioMuted) {
        masterGainNode.gain.setValueAtTime(masterVolume, audioCtx.currentTime);
      }
    });
  }

  // Manual Stop Button
  const stopBtn = document.getElementById('btn-stop-ambient');
  if (stopBtn) {
    stopBtn.addEventListener('click', () => {
      stopAmbientLoop();
    });
  }
}

function playAmbientLoop() {
  initAudioContext();
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  stopAmbientLoop();

  // Route sound generator by type
  /* ASSET REFERENCE NOTE: To swap procedural synth with custom local MP3 audio files:
     const audio = new Audio('/assets/sounds/' + activeSoundType + '.mp3');
     audio.loop = true; audio.play(); */
  if (activeSoundType === 'rain') playRainSynth();
  else if (activeSoundType === 'nature') playNatureSynth();
  else if (activeSoundType === 'thunder') playThunderSynth();
  else if (activeSoundType === 'calmfocus' || activeSoundType === 'whitenoise') playCalmFocusSynth();
  else playRainSynth();
}

function stopAmbientLoop() {
  Object.keys(activeSynthNodes).forEach(key => {
    try {
      if (activeSynthNodes[key] && activeSynthNodes[key].stop) {
        activeSynthNodes[key].stop();
      }
    } catch (e) {}
    delete activeSynthNodes[key];
  });
}

// ── 1. SOFT STEADY RAIN (Warm Lowpass Filtered Rain, No Harsh Claps) ─────────
function playRainSynth() {
  const buffer = createNoiseBuffer();
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(320, audioCtx.currentTime);

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.18, audioCtx.currentTime);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(masterGainNode);

  source.start();
  activeSynthNodes['rain'] = source;
}

// ── 2. CALM NATURE (Gentle Breeze & Subtle Forest Chimes) ────────────────────
function playNatureSynth() {
  const buffer = createNoiseBuffer();
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(480, audioCtx.currentTime);
  filter.Q.setValueAtTime(1.2, audioCtx.currentTime);

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.12, audioCtx.currentTime);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(masterGainNode);

  source.start();
  activeSynthNodes['nature'] = source;
}

// ── 3. DISTANT THUNDER (Deep Low Sub Rumble & Gentle Rain) ───────────────────
function playThunderSynth() {
  const buffer = createNoiseBuffer();
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(90, audioCtx.currentTime);

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.2, audioCtx.currentTime);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(masterGainNode);

  source.start();
  activeSynthNodes['thunder'] = source;
}

// ── 4. CALM FOCUS (Lo-Fi Ambient Instrumental Pad, Replacing Harsh White Noise)
function playCalmFocusSynth() {
  const freqs = [261.63, 329.63, 392.00, 493.88]; // C4, E4, G4, B4 (Cmaj7 soothing chord)
  const masterOscGain = audioCtx.createGain();
  masterOscGain.gain.setValueAtTime(0.12, audioCtx.currentTime);

  freqs.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    osc.type = i % 2 === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, audioCtx.currentTime);

    osc.connect(filter);
    filter.connect(masterOscGain);
    osc.start();

    activeSynthNodes[`calm_${i}`] = osc;
  });

  masterOscGain.connect(masterGainNode);
}

// ── 5. CAMPFIRE SYNTHESIS ───────────────────────────────────────────────────
function playCampfireSynth() {
  const buffer = createNoiseBuffer();
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(90, audioCtx.currentTime);

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(masterGainNode);

  source.start();
  activeSynthNodes['fire'] = source;
}

function createNoiseBuffer() {
  const bufferSize = audioCtx.sampleRate * 2;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}
