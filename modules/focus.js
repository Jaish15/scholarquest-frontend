/* ==========================================
   ScholarQuest Focus Arena Module
   Handles Pomodoro Timer, Web Audio Synth, Logs
   ========================================== */

import { state, addXP, addCoins, saveState, updateUI } from '../app.js';

// Timer State
let timerInterval = null;
let totalDuration = 25 * 60; // default 25m in seconds
let timeRemaining = 25 * 60;
let isRunning = false;
let currentMultiplier = 1.0;
let activePreset = 25; // 25, 5, 15

// Web Audio Context for Sound Generator
let audioCtx = null;
let activeSynthNodes = {}; // stores synth sources to stop them

export function initFocus() {
  setupTimerUI();
  setupPresets();
  setupAmbientSounds();
}

function setupTimerUI() {
  const toggleBtn = document.getElementById('btn-toggle-timer');
  const resetBtn = document.getElementById('btn-reset-timer');
  
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTimer);
  }
  if (resetBtn) {
    resetBtn.addEventListener('click', resetTimer);
  }
  
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
      
      // Update UI active states
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
  
  document.getElementById('timer-status').innerText = activePreset === 25 ? 'FOCUSING...' : 'RESTING...';
  
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
  
  document.getElementById('timer-status').innerText = 'PAUSED';
}

function resetTimer() {
  pauseTimer();
  timeRemaining = totalDuration;
  currentMultiplier = 1.0;
  updateMultiplierUI();
  updateTimerDisplay();
}

function updateTimerDisplay() {
  // Compute minutes and seconds
  const m = Math.floor(timeRemaining / 60);
  const s = timeRemaining % 60;
  const timeStr = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  
  document.getElementById('timer-time').innerText = timeStr;
  
  // Update circular Ring
  // Circumference of radius 120 = 2 * PI * 120 = 753.98
  const ring = document.getElementById('timer-ring-progress');
  if (ring) {
    const pct = timeRemaining / totalDuration;
    const offset = 753.98 * (1 - pct);
    ring.style.strokeDashoffset = offset;
  }
}

function updateMultiplierUI() {
  const multEl = document.getElementById('focus-multiplier');
  if (multEl) {
    multEl.innerText = `Multiplier: ${currentMultiplier.toFixed(1)}x`;
  }
}

function completeFocusSession() {
  pauseTimer();
  
  let xpAward = 0;
  let coinAward = 0;
  let description = '';
  
  if (activePreset === 25) { // Focus session completed
    xpAward = Math.round(40 * currentMultiplier);
    coinAward = Math.round(15 * currentMultiplier);
    description = 'Completed Focus Quest';
    
    // Increment streaks
    currentMultiplier = Math.min(currentMultiplier + 0.1, 2.0);
    state.stats.focusMinutes += 25;
  } else { // Break completed
    xpAward = 10;
    coinAward = 0;
    description = 'Recharged Mind during Break';
  }
  
  updateMultiplierUI();
  addXP(xpAward);
  addCoins(coinAward);
  
  // Log inside history panel
  logFocusEvent(description, activePreset, xpAward);
  
  // Reset timer
  timeRemaining = totalDuration;
  updateTimerDisplay();
  
  alert(`🔔 Bell rings! focus session complete. Rewards: +${xpAward} XP / +${coinAward} Coins!`);
}

function logFocusEvent(desc, duration, xpReward) {
  const container = document.getElementById('focus-logs');
  if (!container) return;
  
  // Remove empty placeholder
  const emptyLog = container.querySelector('.empty-log');
  if (emptyLog) emptyLog.remove();
  
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  const logEl = document.createElement('div');
  logEl.className = 'log-item';
  logEl.innerHTML = `
    <span class="log-date">${timeStr}</span>
    <span class="log-desc">${desc} (${duration}m)</span>
    <span class="log-reward">+${xpReward} XP</span>
  `;
  
  container.insertBefore(logEl, container.firstChild);
}

/* ========================================================
   WEB AUDIO SYNTHESIZERS (Premium Dynamic Soundscapes)
   ======================================================== */

function initAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function setupAmbientSounds() {
  const toggleBtns = document.querySelectorAll('.sound-toggle-btn');
  
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      initAudioContext();
      
      // If browser AudioContext is suspended, resume it
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      
      const soundType = btn.getAttribute('data-sound');
      const isPlaying = btn.classList.contains('playing');
      
      // Stop all sounds first to prevent layering overlays
      stopAllSounds();
      toggleBtns.forEach(b => {
        b.classList.remove('playing');
        b.innerHTML = '<i data-lucide="play"></i> Play';
      });
      
      if (!isPlaying) {
        btn.classList.add('playing');
        btn.innerHTML = '<i data-lucide="square"></i> Stop';
        startAmbientSound(soundType);
      }
      
      if (window.lucide) window.lucide.createIcons();
    });
  });
}

function stopAllSounds() {
  Object.keys(activeSynthNodes).forEach(key => {
    try {
      activeSynthNodes[key].stop();
    } catch (e) {}
    delete activeSynthNodes[key];
  });
}

function startAmbientSound(type) {
  if (type === 'rain') {
    playRainSound();
  } else if (type === 'fire') {
    playCampfireSound();
  } else if (type === 'lofi') {
    playLoFiBeats();
  }
}

// Generate White Noise Buffer
function createNoiseBuffer() {
  const bufferSize = audioCtx.sampleRate * 2; // 2 seconds of noise
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

// Synthesize Rain Sound (Low-pass filtered white noise with slight gain modulation)
function playRainSound() {
  const noiseSource = audioCtx.createBufferSource();
  noiseSource.buffer = createNoiseBuffer();
  noiseSource.loop = true;
  
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(380, audioCtx.currentTime);
  
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
  
  noiseSource.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);
  
  noiseSource.start();
  activeSynthNodes['rain'] = noiseSource;
}

// Synthesize Cozy Campfire (Sub-bass crackle rumble + random clicking impulse triggers)
function playCampfireSound() {
  // Flame rumble (low frequency noise)
  const rumbleSource = audioCtx.createBufferSource();
  rumbleSource.buffer = createNoiseBuffer();
  rumbleSource.loop = true;
  
  const rumbleFilter = audioCtx.createBiquadFilter();
  rumbleFilter.type = 'lowpass';
  rumbleFilter.frequency.setValueAtTime(80, audioCtx.currentTime);
  
  const rumbleGain = audioCtx.createGain();
  rumbleGain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  
  rumbleSource.connect(rumbleFilter);
  rumbleFilter.connect(rumbleGain);
  rumbleGain.connect(audioCtx.destination);
  
  rumbleSource.start();
  activeSynthNodes['rumble'] = rumbleSource;

  // Crackle impulse simulator
  const intervalId = setInterval(() => {
    if (!activeSynthNodes['rumble']) {
      clearInterval(intervalId);
      return;
    }
    
    // Play a tiny high-pitched click randomly
    if (Math.random() > 0.45) {
      playFireCrackleClick();
    }
  }, 120);
  
  // Custom dummy node so stopAllSounds can stop the interval check
  activeSynthNodes['fire'] = {
    stop: () => {
      clearInterval(intervalId);
      if (rumbleSource) rumbleSource.stop();
    }
  };
}

function playFireCrackleClick() {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(1500 + Math.random() * 2000, audioCtx.currentTime);
  
  gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
}

// Synthesize Lo-Fi Beats (Gentle keyboard chords playing on loop)
function playLoFiBeats() {
  const tempo = 80;
  const beatDuration = 60 / tempo; // duration of 1 beat in seconds
  
  const chordProgression = [
    [196, 246.9, 293.7, 349.2], // G major 7
    [174.6, 220, 261.6, 329.6],  // F major 7
    [164.8, 196, 246.9, 293.7],  // E minor 7
    [220, 261.6, 329.6, 392]     // A minor 7
  ];
  
  let currentChordIndex = 0;
  
  function playChordStep() {
    if (!activeSynthNodes['lofi']) return;
    
    const now = audioCtx.currentTime;
    const chord = chordProgression[currentChordIndex];
    
    // Generate soft synth voices for each note in chord
    const oscNodes = [];
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);
    
    chord.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      
      // Delay attack slightly for retro arpeggiated piano look
      const attackDelay = idx * 0.04;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.04, now + attackDelay + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + beatDuration * 4 - 0.2);
      
      osc.connect(gain);
      gain.connect(filter);
      
      osc.start(now + attackDelay);
      osc.stop(now + beatDuration * 4);
      oscNodes.push(osc);
    });
    
    // Kick drum synthesis on beats 1 and 3
    playKick(now);
    playKick(now + beatDuration * 2);
    
    // Snare/Shaker simulation on beats 2 and 4
    playSnare(now + beatDuration);
    playSnare(now + beatDuration * 3);
    
    filter.connect(audioCtx.destination);
    
    currentChordIndex = (currentChordIndex + 1) % chordProgression.length;
    
    // Schedule next chord loop step
    const nextStepTime = beatDuration * 4 * 1000;
    setTimeout(playChordStep, nextStepTime);
  }
  
  // Kick synth
  function playKick(time) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.frequency.setValueAtTime(120, time);
    osc.frequency.exponentialRampToValueAtTime(40, time + 0.15);
    
    gain.gain.setValueAtTime(0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(time);
    osc.stop(time + 0.2);
  }
  
  // Snare/Hat synth
  function playSnare(time) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280, time);
    
    gain.gain.setValueAtTime(0.06, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.12);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(time);
    osc.stop(time + 0.15);
  }

  // Setup loop trigger
  activeSynthNodes['lofi'] = {
    stop: () => {
      activeSynthNodes['lofi'] = null;
    }
  };
  
  playChordStep();
}
