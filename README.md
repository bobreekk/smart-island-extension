# 🏝️ Smart Island — Browser Extension

**Smart Island** is a clean, minimal, and fully interactive overlay panel for your browser. It brings convenient quick-access widgets right to your screen, featuring built-in media tracking, quick notes, live currency/weather info, bookmark shortcuts, and full **voice control support**.

Designed for stability, fast performance, and seamless multitasking while browsing.

---

## ✨ Features

* **🎵 Music / Media Tracker**  
  Displays the currently playing track and album info directly in the island header.

* **⏱️ Timer & Stopwatch**  
  * **Stopwatch:** Start, pause, and reset time measurement on the fly.
  * **Timer:** Set a countdown that triggers an alert when finished.

* **📝 Quick Notes**  
  A lightweight notepad that automatically saves your thoughts directly in local browser storage.

* **📊 Live Info Board**  
  * Real-time exchange rates (USD/RUB, EUR/RUB).
  * Current weather according to your geolocation.
  * Active browser tab count.

* **🔗 Web Shortcuts**  
  Instant one-click access to popular global platforms: YouTube, GitHub, Reddit, X (Twitter), Telegram, and Discord.

* **🎙️ Voice Commands**  
  Hands-free navigation powered by the Web Speech API.

---

## 🎙️ Voice Control Commands

Click the microphone icon 🎙️ on the island and speak any of the following English commands:

| Command | Action |
| :--- | :--- |
| **`music`** or **`play`** | Switches to the Music tab |
| **`timer`** or **`time`** | Switches to the Timer / Stopwatch tab |
| **`note`** or **`notes`** | Switches to the Notes tab |
| **`info`** or **`weather`** | Switches to the Info tab |
| **`link`** or **`open`** | Switches to the Shortcuts tab |

---

## 🚀 How to Install in Chrome / Chromium

1. Download or clone this repository to your computer.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** in the top right corner.
4. Click **Load unpacked** (Загрузить распакованное расширение).
5. Select the folder containing the project files.
6. Open any web page and enjoy your Smart Island!

---

## 🛠️ Built With

* **Manifest V3**
* Vanilla JavaScript (ES6+)
* Web Speech API
* CSS3 Flexbox / Grid
* Fetch API (Open-Meteo & ExchangeRate APIs)

---

## 📝 Note for Users

* This extension is focused on clean presentation and quick productivity shortcuts.
* Media playback status is fetched via the native browser media session.

---
*Created with focus on minimalism and usability.*