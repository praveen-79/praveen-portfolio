/**
 * Main Application Orchestrator (Charcoal Minimalist Edition)
 * Minimalist 3D tilt, card unfolding architecture, silent execution, no audio.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  init3DTiltCards();
  initNavigation();
  initProjectFilters();
  initCardUnfolding();
  initProjectModals();
  initContactForm();
  initCopyActions();
  initScrollObserver();

  // Instant scroll to section if specified in URL query
  const urlParams = new URLSearchParams(window.location.search);
  const targetSection = urlParams.get('section');
  if (targetSection) {
    const el = document.getElementById(targetSection);
    if (el) {
      el.scrollIntoView({ behavior: 'instant' });
    }
  }
});

/**
 * Custom Minimalist Cursor
 */
function initCustomCursor() {
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  if (!cursorDot || !cursorRing) return;

  if (window.matchMedia('(pointer: coarse)').matches) {
    cursorDot.style.display = 'none';
    cursorRing.style.display = 'none';
    return;
  }

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  }, { passive: true });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  const interactives = document.querySelectorAll('a, button, input, textarea, .tilt-card, .chip-btn, .filter-btn, .card-unfold-trigger');
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursorRing.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.classList.remove('cursor-hover');
    });
  });
}

/**
 * 3D Responsive Card Tilt Physics
 */
function init3DTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  if (window.matchMedia('(pointer: coarse)').matches) return;

  cards.forEach((card) => {
    let glare = card.querySelector('.card-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'card-glare';
      card.appendChild(glare);
    }

    card.addEventListener('pointermove', (e) => {
      // If card is unfolded, reduce tilt angle so it stays easily readable
      const isUnfolded = card.classList.contains('is-unfolded');
      const maxTilt = isUnfolded ? 4 : 8;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -((y - centerY) / centerY) * maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(6px)`;

      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.12) 0%, rgba(203, 213, 225, 0.04) 40%, transparent 70%)`;
      glare.style.opacity = '1';
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      card.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
      if (glare) glare.style.opacity = '0';
    });

    card.addEventListener('pointerenter', () => {
      card.style.transition = 'none';
    });
  });
}

/**
 * "Cards can open like structure when we tap"
 * Seamless inline 3D unfolding structure revealing system pipeline & blueprint
 */
function initCardUnfolding() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach((card) => {
    const trigger = card.querySelector('.card-unfold-trigger');
    
    // Tapping on trigger or card header unfolds the structure
    const toggleUnfold = (e) => {
      // Don't collapse if clicking a link, modal trigger, or copy button
      if (e.target.closest('a') || e.target.closest('.open-blueprint-btn') || e.target.closest('.terminal-jump-btn')) {
        return;
      }

      const isOpen = card.classList.contains('is-unfolded');
      card.classList.toggle('is-unfolded', !isOpen);

      const icon = card.querySelector('.expand-icon');
      const text = card.querySelector('.expand-text');
      if (icon) icon.textContent = isOpen ? '+' : '−';
      if (text) text.textContent = isOpen ? 'Tap to Unfold System Architecture' : 'Collapse Architecture';
    };

    if (trigger) {
      trigger.addEventListener('click', toggleUnfold);
    }
  });
}

/**
 * Navigation Engine
 */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const menuBtn = document.getElementById('menu-btn');
  const navMenu = document.getElementById('nav-menu');

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();

      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);

      if (window.cyber3D) {
        window.cyber3D.switchTabTheme(targetId);
      }

      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }

      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }
}

/**
 * Project Filtering
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach((card, idx) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95) translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
          }, idx * 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Project Blueprints (All 7 GitHub & Resume Projects)
 */
const PROJECT_BLUEPRINTS = {
  'rag-chatbot': {
    title: 'Praveen Coding Asst & RAG Chatbot',
    category: 'Generative AI & LLMs',
    badge: 'Flagship System',
    tags: ['Python', 'Flask', 'Qwen 2.5 Coder 7B', 'SentenceTransformers', 'RAG', 'Vector Search', 'Hugging Face Spaces'],
    summary: 'An enterprise-grade coding assistant and document retrieval architecture that allows software engineers to interrogate complex codebases, PDFs, and algorithms with zero hallucinations.',
    architecture: [
      { step: '01. Ingestion', desc: 'PDFs and coding repositories are parsed, chunked with semantic boundaries, and cleaned.' },
      { step: '02. Vector Embeddings', desc: 'SentenceTransformers (all-MiniLM-L6-v2) encodes text chunks into dense latent vectors.' },
      { step: '03. Cosine Indexing', desc: 'Query is embedded on-the-fly; top-k nearest semantic chunks are retrieved via Cosine Similarity.' },
      { step: '04. Qwen 2.5 Coder 7B', desc: 'Context-augmented prompt is fed into Qwen 2.5 Coder 7B with strict citation instructions.' },
      { step: '05. Real-Time Streaming', desc: 'Output is streamed token-by-token using Flask SSE with Marked.js markdown formatting.' }
    ],
    highlights: [
      'Zero-hallucination guarantee via cited source pages and confidence thresholds.',
      'Specialized in Python, SQL, Data Structures, Algorithms, and ML mathematics.',
      'Deployed live on Hugging Face Spaces with real-time token streaming.'
    ],
    github: 'https://github.com/praveen-79/praveen-coding-assistant',
    liveUrl: 'https://huggingface.co/spaces/praveenkumarpidamarthi/praveen-coding-assistant',
    sandboxCommand: 'rag'
  },
  'eeg-text': {
    title: 'EEG-to-Text Conversion System',
    category: 'Brain-Computer Interface & Deep Learning',
    badge: 'Neural Innovation',
    tags: ['PyTorch', 'TensorFlow', 'CNN', 'BiLSTM', 'Sequence Modeling', 'Signal Processing'],
    summary: 'A deep learning pipeline designed to translate high-dimensional non-invasive human EEG brainwave signals into coherent English textual sentences.',
    architecture: [
      { step: '01. Neural Acquisition', desc: 'Multi-channel raw microvolt EEG signal streams are ingested.' },
      { step: '02. Filtering & Cleaning', desc: 'Bandpass filtering (0.5Hz–50Hz), baseline drift removal, and ocular artifact attenuation.' },
      { step: '03. Spatial CNN', desc: 'Convolutional layers extract topological electrode feature maps.' },
      { step: '04. Temporal BiLSTM', desc: 'Bidirectional Long Short-Term Memory units capture forward and backward sequence dynamics.' },
      { step: '05. Sequence Decoder', desc: 'Beam search decoder converts hidden state vectors into words with BLEU validation.' }
    ],
    highlights: [
      'Overcomes severe signal-to-noise ratio inherent in skull-attenuated brainwaves.',
      'Hybrid CNN-BiLSTM achieves superior spatial and temporal contextual modeling.',
      'Evaluated through BLEU metric benchmarks and convergence loss profiling.'
    ],
    github: 'https://github.com/praveen-79',
    sandboxCommand: 'eeg'
  },
  'deepfake': {
    title: 'Deepfake Detection & VeriShare Platform',
    category: 'AI Forensics & Computer Vision',
    badge: 'Multi-Model Vision Pipeline',
    tags: ['Python', 'TensorFlow', 'OpenCV', 'MesoNet', 'XceptionNet', 'Vision Transformer (ViT)', 'Random Forest', 'Flask'],
    summary: 'An end-to-end Deepfake Detection Application integrated into a Flask social media platform (VeriShare) that automatically inspects uploaded photos and videos to prevent synthetic deepfake media from being shared.',
    architecture: [
      { step: '01. OpenCV Preprocessing', desc: 'Extracts video frames via cv2.VideoCapture, localizes faces with Haar Cascades, and normalizes tensors (256x256 & 224x224).' },
      { step: '02. MesoNet & XceptionNet', desc: 'Extracts 64-D mesoscopic Laplacian boundary features and 128-D depthwise separable convolutional texture correlations.' },
      { step: '03. Vision Transformer (ViT)', desc: 'Computes 128-D 16x16 patch embeddings and multi-head self-attention global spatial consistency features.' },
      { step: '04. 320-D Feature Fusion & RF', desc: 'Concatenates 64-D + 128-D + 128-D vectors into a unified 320-D vector classified by a Random Forest Classifier.' },
      { step: '05. VeriShare Gatekeeper', desc: 'Flask social platform blocks detected deepfakes with a forensic telemetry report while publishing verified media.' }
    ],
    highlights: [
      'Multi-model ensemble fusing MesoNet (64-D), XceptionNet (128-D), and Vision Transformer (128-D).',
      'Integrated directly into VeriShare social feed with standalone AI Forensic Analyzer scanner.',
      'Supports both image (.jpg, .png, .webp) and multi-frame video (.mp4, .avi, .mov, .webm) inspection.'
    ],
    github: 'https://github.com/praveen-79/DeepFakeDetection',
    liveUrl: 'https://praveen-79.github.io/DeepFakeDetection/',
    sandboxCommand: 'deepfake'
  },
  'balu-beats': {
    title: 'Balu Beats — 320kbps Music Player & Spotify Bridge',
    category: 'Audio Streaming, PWA & Mobile App',
    badge: 'Cross-Platform Media',
    tags: ['JavaScript', 'HTML5 Audio API', 'React Native (Expo)', 'Python Server', 'Spotify Bridge', 'PWA'],
    summary: 'A zero-setup mobile and web music player app streaming full-length 320kbps tracks, Apple/iTunes global charts, Audius indie/EDM streams, 24/7 Live World Radio, and time-synced karaoke lyrics with multi-app deep-linking.',
    architecture: [
      { step: '01. Multi-Source Audio Engine', desc: 'Aggregates 320kbps full-length streams, Apple/iTunes official charts, Audius APIs, and 24/7 live radio.' },
      { step: '02. Synced Karaoke Lyrics', desc: 'Parses time-coded lyrics and synchronizes scrolling vocal lines with real-time playback timestamps.' },
      { step: '03. Multi-App Bridge', desc: 'Connects tracks directly to Spotify, YouTube Music, Apple Music, and JioSaavn.' },
      { step: '04. PWA & React Native Expo', desc: 'Runs as a single-file shareable HTML app, Wi-Fi installable PWA, or native Android/iOS app via expo-av.' }
    ],
    highlights: [
      'Zero API key setup required; works immediately on desktop and mobile browsers.',
      'Includes native React Native (Expo) mobile application for Android & iOS APK builds.',
      'Features 24/7 Live World Radio and real-time time-synced karaoke lyrics.'
    ],
    github: 'https://github.com/praveen-79/balu-beats',
    liveUrl: 'https://praveen-79.github.io/balu-beats/',
    sandboxCommand: 'balubeats'
  },
  'bookshop': {
    title: 'BookVerse — Full-Stack Online Bookshop',
    category: 'Full-Stack Web & E-Commerce',
    badge: 'Full-Stack Application',
    tags: ['Python', 'Flask', 'SQLite', 'JavaScript', 'jQuery & AJAX', 'Jinja2', 'Bootstrap 5', 'Werkzeug'],
    summary: 'A full-stack Online Bookshop Application built with Python, Flask, Jinja2, Bootstrap 5, JavaScript (jQuery & AJAX), and SQLite with real-time cart synchronization and live catalog search.',
    architecture: [
      { step: '01. Auth & Profile Layer', desc: 'Werkzeug password hashing, Flask session management, and user profile/shipping dashboard.' },
      { step: '02. Live AJAX Search', desc: 'Real-time /api/search endpoint with instant dropdown suggestions by title, author, category, and ISBN.' },
      { step: '03. Dynamic AJAX Cart', desc: 'Asynchronous /api/cart/* routes update item quantities, subtotals, tax, and navbar badge counts live.' },
      { step: '04. Checkout & Invoices', desc: 'Complete checkout workflow (Card, UPI, NetBanking, COD) with order history and printable itemized invoices.' }
    ],
    highlights: [
      'Zero page reloads for shopping cart operations and instant catalog filtering via AJAX.',
      'Pre-seeded relational SQLite database with complete user, cart, book, and order schemas.',
      'Responsive Bootstrap 5 interface with printable order receipts.'
    ],
    github: 'https://github.com/praveen-79/bookshop',
    liveUrl: 'https://praveen-79.github.io/bookshop/',
    sandboxCommand: 'bookshop'
  },
  'pulsechat': {
    title: 'PulseChat - High-Concurrency Chat Protocol',
    category: 'Real-Time Systems & Sockets',
    badge: 'System Architecture',
    tags: ['Python', 'Socket Programming', 'Multi-Threading', 'SQLite', 'Tkinter GUI'],
    summary: 'A resilient, real-time client-server communication suite engineered from raw socket primitives without third-party web abstraction overhead.',
    architecture: [
      { step: '01. Server Daemon', desc: 'Binds TCP socket, manages client registry, and spawns worker threads.' },
      { step: '02. Thread Pool', desc: 'Concurrent client handling ensures isolated packet queues per connection.' },
      { step: '03. Auth & Database', desc: 'SQLite backend securely handles user registration, hashed credentials, and sessions.' },
      { step: '04. Broadcast Protocol', desc: 'Payloads are serialized with message length headers for lossless transmission.' },
      { step: '05. Tkinter GUI', desc: 'Live presence tracker showing active online peers with instant message push.' }
    ],
    highlights: [
      'Sub-millisecond local network message delivery.',
      'Robust graceful disconnection and auto-cleanup handling.',
      'Modular client, server, GUI, and database layer separation.'
    ],
    github: 'https://github.com/praveen-79/pulsechat',
    sandboxCommand: 'pulsechat'
  },
  'portfolio-3d': {
    title: 'Personal Portfolio Website (Minimalist 3D)',
    category: 'Creative Engineering & Modern UI',
    badge: 'Interactive Experience',
    tags: ['Three.js', 'Minimalist WebGL', 'Modern JavaScript', 'CSS 3D Transforms'],
    summary: 'The minimalist charcoal 3D portfolio showcasing Praveen’s verified AI and software engineering achievements.',
    architecture: [
      { step: '01. Charcoal Ambient Canvas', desc: 'Lightweight Three.js scene with smooth mouse parallax.' },
      { step: '02. Dynamic Tilt & Unfold', desc: 'Tactile 3D perspective tilt and interactive unfolding card architecture.' },
      { step: '03. RAG Terminal', desc: 'Interactive console with token streaming and prompt chips.' }
    ],
    highlights: [
      'Zero audio distraction, sleek matte charcoal theme.',
      'Smooth 60 FPS performance without heavy external libraries.',
      'Directly deployable to GitHub Pages.'
    ],
    github: 'https://github.com/praveen-79/praveen-portfolio',
    liveUrl: 'https://praveen-79.github.io/praveen-portfolio/',
    sandboxCommand: 'about'
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const modalBody = document.getElementById('modal-content-body');
  const closeBtn = document.getElementById('modal-close-btn');
  const blueprintBtns = document.querySelectorAll('.open-blueprint-btn');

  blueprintBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projId = btn.getAttribute('data-project');
      const data = PROJECT_BLUEPRINTS[projId];
      if (!data) return;

      modalBody.innerHTML = `
        <div class="blueprint-header">
          <div class="blueprint-badge">${data.badge}</div>
          <h2 class="blueprint-title">${data.title}</h2>
          <div class="blueprint-category">${data.category}</div>
        </div>

        <p class="blueprint-summary">${data.summary}</p>

        <div class="blueprint-section-title">SYSTEM ARCHITECTURE PIPELINE</div>
        <div class="blueprint-pipeline">
          ${data.architecture.map(step => `
            <div class="pipeline-step">
              <div class="step-num">${step.step}</div>
              <div class="step-desc">${step.desc}</div>
            </div>
          `).join('')}
        </div>

        <div class="blueprint-section-title">KEY ENGINEERING HIGHLIGHTS</div>
        <ul class="blueprint-highlights">
          ${data.highlights.map(h => `<li><span class="bullet">▹</span> ${h}</li>`).join('')}
        </ul>

        <div class="blueprint-section-title">TECHNOLOGY STACK</div>
        <div class="blueprint-tags">
          ${data.tags.map(t => `<span class="tech-chip">${t}</span>`).join('')}
        </div>

        <div class="blueprint-actions">
          ${data.liveUrl ? `
            <a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn primary">
              Launch Live Demo ↗
            </a>
          ` : ''}
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn ${data.liveUrl ? 'glass' : 'primary'}">
            Explore GitHub Repository ↗
          </a>
          <button class="btn glass" onclick="launchInTerminal('${data.sandboxCommand}')">
            Test in AI Terminal ⌨
          </button>
        </div>
      `;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

window.launchInTerminal = function(cmd) {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';

  const termSection = document.getElementById('terminal');
  if (termSection) {
    termSection.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      if (window.cyberTerminal) {
        window.cyberTerminal.executeCommand(cmd);
      }
    }, 500);
  }
};

/**
 * Copy to Clipboard Utility
 */
function initCopyActions() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        showCyberToast(`COPIED: ${textToCopy}`);
      } catch (e) {
        showCyberToast(`SELECTED: ${textToCopy}`);
      }
    });
  });
}

function showCyberToast(msg) {
  let toast = document.getElementById('cyber-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cyber-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="toast-icon">✓</span> ${msg}`;
  toast.classList.add('visible');

  setTimeout(() => {
    toast.classList.remove('visible');
  }, 2400);
}

/**
 * Contact Dispatch Form
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('sender-name').value.trim();
    const email = document.getElementById('sender-email').value.trim();
    const message = document.getElementById('sender-message').value.trim();

    if (!name || !email || !message) {
      showCyberToast('ALL FIELDS REQUIRED');
      return;
    }

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Sender: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:praveenkumarpidamarthi01@gmail.com?subject=${subject}&body=${body}`;

    showCyberToast('DISPATCHING MESSAGE...');
    setTimeout(() => {
      window.location.href = mailtoUrl;
      form.reset();
    }, 500);
  });
}

/**
 * Scroll Observer
 */
function initScrollObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: [0.3] });

  sections.forEach(s => observer.observe(s));
}
