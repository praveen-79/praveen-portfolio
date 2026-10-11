# Pidamarthi Praveen Kumar - AI & Machine Learning Engineering Portfolio

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Deployment-00f0ff?style=for-the-badge&logo=github)](https://praveen-79.github.io/praveen-portfolio/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL%20Minimalist%203D-black?style=for-the-badge&logo=three.js)](https://threejs.org/)

> **Live Portfolio:** [https://praveen-79.github.io/praveen-portfolio/](https://praveen-79.github.io/praveen-portfolio/)

---

## ⚡ Overview

A minimalist, high-performance, dark charcoal 3D portfolio showcasing the AI, Machine Learning, and Full-Stack Engineering work of **Pidamarthi Praveen Kumar** (B.Tech in Artificial Intelligence & Machine Learning from Chaitanya Bharathi Institute of Technology, CBIT).

Designed with a matte charcoal aesthetic (`#090a0d`), zero visual clutter, smooth cursor-reactive Three.js ambient dust particles, and tactile **3D unfolding cards** that expand on tap to expose technical architectures, data pipelines, and live code links.

---

## 🚀 Key Features

- **Minimalist Dark Charcoal Design**: Plain matte slate/charcoal palette (`#090a0d` to `#0d0f14`) with translucent glassmorphic surfaces and high-contrast typography.
- **Ambient 3D Particle Space**: Clean Three.js WebGL canvas with 1,200 floating particles and smooth mathematical mouse parallax.
- **Tactile Unfolding Project Cards**: Interactive cards that smoothly expand in 3D perspective to reveal full engineering data flows and architectural blueprints.
- **Simulated Qwen 2.5 Coder Terminal**: Interactive RAG terminal with custom query suggestions, token streaming, and command-line execution (`rag`, `eeg`, `deepfake`, `balubeats`, `bookshop`, `pulsechat`, `skills`, `matrix`, `help`).
- **Interactive Blueprints Modal**: Deep-dive architecture inspection with interactive step-by-step pipeline viewers.
- **Offline & CDN Resilient**: Bundled local Three.js fallback ensuring zero downtime across network conditions.
- **100% Responsive**: Tailored for ultra-wide monitors, laptops, tablets, and mobile devices.

---

## 🛠 Featured Engineering Projects

1. **Praveen Coding Assistant & RAG Chatbot** ([GitHub](https://github.com/praveen-79/praveen-coding-assistant) | [Live Space](https://huggingface.co/spaces/praveenkumarpidamarthi/praveen-coding-assistant))
   - **Stack**: Python, Flask, Qwen 2.5 Coder 7B, SentenceTransformers (`all-MiniLM-L6-v2`), Cosine Similarity, Marked.js.
   - **Architecture**: Retrieval-augmented generation engine with PDF vector indexing, cited source pages, and real-time token streaming.

2. **EEG-to-Text Conversion System** ([GitHub](https://github.com/praveen-79))
   - **Stack**: Python, PyTorch, TensorFlow, CNN-BiLSTM, Signal Processing.
   - **Architecture**: Hybrid spatial-temporal CNN-BiLSTM pipeline converting raw non-invasive EEG neural signals into decoded text sequences evaluated via BLEU metrics.

3. **Deepfake Detection & VeriShare Platform** ([GitHub](https://github.com/praveen-79/DeepFakeDetection) | [Live Demo](https://praveen-79.github.io/DeepFakeDetection/))
   - **Stack**: Python, TensorFlow, OpenCV, MesoNet, XceptionNet, Vision Transformer (ViT), Scikit-Learn Random Forest, Flask.
   - **Architecture**: Multi-model forensic ensemble fusing 64-D MesoNet, 128-D XceptionNet, and 128-D ViT features into a 320-D vector to automatically block synthetic media uploads on the VeriShare social platform.

4. **Balu Beats — 320kbps Music Player & Multi-App Spotify Bridge** ([GitHub](https://github.com/praveen-79/balu-beats) | [Live App](https://praveen-79.github.io/balu-beats/))
   - **Stack**: JavaScript, HTML5 Audio API, React Native (`expo-av`), Python Server, Progressive Web App (PWA).
   - **Architecture**: Streams 320kbps tracks, Apple/iTunes charts, Audius indie streams, and 24/7 Live World Radio with time-synced karaoke lyrics and cross-platform Spotify/YouTube Music/Apple Music/JioSaavn deep-linking.

5. **BookVerse — Full-Stack Online Bookshop** ([GitHub](https://github.com/praveen-79/bookshop) | [Live Demo](https://praveen-79.github.io/bookshop/))
   - **Stack**: Python, Flask, SQLite, JavaScript (jQuery & AJAX), Jinja2, Bootstrap 5, Werkzeug.
   - **Architecture**: E-commerce platform with Werkzeug authentication, real-time AJAX shopping cart updates, instant live search dropdowns, multi-gateway checkout, and printable itemized order invoices.

6. **PulseChat - Real-Time Multi-User Chat** ([GitHub](https://github.com/praveen-79/pulsechat))
   - **Stack**: Python, Socket Programming (TCP/IP), Multi-Threading, SQLite, Tkinter GUI.
   - **Architecture**: Concurrent client-server chat system with isolated worker threads, SQLite credential authentication, and live presence broadcasting.

7. **Personal Portfolio Website** ([GitHub](https://github.com/praveen-79/praveen-portfolio) | [Live Site](https://praveen-79.github.io/praveen-portfolio/))
   - **Stack**: HTML5, CSS3 3D Transforms, Vanilla ES6+, WebGL / Three.js.
   - **Architecture**: Responsive matte charcoal interface with interactive RAG terminal and tactile 3D unfolding card drawer physics.

---

## 📁 Repository Structure

```
├── index.html                  # Main portfolio semantic document
├── style.css                   # Matte charcoal styling & 3D unfolding animations
├── Praveen_Kumar_Resume.pdf    # Official Resume (PDF download)
├── Praveen_Kumar_Resume.docx   # Official Resume (Word document)
├── assets/
│   ├── profile.jpg             # High-resolution portrait
│   └── three.min.js            # Local Three.js r128 library fallback
├── js/
│   ├── main.js                 # 3D tilt, unfolding drawer engine, and navigation
│   ├── three-scene.js          # Minimalist ambient WebGL particle canvas
│   ├── terminal.js             # Simulated Qwen 2.5 RAG terminal sandbox
│   └── audio.js                # Silent no-op module
└── README.md                   # Repository documentation
```

---

## 💻 Local Development

Run locally with any static web server:

```bash
# Python 3
python -m http.server 8080

# Or with Node npx
npx serve .
```

Open `http://localhost:8080` in your browser.

---

## 📬 Contact & Connect

- **Engineer:** Pidamarthi Praveen Kumar
- **Email:** [praveenkumarpidamarthi01@gmail.com](mailto:praveenkumarpidamarthi01@gmail.com)
- **Phone:** +91 8317668826
- **GitHub:** [https://github.com/praveen-79](https://github.com/praveen-79)
- **LinkedIn:** [https://www.linkedin.com/in/praveen-kumar-pidamarthi-781b52299/](https://www.linkedin.com/in/praveen-kumar-pidamarthi-781b52299/)
- **Location:** Hyderabad, Telangana, India
