const island = document.createElement('div');
island.id = 'smart-island-root';

island.innerHTML = `
  <div class="island-compact" id="compactView">
    <div class="compact-status">
      <span class="compact-icon" id="compactIcon">🎵</span>
      <span id="compactText">Smart Island</span>
    </div>
    <span style="font-size: 11px; opacity: 0.6;">✨</span>
  </div>

  <div class="island-expanded">
    <div class="panel-header">
      <div class="panel-tabs">
        <button class="tab-btn active" data-tab="music">🎵Music</button>
        <button class="tab-btn" data-tab="timer">⏱️Time</button>
        <button class="tab-btn" data-tab="notes">📝Note</button>
        <button class="tab-btn" data-tab="info">📊Info</button>
        <button class="tab-btn" data-tab="links">🔗Link</button>
      </div>
      <div class="header-actions">
        <button class="voice-btn" id="voiceBtn" title="Voice Command">🎙️</button>
        <button class="close-btn" id="closeIsland">✕</button>
      </div>
    </div>

    <div class="tab-body active" id="tab-music">
      <div class="player-info">
        <div class="album-cover" id="albumCover">🎵</div>
        <div>
          <div style="font-weight: 600; font-size: 13px;" id="trackTitle">No active track</div>
          <div style="font-size: 11px; color: #888;" id="trackArtist">Turn on the music</div>
        </div>
      </div>
      <div class="player-controls">
        <button class="ctrl-btn" id="prevBtn"></button>
        <button class="ctrl-btn play" id="playBtn"></button>
        <button class="ctrl-btn" id="nextBtn"></button>
      </div>
    </div>

    <div class="tab-body" id="tab-timer">
      <div class="timer-toggle">
        <button class="sub-btn active" id="modeSw">Stopwatch</button>
        <button class="sub-btn" id="modeCd">Timer</button>
      </div>
      <div class="timer-inputs" id="cdInputs" style="display:none;">
        <input type="number" id="cdMin" placeholder="min." min="0" max="99" value="5">
        <span style="color:#aaa;">:</span>
        <input type="number" id="cdSec" placeholder="sec." min="0" max="59" value="0">
      </div>
      <div class="stopwatch-display" id="swTime">00:00.0</div>
      <div class="stopwatch-actions">
        <button class="action-btn primary" id="swStart">Start</button>
        <button class="action-btn" id="swLap">Point</button>
        <button class="action-btn" id="swReset">Reset</button>
      </div>
      <div class="laps-list" id="swLaps"></div>
    </div>

    <div class="tab-body" id="tab-notes">
      <textarea class="notes-area" id="quickNotes" placeholder="Enter text..."></textarea>
    </div>

    <div class="tab-body" id="tab-info">
  <div class="info-grid">
    <div class="info-card">
      <label>USD / RUB</label>
      <span id="usdVal">...</span>
    </div>
    <div class="info-card">
      <label>EUR / RUB</label>
      <span id="eurVal">...</span>
    </div>
    <div class="info-card">
      <label>Weather</label>
      <span id="weatherVal">...</span>
    </div>
    <div class="info-card">
      <label>Tabs</label>
      <span id="tabsCount">...</span>
    </div>
  </div>
</div>


   <div class="tab-body" id="tab-links">
      <div class="links-grid">
        <a href="https://youtube.com" target="_blank" class="shortcut-item">
          <span class="shortcut-icon">▶️</span>
          <span>YouTube</span>
        </a>
        <a href="https://github.com" target="_blank" class="shortcut-item">
          <span class="shortcut-icon">🐙</span>
          <span>GitHub</span>
        </a>
        <a href="https://reddit.com" target="_blank" class="shortcut-item">
          <span class="shortcut-icon">🤖</span>
          <span>Reddit</span>
        </a>
        <a href="https://x.com" target="_blank" class="shortcut-item">
          <span class="shortcut-icon">🌐</span>
          <span>X / Twitter</span>
        </a>
        <a href="https://t.me" target="_blank" class="shortcut-item">
          <span class="shortcut-icon">✈️</span>
          <span>Telegram</span>
        </a>
        <a href="https://discord.com" target="_blank" class="shortcut-item">
          <span class="shortcut-icon">💬</span>
          <span>Discord</span>
        </a>
      </div>
    </div>
`;

document.body.appendChild(island);

let activeMode = 'music';
let isPlaying = false;

const compactIcon = document.getElementById('compactIcon');
const compactText = document.getElementById('compactText');
const compactView = document.getElementById('compactView');
const closeBtn = document.getElementById('closeIsland');

const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');
const albumCover = document.getElementById('albumCover');
const playBtn = document.getElementById('playBtn');

compactView.addEventListener('click', () => {
  island.classList.add('expanded');
  updateTabsCount();
});

closeBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  island.classList.remove('expanded');
});

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    switchTab(btn.getAttribute('data-tab'));
  });
});

function switchTab(targetTab) {
  activeMode = targetTab;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-body').forEach(b => b.classList.remove('active'));

  const activeBtn = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
  if (activeBtn) activeBtn.classList.add('active');
  
  const activeBody = document.getElementById(`tab-${targetTab}`);
  if (activeBody) activeBody.classList.add('active');

  if (targetTab === 'info') updateTabsCount();
  updateCompactState();
}

function syncMediaSession() {
  if ('mediaSession' in navigator && navigator.mediaSession.metadata) {
    const meta = navigator.mediaSession.metadata;
    trackTitle.textContent = meta.title || 'Untitled';
    trackArtist.textContent = meta.artist || 'Unknown artist';
    
    if (meta.artwork && meta.artwork.length > 0) {
      const src = meta.artwork[meta.artwork.length - 1].src;
      albumCover.innerHTML = `<img src="${src}" style="width: 100%; height: 100%; border-radius: 8px; object-fit: cover;">`;
    }
    
    isPlaying = navigator.mediaSession.playbackState === 'playing';
    playBtn.textContent = isPlaying ? '⏸' : '▶';
    
    if (activeMode === 'music') {
      compactText.textContent = meta.title ? meta.title : 'Smart Island';
    }
  }
}

setInterval(syncMediaSession, 1000);

playBtn.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'CONTROL_MEDIA', command: 'toggle' });
});

document.getElementById('nextBtn').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'CONTROL_MEDIA', command: 'next' });
});

document.getElementById('prevBtn').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'CONTROL_MEDIA', command: 'prev' });
});

let timerMode = 'sw';
let swInterval = null;
let swElapsed = 0;
let swRunning = false;

const swTime = document.getElementById('swTime');
const swStart = document.getElementById('swStart');
const swLap = document.getElementById('swLap');
const swReset = document.getElementById('swReset');
const swLaps = document.getElementById('swLaps');
const modeSw = document.getElementById('modeSw');
const modeCd = document.getElementById('modeCd');
const cdInputs = document.getElementById('cdInputs');

modeSw.addEventListener('click', () => {
  timerMode = 'sw';
  modeSw.classList.add('active');
  modeCd.classList.remove('active');
  cdInputs.style.display = 'none';
  swLap.style.display = 'inline-block';
  resetTimer();
});

modeCd.addEventListener('click', () => {
  timerMode = 'cd';
  modeCd.classList.add('active');
  modeSw.classList.remove('active');
  cdInputs.style.display = 'flex';
  swLap.style.display = 'none';
  resetTimer();
});

function formatTime(ms) {
  const totalSec = Math.floor(Math.max(0, ms) / 1000);
  const m = String(Math.floor(totalSec / 60)).padStart(2, '0');
  const s = String(totalSec % 60).padStart(2, '0');
  const d = Math.floor((Math.max(0, ms) % 1000) / 100);
  return `${m}:${s}.${d}`;
}

swStart.addEventListener('click', () => {
  if (!swRunning) {
    swRunning = true;
    swStart.textContent = 'Pause';
    
    if (timerMode === 'sw') {
      const startTime = Date.now() - swElapsed;
      swInterval = setInterval(() => {
        swElapsed = Date.now() - startTime;
        swTime.textContent = formatTime(swElapsed);
        if (activeMode === 'timer') updateCompactState();
      }, 100);
    } else {
      if (swElapsed === 0) {
        const m = parseInt(document.getElementById('cdMin').value) || 0;
        const s = parseInt(document.getElementById('cdSec').value) || 0;
        swElapsed = (m * 60 + s) * 1000;
      }
      const endTime = Date.now() + swElapsed;
      swInterval = setInterval(() => {
        swElapsed = endTime - Date.now();
        if (swElapsed <= 0) {
          clearInterval(swInterval);
          swRunning = false;
          swElapsed = 0;
          swStart.textContent = 'Start';
          swTime.textContent = '00:00.0';
          return;
        }
        swTime.textContent = formatTime(swElapsed);
        if (activeMode === 'timer') updateCompactState();
      }, 100);
    }
  } else {
    swRunning = false;
    swStart.textContent = 'Start';
    clearInterval(swInterval);
  }
});

swLap.addEventListener('click', () => {
  if (swElapsed > 0 && timerMode === 'sw') {
    const lapItem = document.createElement('div');
    lapItem.textContent = `Точка: ${formatTime(swElapsed)}`;
    swLaps.prepend(lapItem);
  }
});

function resetTimer() {
  swRunning = false;
  clearInterval(swInterval);
  swElapsed = 0;
  swTime.textContent = '00:00.0';
  swStart.textContent = 'start';
  swLaps.innerHTML = '';
  if (activeMode === 'timer') updateCompactState();
}

swReset.addEventListener('click', resetTimer);

const quickNotes = document.getElementById('quickNotes');

if (chrome.storage && chrome.storage.local) {
  chrome.storage.local.get(['island_notes'], (res) => {
    if (res.island_notes) quickNotes.value = res.island_notes;
  });

  quickNotes.addEventListener('input', () => {
    chrome.storage.local.set({ island_notes: quickNotes.value });
  });
}

function updateTabsCount() {
  chrome.runtime.sendMessage({ action: 'GET_TABS_COUNT' }, (res) => {
    if (res && res.count) {
      document.getElementById('tabsCount').textContent = `${res.count} шт`;
    }
  });
}

function updateCompactState() {
  if (activeMode === 'music') {
    compactIcon.textContent = '🎵';
    if ('mediaSession' in navigator && navigator.mediaSession.metadata?.title) {
      compactText.textContent = navigator.mediaSession.metadata.title;
    } else {
      compactText.textContent = 'Smart Island';
    }
  } else if (activeMode === 'timer') {
    compactIcon.textContent = '⏱️';
    compactText.textContent = formatTime(swElapsed);
  } else if (activeMode === 'notes') {
    compactIcon.textContent = '📝';
    compactText.textContent = 'Notes';
  } else if (activeMode === 'info') {
    compactIcon.textContent = '📊';
    compactText.textContent = 'Info';
  } else if (activeMode === 'links') {
    compactIcon.textContent = '🔗';
    compactText.textContent = 'Links';
  }
}

const voiceBtn = document.getElementById('voiceBtn');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = false;

  voiceBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (voiceBtn.classList.contains('listening')) {
      recognition.stop();
    } else {
      recognition.start();
    }
  });

  recognition.onstart = () => {
    voiceBtn.classList.add('listening');
    compactText.textContent = 'Listening...';
  };

  recognition.onend = () => {
    voiceBtn.classList.remove('listening');
    updateCompactState();
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    
    if (transcript.includes('music') || transcript.includes('play')) switchTab('music');
    if (transcript.includes('timer') || transcript.includes('time')) switchTab('timer');
    if (transcript.includes('note') || transcript.includes('notes')) switchTab('notes');
    if (transcript.includes('weather') || transcript.includes('info')) switchTab('info');
    if (transcript.includes('link') || transcript.includes('open')) switchTab('links');
  };
} else {
  voiceBtn.style.display = 'none';
}
async function fetchLiveData() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await res.json();
    if (data && data.rates && data.rates.RUB) {
      const usd = data.rates.RUB;
      const eur = usd / data.rates.EUR;
      const usdElem = document.getElementById('usdVal');
      const eurElem = document.getElementById('eurVal');
      if (usdElem) usdElem.textContent = `${usd.toFixed(2)} ₽`;
      if (eurElem) eurElem.textContent = `${eur.toFixed(2)} ₽`;
    }
  } catch (e) {}

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await res.json();
        if (data && data.current_weather) {
          const temp = Math.round(data.current_weather.temperature);
          const weatherElem = document.getElementById('weatherVal');
          if (weatherElem) weatherElem.textContent = `${temp > 0 ? '+' : ''}${temp}°C`;
        }
      } catch (e) {}
    }, () => {
      const weatherElem = document.getElementById('weatherVal');
      if (weatherElem) weatherElem.textContent = 'N/A';
    });
  }
}

fetchLiveData();