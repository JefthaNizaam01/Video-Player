# Video-Player

# 🎬 FakeTube | YouTube Homepage Clone

A lightweight, responsive YouTube homepage clone built for the Zaio Tech Bootcamp module. Features dynamic category filtering, a pure CSS dark mode, an interactive floating mini-player, and persistent watch-later functionality.

---

## 🔗 Quick Links

* 🚀 **Live Netlify Demo:** [faketube-zaio-demo.netlify.app](https://faketube-zaio-demo.netlify.app)
* 📹 **Loom Video Walkthrough:** [Watch 5-Min Video](https://www.loom.com/share/5ca2172a7be5446ea07b6d4323f7565e)

---

## ✨ Features

### 1. Base Homepage Clone
* **Dynamic Video Grid:** Built with CSS Grid for automatic column adjusting across different screens.
* **Collapsible Sidebar:** Collapses into a mobile drawer on screens under `768px`.
* **Real-time Search & Category Chips:** Combined filtering by query string and video category (`Coding`, `Music`, `Gaming`, `Vlogs`).

### 2. Manual Custom Feature (Built Without AI)
* **Pure CSS Dark Mode:** Implemented using a checkbox hack (`#dark-mode:checked ~ .page`) to handle theme switching zero JavaScript overhead.

### 3. Cursor AI-Assisted Features
* **Floating Mini-Player:** Displays a fixed bottom player with CSS slide-up animations on video selection. Includes keyboard event listeners (`Escape` / `Space`) for quick dismissal.
* **Watch Later System:** Save videos with a star button (`⭐`), backed by `localStorage`. Includes a live sidebar badge counter, a dedicated management list, and animated toast notifications.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (CSS Grid, Flexbox, CSS Keyframes)
* **Logic:** Vanilla JavaScript (ES5 Closures, LocalStorage API, DOM Events)
* **Hosting:** Netlify

---

## 🚀 Local Setup Instructions

1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/youtube-clone-zaio.git](https://github.com/your-username/youtube-clone-zaio.git)
