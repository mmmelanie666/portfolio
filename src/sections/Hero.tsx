import React, { useRef, useState, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { heroContent, footerContent } from '@/data/content';

export const Hero: React.FC = () => {
  const photoRef = useRef<HTMLDivElement>(null);
  const [photoHeight, setPhotoHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = photoRef.current;
    if (!el) return;

    const updateHeight = () => {
      if (window.innerWidth >= 744) {
        setPhotoHeight(el.getBoundingClientRect().height);
      } else {
        setPhotoHeight(null);
      }
    };

    updateHeight();

    const ro = new ResizeObserver(() => {
      updateHeight();
    });
    ro.observe(el);

    window.addEventListener('resize', updateHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <section
      className="relative min-h-[auto] min-[1200px]:min-h-screen flex flex-col overflow-x-clip bg-[#FEF9F4] mb-0"
      id="hero"
    >
      <div className="w-full max-w-[1920px] mx-auto px-5 min-[744px]:max-[1023px]:!px-[25px] lg:max-[1399px]:!px-[50px] min-[1400px]:px-[80px] relative z-10 flex-1 flex flex-col justify-center pt-[95px] min-[744px]:pt-[125px] min-[1400px]:pt-[140px] pb-0">
        <div className="w-full flex-1 flex flex-col min-[744px]:flex-row justify-between items-center min-[744px]:items-start gap-[36px] min-[744px]:gap-[20px] min-[860px]:gap-[24px] lg:gap-[32px] min-[1400px]:gap-[40px] min-[744px]:max-[1199px]:my-0 min-[1200px]:my-auto">
          
          {/* ЛЕВАЯ КОЛОНКА: высота строго равна высоте фото (подпись сверху вровень с верхом фото, кнопка снизу строго вровень с низом фото) */}
          <div
            style={photoHeight ? { height: `${photoHeight}px` } : undefined}
            className="w-full min-[744px]:w-auto flex-1 min-w-0 flex flex-col justify-between items-start text-left"
          >
            <div className="flex flex-col items-start gap-[16px] min-[744px]:gap-[20px] lg:gap-[24px] min-[1400px]:gap-[32px]">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[#FA7250] font-bold leading-[1.07] text-[12px] min-[744px]:text-[14px] lg:text-[16px] min-[1400px]:text-[18px]"
              >
                {heroContent.preTitle}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="text-[#FA7250] font-bold leading-[1.07] text-[22px] min-[400px]:text-[24px] min-[744px]:text-[26px] min-[860px]:text-[30px] lg:text-[40px] xl:text-[48px] min-[1400px]:text-[64px] w-full max-w-full"
              >
                <span className="min-[540px]:hidden">
                  Проектирую сайты<br />
                  для&nbsp;бизнеса<br />
                  с&nbsp;продуманной структурой<br />
                  и&nbsp;крутым визуалом
                </span>
                <span className="hidden min-[540px]:inline">
                  Проектирую сайты для&nbsp;бизнеса<br />
                  с&nbsp;продуманной структурой<br />
                  и&nbsp;крутым визуалом
                </span>
              </motion.h1>
            </div>

            {/* Кнопка "заказать сайт" на 744px+: выровнена строго по одной горизонтальной линии с нижним краем фотографии */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.5 }}
              className="hidden min-[744px]:inline-flex relative mt-[40px]"
            >
              <a
                href={footerContent.telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 bg-[#FA7250] text-[#FEF9F4] w-[280px] min-[860px]:w-[320px] lg:w-[360px] xl:w-[410px] min-[1400px]:w-[490px] h-[60px] lg:h-[78px] min-[1400px]:h-[98px] inline-flex items-center justify-center font-bold text-[16px] lg:text-[20px] min-[1400px]:text-[24px] leading-[1.07] hover:bg-[#EB4F2E] transition-colors text-center whitespace-nowrap"
              >
                {heroContent.cta}
              </a>
            </motion.div>
          </div>

          {/* ПРАВАЯ КОЛОНКА: Фото масштабируется с сохранением пропорций, строго не превышая 40% экрана */}
          <div
            ref={photoRef}
            className="relative shrink-0 w-[275px] min-[744px]:w-[38%] min-[1200px]:w-[40%] min-[744px]:max-w-[40%] max-w-[560px] min-[1400px]:max-w-[620px] aspect-[924/1058] max-h-[calc(100vh-170px)] mr-0 min-[744px]:mr-[10px] lg:mr-[16px] min-[1400px]:mr-[24px] self-center min-[744px]:self-start"
          >
            {/* Заблюренный элемент позади левого нижнего угла фотографии: появляется первым */}
            <motion.img
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 0.95, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              src="/stages/stages-1.svg"
              alt=""
              decoding="async"
              className="pointer-events-none select-none absolute z-0 -left-[35%] -bottom-[14%] w-[75%] h-auto max-w-none transform-gpu"
            />

            {/* Фотография: появляется следом за блюром */}
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              src="/images/hero-photo.jpg"
              alt="Мелания Ваниосова"
              fetchPriority="high"
              decoding="async"
              className="relative z-10 w-full h-full object-cover select-none"
            />

            {/* Контурный цветок на правом верхнем углу фотографии */}
            <motion.svg
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              viewBox="117 55 150 137"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none select-none absolute z-20 -top-[17.4%] -right-[18.1%] w-[30%] h-auto overflow-visible"
            >
              <path
                d="M218.891 189.261C234.882 184.783 225.017 161.016 218.085 149.693C238.259 142.577 275.537 123.994 263.25 106.593C250.963 89.192 219.421 109.216 205.186 121.403C207.542 99.0746 207.07 54.654 186.337 55.5953C165.604 56.5365 171.594 95.9129 177.18 115.483C162.046 104.76 129.241 86.0895 119.091 97.1982C108.941 108.307 136.989 126.901 152.282 134.809C137.994 144.402 112.739 167.412 126.02 182.716C139.302 198.02 164.134 175.451 174.89 162.253C182.894 173.122 202.899 193.74 218.891 189.261Z"
                stroke="#FA7250"
                strokeWidth="1.2"
              />
            </motion.svg>
          </div>

          {/* Кнопка "заказать сайт" на мобилке (< 744px): под фотографией */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="min-[744px]:hidden relative w-full mt-auto pt-[15px]"
          >
            <a
              href={footerContent.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 bg-[#FA7250] text-[#FEF9F4] w-full py-[20px] px-[40px] inline-flex items-center justify-center font-bold text-[18px] leading-[1.07] hover:bg-[#EB4F2E] transition-colors text-center"
            >
              {heroContent.cta}
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
