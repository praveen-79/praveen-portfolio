/**
 * Audio disabled per user preference.
 * Silent no-op module to prevent any errors.
 */
class SilentAudioEngine {
  constructor() {
    this.enabled = false;
  }
  init() {}
  toggle() { return false; }
  isEnabled() { return false; }
  playHover() {}
  playClick() {}
  playWarp() {}
  playTyping() {}
  playSuccess() {}
  playModalOpen() {}
}

window.cyberAudio = new SilentAudioEngine();
