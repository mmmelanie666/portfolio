/**
 * Zero-latency click sound player backed by `/sounds/mouse-click.wav`
 * (the second mouse click extracted from `computer-mouse-clicks.mp3`).
 */

const CLICK_SOUND_URL = '/sounds/mouse-click.wav';

let sharedCtx: AudioContext | null = null;
let rawSoundBytes: ArrayBuffer | null = null;
let fetchPromise: Promise<ArrayBuffer | null> | null = null;
let decodedSoundBuffer: AudioBuffer | null = null;
let decodePromise: Promise<AudioBuffer | null> | null = null;

function ensureSoundPrefetched(): Promise<ArrayBuffer | null> {
  if (rawSoundBytes) return Promise.resolve(rawSoundBytes);
  if (typeof window === 'undefined' || typeof fetch === 'undefined') {
    return Promise.resolve(null);
  }
  if (!fetchPromise) {
    fetchPromise = fetch(CLICK_SOUND_URL)
      .then((res) => (res.ok ? res.arrayBuffer() : null))
      .then((buf) => {
        if (buf) rawSoundBytes = buf;
        return buf;
      })
      .catch(() => null);
  }
  return fetchPromise;
}

if (typeof window !== 'undefined') {
  void ensureSoundPrefetched();
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!sharedCtx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      sharedCtx = new AudioCtx();
    }
    if (sharedCtx.state === 'suspended') {
      void sharedCtx.resume().catch(() => {});
    }
    return sharedCtx;
  } catch {
    return null;
  }
}

function playDecodedBuffer(ctx: AudioContext, buffer: AudioBuffer, gainValue: number): void {
  try {
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.playbackRate.value = 1.0;

    const gain = ctx.createGain();
    gain.gain.value = gainValue;

    src.connect(gain);
    gain.connect(ctx.destination);
    src.start(0);
  } catch {
    // Ignore playback errors in restricted audio contexts
  }
}

function playFallbackHtmlAudio(gainValue: number): void {
  if (typeof Audio === 'undefined') return;
  try {
    const el = new Audio(CLICK_SOUND_URL);
    el.volume = Math.max(0, Math.min(1, gainValue));
    void el.play().catch(() => {});
  } catch {
    // Ignore fallback playback errors
  }
}

function triggerClickSound(gainValue: number): void {
  const ctx = getAudioContext();
  if (!ctx) {
    playFallbackHtmlAudio(gainValue);
    return;
  }

  if (decodedSoundBuffer) {
    playDecodedBuffer(ctx, decodedSoundBuffer, gainValue);
    return;
  }

  if (!decodePromise) {
    decodePromise = ensureSoundPrefetched()
      .then(async (bytes) => {
        if (!bytes) return null;
        try {
          const decoded = await ctx.decodeAudioData(bytes.slice(0));
          decodedSoundBuffer = decoded;
          return decoded;
        } catch {
          return null;
        }
      })
      .catch(() => null)
      .finally(() => {
        decodePromise = null;
      });
  }

  void decodePromise.then((buffer) => {
    if (buffer) {
      playDecodedBuffer(ctx, buffer, gainValue);
    } else {
      playFallbackHtmlAudio(gainValue);
    }
  });
}

/** Plays the recorded mouse click for Win98 UI controls. */
export function playMouseClick(): void {
  triggerClickSound(0.82);
}

/** Plays the recorded click slightly firmer for physical CRT/desk controls. */
export function playHardwareClick(): void {
  triggerClickSound(0.95);
}

/** Triggers the matching click sound when an enabled interactive element is activated. */
export function handleInteractiveClickSound(target: EventTarget | null): void {
  const el = (target as HTMLElement | null)?.closest(
    'button, [role="button"], a, input[type="radio"], input[type="checkbox"], label'
  ) as HTMLElement | null;
  if (!el) return;

  if (
    (el as { disabled?: boolean }).disabled ||
    el.getAttribute('aria-disabled') === 'true'
  ) {
    return;
  }

  if (el.closest('[data-click-sound="hardware"]')) {
    playHardwareClick();
  } else {
    playMouseClick();
  }
}
