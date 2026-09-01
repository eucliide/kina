/**
 * Subtle audio feedback for meeting timer checkpoints.
 * Uses Web Audio API for precise, non-intrusive chimes.
 */

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

/**
 * Play a gentle chime sound at 1-minute warning (60s remaining).
 * Single tone: subtle notification without being jarring.
 */
export function playWarningSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Create oscillator for a soft, bell-like tone
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Warm, mid-range frequency (C6 note)
    oscillator.frequency.value = 1046.5;
    oscillator.type = 'sine';

    // Gentle envelope: fade in and out
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

    oscillator.start(now);
    oscillator.stop(now + 0.8);
  } catch (error) {
    console.warn('Warning sound failed:', error);
  }
}

/**
 * Play a subtle countdown chime at 10s remaining.
 * Slightly higher pitch to indicate urgency without alarm.
 */
export function playCountdownSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Create oscillator for a clear, higher tone
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Higher frequency for attention (E6 note)
    oscillator.frequency.value = 1318.5;
    oscillator.type = 'sine';

    // Quick, present envelope
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.18, now + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

    oscillator.start(now);
    oscillator.stop(now + 0.5);
  } catch (error) {
    console.warn('Countdown sound failed:', error);
  }
}
