import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import {
  heroContent,
  advantages,
  services,
  processSteps,
  cases,
  footerContent,
  type CaseItem,
} from '@/data/content';
import { handleInteractiveClickSound } from '@/utils/retroSound';
import {
  WinFlagIcon,
  PixelMinimizeGlyph,
  PixelMaximizeGlyph,
  PixelCloseGlyph,
  PixelHelpGlyph,
  PixelArrowRightGlyph,
  TraySpeakerIcon,
  PixelSmileyIcon,
  PixelMineIcon,
  PixelShutdownIcon,
  PixelMinesweeperMenuIcon,
  PixelTelegramIcon,
  PixelThreadsIcon,
  PixelInstagramIcon,
  PixelBehanceIcon,
  PixelPinterestIcon,
  PixelAdvExperienceIcon,
  PixelAdvFlexIcon,
  PixelAdvProcessIcon,
  PixelAdvFocusIcon,
  PixelAdvAdaptiveIcon,
  PixelAdvCodeIcon,
  PixelAdvAiIcon,
} from '@/components/win98/Win98Icons';

const ADVANTAGE_ICONS = [
  PixelAdvExperienceIcon,
  PixelAdvFlexIcon,
  PixelAdvProcessIcon,
  PixelAdvFocusIcon,
  PixelAdvAdaptiveIcon,
  PixelAdvCodeIcon,
  PixelAdvAiIcon,
];

type WindowId =
  | 'about'
  | 'cases'
  | 'services'
  | 'process'
  | 'contacts'
  | 'trash'
  | 'minesweeper'
  | 'shutdown';

interface WinState {
  id: WindowId;
  title: string;
  iconSrc?: string;
  iconType?: 'flag' | 'shutdown' | 'minesweeper';
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  dxPx: number;
  dyPx: number;
}

const VIRTUAL_CRT_WIDTH = 460;
const VIRTUAL_CRT_HEIGHT = 360;

const SERVICE_ICONS = [
  '/images/win98/motif/service-multipage.png',
  '/images/win98/motif/service-landing.png',
  '/images/win98/motif/service-shop.png',
  '/images/win98/motif/service-branding.png',
] as const;

const PROCESS_STEP_ICONS = [
  '/images/win98/motif/step-01-brief.png',
  '/images/win98/motif/step-02-ux.png',
  '/images/win98/motif/step-03-concept.png',
  '/images/win98/motif/step-04-prototype.png',
  '/images/win98/motif/step-05-launch.png',
] as const;

const INITIAL_WINDOWS: Record<WindowId, WinState> = {
  about: {
    id: 'about',
    title: 'Свойства: Мелана Ваниосова',
    iconSrc: '/images/win98/my-computer.png?v=motif2',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 12,
    dxPx: 0,
    dyPx: 0,
  },
  cases: {
    id: 'cases',
    title: 'C:\\Мои_кейсы',
    iconSrc: '/images/win98/folder.png?v=motif2',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 11,
    dxPx: 0,
    dyPx: 0,
  },
  services: {
    id: 'services',
    title: 'Услуги',
    iconSrc: '/images/win98/motif/services-main.png',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 13,
    dxPx: 0,
    dyPx: 0,
  },
  process: {
    id: 'process',
    title: 'Этапы работы — 5 шагов',
    iconSrc: '/images/win98/motif/process-main.png',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 14,
    dxPx: 0,
    dyPx: 0,
  },
  contacts: {
    id: 'contacts',
    title: 'Контакты',
    iconSrc: '/images/win98/internet-globe.png?v=motif2',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 15,
    dxPx: 0,
    dyPx: 0,
  },
  trash: {
    id: 'trash',
    title: 'Корзина',
    iconSrc: '/images/win98/recycle-bin.png?v=motif2',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 16,
    dxPx: 0,
    dyPx: 0,
  },
  minesweeper: {
    id: 'minesweeper',
    title: 'Сапёр',
    iconType: 'minesweeper',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 18,
    dxPx: 0,
    dyPx: 0,
  },
  shutdown: {
    id: 'shutdown',
    title: 'Завершение работы fifows18',
    iconType: 'shutdown',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 19,
    dxPx: 0,
    dyPx: 0,
  },
};

const DESKTOP_ICONS: { id: WindowId; label: string; iconSrc: string }[] = [
  { id: 'about', label: 'Обо мне', iconSrc: '/images/win98/my-computer.png?v=motif2' },
  { id: 'cases', label: 'Мои кейсы', iconSrc: '/images/win98/folder.png?v=motif2' },
  { id: 'trash', label: 'Корзина', iconSrc: '/images/win98/recycle-bin.png?v=motif2' },
];

const COMPACT_DESKTOP_ICONS: { id: WindowId; label: string; iconSrc: string }[] = [
  { id: 'about', label: 'Обо мне', iconSrc: '/images/win98/my-computer.png?v=motif2' },
  { id: 'cases', label: 'Кейсы', iconSrc: '/images/win98/folder.png?v=motif2' },
  { id: 'services', label: 'Услуги', iconSrc: '/images/win98/motif/services-main.png' },
  { id: 'process', label: 'Этапы', iconSrc: '/images/win98/motif/process-main.png' },
  { id: 'contacts', label: 'Контакты', iconSrc: '/images/win98/internet-globe.png?v=motif2' },
  { id: 'trash', label: 'Корзина', iconSrc: '/images/win98/recycle-bin.png?v=motif2' },
];

const TOP_BEZEL_BUTTONS: {
  id: WindowId;
  label: string;
  leftPct: string;
  pressedSrc: string;
}[] = [
  {
    id: 'about',
    label: 'Обо мне',
    leftPct: '37.4704%',
    pressedSrc: '/images/v11-pressed-about.png',
  },
  {
    id: 'cases',
    label: 'Кейсы',
    leftPct: '42.4467%',
    pressedSrc: '/images/v11-pressed-cases.png',
  },
  {
    id: 'services',
    label: 'Услуги',
    leftPct: '47.4230%',
    pressedSrc: '/images/v11-pressed-services.png',
  },
  {
    id: 'process',
    label: 'Этапы',
    leftPct: '52.3993%',
    pressedSrc: '/images/v11-pressed-process.png',
  },
  {
    id: 'contacts',
    label: 'Контакты',
    leftPct: '57.3756%',
    pressedSrc: '/images/v11-pressed-contacts.png',
  },
];

interface MineCell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacent: number;
}

function createMineBoard(rows = 8, cols = 8, mines = 10): MineCell[][] {
  const board: MineCell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacent: 0,
    }))
  );
  let placed = 0;
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!board[r][c].isMine) {
      board[r][c].isMine = true;
      placed++;
    }
  }
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].isMine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].isMine) {
            count++;
          }
        }
      }
      board[r][c].adjacent = count;
    }
  }
  return board;
}

const MINE_COLORS: Record<number, string> = {
  1: '#0000ff',
  2: '#008000',
  3: '#ff0000',
  4: '#000080',
  5: '#800000',
  6: '#008080',
  7: '#000000',
  8: '#808080',
};

let cachedDesktopWallpaper: HTMLImageElement | null = null;

function smooth(e0: number, e1: number, v: number): number {
  if (e1 <= e0) return v >= e1 ? 1 : 0;
  const t = Math.max(0, Math.min(1, (v - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

function loadDesktopWallpaper(onReady: (img: HTMLImageElement) => void): void {
  if (
    cachedDesktopWallpaper &&
    cachedDesktopWallpaper.complete &&
    cachedDesktopWallpaper.naturalWidth > 0
  ) {
    onReady(cachedDesktopWallpaper);
    return;
  }
  const img = cachedDesktopWallpaper ?? new Image();
  img.crossOrigin = 'anonymous';
  const handleLoad = () => {
    if (img.naturalWidth > 0) onReady(img);
  };
  const handleError = () => {
    if (cachedDesktopWallpaper === img) cachedDesktopWallpaper = null;
  };
  img.addEventListener('load', handleLoad, { once: true });
  img.addEventListener('error', handleError, { once: true });
  if (!cachedDesktopWallpaper) {
    cachedDesktopWallpaper = img;
    img.src = '/images/desktop-wallpaper-dog.jpg';
  }
}

export const RetroComputerV2: React.FC<{ onSwitchVersion: () => void }> = ({
  onSwitchVersion,
}) => {
  const [windows, setWindows] = useState<Record<WindowId, WinState>>(INITIAL_WINDOWS);
  const [topZ, setTopZ] = useState(25);
  const [selectedIcon, setSelectedIcon] = useState<WindowId | null>(null);

  const [startOpen, setStartOpen] = useState(false);
  const [startSubmenu, setStartSubmenu] = useState<'programs' | 'documents' | null>(null);

  const [powerOn, setPowerOn] = useState(true);
  const [shuttingDown, setShuttingDown] = useState(false);
  const [turningOn, setTurningOn] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootDone, setBootDone] = useState(false);
  const [bootFading, setBootFading] = useState(false);
  const [clock, setClock] = useState('01:05');

  const [previewCase, setPreviewCase] = useState<CaseItem | null>(null);
  const [stickyZoomed, setStickyZoomed] = useState(false);

  const [servicesTab, setServicesTab] = useState<number>(0);
  const [processIdx, setProcessIdx] = useState<number>(0);
  const [contractChecked, setContractChecked] = useState(true);
  const [trashEmptied, setTrashEmptied] = useState(false);
  const [shutdownAction, setShutdownAction] = useState<'off' | 'siteV1'>('off');

  const [mineBoard, setMineBoard] = useState<MineCell[][]>(() => createMineBoard());
  const [mineStatus, setMineStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [mineTimer, setMineTimer] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const screenContainerRef = useRef<HTMLDivElement | null>(null);
  const workspaceRef = useRef<HTMLDivElement | null>(null);
  const dustCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fishbowlVideoRef = useRef<HTMLVideoElement | null>(null);
  const sceneContainerRef = useRef<HTMLDivElement | null>(null);
  const turnOnTimerRef = useRef<number | null>(null);
  const shutdownTimerRef = useRef<number | null>(null);
  const [crtScale, setCrtScale] = useState<{ x: number; y: number }>({ x: 1, y: 1 });
  const crtScaleRef = useRef<{ x: number; y: number }>({ x: 1, y: 1 });
  crtScaleRef.current = crtScale;
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 1031px)').matches : false
  );
  const [isMonitorOnly, setIsMonitorOnly] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? window.innerWidth >= 1032 &&
        (window.innerWidth < 1360 ||
          window.innerWidth / Math.max(1, window.innerHeight) < 1.38)
      : false
  );
  const [isWideCompact, setIsWideCompact] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? window.innerWidth < 1032 && window.innerWidth / Math.max(1, window.innerHeight) > 0.92
      : false
  );

  useEffect(() => {
    const updateCompactLayout = () => {
      const mobile = window.innerWidth < 1032;
      setIsMobile(mobile);
      setIsMonitorOnly(
        !mobile &&
          (window.innerWidth < 1360 ||
            window.innerWidth / Math.max(1, window.innerHeight) < 1.38)
      );
      setIsWideCompact(
        mobile && window.innerWidth / Math.max(1, window.innerHeight) > 0.92
      );
    };
    updateCompactLayout();
    const mql = window.matchMedia('(max-width: 1031px)');
    mql.addEventListener('change', updateCompactLayout);
    window.addEventListener('resize', updateCompactLayout);
    return () => {
      mql.removeEventListener('change', updateCompactLayout);
      window.removeEventListener('resize', updateCompactLayout);
    };
  }, []);

  const powerOnMonitor = () => {
    if (shutdownTimerRef.current !== null) {
      window.clearTimeout(shutdownTimerRef.current);
      shutdownTimerRef.current = null;
    }
    if (turnOnTimerRef.current !== null) {
      window.clearTimeout(turnOnTimerRef.current);
      turnOnTimerRef.current = null;
    }
    setShuttingDown(false);
    setPowerOn(true);
    setTurningOn(true);
    turnOnTimerRef.current = window.setTimeout(() => {
      setTurningOn(false);
      turnOnTimerRef.current = null;
    }, 680);
  };

  useEffect(() => {
    return () => {
      if (turnOnTimerRef.current !== null) window.clearTimeout(turnOnTimerRef.current);
      if (shutdownTimerRef.current !== null) window.clearTimeout(shutdownTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!stickyZoomed) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setStickyZoomed(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [stickyZoomed]);

  // Site asset preloader with smooth 20-segment green terminal progress
  useEffect(() => {
    let cancelled = false;
    const mobileBoot = window.matchMedia('(max-width: 1031px)').matches;
    const monitorOnlyBoot =
      !mobileBoot &&
      (window.innerWidth < 1360 ||
        window.innerWidth / Math.max(1, window.innerHeight) < 1.38);
    const coreMotifIcons = [
      '/images/win98/my-computer.png?v=motif2',
      '/images/win98/folder.png?v=motif2',
      '/images/win98/cdrom.png?v=motif2',
      '/images/win98/hourglass.png?v=motif2',
      '/images/win98/internet-globe.png?v=motif2',
      '/images/win98/recycle-bin.png?v=motif2',
      '/images/win98/motif/start-flag.png',
      '/images/win98/motif/tray-speaker.png',
      '/images/win98/motif/settings.png',
      '/images/win98/motif/shutdown.png',
      '/images/win98/motif/minesweeper.png',
      '/images/win98/motif/services-main.png',
      '/images/win98/motif/process-main.png',
      ...SERVICE_ICONS,
      ...PROCESS_STEP_ICONS,
    ];
    const assets = mobileBoot
      ? ['/images/desktop-wallpaper-dog.jpg', ...coreMotifIcons]
      : [
          monitorOnlyBoot ? '/images/hero-room-v17.jpg' : '/images/hero-room-v16.jpg',
          '/images/desktop-wallpaper-dog.jpg',
          '/images/hero-room-v7-bezel.png',
          '/images/hero-room-v7-glare.jpg',
          monitorOnlyBoot ? '/images/v17-nokia-hover.png' : '/images/v12-nokia-hover.png',
          '/images/v14-fishbowl-front-glare.png',
          '/images/v18-fishbowl-poster.jpg',
          '/images/v18-fishbowl-video-mask.png',
          '/images/v13-monitor-left-occluder.png',
          '/images/v11-pressed-about.png',
          '/images/v11-pressed-cases.png',
          '/images/v11-pressed-services.png',
          '/images/v11-pressed-process.png',
          '/images/v11-pressed-contacts.png',
          '/images/v16-hover-order.png',
          '/images/v16-pressed-order.png',
          '/images/v16-sticky-note.png',
          '/images/v16-call-phone-sticker.png',
          ...coreMotifIcons,
        ];
    const rampDuration = mobileBoot ? 520 : 920;
    let loadedCount = 0;
    const startTime = performance.now();
    let fadeTimer: number | null = null;
    let doneTimer: number | null = null;

    const markLoaded = () => {
      loadedCount += 1;
    };

    assets.forEach((src) => {
      const img = new Image();
      img.onload = markLoaded;
      img.onerror = markLoaded;
      img.src = src;
    });

    const interval = window.setInterval(() => {
      if (cancelled) return;
      const elapsed = performance.now() - startTime;
      const ramp = Math.min(100, Math.round((elapsed / rampDuration) * 100));
      const assetPct = Math.round((loadedCount / assets.length) * 100);
      const timedOut = elapsed >= 4200;
      const next = timedOut
        ? 100
        : loadedCount >= assets.length
        ? ramp
        : Math.min(ramp, Math.max(10, assetPct));

      setBootProgress(next);

      if ((loadedCount >= assets.length && ramp >= 100) || timedOut) {
        window.clearInterval(interval);
        setBootProgress(100);
        fadeTimer = window.setTimeout(() => {
          if (cancelled) return;
          setBootFading(true);
          powerOnMonitor();
          doneTimer = window.setTimeout(() => {
            if (!cancelled) setBootDone(true);
          }, 300);
        }, 160);
      }
    }, 28);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      if (fadeTimer !== null) window.clearTimeout(fadeTimer);
      if (doneTimer !== null) window.clearTimeout(doneTimer);
    };
  }, []);

  // Volumetric tungsten light floating dust motes (attenuated over CRT screen)
  useEffect(() => {
    if (isMobile) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const canvas = dustCanvasRef.current;
    const container = sceneContainerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let width = 0;
    let height = 0;

    const syncSize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const nextW = Math.min(960, Math.round(rect.width * 0.65));
      const nextH = Math.max(1, Math.round(nextW * (rect.height / rect.width)));
      width = nextW;
      height = nextH;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    syncSize();
    const ro = new ResizeObserver(syncSize);
    ro.observe(container);

    interface DustMote {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      baseAlpha: number;
      phase: number;
      freq: number;
      bokeh: boolean;
    }

    const motes: DustMote[] = Array.from({ length: 30 }, (_, i) => {
      const bokeh = i >= 22;
      const inBeam = i < 24;
      return {
        x: inBeam ? 0.03 + Math.random() * 0.42 : 0.02 + Math.random() * 0.92,
        y: inBeam ? 0.08 + Math.random() * 0.62 : 0.06 + Math.random() * 0.86,
        vx: (Math.random() - 0.35) * 0.000018,
        vy: -(0.000008 + Math.random() * 0.00002),
        r: bokeh ? 3.0 + Math.random() * 1.6 : 1.0 + Math.random() * 0.9,
        baseAlpha: bokeh ? 0.08 + Math.random() * 0.07 : 0.22 + Math.random() * 0.2,
        phase: Math.random() * Math.PI * 2,
        freq: 0.35 + Math.random() * 0.65,
        bokeh,
      };
    });

    const MIN_DUST_FRAME_MS = 40;
    let lastTime = performance.now();
    const renderFrame = (now: number) => {
      if (document.hidden) {
        rafId = 0;
        return;
      }
      if (now - lastTime < MIN_DUST_FRAME_MS) {
        rafId = window.requestAnimationFrame(renderFrame);
        return;
      }
      const dt = Math.min(80, now - lastTime);
      lastTime = now;

      if (width > 0 && height > 0) {
        ctx.clearRect(0, 0, width, height);
        const t = now * 0.001;
        const pxScale = width / 960;

        // Localized filament shimmer synced strictly near brass lamp bulb (9s loop)
        const cycle = (t % 9) / 9;
        let lampPulse = 1;
        if (cycle > 0.42 && cycle < 0.52) lampPulse = 0.55;
        else if (cycle > 0.85 && cycle < 0.91) lampPulse = 0.68;

        for (let i = 0; i < motes.length; i += 1) {
          const m = motes[i];
          m.x += m.vx * dt + Math.sin(t * m.freq + m.phase) * 0.000014 * dt;
          m.y += m.vy * dt + Math.cos(t * m.freq * 0.8 + m.phase) * 0.000009 * dt;

          if (m.y < 0.04) m.y = 0.94;
          if (m.y > 0.96) m.y = 0.06;
          if (m.x < 0.01) m.x = 0.97;
          if (m.x > 0.98) m.x = 0.02;

          // Keep Win98 CRT screen area 100% clear of dust particles
          const inCrtX =
            smooth(0.345, 0.365, m.x) * (1 - smooth(0.635, 0.652, m.x));
          const inCrtY =
            smooth(0.235, 0.255, m.y) * (1 - smooth(0.638, 0.656, m.y));
          const crtMask = 1 - inCrtX * inCrtY;
          if (crtMask <= 0.02) continue;

          // Warm illumination boost near the left brass lamp beam
          const dx = m.x - 0.09;
          const dy = m.y - 0.295;
          const dist = Math.hypot(dx * 1.05, dy * 0.85);
          const beamBoost = 0.42 + 0.58 * Math.max(0, 1 - dist / 0.72);
          const localFlicker = dist < 0.2 ? lampPulse * (1 - dist / 0.2) + dist / 0.2 : 1;

          const twinkle = 0.66 + 0.34 * Math.sin(t * (0.95 + m.freq) + m.phase);
          const alpha = m.baseAlpha * beamBoost * twinkle * crtMask * localFlicker;
          if (alpha <= 0.02) continue;

          const px = m.x * width;
          const py = m.y * height;
          const rad = m.r * pxScale;

          if (m.bokeh) {
            const g = ctx.createRadialGradient(px, py, 0, px, py, rad * 2.0);
            g.addColorStop(0, `rgba(255, 236, 188, ${(alpha * 0.55).toFixed(3)})`);
            g.addColorStop(0.5, `rgba(255, 218, 154, ${(alpha * 0.22).toFixed(3)})`);
            g.addColorStop(1, 'rgba(255, 214, 145, 0)');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(px, py, rad * 2.0, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = `rgba(255, 224, 162, ${(alpha * 0.16).toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(px, py, rad * 1.9, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = `rgba(255, 244, 214, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(px, py, rad, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      rafId = window.requestAnimationFrame(renderFrame);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = 0;
        }
      } else if (!rafId) {
        lastTime = performance.now();
        rafId = window.requestAnimationFrame(renderFrame);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    if (!document.hidden) {
      rafId = window.requestAnimationFrame(renderFrame);
    }
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      document.removeEventListener('visibilitychange', handleVisibility);
      ro.disconnect();
    };
  }, [isMobile]);

  // Seamless blinking & swimming fishbowl video loop (pause when tab is hidden)
  useEffect(() => {
    if (isMobile) return;
    const video = fishbowlVideoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.play().catch(() => {});
    };

    tryPlay();

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else {
        tryPlay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isMobile]);
  const dragStateRef = useRef<{
    id: WindowId;
    pointerId: number;
    isMobile: boolean;
    startX: number;
    startY: number;
    origDxPx: number;
    origDyPx: number;
    minDx: number;
    maxDx: number;
    minDy: number;
    maxDy: number;
  } | null>(null);

  useLayoutEffect(() => {
    if (isMobile) return;
    const el = screenContainerRef.current;
    if (!el) return;
    const updateScale = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w > 0 && h > 0) {
        const nextX = w / VIRTUAL_CRT_WIDTH;
        const nextY = h / VIRTUAL_CRT_HEIGHT;
        setCrtScale((prev) =>
          Math.abs(prev.x - nextX) < 0.002 && Math.abs(prev.y - nextY) < 0.002
            ? prev
            : { x: nextX, y: nextY }
        );
      }
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    ro.observe(document.documentElement);
    window.addEventListener('resize', updateScale);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, [isMobile]);

  useLayoutEffect(() => {
    if (isMobile) return;
    const el = screenContainerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (w > 0 && h > 0) {
      const nextX = w / VIRTUAL_CRT_WIDTH;
      const nextY = h / VIRTUAL_CRT_HEIGHT;
      if (Math.abs(crtScale.x - nextX) >= 0.002 || Math.abs(crtScale.y - nextY) >= 0.002) {
        setCrtScale({ x: nextX, y: nextY });
      }
    }
  });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClock(
        now.toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 15000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!windows.minesweeper.isOpen || windows.minesweeper.isMinimized || mineStatus !== 'playing') {
      return;
    }
    const timer = setInterval(() => {
      setMineTimer((prev) => Math.min(999, prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [windows.minesweeper.isOpen, windows.minesweeper.isMinimized, mineStatus]);

  const renderPhotoToCanvas = (
    canvas: HTMLCanvasElement | null,
    widthPx: number,
    aspectRatio = 4 / 3,
    xBias = 0.5
  ) => {
    if (!canvas) return;
    loadDesktopWallpaper((img) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = widthPx;
      const h = Math.round(w / aspectRatio);
      canvas.width = w;
      canvas.height = h;
      canvas.dataset.renderedMode = `halftone-${aspectRatio.toFixed(2)}`;

      const imgRatio = img.width / img.height;
      const targetRatio = w / h;
      let sx = 0;
      let sy = 0;
      let sw = img.width;
      let sh = img.height;

      if (imgRatio > targetRatio) {
        sw = img.height * targetRatio;
        sx = (img.width - sw) * xBias;
      } else {
        sh = img.width / targetRatio;
        sy = (img.height - sh) * 0.27;
      }

      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);

      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      const bayer = [
        [0, 8, 2, 10],
        [12, 4, 14, 6],
        [3, 11, 1, 9],
        [15, 7, 13, 5],
      ];

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          const threshold = (bayer[y % 4][x % 4] / 16 - 0.5) * 38;

          const dr = Math.max(0, Math.min(255, r + threshold * 0.55));
          const dg = Math.max(0, Math.min(255, g + threshold * 0.55));
          const db = Math.max(0, Math.min(255, b + threshold * 0.55));
          data[i] = Math.round((dr * 0.74 + lum * 0.12) / 12) * 12;
          data[i + 1] = Math.min(255, Math.round((dg * 0.86 + lum * 0.2 + 10) / 12) * 12);
          data[i + 2] = Math.round((db * 0.78 + lum * 0.16 + 8) / 12) * 12;
        }
      }
      ctx.putImageData(imgData, 0, 0);
    });
  };

  const getWallpaperRenderParams = () => {
    const aspectRatio = !isMobile ? 4 / 3 : isWideCompact ? 1.18 : 0.68;
    const xBias = !isMobile ? 0.5 : isWideCompact ? 0.56 : 0.64;
    const targetW = !isMobile ? 300 : isWideCompact ? 300 : 270;
    return {
      targetW,
      aspectRatio,
      xBias,
      expectedKey: `halftone-${aspectRatio.toFixed(2)}`,
    };
  };

  useEffect(() => {
    if (!powerOn) return;
    const { targetW, aspectRatio, xBias } = getWallpaperRenderParams();
    renderPhotoToCanvas(canvasRef.current, targetW, aspectRatio, xBias);
  }, [powerOn, isMobile, isWideCompact]);

  // Recover blank canvas immediately after Vite HMR, power toggle, or viewport breakpoint switch
  useLayoutEffect(() => {
    const c = canvasRef.current;
    const { targetW, aspectRatio, xBias, expectedKey } = getWallpaperRenderParams();
    if (powerOn && c && (c.width === 0 || c.dataset.renderedMode !== expectedKey)) {
      renderPhotoToCanvas(c, targetW, aspectRatio, xBias);
    }
  });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const drag = dragStateRef.current;
      if (!drag || e.pointerId !== drag.pointerId) return;

      const scaleX = drag.isMobile ? 1 : Math.max(0.2, crtScaleRef.current.x);
      const scaleY = drag.isMobile ? 1 : Math.max(0.2, crtScaleRef.current.y);
      const dx = (e.clientX - drag.startX) / scaleX;
      const dy = (e.clientY - drag.startY) / scaleY;

      setWindows((prev) => {
        const w = prev[drag.id];
        if (!w || w.isMaximized) return prev;
        const clampedDx = Math.round(Math.max(drag.minDx, Math.min(drag.maxDx, drag.origDxPx + dx)));
        const clampedDy = Math.round(Math.max(drag.minDy, Math.min(drag.maxDy, drag.origDyPx + dy)));
        if (w.dxPx === clampedDx && w.dyPx === clampedDy) return prev;
        return {
          ...prev,
          [drag.id]: {
            ...w,
            dxPx: clampedDx,
            dyPx: clampedDy,
          },
        };
      });
    };

    const handlePointerEnd = (e: PointerEvent) => {
      if (dragStateRef.current?.pointerId === e.pointerId) {
        dragStateRef.current = null;
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerEnd);
    window.addEventListener('pointercancel', handlePointerEnd);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerEnd);
      window.removeEventListener('pointercancel', handlePointerEnd);
    };
  }, []);

  // Single-Window Rule: opening any window closes all other open windows automatically
  const openWindow = (id: WindowId) => {
    if (!powerOn) {
      powerOnMonitor();
    } else {
      setShuttingDown(false);
    }
    const nextZ = ((topZ - 19) % 50) + 20;
    setTopZ(nextZ);
    setStartOpen(false);
    setStartSubmenu(null);
    setWindows((prev) => {
      const next = { ...prev };
      (Object.keys(next) as WindowId[]).forEach((k) => {
        next[k] = {
          ...next[k],
          isOpen: k === id,
          isMinimized: k === id ? false : next[k].isMinimized,
          isMaximized: k === id ? false : next[k].isMaximized,
          dxPx: k === id ? 0 : next[k].dxPx,
          dyPx: k === id ? 0 : next[k].dyPx,
          zIndex: k === id ? nextZ : next[k].zIndex,
        };
      });
      return next;
    });
  };

  const closeWindow = (id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
      },
    }));
  };

  const minimizeWindow = (id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true,
      },
    }));
  };

  const toggleMaximizeWindow = (id: WindowId) => {
    const nextZ = ((topZ - 19) % 50) + 20;
    setTopZ(nextZ);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized,
        zIndex: nextZ,
      },
    }));
  };

  const focusWindow = (id: WindowId) => {
    const nextZ = ((topZ - 19) % 50) + 20;
    setTopZ(nextZ);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: false,
        zIndex: nextZ,
      },
    }));
  };

  const resetMinesweeper = () => {
    setMineBoard(createMineBoard());
    setMineStatus('playing');
    setMineTimer(0);
  };

  const revealMineCell = (r: number, c: number) => {
    if (mineStatus !== 'playing') return;
    if (mineBoard[r][c].isRevealed || mineBoard[r][c].isFlagged) return;

    const next = mineBoard.map((row) => row.map((cell) => ({ ...cell })));
    if (next[r][c].isMine) {
      for (let i = 0; i < next.length; i++) {
        for (let j = 0; j < next[0].length; j++) {
          if (next[i][j].isMine) next[i][j].isRevealed = true;
        }
      }
      setMineBoard(next);
      setMineStatus('lost');
      return;
    }

    const stack: [number, number][] = [[r, c]];
    while (stack.length > 0) {
      const [cr, cc] = stack.pop()!;
      if (next[cr][cc].isRevealed || next[cr][cc].isFlagged) continue;
      next[cr][cc].isRevealed = true;
      if (next[cr][cc].adjacent === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = cr + dr;
            const nc = cc + dc;
            if (
              nr >= 0 &&
              nr < next.length &&
              nc >= 0 &&
              nc < next[0].length &&
              !next[nr][nc].isRevealed
            ) {
              stack.push([nr, nc]);
            }
          }
        }
      }
    }

    let safeUnrevealed = 0;
    for (let i = 0; i < next.length; i++) {
      for (let j = 0; j < next[0].length; j++) {
        if (!next[i][j].isMine && !next[i][j].isRevealed) safeUnrevealed++;
      }
    }
    setMineBoard(next);
    if (safeUnrevealed === 0) setMineStatus('won');
  };

  const activeWindows = Object.values(windows)
    .filter((w) => w.isOpen)
    .sort((a, b) => a.zIndex - b.zIndex);

  const highestVisibleWindow = [...activeWindows]
    .filter((w) => !w.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0];

  const singleOpenWindow = activeWindows[0];

  const renderWindowIcon = (win: WinState) => {
    if (win.iconSrc) {
      return (
        <img
          src={win.iconSrc}
          alt=""
          className="w-[16px] h-[16px] object-contain win98-pixelated shrink-0"
          draggable={false}
        />
      );
    }
    if (win.iconType === 'shutdown') return <PixelShutdownIcon size={16} />;
    if (win.iconType === 'minesweeper') return <PixelMinesweeperMenuIcon size={16} />;
    return <WinFlagIcon size={14} />;
  };

  const contactTiles = [
    {
      title: 'TELEGRAM',
      sub: '@melanchonie',
      link: footerContent.telegramLink,
      icon: <PixelTelegramIcon size={26} />,
    },
    {
      title: 'THREADS',
      sub: '',
      link: footerContent.socials[0].link,
      icon: <PixelThreadsIcon size={26} />,
    },
    {
      title: 'INSTAGRAM',
      sub: '',
      link: footerContent.socials[1].link,
      icon: <PixelInstagramIcon size={26} />,
    },
    {
      title: 'BEHANCE',
      sub: '',
      link: footerContent.socials[2].link,
      icon: <PixelBehanceIcon size={26} />,
    },
    {
      title: 'PINTEREST',
      sub: '',
      link: footerContent.socials[3].link,
      icon: <PixelPinterestIcon size={26} />,
    },
  ];

  const getContentWidth = (id: WindowId, mobile: boolean): string => {
    switch (id) {
      case 'minesweeper':
        return mobile ? 'max-content' : '196px';
      case 'trash':
      case 'shutdown':
        return mobile ? 'min(90%, 336px)' : '316px';
      case 'contacts':
        return mobile ? 'min(90%, 356px)' : '336px';
      case 'services':
      case 'process':
        return mobile ? 'min(92%, 416px)' : '404px';
      case 'about':
        return mobile ? 'min(94%, 448px)' : '428px';
      case 'cases':
        return mobile ? 'min(94%, 448px)' : '416px';
    }
  };

  const renderActiveWindows = (mobile: boolean) =>
    activeWindows.map((win) => {
      if (win.isMinimized) return null;
      const isFocused = highestVisibleWindow?.id === win.id;
      const isFullBox = !mobile || win.isMaximized;
      const bodyGrowClass = isFullBox ? 'flex-1 min-h-0' : 'min-h-0';

      const winBoxStyle: React.CSSProperties = isFullBox
        ? {
            zIndex: win.zIndex,
            left: '0%',
            top: '0%',
            width: '100%',
            height: '100%',
          }
        : {
            zIndex: win.zIndex,
            left: '50%',
            top: '50%',
            width: getContentWidth(win.id, mobile),
            maxWidth: mobile ? 'calc(100% - 16px)' : 'calc(100% - 12px)',
            height: 'auto',
            maxHeight: mobile ? 'calc(100% - 24px)' : 'calc(100% - 12px)',
            transform: `translate(calc(-50% + ${win.dxPx}px), calc(-50% + ${win.dyPx}px))`,
          };

      const tbBtnClass = mobile
        ? 'win98-btn w-[32px] h-[30px] shrink-0'
        : 'win98-btn w-[16px] h-[14px]';

      return (
        <div
          key={win.id}
          onClick={(e) => {
            e.stopPropagation();
            if (!isFocused || win.isMinimized) focusWindow(win.id);
          }}
          style={winBoxStyle}
          className="absolute flex flex-col win98-outset p-[4px] overflow-hidden"
        >
          {/* Authentic Title Bar */}
          <div
            onPointerDown={(e) => {
              e.stopPropagation();
              if (!isFocused || win.isMinimized) focusWindow(win.id);
              if (isFullBox) return;
              if (e.pointerType === 'mouse' && e.button !== 0) return;
              if ((e.target as HTMLElement).closest('button')) return;

              let minDx = -140;
              let maxDx = 140;
              let minDy = -90;
              let maxDy = 90;

              if (mobile) {
                const wsRect = workspaceRef.current?.getBoundingClientRect();
                const winRect = e.currentTarget.parentElement?.getBoundingClientRect();
                if (wsRect && winRect) {
                  const pad = 4;
                  const maxAbsDx = Math.max(0, Math.floor((wsRect.width - winRect.width) / 2 - pad));
                  const maxAbsDy = Math.max(0, Math.floor((wsRect.height - winRect.height) / 2 - pad));
                  minDx = -maxAbsDx;
                  maxDx = maxAbsDx;
                  minDy = -maxAbsDy;
                  maxDy = maxAbsDy;
                }
              }

              try {
                e.currentTarget.setPointerCapture(e.pointerId);
              } catch {
                // Ignore pointer capture errors on synthetic events
              }

              dragStateRef.current = {
                id: win.id,
                pointerId: e.pointerId,
                isMobile: mobile,
                startX: e.clientX,
                startY: e.clientY,
                origDxPx: win.dxPx,
                origDyPx: win.dyPx,
                minDx,
                maxDx,
                minDy,
                maxDy,
              };
            }}
            className={`flex items-center justify-between ${
              mobile ? 'px-2 py-1.5' : 'px-1.5 py-[2.5px]'
            } ${mobile && !isFullBox ? 'touch-none' : ''} shrink-0 select-none ${
              isFocused
                ? 'bg-gradient-to-r from-[#000080] to-[#1084d0] text-white'
                : 'bg-[#808080] text-[#dfdfdf]'
            }`}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              {renderWindowIcon(win)}
              <span
                className={`${mobile ? 'text-[13px]' : 'text-[12.5px]'} font-bold truncate`}
              >
                {win.title}
              </span>
            </div>

            <div
              className={`flex items-center ${mobile ? 'gap-[6px]' : 'gap-[2px]'} shrink-0 ml-1`}
              onPointerDown={(e) => e.stopPropagation()}
            >
              {win.id !== 'shutdown' && win.id !== 'trash' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    minimizeWindow(win.id);
                  }}
                  className={tbBtnClass}
                  title="Свернуть"
                >
                  <PixelMinimizeGlyph size={mobile ? 14 : 9} />
                </button>
              )}
              {mobile &&
                win.id !== 'shutdown' &&
                win.id !== 'trash' &&
                win.id !== 'minesweeper' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMaximizeWindow(win.id);
                    }}
                    className={tbBtnClass}
                    title={win.isMaximized ? 'Восстановить' : 'Развернуть'}
                  >
                    <PixelMaximizeGlyph isMaximized={win.isMaximized} size={mobile ? 14 : 9} />
                  </button>
                )}
              {win.id === 'shutdown' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openWindow('about');
                  }}
                  className={tbBtnClass}
                  title="Справка"
                >
                  <PixelHelpGlyph size={mobile ? 14 : 9} />
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeWindow(win.id);
                }}
                className={mobile ? tbBtnClass : `${tbBtnClass} ml-[1px]`}
                title="Закрыть"
              >
                <PixelCloseGlyph size={mobile ? 14 : 9} />
              </button>
            </div>
          </div>

          {/* ======================================================
              WINDOW 1: ОБО МНЕ
          ====================================================== */}
          {win.id === 'about' && (
            <div
              className={`${bodyGrowClass} flex flex-col justify-between ${
                mobile ? 'p-3' : 'p-2.5'
              } overflow-hidden bg-[#c0c0c0] text-[#000000]`}
            >
              <div className={`${bodyGrowClass} overflow-y-auto retro-scrollbar pr-1 space-y-3`}>
                <div className="flex gap-3 items-start">
                  <img
                    src="/images/about-photo.jpg"
                    alt="Мелания Ваниосова"
                    className="w-[90px] h-[104px] object-cover object-center border border-[#808080] shrink-0"
                  />
                  <div
                    className={`flex-1 min-w-0 space-y-1 ${
                      mobile ? 'text-[13.5px]' : 'text-[12.5px]'
                    }`}
                  >
                    <div className="font-bold text-[15px] leading-tight text-[#000000]">
                      {heroContent.title}
                    </div>
                    <div
                      className={`${
                        mobile ? 'text-[13px]' : 'text-[12.5px]'
                      } text-[#111111]`}
                    >
                      Веб-дизайнер / UX &amp; UI
                    </div>
                    <div
                      className={`pt-1 space-y-1 ${
                        mobile
                          ? 'text-[13.5px] leading-[1.38]'
                          : 'text-[12.5px] leading-[1.32]'
                      } text-[#000000]`}
                    >
                      <div>
                        <span className="font-bold">Опыт:</span> 3 года
                      </div>
                      <div>
                        <span className="font-bold">Местоположение:</span> Тайланд
                      </div>
                      <div>
                        <span className="font-bold">Стек:</span> Figma, Tilda, Webflow,
                        кастомный код, AI
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="font-bold text-[13.5px] text-[#000000]">
                    Преимущества
                  </div>
                  <div className="divide-y divide-[#808080]/55">
                    {advantages.map((adv, idx) => {
                      const AdvIcon = ADVANTAGE_ICONS[idx % ADVANTAGE_ICONS.length];
                      return (
                        <div key={idx} className="flex items-start gap-2.5 py-2.5">
                          <div
                            className={`${
                              mobile ? 'w-[40px] h-[40px]' : 'w-[36px] h-[36px]'
                            } shrink-0 flex items-center justify-center`}
                          >
                            <AdvIcon size={32} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className={`font-bold leading-tight text-[#000000] ${
                                mobile ? 'text-[14px]' : 'text-[13px]'
                              }`}
                            >
                              {adv.title}
                            </div>
                            <div
                              className={`mt-0.5 text-[#1a1a1a] ${
                                mobile
                                  ? 'text-[13px] leading-[1.38]'
                                  : 'text-[11.5px] leading-[1.34]'
                              }`}
                            >
                              {adv.description}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div
                className={`flex items-center justify-end ${
                  mobile ? 'flex-wrap gap-2 pt-2.5' : 'gap-1.5 pt-2'
                } shrink-0`}
              >
                <a
                  href={footerContent.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`win98-btn win98-btn-default ${
                    mobile
                      ? 'h-[36px] min-w-[116px] px-5 text-[13.5px]'
                      : 'px-3.5 py-1 text-[12.5px]'
                  } font-bold no-underline`}
                >
                  Связаться
                </a>
              </div>
            </div>
          )}

          {/* ======================================================
              WINDOW 2: КЕЙСЫ (2x2 Square Cards; Tap on Mobile / Hover on Desktop)
          ====================================================== */}
          {win.id === 'cases' && (
            <div
              className={`${bodyGrowClass} flex flex-col p-2.5 gap-2 overflow-hidden bg-[#c0c0c0] text-[#000000]`}
            >
              {previewCase && (
                <div className="flex items-center justify-between gap-2 shrink-0">
                  <span className="font-bold text-[13px] truncate text-[#000000]">
                    {previewCase.title}
                  </span>
                  <button
                    onClick={() => setPreviewCase(null)}
                    className={`win98-btn ${
                      mobile
                        ? 'h-[34px] px-3.5 text-[13px]'
                        : 'px-3 py-0.5 text-[12.5px]'
                    } shrink-0`}
                  >
                    &lt;- Назад
                  </button>
                </div>
              )}

              <div className={`${bodyGrowClass} overflow-y-auto retro-scrollbar pr-0.5`}>
                {previewCase ? (
                  <img
                    src={previewCase.fullImage || previewCase.v2Image || previewCase.image}
                    alt={previewCase.title}
                    className="w-full h-auto block"
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-2.5">
                    {cases.map((project) => {
                      const cardImage = project.v2Image || project.image;
                      return (
                        <div
                          key={project.id}
                          className="group relative p-1.5 bg-[#cccccc] border border-[#808080] flex flex-col gap-1.5 overflow-hidden"
                        >
                          <div className="relative aspect-square w-full bg-[#1a1a1a] border border-[#808080] overflow-hidden">
                            {mobile ? (
                              project.fullImage ? (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPreviewCase(project);
                                  }}
                                  className="block w-full h-full p-0 border-0 bg-transparent text-left focus:outline-none"
                                >
                                  <img
                                    src={cardImage}
                                    alt={project.title}
                                    className="w-full h-full object-cover block"
                                  />
                                </button>
                              ) : (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block w-full h-full no-underline focus:outline-none"
                                >
                                  <img
                                    src={cardImage}
                                    alt={project.title}
                                    className="w-full h-full object-cover block"
                                  />
                                </a>
                              )
                            ) : (
                              <>
                                <img
                                  src={cardImage}
                                  alt={project.title}
                                  className="w-full h-full object-cover block transition-transform duration-150 group-hover:scale-[1.03]"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-100 flex items-center justify-center p-2">
                                  {project.fullImage ? (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setPreviewCase(project);
                                      }}
                                      className="win98-btn win98-btn-default px-3 py-1.5 text-[12px] font-bold"
                                    >
                                      Открыть макет
                                    </button>
                                  ) : (
                                    <a
                                      href={project.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="win98-btn win98-btn-default px-3 py-1.5 text-[12px] font-bold no-underline"
                                    >
                                      Открыть сайт
                                    </a>
                                  )}
                                </div>
                              </>
                            )}
                          </div>

                          <div
                            className={`${
                              mobile ? 'px-0.5 text-[10.5px]' : 'px-1 text-[11.5px]'
                            } font-bold text-[#000000] truncate text-center leading-tight shrink-0`}
                          >
                            {project.title}
                          </div>

                          {mobile &&
                            (project.fullImage ? (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPreviewCase(project);
                                }}
                                className="win98-btn win98-btn-default w-full h-[34px] px-2 text-[12px] font-bold"
                              >
                                Открыть макет
                              </button>
                            ) : (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="win98-btn win98-btn-default w-full h-[34px] px-2 text-[12px] font-bold no-underline"
                              >
                                Открыть сайт
                              </a>
                            ))}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 shrink-0">
                <a
                  href={footerContent.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`win98-btn win98-btn-default ${
                    mobile
                      ? 'h-[36px] min-w-[116px] px-5 text-[13.5px]'
                      : 'px-3.5 py-1 text-[12.5px]'
                  } font-bold no-underline`}
                >
                  Связаться
                </a>
              </div>
            </div>
          )}

          {/* ======================================================
              WINDOW 3: УСЛУГИ ("Все цены" = Pure Text Without Inner Buttons)
          ====================================================== */}
          {win.id === 'services' && (
            <div
              className={`${bodyGrowClass} flex flex-col justify-between p-2.5 overflow-hidden bg-[#c0c0c0] text-[#000000]`}
            >
              <div
                className={`${
                  mobile
                    ? 'grid grid-cols-6 gap-2 pb-2.5'
                    : 'flex items-center flex-wrap gap-1.5 pb-2'
                } shrink-0`}
              >
                {['Сайт', 'Лендинг', 'Магазин', 'Брендинг', 'Все цены'].map(
                  (label, idx) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setServicesTab(idx)}
                      className={`win98-btn ${
                        mobile
                          ? `${idx < 3 ? 'col-span-2' : 'col-span-3'} h-[34px] px-2 text-[13px]`
                          : 'px-2.5 py-0.5 text-[12px]'
                      } whitespace-nowrap ${
                        servicesTab === idx
                          ? mobile
                            ? 'is-pressed text-[#000080] font-bold'
                            : 'is-pressed font-bold'
                          : ''
                      }`}
                    >
                      {label}
                    </button>
                  )
                )}
              </div>

              <div className={`${bodyGrowClass} overflow-y-auto retro-scrollbar pr-0.5`}>
                {servicesTab < 4 ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={SERVICE_ICONS[servicesTab % SERVICE_ICONS.length]}
                        alt=""
                        className="w-[32px] h-[32px] win98-pixelated shrink-0"
                      />
                      <div className="font-bold text-[14px] leading-tight text-[#000000]">
                        {services[servicesTab].title}
                      </div>
                    </div>

                    <p
                      className={`${
                        mobile ? 'text-[13.5px] leading-[1.4]' : 'text-[13px] leading-[1.34]'
                      } text-[#000000]`}
                    >
                      {services[servicesTab].description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-1 text-[13px]">
                      <div>
                        <div className="text-[12px] text-[#111111] mb-0.5">
                          Срок разработки
                        </div>
                        <div className="font-bold text-[14px] text-[#000000]">
                          {services[servicesTab].timeframe}
                        </div>
                      </div>
                      <div>
                        <div className="text-[12px] text-[#111111] mb-0.5">Стоимость</div>
                        <div className="font-bold text-[14px] text-[#000080]">
                          {services[servicesTab].price}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`space-y-3 pt-0.5 ${
                      mobile ? 'text-[13.5px] leading-[1.4]' : 'text-[13px]'
                    }`}
                  >
                    {services.map((srv, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-2.5">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={SERVICE_ICONS[idx % SERVICE_ICONS.length]}
                            alt=""
                            className="w-[24px] h-[24px] win98-pixelated shrink-0"
                          />
                          <div className="min-w-0">
                            <div
                              className={`font-bold ${
                                mobile ? 'text-[13.5px]' : 'text-[13px]'
                              } truncate text-[#000000]`}
                            >
                              {srv.title}
                            </div>
                            <div className="text-[12px] text-[#111111]">{srv.timeframe}</div>
                          </div>
                        </div>
                        <div className="shrink-0 font-bold text-[13.5px] text-[#000080]">
                          {srv.price}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 shrink-0">
                <a
                  href={footerContent.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`win98-btn win98-btn-default ${
                    mobile
                      ? 'h-[36px] min-w-[116px] px-5 text-[13.5px]'
                      : 'px-4 py-1 text-[12.5px]'
                  } font-bold no-underline`}
                >
                  Связаться
                </a>
              </div>
            </div>
          )}

          {/* ======================================================
              WINDOW 4: ЭТАПЫ
          ====================================================== */}
          {win.id === 'process' && (
            <div
              className={`${bodyGrowClass} flex flex-col justify-between p-2.5 overflow-hidden bg-[#c0c0c0] text-[#000000]`}
            >
              <div className={`${bodyGrowClass} overflow-y-auto retro-scrollbar space-y-2.5 pr-0.5`}>
                <div className="flex items-center gap-2.5">
                  <img
                    src={PROCESS_STEP_ICONS[processIdx % PROCESS_STEP_ICONS.length]}
                    alt=""
                    className="w-[32px] h-[32px] win98-pixelated shrink-0"
                  />
                  <div className="flex-1 min-w-0 leading-tight">
                    <div className="font-bold text-[13.5px] truncate text-[#000000]">
                      Этап {processSteps[processIdx].number} из 05:{' '}
                      {processSteps[processIdx].title}
                    </div>
                    <div className="text-[12px] text-[#111111]">
                      Готовность проекта: {(processIdx + 1) * 20}%
                    </div>
                  </div>
                </div>

                {/* Win98 Blue Squares Progress Bar */}
                <div className="win98-sunken p-[2px] h-[18px] bg-white flex items-center gap-[2px]">
                  {Array.from({ length: 15 }).map((_, segIdx) => {
                    const filledCount = (processIdx + 1) * 3;
                    return (
                      <div
                        key={segIdx}
                        className={`h-full flex-1 ${
                          segIdx < filledCount ? 'bg-[#000080]' : 'bg-transparent'
                        }`}
                      />
                    );
                  })}
                </div>

                <div
                  className={
                    mobile ? 'grid grid-cols-5 gap-1.5' : 'flex items-center flex-wrap gap-1.5'
                  }
                >
                  {processSteps.map((s, idx) => (
                    <button
                      key={s.number}
                      type="button"
                      onClick={() => setProcessIdx(idx)}
                      className={`win98-btn ${
                        mobile ? 'h-[34px] text-[13px]' : 'px-2.5 py-0.5 text-[12.5px]'
                      } ${processIdx === idx ? 'is-pressed font-bold' : ''}`}
                    >
                      {s.number}
                    </button>
                  ))}
                </div>

                {mobile ? (
                  <div className="grid">
                    {processSteps.map((s, idx) => (
                      <p
                        key={s.number}
                        aria-hidden={idx !== processIdx}
                        className={`col-start-1 row-start-1 text-[13.5px] leading-[1.4] text-[#000000] ${
                          idx === processIdx
                            ? ''
                            : 'invisible pointer-events-none select-none'
                        }`}
                      >
                        {s.description}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-[13px] leading-[1.34] text-[#000000]">
                    {processSteps[processIdx].description}
                  </p>
                )}

                <label
                  className={`flex items-center gap-2 ${
                    mobile ? 'min-h-[38px] text-[13.5px]' : 'text-[12.5px]'
                  } text-[#000000]`}
                >
                  <input
                    type="checkbox"
                    checked={contractChecked}
                    onChange={(e) => setContractChecked(e.target.checked)}
                    className={mobile ? 'w-4 h-4 shrink-0' : undefined}
                  />
                  <span>Работа по договору и согласованным срокам</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-1.5 pt-2 shrink-0">
                {processIdx > 0 && (
                  <button
                    onClick={() => setProcessIdx((p) => Math.max(0, p - 1))}
                    className={`win98-btn ${
                      mobile
                        ? 'h-[36px] min-w-[74px] px-2.5 text-[13px] whitespace-nowrap'
                        : 'px-3 py-1 text-[12.5px]'
                    }`}
                  >
                    &lt; Назад
                  </button>
                )}
                {processIdx < processSteps.length - 1 && (
                  <button
                    onClick={() =>
                      setProcessIdx((p) => Math.min(processSteps.length - 1, p + 1))
                    }
                    className={`win98-btn ${
                      mobile
                        ? 'h-[36px] min-w-[74px] px-2.5 text-[13px] whitespace-nowrap'
                        : 'px-3 py-1 text-[12.5px]'
                    }`}
                  >
                    Далее &gt;
                  </button>
                )}
                <a
                  href={footerContent.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`win98-btn win98-btn-default ${
                    mobile
                      ? 'h-[36px] min-w-[92px] px-3 text-[13px] whitespace-nowrap'
                      : 'px-3.5 py-1 text-[12.5px]'
                  } font-bold no-underline`}
                >
                  Связаться
                </a>
              </div>
            </div>
          )}

          {/* ======================================================
              WINDOW 5: КОНТАКТЫ
          ====================================================== */}
          {win.id === 'contacts' && (
            <div
              className={`${bodyGrowClass} flex items-center justify-center p-3 overflow-y-auto retro-scrollbar bg-[#c0c0c0] text-[#000000]`}
            >
              <div className="flex flex-col gap-2 w-full max-w-[380px]">
                {contactTiles.map((tile) => (
                  <a
                    key={tile.title}
                    href={tile.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`win98-btn w-full ${
                      mobile ? 'h-[44px] px-4' : 'h-[44px] px-3.5'
                    } flex items-center justify-between no-underline`}
                    style={{ justifyContent: 'space-between' }}
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      {tile.icon}
                      <span className="font-bold text-[13px] tracking-wide text-[#000000]">
                        {tile.title}
                      </span>
                      {tile.sub && (
                        <span className="text-[12.5px] text-[#000080]">{tile.sub}</span>
                      )}
                    </span>
                    <span className="font-bold text-[13px] text-[#000000] shrink-0">
                      -&gt;
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================
              WINDOW 6: КОРЗИНА
          ====================================================== */}
          {win.id === 'trash' && (
            <div
              className={`${bodyGrowClass} flex flex-col justify-between p-3 overflow-y-auto retro-scrollbar bg-[#c0c0c0] text-[#000000]`}
            >
              <div className="flex items-center gap-3">
                <img
                  src="/images/win98/recycle-bin.png?v=motif2"
                  alt=""
                  className="w-[32px] h-[32px] win98-pixelated shrink-0"
                />
                <p
                  className={`${
                    mobile ? 'text-[13.5px] leading-[1.4]' : 'text-[13px] leading-[1.34]'
                  } text-[#000000]`}
                >
                  {trashEmptied
                    ? 'Корзина очищена. Остались только продуманные сайты и чистая типографика.'
                    : 'В корзине лежат: скучные шаблонные сайты, сорванные дедлайны и сломанная мобильная верстка.'}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 shrink-0">
                <button
                  onClick={() => closeWindow('trash')}
                  className={`win98-btn win98-btn-default ${
                    mobile
                      ? 'h-[36px] min-w-[84px] px-4 text-[13px]'
                      : 'px-4 py-1 text-[12.5px]'
                  }`}
                >
                  Супер
                </button>
                <button
                  onClick={() => setTrashEmptied(true)}
                  className={`win98-btn ${
                    mobile
                      ? 'h-[36px] min-w-[84px] px-4 text-[13px]'
                      : 'px-3.5 py-1 text-[12.5px]'
                  }`}
                >
                  Очистить
                </button>
              </div>
            </div>
          )}

          {/* ======================================================
              WINDOW 8: САПЁР
          ====================================================== */}
          {win.id === 'minesweeper' && (
            <div
              className={`${bodyGrowClass} flex flex-col items-center justify-between gap-2 ${
                mobile ? 'p-2 overflow-y-auto overflow-x-hidden' : 'p-2 overflow-hidden'
              } bg-[#c0c0c0]`}
            >
              <div
                className={`w-full ${
                  mobile ? 'max-w-[288px]' : 'max-w-[176px]'
                } px-1 py-0.5 flex items-center justify-between shrink-0`}
              >
                <div className="bg-[#000000] text-[#ff0000] font-bold text-[12px] px-1.5 py-0.5 tracking-widest">
                  010
                </div>
                <button
                  onClick={resetMinesweeper}
                  className={`win98-btn ${
                    mobile ? 'w-[36px] h-[36px]' : 'w-[24px] h-[24px]'
                  }`}
                  title="Новая игра"
                >
                  <PixelSmileyIcon
                    size={mobile ? 20 : 16}
                    state={
                      mineStatus === 'lost'
                        ? 'dead'
                        : mineStatus === 'won'
                        ? 'cool'
                        : 'happy'
                    }
                  />
                </button>
                <div className="bg-[#000000] text-[#ff0000] font-bold text-[12px] px-1.5 py-0.5 tracking-widest">
                  {String(mineTimer).padStart(3, '0')}
                </div>
              </div>

              <div className={mobile ? 'max-w-full overflow-x-auto shrink-0' : 'shrink-0'}>
                <div className="grid grid-cols-8 w-max shrink-0">
                  {mineBoard.map((row, rIdx) =>
                    row.map((cell, cIdx) => (
                      <button
                        key={`${rIdx}-${cIdx}`}
                        onClick={() => revealMineCell(rIdx, cIdx)}
                        className={`win98-mine-cell ${
                          mobile
                            ? 'w-[36px] h-[36px] text-[14px]'
                            : 'w-[20px] h-[20px] text-[11px]'
                        } font-bold flex items-center justify-center ${
                          cell.isRevealed
                            ? 'bg-[#c0c0c0] border border-[#808080]'
                            : 'win98-btn'
                        }`}
                        style={{
                          color:
                            cell.isRevealed && cell.adjacent > 0
                              ? MINE_COLORS[cell.adjacent]
                              : '#000000',
                          backgroundColor:
                            cell.isRevealed && cell.isMine && mineStatus === 'lost'
                              ? '#ff0000'
                              : undefined,
                        }}
                      >
                        {cell.isRevealed ? (
                          cell.isMine ? (
                            <PixelMineIcon size={mobile ? 18 : 14} />
                          ) : cell.adjacent > 0 ? (
                            cell.adjacent
                          ) : (
                            ''
                          )
                        ) : (
                          ''
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>

              <div className="text-[12px] text-center shrink-0 text-[#000000]">
                {mineStatus === 'won'
                  ? 'Победа! Все мины найдены.'
                  : mineStatus === 'lost'
                  ? 'Бум! Нажмите на смайлик.'
                  : 'Классический Сапёр 8x8'}
              </div>
            </div>
          )}

          {/* ======================================================
              WINDOW 9: ЗАВЕРШЕНИЕ РАБОТЫ
          ====================================================== */}
          {win.id === 'shutdown' && (
            <div
              className={`${bodyGrowClass} flex flex-col justify-between p-3 overflow-y-auto retro-scrollbar bg-[#c0c0c0] text-[#000000]`}
            >
              <div className="flex items-start gap-3">
                <img
                  src="/images/win98/my-computer.png?v=motif2"
                  alt=""
                  className="w-[32px] h-[32px] win98-pixelated shrink-0 mt-0.5"
                />
                <div
                  className={`flex-1 space-y-2 ${
                    mobile ? 'text-[13.5px]' : 'text-[13px]'
                  } text-[#000000]`}
                >
                  <div className="font-bold">Выберите нужное действие:</div>
                  <label className={`flex items-center gap-2 ${mobile ? 'min-h-[38px]' : ''}`}>
                    <input
                      type="radio"
                      name="shutdown-act"
                      checked={shutdownAction === 'off'}
                      onChange={() => setShutdownAction('off')}
                      className={mobile ? 'w-4 h-4 shrink-0' : undefined}
                    />
                    <span>Выключить экран монитора</span>
                  </label>
                  <label className={`flex items-center gap-2 ${mobile ? 'min-h-[38px]' : ''}`}>
                    <input
                      type="radio"
                      name="shutdown-act"
                      checked={shutdownAction === 'siteV1'}
                      onChange={() => setShutdownAction('siteV1')}
                      className={mobile ? 'w-4 h-4 shrink-0' : undefined}
                    />
                    <span>Обычная версия сайта (v1)</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 shrink-0">
                <button
                  onClick={() => {
                    closeWindow('shutdown');
                    if (shutdownAction === 'off') {
                      if (turnOnTimerRef.current !== null) {
                        window.clearTimeout(turnOnTimerRef.current);
                        turnOnTimerRef.current = null;
                      }
                      if (shutdownTimerRef.current !== null) {
                        window.clearTimeout(shutdownTimerRef.current);
                      }
                      setTurningOn(false);
                      setShuttingDown(true);
                      shutdownTimerRef.current = window.setTimeout(() => {
                        setPowerOn(false);
                        setShuttingDown(false);
                        shutdownTimerRef.current = null;
                      }, 560);
                    } else {
                      onSwitchVersion();
                    }
                  }}
                  className={`win98-btn win98-btn-default ${
                    mobile
                      ? 'h-[36px] min-w-[78px] px-4 text-[13px]'
                      : 'px-4 py-1 text-[12.5px]'
                  }`}
                >
                  Да
                </button>
                <button
                  onClick={() => closeWindow('shutdown')}
                  className={`win98-btn ${
                    mobile
                      ? 'h-[36px] min-w-[78px] px-4 text-[13px]'
                      : 'px-3.5 py-1 text-[12.5px]'
                  }`}
                >
                  Нет
                </button>
              </div>
            </div>
          )}
        </div>
      );
    });

  const renderStartMenu = (mobile: boolean) => {
    if (!startOpen) return null;

    if (mobile) {
      return (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute left-[6px] bottom-0 z-[999] w-[260px] max-w-[calc(100vw-12px)] max-h-[calc(100%-10px)] win98-outset p-[3px] flex"
        >
          <div
            className="w-[22px] shrink-0 flex items-end justify-center pb-2"
            style={{
              background: 'linear-gradient(to top, #000080 0%, #0000ff 55%, #000000 100%)',
            }}
          >
            <span
              className="text-white text-[11px] tracking-wide whitespace-nowrap"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              <span className="font-extrabold">fifows</span>
              <span className="font-normal">18</span>
            </span>
          </div>

          <div className="flex-1 min-w-0 flex flex-col py-0.5 text-[13.5px] overflow-y-auto retro-scrollbar">
            <button
              onClick={() =>
                setStartSubmenu(startSubmenu === 'programs' ? null : 'programs')
              }
              className={`min-h-[40px] shrink-0 px-3 py-1.5 flex items-center justify-between text-left ${
                startSubmenu === 'programs' ? 'bg-[#000080] text-white' : ''
              }`}
            >
              <span className="flex items-center gap-2 min-w-0">
                <img
                  src="/images/win98/folder.png?v=motif2"
                  alt=""
                  className="w-[16px] h-[16px] win98-pixelated shrink-0"
                />
                <span className="truncate">Программы</span>
              </span>
              <PixelArrowRightGlyph active={startSubmenu === 'programs'} />
            </button>

            {startSubmenu === 'programs' && (
              <div className="bg-[#d4d4d4] border-y border-[#808080]/50 pl-3 flex flex-col text-[13px] shrink-0">
                <button
                  onClick={() => openWindow('about')}
                  className="min-h-[40px] shrink-0 px-2.5 py-1.5 flex items-center gap-2 text-left active:bg-[#000080] active:text-white"
                >
                  <img
                    src="/images/win98/my-computer.png?v=motif2"
                    alt=""
                    className="w-[16px] h-[16px] win98-pixelated shrink-0"
                  />
                  <span className="truncate">Обо мне</span>
                </button>
                <button
                  onClick={() => openWindow('cases')}
                  className="min-h-[40px] shrink-0 px-2.5 py-1.5 flex items-center gap-2 text-left active:bg-[#000080] active:text-white"
                >
                  <img
                    src="/images/win98/folder.png?v=motif2"
                    alt=""
                    className="w-[16px] h-[16px] win98-pixelated shrink-0"
                  />
                  <span className="truncate">Мои кейсы</span>
                </button>
                <button
                  onClick={() => openWindow('services')}
                  className="min-h-[40px] shrink-0 px-2.5 py-1.5 flex items-center gap-2 text-left active:bg-[#000080] active:text-white"
                >
                  <img
                    src="/images/win98/motif/services-main.png"
                    alt=""
                    className="w-[16px] h-[16px] win98-pixelated shrink-0"
                  />
                  <span className="truncate">Услуги</span>
                </button>
                <button
                  onClick={() => openWindow('process')}
                  className="min-h-[40px] shrink-0 px-2.5 py-1.5 flex items-center gap-2 text-left active:bg-[#000080] active:text-white"
                >
                  <img
                    src="/images/win98/motif/process-main.png"
                    alt=""
                    className="w-[16px] h-[16px] win98-pixelated shrink-0"
                  />
                  <span className="truncate">Этапы работы</span>
                </button>
                <button
                  onClick={() => openWindow('minesweeper')}
                  className="min-h-[40px] shrink-0 px-2.5 py-1.5 flex items-center gap-2 text-left active:bg-[#000080] active:text-white"
                >
                  <PixelMinesweeperMenuIcon size={16} />
                  <span className="truncate">Игры: Сапёр</span>
                </button>
              </div>
            )}

            <button
              onClick={() =>
                setStartSubmenu(startSubmenu === 'documents' ? null : 'documents')
              }
              className={`min-h-[40px] shrink-0 px-3 py-1.5 flex items-center justify-between text-left ${
                startSubmenu === 'documents' ? 'bg-[#000080] text-white' : ''
              }`}
            >
              <span className="flex items-center gap-2 min-w-0">
                <img
                  src="/images/win98/cdrom.png?v=motif2"
                  alt=""
                  className="w-[16px] h-[16px] win98-pixelated shrink-0"
                />
                <span className="truncate">Документы</span>
              </span>
              <PixelArrowRightGlyph active={startSubmenu === 'documents'} />
            </button>

            {startSubmenu === 'documents' && (
              <div className="bg-[#d4d4d4] border-y border-[#808080]/50 pl-3 flex flex-col text-[13px] shrink-0">
                {cases.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => {
                      if (project.fullImage) {
                        setPreviewCase(project);
                      } else {
                        setPreviewCase(null);
                      }
                      openWindow('cases');
                    }}
                    className="min-h-[40px] shrink-0 px-2.5 py-1.5 flex items-center gap-2 text-left active:bg-[#000080] active:text-white"
                  >
                    <img
                      src="/images/win98/folder.png?v=motif2"
                      alt=""
                      className="w-[16px] h-[16px] win98-pixelated shrink-0"
                    />
                    <span className="truncate">{project.title}</span>
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => openWindow('contacts')}
              className="min-h-[40px] shrink-0 px-3 py-1.5 flex items-center gap-2 text-left active:bg-[#000080] active:text-white"
            >
              <img
                src="/images/win98/internet-globe.png?v=motif2"
                alt=""
                className="w-[16px] h-[16px] win98-pixelated shrink-0"
              />
              <span className="truncate">Контакты</span>
            </button>

            <button
              onClick={() => openWindow('shutdown')}
              className="min-h-[40px] shrink-0 px-3 py-1.5 mt-0.5 flex items-center gap-2 text-left active:bg-[#000080] active:text-white"
            >
              <PixelShutdownIcon size={16} />
              <span className="truncate">Выход...</span>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute left-[8px] bottom-0 z-[999] flex items-end"
      >
        <div className="win98-outset p-[3px] flex w-[172px]">
          <div
            className="w-[20px] shrink-0 flex items-end justify-center pb-2"
            style={{
              background: 'linear-gradient(to top, #000080 0%, #0000ff 55%, #000000 100%)',
            }}
          >
            <span
              className="text-white text-[10.5px] tracking-wide whitespace-nowrap"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              <span className="font-extrabold">fifows</span>
              <span className="font-normal">18</span>
            </span>
          </div>

          <div className="flex-1 min-w-0 flex flex-col py-0.5 text-[12px]">
            <button
              onMouseEnter={() => setStartSubmenu('programs')}
              onClick={() =>
                setStartSubmenu(startSubmenu === 'programs' ? null : 'programs')
              }
              className={`px-2 py-1 flex items-center justify-between text-left ${
                startSubmenu === 'programs'
                  ? 'bg-[#000080] text-white'
                  : 'hover:bg-[#000080] hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1.5 min-w-0">
                <img
                  src="/images/win98/folder.png?v=motif2"
                  alt=""
                  className="w-[16px] h-[16px] win98-pixelated shrink-0"
                />
                <span className="truncate">Программы</span>
              </span>
              <PixelArrowRightGlyph active={startSubmenu === 'programs'} />
            </button>

            <button
              onMouseEnter={() => setStartSubmenu('documents')}
              onClick={() =>
                setStartSubmenu(startSubmenu === 'documents' ? null : 'documents')
              }
              className={`px-2 py-1 flex items-center justify-between text-left ${
                startSubmenu === 'documents'
                  ? 'bg-[#000080] text-white'
                  : 'hover:bg-[#000080] hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1.5 min-w-0">
                <img
                  src="/images/win98/cdrom.png?v=motif2"
                  alt=""
                  className="w-[16px] h-[16px] win98-pixelated shrink-0"
                />
                <span className="truncate">Документы</span>
              </span>
              <PixelArrowRightGlyph active={startSubmenu === 'documents'} />
            </button>

            <button
              onMouseEnter={() => setStartSubmenu(null)}
              onClick={() => openWindow('contacts')}
              className="px-2 py-1 flex items-center gap-1.5 text-left hover:bg-[#000080] hover:text-white"
            >
              <img
                src="/images/win98/internet-globe.png?v=motif2"
                alt=""
                className="w-[16px] h-[16px] win98-pixelated shrink-0"
              />
              <span className="truncate">Контакты</span>
            </button>

            <button
              onMouseEnter={() => setStartSubmenu(null)}
              onClick={() => openWindow('shutdown')}
              className="px-2 py-1 mt-1 flex items-center gap-1.5 text-left hover:bg-[#000080] hover:text-white"
            >
              <PixelShutdownIcon size={16} />
              <span className="truncate">Выход...</span>
            </button>
          </div>
        </div>

        {startSubmenu === 'programs' && (
          <div className="win98-outset p-[3px] w-[162px] -ml-[2px] mb-[42px] flex flex-col text-[12px]">
            <button
              onClick={() => openWindow('about')}
              className="px-2 py-1 flex items-center gap-1.5 text-left hover:bg-[#000080] hover:text-white"
            >
              <img
                src="/images/win98/my-computer.png?v=motif2"
                alt=""
                className="w-[16px] h-[16px] win98-pixelated shrink-0"
              />
              <span className="truncate">Обо мне</span>
            </button>
            <button
              onClick={() => openWindow('cases')}
              className="px-2 py-1 flex items-center gap-1.5 text-left hover:bg-[#000080] hover:text-white"
            >
              <img
                src="/images/win98/folder.png?v=motif2"
                alt=""
                className="w-[16px] h-[16px] win98-pixelated shrink-0"
              />
              <span className="truncate">Мои кейсы</span>
            </button>
            <button
              onClick={() => openWindow('services')}
              className="px-2 py-1 flex items-center gap-1.5 text-left hover:bg-[#000080] hover:text-white"
            >
              <img
                src="/images/win98/motif/services-main.png"
                alt=""
                className="w-[16px] h-[16px] win98-pixelated shrink-0"
              />
              <span className="truncate">Услуги</span>
            </button>
            <button
              onClick={() => openWindow('process')}
              className="px-2 py-1 flex items-center gap-1.5 text-left hover:bg-[#000080] hover:text-white"
            >
              <img
                src="/images/win98/motif/process-main.png"
                alt=""
                className="w-[16px] h-[16px] win98-pixelated shrink-0"
              />
              <span className="truncate">Этапы работы</span>
            </button>
            <button
              onClick={() => openWindow('minesweeper')}
              className="px-2 py-1 flex items-center gap-1.5 text-left hover:bg-[#000080] hover:text-white"
            >
              <PixelMinesweeperMenuIcon size={16} />
              <span className="truncate">Игры: Сапёр</span>
            </button>
          </div>
        )}

        {startSubmenu === 'documents' && (
          <div className="win98-outset p-[3px] w-[166px] -ml-[2px] mb-[32px] flex flex-col text-[12px]">
            {cases.map((project) => (
              <button
                key={project.id}
                onClick={() => {
                  if (project.fullImage) {
                    setPreviewCase(project);
                  } else {
                    setPreviewCase(null);
                  }
                  openWindow('cases');
                }}
                className="px-2 py-1 flex items-center gap-1.5 text-left hover:bg-[#000080] hover:text-white"
              >
                <img
                  src="/images/win98/folder.png?v=motif2"
                  alt=""
                  className="w-[16px] h-[16px] win98-pixelated shrink-0"
                />
                <span className="truncate">{project.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      onPointerDownCapture={(e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        handleInteractiveClickSound(e.target);
      }}
      onKeyDownCapture={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) {
          handleInteractiveClickSound(e.target);
        }
      }}
      className={
        isMobile
          ? 'fixed inset-0 w-full h-screen-dvh flex flex-col overflow-hidden select-none bg-[#c0c0c0] win98-root'
          : 'relative w-screen h-screen overflow-hidden select-none bg-[#1c140b] win98-root'
      }
    >
      {isMobile ? (
        <>
          {/* 1. CENTRAL FULLSCREEN OS WORKSPACE (< 1032px) */}
          <main
            className="flex-1 min-h-0 relative overflow-hidden bg-[#060907] border-b border-[#808080]"
            onClick={() => {
              if (startOpen) {
                setStartOpen(false);
                setStartSubmenu(null);
              }
              setSelectedIcon(null);
            }}
          >
            {!powerOn ? (
              <div
                data-click-sound="hardware"
                onClick={powerOnMonitor}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    powerOnMonitor();
                  }
                }}
                className="group w-full h-full bg-[#060907] flex flex-col items-center justify-center px-6 text-center relative"
                role="button"
                tabIndex={0}
              >
                <div className="w-[7px] h-[7px] rounded-full bg-[#86efac] shadow-[0_0_12px_4px_rgba(34,197,94,0.65)] crt-afterglow-dot" />
                <span className="mt-4 text-[13px] font-normal text-white/60">
                  Нажмите на экран для включения
                </span>
              </div>
            ) : (
              <div
                className={`relative w-full h-full overflow-hidden ${
                  shuttingDown
                    ? 'crt-tv-collapsing-green pointer-events-none'
                    : turningOn
                    ? 'crt-tv-turning-on-green'
                    : ''
                }`}
              >
                {/* Adaptive quantized wallpaper */}
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 z-0 w-full h-full pointer-events-none win98-pixelated"
                  style={{
                    objectFit: 'cover',
                    objectPosition: '50% 48%',
                    filter: 'contrast(1.06) brightness(0.95) saturate(0.9)',
                  }}
                />

                {/* Subtle CRT phosphor tint */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-[2] pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 42%, rgba(16, 40, 34, 0.04) 0%, rgba(6, 16, 14, 0.22) 100%)',
                  }}
                />

                {/* Ultra-fine CRT scanlines without dark monitor-bezel vignette */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-[41] pointer-events-none"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(0deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 1.5px, rgba(8,14,10,0.045) 1.5px, rgba(8,14,10,0.045) 3px)',
                  }}
                />

                {/* Desktop Workspace */}
                <div ref={workspaceRef} className="relative z-20 w-full h-full overflow-hidden">
                  {/* Top-Left Identity */}
                  <div
                    className="absolute left-[14px] text-left pointer-events-none z-[5]"
                    style={{ top: 'max(16px, env(safe-area-inset-top))' }}
                  >
                    <div
                      className="font-bold text-[32px] min-[380px]:text-[38px] tracking-tight uppercase leading-[0.98]"
                      style={{
                        color: '#0b1020',
                      }}
                    >
                      <div>МЕЛАНИЯ</div>
                      <div>ВАНИОСОВА</div>
                    </div>
                    <div className="inline-block mt-2 px-3 py-[3.5px] bg-[#000080] text-white font-bold text-[15px]">
                      дизайнер сайтов
                    </div>
                  </div>

                  {/* Subtle bottom gradient scrim for high-contrast desktop icons & CTA over grass */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[225px] z-[5]"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(5, 18, 9, 0.54) 0%, rgba(5, 18, 9, 0.24) 68%, rgba(5, 18, 9, 0) 100%)',
                    }}
                  />

                  {/* Bottom Horizontal Icon Dock + Matte-Orange CTA directly on desktop wallpaper */}
                  <div className="absolute inset-x-0 bottom-[16px] z-[7] flex flex-col items-center gap-3 px-3 pointer-events-none">
                    <div
                      className={`pointer-events-auto w-full ${
                        isWideCompact
                          ? 'max-w-[520px] grid grid-cols-6 gap-1.5'
                          : 'max-w-[356px] grid grid-cols-3 gap-x-2 gap-y-1.5'
                      }`}
                    >
                      {COMPACT_DESKTOP_ICONS.map((item) => {
                        const isActive =
                          selectedIcon === item.id ||
                          (windows[item.id].isOpen && !windows[item.id].isMinimized);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedIcon(item.id);
                              openWindow(item.id);
                            }}
                            className="flex flex-col items-center justify-center py-1 px-1 min-h-[52px] text-center focus:outline-none"
                          >
                            <img
                              src={item.iconSrc}
                              alt={item.label}
                              draggable={false}
                              className={`w-[32px] h-[32px] object-contain win98-pixelated drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] ${
                                isActive ? 'brightness-90' : ''
                              }`}
                            />
                            <span
                              className={`mt-1 px-1.5 py-[1px] text-[12px] font-bold leading-[1.15] text-white whitespace-nowrap ${
                                isActive ? 'bg-[#000080]' : 'bg-[#07160c]/65'
                              }`}
                              style={
                                isActive
                                  ? undefined
                                  : {
                                      textShadow: '0 1px 1px rgba(0,0,0,0.9)',
                                    }
                              }
                            >
                              {item.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <a
                      data-click-sound="hardware"
                      href={footerContent.telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="win98-cta-orange pointer-events-auto px-7 h-[44px] min-w-[220px] text-[13.5px] tracking-[0.04em] uppercase no-underline"
                    >
                      ЗАКАЗАТЬ САЙТ
                    </a>
                  </div>

                  {renderActiveWindows(true)}
                  {renderStartMenu(true)}
                </div>

                {(shuttingDown || turningOn) && (
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 z-[70] pointer-events-none crt-green-flash-overlay ${
                      shuttingDown ? 'crt-green-flash-off' : 'crt-green-flash-on'
                    }`}
                  />
                )}
              </div>
            )}
          </main>

          {/* 2. SLIM #c0c0c0 TASKBAR ONLY */}
          <footer
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 z-[990] bg-[#c0c0c0] border-t border-white px-2 pt-1.5 flex items-center justify-between gap-1.5"
            style={{ paddingBottom: 'max(6px, env(safe-area-inset-bottom))' }}
          >
            <div className="flex items-center gap-1.5 min-w-0 flex-1">
              <button
                type="button"
                onClick={() => {
                  setStartOpen(!startOpen);
                  setStartSubmenu(null);
                }}
                className={`win98-btn h-[32px] px-3 gap-1.5 font-bold text-[13px] shrink-0 ${
                  startOpen ? 'is-pressed' : ''
                }`}
              >
                <WinFlagIcon size={15} />
                <span>Пуск</span>
              </button>

              {singleOpenWindow && (
                <button
                  type="button"
                  onClick={() => {
                    if (singleOpenWindow.isMinimized) {
                      focusWindow(singleOpenWindow.id);
                    } else {
                      minimizeWindow(singleOpenWindow.id);
                    }
                  }}
                  className={`h-[32px] px-2.5 flex-1 min-w-0 max-w-[200px] flex items-center gap-1.5 truncate text-[12.5px] text-left ${
                    !singleOpenWindow.isMinimized
                      ? 'win98-task-active font-bold'
                      : 'win98-btn font-normal'
                  }`}
                >
                  {renderWindowIcon(singleOpenWindow)}
                  <span className="truncate">{singleOpenWindow.title}</span>
                </button>
              )}
            </div>

            <div className="win98-status-cell h-[32px] px-2.5 flex items-center gap-1.5 shrink-0 text-[12.5px] text-black select-none">
              <TraySpeakerIcon size={14} />
              <span>{clock}</span>
            </div>
          </footer>
        </>
      ) : (
        /* ============================================================
            FULL-BLEED 1.09x PULLED-BACK ROOM SCENE (Desktop >= 1032px)
        ============================================================ */
        <div
          ref={sceneContainerRef}
          className="absolute left-1/2 top-1/2 overflow-hidden"
          style={{
            width: 'calc(1.09 * max(100vw, calc(100vh * 3376 / 1884)))',
            height: 'calc(1.09 * max(100vh, calc(100vw * 1884 / 3376)))',
            transform: isMonitorOnly
              ? 'translate(-49.59%, -51.4%)'
              : 'translate(-47.8%, -50.2%)',
          }}
        >
        {/* LAYER 0: Warm Room Base (Original Left Nokia on Desktop, Under-PC Nokia on Monitor-Only) */}
        <img
          src={isMonitorOnly ? '/images/hero-room-v17.jpg' : '/images/hero-room-v16.jpg'}
          alt="Рабочий стол с ретро-монитором"
          className="relative z-0 w-full h-full object-fill pointer-events-none select-none block"
          draggable={false}
        />

        {/* Atmospheric 3D room depth vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 68% 66% at 48% 48%, rgba(0,0,0,0) 56%, rgba(8,5,2,0.34) 100%)',
          }}
        />

        {/* Steady diagonal warm light beam from brass desk lamp */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[3] pointer-events-none mix-blend-screen"
          style={{
            background:
              'radial-gradient(ellipse 42% 52% at 17% 46%, rgba(255,208,132,0.16) 0%, rgba(255,184,96,0.07) 44%, rgba(255,170,80,0) 78%)',
          }}
        />

        {/* Localized brass lamp filament flicker (isolated solely around the lamp bulb & shade) */}
        <div
          aria-hidden="true"
          className="absolute z-[4] pointer-events-none mix-blend-screen lamp-bulb-flicker"
          style={{
            left: '0%',
            top: '8%',
            width: '26%',
            height: '48%',
          }}
        >
          <div
            className="w-full h-full"
            style={{
              background:
                'radial-gradient(circle at 34% 45%, rgba(255,236,184,0.62) 0%, rgba(255,200,110,0.28) 28%, rgba(255,175,85,0) 68%)',
            }}
          />
        </div>

        {/* ============================================================
            LAYER 0.5: LIVING BLINKING FACE & GOLDFISH VIDEO INSIDE GLASS BOWL
        ============================================================ */}
        <div
          aria-hidden="true"
          className="absolute z-[7] pointer-events-none select-none"
          style={{
            left: '15.5509%',
            top: '39.2781%',
            width: '19.5498%',
            height: '35.0318%',
          }}
        >
          <video
            ref={fishbowlVideoRef}
            src="/images/v18-fishbowl-loop.mp4"
            poster="/images/v18-fishbowl-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none block"
            style={{
              WebkitMaskImage: "url('/images/v18-fishbowl-video-mask.png')",
              maskImage: "url('/images/v18-fishbowl-video-mask.png')",
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
            }}
          />

          {/* Whisper-soft warm upper-left lamp specular & shadow depth over swimmers */}
          <img
            src="/images/v14-fishbowl-front-glare.png"
            alt=""
            draggable={false}
            className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none block"
          />
        </div>

        {/* Left CRT monitor casing occluder so the right curve of the fishbowl tucks physically behind it */}
        <img
          src="/images/v13-monitor-left-occluder.png"
          alt=""
          draggable={false}
          style={{
            left: '31.8720%',
            top: '38.2166%',
            width: '3.9692%',
            height: '37.3673%',
          }}
          className="absolute z-[8] object-fill pointer-events-none select-none block"
        />

        {/* ============================================================
            LAYER 1: CRT SCREEN OVERLAY (460x360 Virtual Win98 Canvas)
        ============================================================ */}
        <div
          ref={screenContainerRef}
          style={{
            left: '35.9893%',
            top: '25.5308%',
            width: '27.1327%',
            height: '38.1104%',
          }}
          className="absolute z-10 overflow-hidden bg-[#000000] crt-screen-cursor"
          onClick={() => {
            if (startOpen) {
              setStartOpen(false);
              setStartSubmenu(null);
            }
            setSelectedIcon(null);
          }}
        >
          <div
            style={{
              width: `${VIRTUAL_CRT_WIDTH}px`,
              height: `${VIRTUAL_CRT_HEIGHT}px`,
              transform: `scale(${crtScale.x}, ${crtScale.y})`,
              transformOrigin: 'top left',
            }}
            className="relative overflow-hidden bg-[#0d1d19]"
          >
            {!powerOn ? (
              <div
                data-click-sound="hardware"
                onClick={powerOnMonitor}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    powerOnMonitor();
                  }
                }}
                className="group w-full h-full bg-[#060907] flex flex-col items-center justify-center px-6 text-center relative"
                role="button"
                tabIndex={0}
              >
                <div className="w-[6px] h-[6px] rounded-full bg-[#86efac] shadow-[0_0_12px_4px_rgba(34,197,94,0.65)] crt-afterglow-dot" />
                <span className="mt-4 text-[12.5px] font-normal text-white/45 group-hover:text-white/80 transition-colors">
                  Нажмите на экран для включения
                </span>
              </div>
            ) : (
              <div
                className={`relative w-full h-full overflow-hidden ${
                  shuttingDown
                    ? 'crt-tv-collapsing-green pointer-events-none'
                    : turningOn
                    ? 'crt-tv-turning-on-green'
                    : ''
                }`}
              >
                {/* 1. WALLPAPER CANVAS (full 460x360 coverage) */}
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 z-0 w-full h-full pointer-events-none win98-pixelated"
                  style={{
                    objectFit: 'cover',
                    filter: 'contrast(1.06) brightness(0.95) saturate(0.9)',
                  }}
                />

                {/* Subtle CRT phosphor tint behind UI */}
                <div
                  className="absolute inset-0 z-[2] pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 45%, rgba(16, 40, 34, 0.05) 0%, rgba(6, 16, 14, 0.28) 100%)',
                  }}
                />

                {/* 2. EDGE-TO-EDGE WORKSPACE + UNCLIPPED SLIM TASKBAR */}
                <div className="relative z-20 w-[460px] h-[360px] flex flex-col justify-between overflow-hidden">
                  {/* DESKTOP WORKSPACE (460 x 334 virtual canvas) */}
                  <div
                    ref={workspaceRef}
                    className="relative flex-1 w-full overflow-hidden"
                    style={{ padding: '14px 14px 6px 16px' }}
                  >
                    {/* Desktop Identity on TOP-LEFT: Larger & Strictly Flat Typography */}
                    <div className="absolute top-[14px] left-[16px] text-left pointer-events-none z-[5]">
                      <div
                        className="font-bold text-[40px] tracking-tight uppercase leading-[0.98]"
                        style={{
                          color: '#0b1020',
                        }}
                      >
                        <div>МЕЛАНИЯ</div>
                        <div>ВАНИОСОВА</div>
                      </div>
                      <div className="inline-block mt-2 px-3 py-[3.5px] bg-[#000080] text-white font-bold text-[15.5px]">
                        дизайнер сайтов
                      </div>
                    </div>

                    {/* Desktop Shortcut Icons on TOP-RIGHT (Clear of face & name) */}
                    <div className="absolute top-[14px] right-[14px] z-[6] flex flex-col gap-2.5 w-[74px]">
                      {DESKTOP_ICONS.map((item) => {
                        const isSelected = selectedIcon === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedIcon(item.id);
                              openWindow(item.id);
                            }}
                            className="group flex flex-col items-center py-0.5 px-1 w-[74px] text-center focus:outline-none"
                          >
                            <img
                              src={item.iconSrc}
                              alt={item.label}
                              draggable={false}
                              className={`w-[32px] h-[32px] object-contain win98-pixelated drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)] transition-transform duration-75 group-hover:brightness-110 group-hover:-translate-y-[1px] ${
                                isSelected ? 'brightness-90' : ''
                              }`}
                            />
                            <span
                              className={`mt-0.5 px-1 py-[1px] text-[12px] leading-[1.15] text-white break-words transition-colors duration-75 ${
                                isSelected
                                  ? 'bg-[#000080]'
                                  : 'bg-[#07160c]/45 group-hover:bg-[#000080]/80'
                              }`}
                              style={
                                isSelected
                                  ? undefined
                                  : {
                                      textShadow:
                                        '1px 1px 0 #000000, -1px 0 0 #000000, 0 -1px 0 #000000',
                                    }
                              }
                            >
                              {item.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* ============================================================
                        SINGLE ACTIVE FULL-SCREEN WINDOWS 98 DIALOG & START MENU
                    ============================================================ */}
                    {renderActiveWindows(false)}
                    {renderStartMenu(false)}
                  </div>

                  {/* ============================================================
                      3. STRAIGHT UNCLIPPED SLIM #c0c0c0 TASKBAR
                  ============================================================ */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="relative z-[990] w-full h-[26px] bg-[#c0c0c0] border-t border-white px-[9px] pt-[1px] pb-[2px] flex items-center justify-between gap-1.5 shrink-0"
                  >
                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                      <button
                        onClick={() => {
                          setStartOpen(!startOpen);
                          setStartSubmenu(null);
                        }}
                        className={`win98-btn h-[19px] px-1.5 gap-1 font-bold text-[11.5px] shrink-0 ${
                          startOpen ? 'is-pressed' : ''
                        }`}
                      >
                        <WinFlagIcon size={14} />
                        <span>Пуск</span>
                      </button>

                      {singleOpenWindow && (
                        <button
                          onClick={() => {
                            if (singleOpenWindow.isMinimized) {
                              focusWindow(singleOpenWindow.id);
                            } else {
                              minimizeWindow(singleOpenWindow.id);
                            }
                          }}
                          className={`h-[19px] px-2 max-w-[215px] flex items-center gap-1 truncate text-[11.5px] text-left ${
                            !singleOpenWindow.isMinimized
                              ? 'win98-task-active font-bold'
                              : 'win98-btn font-normal'
                          }`}
                        >
                          {renderWindowIcon(singleOpenWindow)}
                          <span className="truncate">{singleOpenWindow.title}</span>
                        </button>
                      )}
                    </div>

                    <div className="win98-status-cell h-[19px] px-1.5 flex items-center gap-1 shrink-0 text-[11.5px] text-black select-none">
                      <TraySpeakerIcon size={14} />
                      <span>{clock}</span>
                    </div>
                  </div>
                </div>

                {/* ============================================================
                    4. RECESSED CURVED CRT GLASS TUBE OPTICS (Over Desktop, Windows & Taskbar)
                ============================================================ */}
                {/* Ultra-fine CRT scanlines + warm room ambient phosphor integration */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-[41] pointer-events-none"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(0deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 1.5px, rgba(8,14,10,0.065) 1.5px, rgba(8,14,10,0.065) 3px)',
                    backgroundColor: 'rgba(255, 228, 180, 0.045)',
                  }}
                />

                {/* Original CRT convex glass glare + curved brass lamp left-edge reflection */}
                <img
                  src="/images/hero-room-v7-glare.jpg"
                  alt=""
                  draggable={false}
                  className="absolute inset-0 z-[42] w-full h-full object-fill pointer-events-none select-none"
                  style={{
                    mixBlendMode: 'screen',
                    opacity: 0.22,
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-[43] pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse 9% 46% at 6.5% 36%, rgba(255,244,214,0.20) 0%, rgba(225,245,232,0.07) 52%, rgba(255,255,255,0) 100%), radial-gradient(ellipse at 26% 20%, rgba(255,245,220,0.10) 0%, rgba(255,255,255,0) 52%)',
                  }}
                />

                {/* Deep recessed plastic bezel shadow & curved CRT corner vignette */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-[45] pointer-events-none"
                  style={{
                    boxShadow:
                      'inset 0 0 0 1.5px rgba(10,7,3,0.78), inset 0 9px 18px rgba(8,5,2,0.56), inset 7px 0 15px rgba(10,6,2,0.38), inset -8px -6px 16px rgba(8,5,2,0.48), inset 0 0 34px rgba(4,8,6,0.34)',
                    background:
                      'radial-gradient(ellipse 78% 78% at 50% 50%, rgba(0,0,0,0) 68%, rgba(6,8,5,0.36) 100%)',
                  }}
                />
                {(shuttingDown || turningOn) && (
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 z-[70] pointer-events-none crt-green-flash-overlay ${
                      shuttingDown ? 'crt-green-flash-off' : 'crt-green-flash-on'
                    }`}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* ============================================================
            LAYER 2: STRAIGHT BEZEL APERTURE MASK
        ============================================================ */}
        <img
          src="/images/hero-room-v7-bezel.png"
          alt=""
          style={{
            left: '34.6564%',
            top: '23.0361%',
            width: '29.8578%',
            height: '43.3121%',
          }}
          className="absolute z-[25] object-fill pointer-events-none select-none block"
          draggable={false}
        />

        {/* Yellow sticky note: top-right corner on desktop, bottom-left bezel on monitor-only adaptive */}
        <button
          type="button"
          onClick={() => setStickyZoomed(true)}
          aria-label="Увеличить стикер: сайты для бизнеса с продуманной структурой и визуалом"
          title="Нажмите, чтобы приблизить стикер"
          style={
            isMonitorOnly
              ? {
                  left: '33.4%',
                  top: '64.2%',
                  width: '8.5308%',
                  height: '14.8089%',
                }
              : {
                  left: '63.15%',
                  top: '15.2%',
                  width: '8.5308%',
                  height: '14.8089%',
                }
          }
          className={`absolute z-30 block p-0 border-0 bg-transparent focus:outline-none win98-pointer transition-all duration-200 hover:scale-[1.06] ${
            isMonitorOnly ? 'hover:-rotate-[1.5deg]' : '-rotate-[15deg] hover:-rotate-[17deg]'
          } active:scale-[1.02] ${
            stickyZoomed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <img
            src="/images/v16-sticky-note.png"
            alt="Сайты для бизнеса с продуманной структурой и визуалом"
            className="w-full h-full object-contain pointer-events-none select-none block"
            draggable={false}
          />
        </button>

        {/* Naturally adhered CALL THE PHONE vinyl sticker strictly inside flat bezel */}
        <img
          src="/images/v16-call-phone-sticker.png"
          alt="Call the phone"
          style={
            isMonitorOnly
              ? {
                  left: '58.2346%',
                  top: '67.3567%',
                  width: '5.8649%',
                  height: '6.5817%',
                }
              : {
                  left: '34.9%',
                  top: '67.3567%',
                  width: '5.8649%',
                  height: '6.5817%',
                }
          }
          className="absolute z-[26] object-contain pointer-events-none select-none block"
          draggable={false}
        />

        {/* Floating warm dust motes drifting across the lamp cone (0 over CRT glass) */}
        <canvas
          ref={dustCanvasRef}
          aria-hidden="true"
          className="absolute inset-0 z-[27] w-full h-full pointer-events-none"
        />

        {/* ============================================================
            LAYER 3A: HARDWARE TOP BUTTONS (SHADOWLESS PRESSED STATE OVERLAY)
        ============================================================ */}
        {TOP_BEZEL_BUTTONS.map((btn) => {
          const isOpenActive =
            powerOn &&
            windows[btn.id].isOpen &&
            !windows[btn.id].isMinimized;
          return (
            <button
              key={btn.id}
              type="button"
              data-click-sound="hardware"
              onClick={() => openWindow(btn.id)}
              style={{
                left: btn.leftPct,
                top: '18.5775%',
                width: '4.2654%',
                height: '2.4416%',
              }}
              className="group absolute z-30 block p-0 border-0 bg-transparent focus:outline-none overflow-visible hover:brightness-[1.04]"
              title={btn.label}
              aria-label={btn.label}
            >
              <img
                src={btn.pressedSrc}
                alt=""
                draggable={false}
                style={{
                  left: '-4.1667%',
                  top: '-13.0435%',
                  width: '119.4444%',
                  height: '160.8696%',
                  maxWidth: 'none',
                }}
                className={`absolute pointer-events-none select-none block transition-opacity duration-75 ${
                  isOpenActive ? 'opacity-100' : 'opacity-0 group-active:opacity-100'
                }`}
              />
            </button>
          );
        })}

        {/* ============================================================
            LAYER 3B: RECESSED 3D HARDWARE "ЗАКАЗАТЬ САЙТ" BUTTON + HOVER/PRESSED STATES
        ============================================================ */}
        <a
          data-click-sound="hardware"
          href={footerContent.telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            left: '43.8981%',
            top: '68.3121%',
            width: '11.2559%',
            height: '4.7771%',
          }}
          className="group absolute z-30 block overflow-visible focus:outline-none"
          title="Заказать сайт в Telegram (@melanchonie)"
          aria-label="Заказать сайт в Telegram (@melanchonie)"
        >
          <img
            src="/images/v16-hover-order.png"
            alt=""
            draggable={false}
            className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none block opacity-0 group-hover:opacity-100 group-active:opacity-0 transition-opacity duration-100"
          />
          <img
            src="/images/v16-pressed-order.png"
            alt=""
            draggable={false}
            className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none block opacity-0 group-active:opacity-100 transition-opacity duration-75"
          />
        </a>

        {/* ============================================================
            LAYER 3C: INTERACTIVE NOKIA 3310 HOVER HIGHLIGHT
        ============================================================ */}
        <div
          data-click-sound="hardware"
          role="button"
          tabIndex={0}
          aria-label="Nokia 3310 — скорое взаимодействие"
          title="Nokia 3310"
          style={
            isMonitorOnly
              ? {
                  left: '39.8104%',
                  top: '81.3163%',
                  width: '19.5498%',
                  height: '12.6327%',
                  clipPath:
                    'polygon(2% 68%, 3% 38%, 11% 20%, 27% 12%, 56% 15%, 88% 25%, 96% 36%, 96% 68%, 85% 78%, 9% 79%)',
                }
              : {
                  left: '10.9597%',
                  top: '72.7176%',
                  width: '22.2156%',
                  height: '14.3312%',
                  clipPath:
                    'polygon(2% 68%, 3% 32%, 12% 14%, 34% 12%, 92% 28%, 97% 44%, 96% 74%, 85% 86%, 8% 79%)',
                }
          }
          className="group absolute z-30 block focus:outline-none win98-pointer"
        >
          <img
            src={isMonitorOnly ? '/images/v17-nokia-hover.png' : '/images/v12-nokia-hover.png'}
            alt=""
            draggable={false}
            className="w-full h-full object-fill pointer-events-none select-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200"
          />
        </div>
        </div>
      )}

      {/* ============================================================
          ZOOMED TOP-RIGHT STICKY NOTE LIGHTBOX
      ============================================================ */}
      {stickyZoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Стикер: сайты для бизнеса с продуманной структурой и визуалом"
          onClick={() => setStickyZoomed(false)}
          className="fixed inset-0 z-[180] bg-black/65 backdrop-blur-[3px] flex flex-col items-center justify-center p-6 sticky-backdrop-in"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setStickyZoomed(false);
            }}
            aria-label="Закрыть"
            title="Закрыть"
            className={`win98-btn absolute top-4 right-4 z-10 ${
              isMobile ? 'w-[36px] h-[36px]' : 'w-[32px] h-[32px]'
            }`}
          >
            <PixelCloseGlyph size={isMobile ? 18 : 14} />
          </button>
          <img
            src="/images/v16-sticky-note.png"
            alt="Сайты для бизнеса с продуманной структурой и визуалом"
            draggable={false}
            onClick={() => setStickyZoomed(false)}
            className="w-[min(86vw,460px)] max-h-[82vh] h-auto object-contain select-none sticky-zoom-in cursor-pointer"
          />
        </div>
      )}

      {/* ============================================================
          SITE PRELOADER: DARK GREEN SEGMENTED PROGRESS BAR + PERCENTAGE
      ============================================================ */}
      {!bootDone && (
        <div
          role="status"
          aria-live="polite"
          aria-label={`Загрузка сайта ${bootProgress}%`}
          className={`fixed inset-0 z-[200] bg-[#080c09] flex items-center justify-center px-6 transition-opacity duration-300 ${
            bootFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="w-[340px] max-w-[84vw] flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-[13px] tracking-[0.02em]">
              <span className="font-normal text-[#86efac]/90">Загрузка сайта...</span>
              <span className="font-bold tabular-nums text-[#4ade80]">{bootProgress}%</span>
            </div>

            <div className="p-[3px] h-[22px] bg-[#040705] border border-[#1d3a24] shadow-[inset_0_1px_4px_rgba(0,0,0,0.92)] flex items-center gap-[3px]">
              {Array.from({ length: 20 }).map((_, segIdx) => {
                const filledCount = Math.round((bootProgress / 100) * 20);
                const active = segIdx < filledCount;
                return (
                  <div
                    key={segIdx}
                    className={`h-full flex-1 transition-colors duration-75 ${
                      active
                        ? 'bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.62)]'
                        : 'bg-[#0f1a12]'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
