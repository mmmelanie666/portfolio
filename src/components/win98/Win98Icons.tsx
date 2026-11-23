import React from 'react';

interface MotifIconProps {
  src: string;
  size: number;
}

const MotifImgIcon: React.FC<MotifIconProps> = ({ src, size }) => (
  <img
    src={src}
    alt=""
    width={size}
    height={size}
    style={{ width: size, height: size }}
    className="object-contain win98-pixelated shrink-0 select-none"
    draggable={false}
  />
);

export const WinFlagIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <MotifImgIcon src="/images/win98/motif/start-flag.png" size={size} />
);

export const PixelMinimizeGlyph: React.FC<{ size?: number }> = ({ size = 9 }) => (
  <svg width={size} height={size} viewBox="0 0 9 9" shapeRendering="crispEdges">
    <rect x="1" y="6" width="6" height="2" fill="#1C2236" />
  </svg>
);

export const PixelMaximizeGlyph: React.FC<{ isMaximized?: boolean; size?: number }> = ({
  isMaximized,
  size = 9,
}) =>
  isMaximized ? (
    <svg width={size} height={size} viewBox="0 0 9 9" shapeRendering="crispEdges">
      <rect x="3" y="1" width="5" height="1" fill="#1C2236" />
      <rect x="7" y="2" width="1" height="4" fill="#1C2236" />
      <rect x="6" y="5" width="1" height="1" fill="#1C2236" />
      <rect x="3" y="2" width="1" height="1" fill="#1C2236" />
      <rect x="1" y="3" width="5" height="2" fill="#1C2236" />
      <rect x="1" y="5" width="1" height="3" fill="#1C2236" />
      <rect x="5" y="5" width="1" height="3" fill="#1C2236" />
      <rect x="1" y="7" width="5" height="1" fill="#1C2236" />
    </svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 9 9" shapeRendering="crispEdges">
      <rect x="1" y="1" width="7" height="2" fill="#1C2236" />
      <rect x="1" y="3" width="1" height="5" fill="#1C2236" />
      <rect x="7" y="3" width="1" height="5" fill="#1C2236" />
      <rect x="1" y="7" width="7" height="1" fill="#1C2236" />
    </svg>
  );

export const PixelCloseGlyph: React.FC<{ size?: number }> = ({ size = 9 }) => (
  <svg width={size} height={size} viewBox="0 0 9 9" shapeRendering="crispEdges">
    <rect x="1" y="1" width="2" height="1" fill="#1C2236" />
    <rect x="6" y="1" width="2" height="1" fill="#1C2236" />
    <rect x="2" y="2" width="2" height="1" fill="#1C2236" />
    <rect x="5" y="2" width="2" height="1" fill="#1C2236" />
    <rect x="3" y="3" width="3" height="2" fill="#1C2236" />
    <rect x="2" y="5" width="2" height="1" fill="#1C2236" />
    <rect x="5" y="5" width="2" height="1" fill="#1C2236" />
    <rect x="1" y="6" width="2" height="1" fill="#1C2236" />
    <rect x="6" y="6" width="2" height="1" fill="#1C2236" />
  </svg>
);

export const PixelHelpGlyph: React.FC<{ size?: number }> = ({ size = 9 }) => (
  <svg width={size} height={size} viewBox="0 0 9 9" shapeRendering="crispEdges">
    <rect x="2" y="1" width="4" height="1" fill="#1C2236" />
    <rect x="1" y="2" width="2" height="1" fill="#1C2236" />
    <rect x="5" y="2" width="2" height="2" fill="#1C2236" />
    <rect x="4" y="4" width="2" height="1" fill="#1C2236" />
    <rect x="3" y="5" width="2" height="1" fill="#1C2236" />
    <rect x="3" y="7" width="2" height="1" fill="#1C2236" />
  </svg>
);

export const PixelArrowRightGlyph: React.FC<{ active?: boolean }> = ({ active }) => (
  <svg width="8" height="8" viewBox="0 0 8 8" shapeRendering="crispEdges">
    <rect x="2" y="1" width="1" height="6" fill={active ? '#ffffff' : '#1C2236'} />
    <rect x="3" y="2" width="1" height="4" fill={active ? '#ffffff' : '#1C2236'} />
    <rect x="4" y="3" width="1" height="2" fill={active ? '#ffffff' : '#1C2236'} />
  </svg>
);

export const ShowDesktopIcon: React.FC = () => (
  <MotifImgIcon src="/images/win98/my-computer.png?v=motif2" size={14} />
);

export const TraySpeakerIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <MotifImgIcon src="/images/win98/motif/tray-speaker.png" size={size} />
);

export const TrayDialupIcon: React.FC<{ blink: boolean }> = ({ blink }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" shapeRendering="crispEdges">
    <rect x="1" y="2" width="8" height="6" fill="#1D2C52" />
    <rect x="2" y="3" width="6" height="4" fill={blink ? '#FA7250' : '#5374BC'} />
    <rect x="3" y="8" width="4" height="2" fill="#849ED4" />
    <rect x="6" y="6" width="9" height="7" fill="#1D2C52" />
    <rect x="7" y="7" width="7" height="5" fill={blink ? '#A9C1E8' : '#FA7250'} />
    <rect x="8" y="13" width="5" height="2" fill="#849ED4" />
  </svg>
);

export const PixelSmileyIcon: React.FC<{ state: 'happy' | 'dead' | 'cool'; size?: number }> = ({
  state,
  size = 16,
}) => <MotifImgIcon src={`/images/win98/motif/smiley-${state}.png`} size={size} />;

export const PixelMineIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <MotifImgIcon src="/images/win98/motif/mine.png" size={size} />
);

export const PixelSettingsIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <MotifImgIcon src="/images/win98/motif/settings.png" size={size} />
);

export const PixelShutdownIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <MotifImgIcon src="/images/win98/motif/shutdown.png" size={size} />
);

export const PixelMinesweeperMenuIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <MotifImgIcon src="/images/win98/motif/minesweeper.png" size={size} />
);

export const PixelTelegramIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <MotifImgIcon src="/images/win98/motif/social-telegram.png" size={size} />
);

export const PixelThreadsIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <MotifImgIcon src="/images/win98/motif/social-threads.png" size={size} />
);

export const PixelInstagramIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <MotifImgIcon src="/images/win98/motif/social-instagram.png" size={size} />
);

export const PixelBehanceIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <MotifImgIcon src="/images/win98/motif/social-behance.png" size={size} />
);

export const PixelPinterestIcon: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <MotifImgIcon src="/images/win98/motif/social-pinterest.png" size={size} />
);

export const PixelAdvExperienceIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <MotifImgIcon src="/images/win98/motif/adv-experience.png" size={size} />
);

export const PixelAdvFlexIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <MotifImgIcon src="/images/win98/motif/adv-flex.png" size={size} />
);

export const PixelAdvProcessIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <MotifImgIcon src="/images/win98/motif/adv-process.png" size={size} />
);

export const PixelAdvFocusIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <MotifImgIcon src="/images/win98/motif/adv-focus.png" size={size} />
);

export const PixelAdvAdaptiveIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <MotifImgIcon src="/images/win98/motif/adv-adaptive.png" size={size} />
);

export const PixelAdvCodeIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <MotifImgIcon src="/images/win98/motif/adv-code.png" size={size} />
);

export const PixelAdvAiIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <MotifImgIcon src="/images/win98/motif/adv-ai.png" size={size} />
);
