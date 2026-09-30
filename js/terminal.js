/**
 * CyberTerminal & RAG Assistant Engine
 * Emulates Praveen's flagship Qwen 2.5 Coder & RAG Chatbot directly in the portfolio.
 * Includes real-time token streaming, cited document sources, and command parsing.
 */

class CyberTerminal {
  constructor() {
    this.outputEl = document.getElementById('terminal-output');
    this.inputEl = document.getElementById('terminal-input');
    this.formEl = document.getElementById('terminal-form');
    this.chipsContainer = document.getElementById('terminal-chips');
    this.isStreaming = false;

    this.history = [];
    this.historyIndex = -1;

    // Knowledge Base emulating Praveen's RAG system
    this.knowledge = {
      'rag': {
        title: 'Praveen Coding Asst & RAG Chatbot Architecture',
        citation: 'Source: Resume_2026.pdf (Section: Projects - P.1) | LLM: Qwen 2.5 Coder 7B',
        text: `The Praveen Coding Assistant is an end-to-end Generative AI pipeline designed for software engineering and technical explanation:
• Underlying LLM: Integrated Alibaba Cloud's Qwen 2.5 Coder 7B for superior code reasoning, syntax validation, and algorithmic breakdown.
• Vector Embeddings: Utilized SentenceTransformers to compute high-density dense vector embeddings for indexed documents and PDFs.
• Retrieval Engine: Cosine similarity vector search retrieves the top-k most semantically relevant technical documentation chunks.
• Citation Grounding: Real-time source page citation prevents hallucinations by tying every code answer to verified source pages.
• Full-Stack Interface: Built with Flask, HTML/CSS/JS, with real-time SSE (Server-Sent Events) token streaming and Markdown syntax highlighting.`
      },
      'eeg': {
        title: 'EEG-to-Text Conversion Deep Learning System',
        citation: 'Source: Resume_2026.pdf (Section: Projects - P.1) | Framework: PyTorch / TensorFlow',
        text: `An innovative Brain-Computer Interface (BCI) project converting raw neuro-electrical signals into readable language:
• Architecture: Hybrid CNN-BiLSTM network. CNN layers extract high-dimensional spatial features across 64-channel EEG topologies; Bidirectional LSTM layers capture bidirectional temporal dependencies in neural firing sequences.
• Preprocessing Pipeline: Bandpass filtering (0.5Hz–50Hz), artifact removal (EOG/EMG reduction), z-score normalization, and temporal window segmentation.
• Sequence Modeling: Translates continuous neural embeddings into discrete textual token sequences using sequence-to-sequence beam search.
• Evaluation: Rigorously benchmarked with BLEU scores (bilingual evaluation understudy) and loss convergence analysis.`
      },
      'pulsechat': {
        title: 'PulseChat - Real-Time Multi-User Client-Server System',
        citation: 'Source: Resume_2026.pdf (Section: Projects - P.1) | Tech: Python Sockets & SQLite',
        text: `PulseChat is a concurrent network application engineered from socket level:
• Socket Architecture: Built over TCP/IP socket primitives with custom packet serialization for low-latency transmission.
• Concurrency: Python multi-threading handles simultaneous bidirectional client sockets without blocking.
• Security & Database: SQLite backend stores encrypted credentials with secure hash authentication.
• User Experience: Custom graphical Tkinter interface with active user presence discovery and live room broadcast.`
      },
      'skills': {
        title: 'Praveen Kumar - Verified Technical Skills',
        citation: 'Source: CBIT AI/ML Department & Project Repositories',
        text: `Languages: Python (Advanced), SQL, JavaScript, HTML5, CSS3
AI & GenAI: LLMs, Retrieval-Augmented Generation (RAG), Prompt Engineering, NLP, SentenceTransformers, Vector Embeddings, Cosine Search
Deep Learning: PyTorch, TensorFlow, Keras, Scikit-learn, CNN, BiLSTM, Sequence Modeling, Computer Vision (OpenCV)
Frameworks: Flask, React JS, Tkinter, Client-Server Sockets, REST APIs
Databases: SQLite, SQL, Relational Schema Design
Core CS: Data Structures & Algorithms, OOP, Computer Networks, Operating Systems`
      },
      'hire': {
        title: 'Candidate Value Proposition: Why Hire Praveen Kumar?',
        citation: 'Source: Academic & Practical Engineering Profile | CBIT 2026',
        text: `Top reasons to recruit Praveen Kumar for your AI/ML or Software Engineering team:
1. Strong Theoretical Foundation: B.Tech in AI & ML from Chaitanya Bharathi Institute of Technology (CGPA: 7.11).
2. Practical Generative AI Expertise: Hands-on experience with modern LLMs (Qwen 2.5 Coder), vector search, and RAG pipelines.
3. Complex Neural Modeling: Proven ability to build hybrid neural networks (CNN-BiLSTM) for hard domains like brainwave signal processing.
4. Full-Stack Delivery: Not just a model trainer — builds the APIs (Flask), databases (SQLite), and interactive responsive web frontends.
5. High Curiosity & Adaptability: Constantly exploring next-generation AI architectures, 3D interfaces, and edge deployments.`
      },
      'contact': {
        title: 'Contact Transmission Channels',
        citation: 'Direct Channels',
        text: `• Email: praveenkumarpidamarthi01@gmail.com
• Phone: +91 8317668826
• GitHub: https://github.com/praveen-79
• LinkedIn: https://www.linkedin.com/in/praveen-kumar-pidamarthi-781b52299/
• Location: Hyderabad, Telangana, India`
      }
    };

    this.init();
  }

  init() {
    if (!this.formEl || !this.inputEl || !this.outputEl) return;

    this.formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const cmd = this.inputEl.value.trim();
      if (!cmd) return;
      this.inputEl.value = '';
      this.executeCommand(cmd);
    });

    // Arrow keys for history
    this.inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.inputEl.value = this.history[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.inputEl.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.inputEl.value = '';
        }
      }
    });

    // Chip clicks
    if (this.chipsContainer) {
      this.chipsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.chip-btn');
        if (!btn) return;
        const query = btn.getAttribute('data-query');
        if (query) {
          this.inputEl.value = query;
          this.executeCommand(query);
          if (window.cyberAudio) window.cyberAudio.playClick();
        }
      });
    }

    // Initial greeting
    this.printSystemMessage(`[SYSTEM READY] Praveen AI Neural Agent initialized.
Type "help" to see available commands or click quick prompts below.`);
  }

  printSystemMessage(text) {
    const line = document.createElement('div');
    line.className = 'term-line sys-line';
    line.innerHTML = `<span class="term-prompt">SYS //</span> <span class="term-text">${text}</span>`;
    this.outputEl.appendChild(line);
    this.scrollToBottom();
  }

  printUserMessage(text) {
    const line = document.createElement('div');
    line.className = 'term-line user-line';
    line.innerHTML = `<span class="term-prompt">GUEST &gt;</span> <span class="term-user-text">${this.escapeHTML(text)}</span>`;
    this.outputEl.appendChild(line);
    this.scrollToBottom();
  }

  async executeCommand(rawCmd) {
    if (this.isStreaming) return;
    this.history.push(rawCmd);
    this.historyIndex = this.history.length;

    this.printUserMessage(rawCmd);
    const cmd = rawCmd.toLowerCase().trim();

    if (cmd === 'clear') {
      this.outputEl.innerHTML = '';
      this.printSystemMessage(`Console cleared. Ready for queries.`);
      return;
    }

    if (cmd === 'help') {
      const helpText = `Available AI Terminal Commands:
• help           : Show this manual
• about          : Overview of Praveen Kumar
• rag            : Deep dive into RAG Chatbot & Qwen 2.5 Coder
• eeg            : Deep dive into EEG-to-Text CNN-BiLSTM system
• pulsechat      : Details on multi-user socket application
• skills         : Full list of AI, ML, Web & Core CS skills
• projects       : Summary of all major portfolio projects
• education      : CBIT degree, CGPA, and coursework
• hire           : Why Praveen is an exceptional hire
• contact        : Direct phone, email, and social handles
• matrix         : Trigger holographic digital rain
• clear          : Clear terminal screen`;
      this.streamOutput('TERMINAL MANUAL', 'System Commands Registry', helpText);
      return;
    }

    if (cmd === 'matrix') {
      this.triggerMatrixEffect();
      return;
    }

    if (cmd === 'projects') {
      const projText = `Praveen Kumar's Projects Roster:
1. Praveen Coding Asst & RAG Chatbot [Qwen 2.5 Coder 7B, SentenceTransformers, RAG, Flask]
2. EEG-to-Text Conversion System [PyTorch, CNN-BiLSTM, Brain-Computer Interface]
3. PulseChat [Python Sockets, Multi-threading, SQLite, Tkinter]
4. Personal Portfolio Website [Three.js, Minimalist Responsive Architecture]

Type any project name (e.g. "rag" or "eeg") for technical architecture deep dives.`;
      this.streamOutput('PROJECTS DIRECTORY', 'Source: Portfolio Database', projText);
      return;
    }

    if (cmd === 'about') {
      const aboutText = `Pidamarthi Praveen Kumar is an Artificial Intelligence and Machine Learning engineer who completed his B.Tech in Artificial Intelligence and Machine Learning at Chaitanya Bharathi Institute of Technology (CBIT, 2022–2026).
Passionate about engineering real-world intelligent systems that bridge cutting-edge deep learning research with robust, scalable web architectures.
Key focuses include Generative AI, Retrieval-Augmented Generation (RAG), Neural Sequence Modeling, and high-concurrency client-server systems.`;
      this.streamOutput('AGENT BIOGRAPHY', 'Source: CBIT AIML Profile', aboutText);
      return;
    }

    if (cmd === 'education') {
      const eduText = `Academic Credentials:
• Institution: Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad
• Degree: Bachelor of Technology (B.Tech)
• Specialization: Artificial Intelligence and Machine Learning
• Timeline: Nov 2022 – Aug 2026
• Current CGPA: 7.11

Relevant Coursework & Certifications:
• AI Foundation and Advanced (Indian School of Business - ISB)
• Machine Learning Foundation (ISB)
• Web Development (Internshala)
• Machine Learning (Udemy)`;
      this.streamOutput('ACADEMIC DOSSIER', 'Source: Academic Records', eduText);
      return;
    }

    // Check specific knowledge base keys or search phrases
    let matchedKey = null;
    if (cmd.includes('rag') || cmd.includes('coding asst') || cmd.includes('qwen') || cmd.includes('chatbot')) {
      matchedKey = 'rag';
    } else if (cmd.includes('eeg') || cmd.includes('brain') || cmd.includes('bilstm') || cmd.includes('neural')) {
      matchedKey = 'eeg';
    } else if (cmd.includes('pulse') || cmd.includes('chat') || cmd.includes('socket')) {
      matchedKey = 'pulsechat';
    } else if (cmd.includes('skill') || cmd.includes('tech') || cmd.includes('stack') || cmd.includes('language')) {
      matchedKey = 'skills';
    } else if (cmd.includes('hire') || cmd.includes('why') || cmd.includes('candidate') || cmd.includes('value')) {
      matchedKey = 'hire';
    } else if (cmd.includes('contact') || cmd.includes('email') || cmd.includes('phone') || cmd.includes('reach') || cmd.includes('github') || cmd.includes('linkedin')) {
      matchedKey = 'contact';
    }

    if (matchedKey && this.knowledge[matchedKey]) {
      const data = this.knowledge[matchedKey];
      this.streamOutput(data.title, data.citation, data.text);
    } else {
      // Natural fallback matching
      const defaultAnswer = `I retrieved relevant context for "${rawCmd}".
Praveen specializes in AI, Generative AI (LLMs/RAG), Deep Learning (CNN-BiLSTM), and Full-Stack Engineering (Python, Flask, JavaScript).
To see specifics, try running: "rag", "eeg", "skills", "projects", or "contact".`;
      this.streamOutput('QUERY RESPONSE', 'Semantic Inference (Qwen RAG Match)', defaultAnswer);
    }
  }

  async streamOutput(title, citation, fullText) {
    this.isStreaming = true;

    const block = document.createElement('div');
    block.className = 'term-response-block';

    const header = document.createElement('div');
    header.className = 'term-res-header';
    header.innerHTML = `
      <div class="term-res-title">⚡ ${title}</div>
      <div class="term-citation"><span class="cite-icon">🔗</span> ${citation}</div>
    `;
    block.appendChild(header);

    const body = document.createElement('div');
    body.className = 'term-res-body';
    block.appendChild(body);

    this.outputEl.appendChild(block);
    this.scrollToBottom();

    // Stream token-by-token (words)
    const words = fullText.split(' ');
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      // Format newlines
      const formatted = word.replace(/\n/g, '<br>');
      body.innerHTML += (i === 0 ? '' : ' ') + formatted;

      if (window.cyberAudio) {
        window.cyberAudio.playTyping();
      }

      this.scrollToBottom();
      await this.sleep(18); // Realistic streaming cadence
    }

    this.isStreaming = false;
  }

  triggerMatrixEffect() {
    this.printSystemMessage(`[CYBER PROTOCOL] Initializing neural cascade...`);
    if (window.cyber3D) {
      window.cyber3D.switchTabTheme('terminal');
    }
    const chars = '0101010101010101010101010101010101010101';
    let count = 0;
    const interval = setInterval(() => {
      count++;
      const randomLine = Array.from({ length: 45 }, () => (Math.random() > 0.5 ? '1' : '0')).join('');
      const line = document.createElement('div');
      line.className = 'term-line matrix-line';
      line.style.color = '#cbd5e1';
      line.textContent = randomLine;
      this.outputEl.appendChild(line);
      this.scrollToBottom();

      if (count > 10) {
        clearInterval(interval);
        this.printSystemMessage(`[SYSTEM RESTORED] Neural matrix synchronization complete.`);
      }
    }, 60);
  }

  escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  scrollToBottom() {
    this.outputEl.scrollTop = this.outputEl.scrollHeight;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.cyberTerminal = new CyberTerminal();
});
