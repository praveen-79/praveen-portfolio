/**
 * ThreeScene - Ultra-Minimalist Blackish-Gray Charcoal Ambient Depth
 * Clean, subtle, whisper-quiet 3D ambient space with smooth cursor parallax.
 * No bulky shapes, no heavy lines, no distractions.
 */

class Cyber3DScene {
  constructor() {
    this.container = document.getElementById('canvas-container');
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;

    // Ultra-minimal particle count (gentle ambient dust)
    this.particleCount = 140;
    this.particles = null;

    // Smooth subtle mouse physics
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scroll = { y: 0, targetY: 0 };

    this.init();
  }

  init() {
    if (typeof THREE === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene setup with charcoal fog
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x090b0e, 0.003);

    // 2. Camera setup
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 150);

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0); // Transparent to show plain charcoal CSS gradient
    this.container.appendChild(this.renderer.domElement);

    // 4. Subtle ambient lighting
    const ambientLight = new THREE.AmbientLight(0x222630, 1.0);
    this.scene.add(ambientLight);

    // 5. Construct Subtle Ambient Dust
    this.createMinimalParticles();

    // 6. Bind events
    this.bindEvents();

    // 7. Start render loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  createMinimalParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.particleCount * 3);
    const colors = new Float32Array(this.particleCount * 3);

    const softCharcoalWhite = new THREE.Color(0xd1d5db);

    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 320;
      positions[i3 + 1] = (Math.random() - 0.5) * 220;
      positions[i3 + 2] = (Math.random() - 0.5) * 180;

      colors[i3] = softCharcoalWhite.r;
      colors[i3 + 1] = softCharcoalWhite.g;
      colors[i3 + 2] = softCharcoalWhite.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Simple smooth round dot
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(0.5, 'rgba(180, 190, 205, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 2.2,
      map: texture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.35
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  bindEvents() {
    window.addEventListener('pointermove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    }, { passive: true });

    window.addEventListener('scroll', () => {
      this.scroll.targetY = window.scrollY;
    }, { passive: true });

    window.addEventListener('resize', () => {
      if (!this.camera || !this.renderer) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });
  }

  switchTabTheme(tabId) {
    // Subtle smooth camera nudge on tab change
    this.camera.position.z = 142;
    setTimeout(() => {
      if (this.camera) this.camera.position.z = 150;
    }, 300);
  }

  animate() {
    requestAnimationFrame(this.animate);

    // Smooth gentle interpolation
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.04;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.04;
    this.scroll.y += (this.scroll.targetY - this.scroll.y) * 0.08;

    // Subtle 3D camera parallax
    this.camera.position.x = this.mouse.x * 6;
    this.camera.position.y = this.mouse.y * 5 - (this.scroll.y * 0.015);
    this.camera.lookAt(0, -this.scroll.y * 0.015, 0);

    // Very slow drift
    if (this.particles) {
      this.particles.rotation.y += 0.0003;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.cyber3D = new Cyber3DScene();
});
