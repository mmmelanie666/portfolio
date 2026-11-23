import React from 'react';
import { Header } from '@/sections/Header';
import { Hero } from '@/sections/Hero';
import { Advantages } from '@/sections/Advantages';
import { Services } from '@/sections/Services';
import { Process } from '@/sections/Process';
import { Cases } from '@/sections/Cases';
import { Footer } from '@/sections/Footer';
import { handleInteractiveClickSound } from '@/utils/retroSound';

const LegacyV1Page: React.FC<{ onSwitchToV2: () => void }> = ({ onSwitchToV2 }) => {
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
      className="min-h-screen bg-[#FEF9F4] text-slate-900 font-sans selection:bg-coral-200 selection:text-coral-900"
    >
      <button
        onClick={onSwitchToV2}
        className="fixed bottom-4 right-4 z-50 win98-btn px-3 py-1.5 text-[11px] max-[1031px]:min-h-[44px] max-[1031px]:min-w-[44px] max-[1031px]:px-4 max-[1031px]:text-[13px] font-bold flex items-center gap-1.5 shadow-md"
        style={{ fontFamily: "'PT Sans', sans-serif" }}
      >
        <img
          src="/images/win98/my-computer.png?v=motif2"
          alt=""
          className="w-[16px] h-[16px] win98-pixelated"
        />
        <span>Версия 2 (fifows18)</span>
      </button>
      <Header />
      <main>
        <Hero />
        <Advantages />
        <Services />
        <Process />
        <Cases />
      </main>
      <Footer />
    </div>
  );
};

export default LegacyV1Page;
