import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { advantages } from '@/data/content';
import { SectionTitle, CardTitle, BodyText } from '@/components/ui/Typography';

export const Advantages: React.FC = () => {
  const scrollTriggerRef = useRef<HTMLDivElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null);

  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenWidth < 744;

  // Отслеживаем скролл на десктопе/планшетах:
  const { scrollYProgress: desktopProgress } = useScroll({
    target: scrollTriggerRef,
    offset: ['start 0.65', 'end end'],
  });

  const smoothProgress = useSpring(desktopProgress, {
    stiffness: 65,
    damping: 22,
    mass: 0.45,
    restDelta: 0.0005,
  });

  // На мобилке отслеживаем прогресс скролла карточек от 0 до 1:
  const mobileProgressMotion = useMotionValue(0);
  const smoothMobileProgress = useSpring(mobileProgressMotion, {
    stiffness: 300,
    damping: 28,
    mass: 0.2,
    restDelta: 0.0001,
  });

  // На мобилке скролл карточек управляется отзывчивым аналоговым смещением (колесико, тачпад, свайп пальцем):
  useEffect(() => {
    if (!isMobile) return;

    const targetEl = scrollTriggerRef.current;
    if (!targetEl) return;

    let wheelSnapTimer: ReturnType<typeof setTimeout> | null = null;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartProg = 0;
    let isTouching = false;
    let isTouchOnAdvantages = false;
    let isHorizontalGesture = false;
    let didMoveCards = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartProg = mobileProgressMotion.get();
      isTouching = true;
      isHorizontalGesture = false;
      didMoveCards = false;

      const target = e.target as Node | null;
      isTouchOnAdvantages = !!target && targetEl.contains(target);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouching || e.touches.length !== 1) return;

      const rect = targetEl.getBoundingClientRect();
      const isDocked = rect.top <= 110 && rect.bottom >= 220;
      if (!isDocked && !isTouchOnAdvantages) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const dx = touchStartX - currentX; // > 0: свайп влево
      const dy = touchStartY - currentY; // > 0: свайп вверх
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);

      const currentProg = mobileProgressMotion.get();

      // Горизонтальный свайп по карточкам: прямое отзывчивое следование за пальцем
      if (absX > absY && absX > 6) {
        isHorizontalGesture = true;
        didMoveCards = true;
        if (e.cancelable) e.preventDefault();
        const nextProg = Math.max(0, Math.min(1, touchStartProg + dx / 800));
        mobileProgressMotion.set(nextProg);
        return;
      }

      // Вертикальный свайп только при фиксации секции в рабочей зоне экрана:
      if (!isHorizontalGesture && absY > absX && absY > 6 && isDocked) {
        if (dy > 0 && currentProg < 0.985) {
          didMoveCards = true;
          if (e.cancelable) e.preventDefault();
          const nextProg = Math.min(1, touchStartProg + dy / 550);
          mobileProgressMotion.set(nextProg);
          return;
        } else if (dy < 0 && currentProg > 0.015) {
          didMoveCards = true;
          if (e.cancelable) e.preventDefault();
          const nextProg = Math.max(0, touchStartProg - Math.abs(dy) / 550);
          mobileProgressMotion.set(nextProg);
          return;
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isTouching) return;
      isTouching = false;
      if (!didMoveCards) return;
      didMoveCards = false;

      const currentX = e.changedTouches[0]?.clientX ?? touchStartX;
      const currentY = e.changedTouches[0]?.clientY ?? touchStartY;
      const dx = touchStartX - currentX;
      const dy = touchStartY - currentY;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);

      const currentProg = mobileProgressMotion.get();

      // Динамичный довод к карточке при завершении жеста:
      if (absX > absY && absX > 20) {
        if (dx > 20) {
          mobileProgressMotion.set(Math.min(1, Math.ceil(currentProg * 4) / 4));
        } else if (dx < -20) {
          mobileProgressMotion.set(Math.max(0, Math.floor(currentProg * 4) / 4));
        } else {
          mobileProgressMotion.set(Math.round(currentProg * 4) / 4);
        }
        return;
      }

      if (absY > absX && absY > 20) {
        if (dy > 20 && currentProg < 0.985) {
          mobileProgressMotion.set(Math.min(1, Math.ceil(currentProg * 4) / 4));
        } else if (dy < -20 && currentProg > 0.015) {
          mobileProgressMotion.set(Math.max(0, Math.floor(currentProg * 4) / 4));
        } else {
          mobileProgressMotion.set(Math.round(currentProg * 4) / 4);
        }
        return;
      }

      if (currentProg > 0.03 && currentProg < 0.97) {
        mobileProgressMotion.set(Math.round(currentProg * 4) / 4);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const rect = targetEl.getBoundingClientRect();
      const isDocked = rect.top <= 95 && rect.bottom >= 200;
      if (!isDocked) return;

      const deltaY = e.deltaY;
      const deltaX = e.deltaX;
      const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
      if (Math.abs(delta) < 2) return;

      const currentProg = mobileProgressMotion.get();

      // Скролл вниз / листание вперед (delta > 0):
      if (delta > 0) {
        if (currentProg < 0.985) {
          if (e.cancelable) e.preventDefault();
          // Отзывчивый лёгкий ход: ~180px скролла на одну карточку (720px на 4 перехода)
          const nextProg = Math.min(1, currentProg + Math.abs(delta) / 720);
          mobileProgressMotion.set(nextProg);

          // Мягкий довод к карточке при остановке прокрутки:
          if (wheelSnapTimer) clearTimeout(wheelSnapTimer);
          wheelSnapTimer = setTimeout(() => {
            const p = mobileProgressMotion.get();
            if (p > 0.03 && p < 0.97) {
              mobileProgressMotion.set(Math.round(p * 4) / 4);
            }
          }, 90);
          return;
        } else {
          // Уже на 5-й карточке: скролл свободно продолжается вниз к Услугам
        }
      }

      // Скролл вверх / листание назад (delta < 0):
      if (delta < 0) {
        if (currentProg > 0.015) {
          if (e.cancelable) e.preventDefault();
          const nextProg = Math.max(0, currentProg - Math.abs(delta) / 720);
          mobileProgressMotion.set(nextProg);

          if (wheelSnapTimer) clearTimeout(wheelSnapTimer);
          wheelSnapTimer = setTimeout(() => {
            const p = mobileProgressMotion.get();
            if (p > 0.03 && p < 0.97) {
              mobileProgressMotion.set(Math.round(p * 4) / 4);
            }
          }, 90);
          return;
        } else {
          // Уже на 1-й карточке: скролл свободно продолжается вверх к Кейсам
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      if (wheelSnapTimer) clearTimeout(wheelSnapTimer);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [isMobile, mobileProgressMotion]);

  // Появление карточек на десктопе:
  const cardOpacity0 = useTransform(smoothProgress, [0.00, 0.12], [0, 1]);
  const cardY0 = useTransform(smoothProgress, [0.00, 0.12], [36, 0]);

  const cardOpacity1 = useTransform(smoothProgress, [0.09, 0.21], [0, 1]);
  const cardY1 = useTransform(smoothProgress, [0.09, 0.21], [36, 0]);

  const cardOpacity2 = useTransform(smoothProgress, [0.18, 0.30], [0, 1]);
  const cardY2 = useTransform(smoothProgress, [0.18, 0.30], [36, 0]);

  const cardOpacity3 = useTransform(smoothProgress, [0.27, 0.39], [0, 1]);
  const cardY3 = useTransform(smoothProgress, [0.27, 0.39], [36, 0]);

  const cardOpacity4 = useTransform(smoothProgress, [0.42, 0.62], [0, 1]);
  const cardY4 = useTransform(smoothProgress, [0.42, 0.62], [36, 0]);

  const cardAnimations = [
    { opacity: cardOpacity0, y: cardY0 },
    { opacity: cardOpacity1, y: cardY1 },
    { opacity: cardOpacity2, y: cardY2 },
    { opacity: cardOpacity3, y: cardY3 },
    { opacity: cardOpacity4, y: cardY4 },
  ];

  // Горизонтальный сдвиг ленты на десктопе:
  const desktopTrackProgress = useTransform(
    smoothProgress,
    [0.36, 0.92],
    [0, 1]
  );

  const desktopTrackTransform = useTransform(desktopTrackProgress, (t) => {
    const clamped = Math.min(1, Math.max(0, t));
    const ease = -(Math.cos(Math.PI * clamped) - 1) / 2;
    if (screenWidth >= 1400) {
      return `calc(${-25 * ease}% - ${8 * ease}px)`;
    } else if (screenWidth >= 1024) {
      return `calc(${-25 * ease}% - ${2.5 * ease}px)`;
    } else if (screenWidth >= 744) {
      return `calc(${-66.667 * ease}% - ${10 * ease}px)`;
    } else {
      return `0px`;
    }
  });

  // Плавный физический трансформ для ленты карточек на мобилке (0..1):
  const mobileTrackTransform = useTransform(smoothMobileProgress, (t) => {
    const clamped = Math.max(0, Math.min(1, t));
    const val = clamped * 4; // 0..4
    const i = Math.floor(val);
    const frac = val - i;
    if (i >= 4) return 'calc(-290% - 48px)';

    const basePercents = [0, -78, -156, -234, -290];
    const basePixels = [0, -12, -24, -36, -48];

    const p1 = basePercents[i];
    const p2 = basePercents[i + 1];
    const px1 = basePixels[i];
    const px2 = basePixels[i + 1];

    const currentP = p1 + (p2 - p1) * frac;
    const currentPx = px1 + (px2 - px1) * frac;

    return `calc(${currentP}% + ${currentPx}px)`;
  });

  const trackTransform = isMobile ? mobileTrackTransform : desktopTrackTransform;

  // Акцентное увеличение иконки при въезде карточки в фокус (десктоп):
  const imgScale0 = useTransform(smoothProgress, [0.00, 0.08, 0.14], [0.92, 1.08, 1]);
  const imgScale1 = useTransform(smoothProgress, [0.09, 0.17, 0.23], [0.92, 1.08, 1]);
  const imgScale2 = useTransform(smoothProgress, [0.18, 0.26, 0.32], [0.92, 1.08, 1]);
  const imgScale3 = useTransform(smoothProgress, [0.27, 0.35, 0.41], [0.92, 1.08, 1]);
  const imgScale4 = useTransform(smoothProgress, [0.42, 0.52, 0.62], [0.92, 1.08, 1]);

  const imgScales = [imgScale0, imgScale1, imgScale2, imgScale3, imgScale4];

  return (
    <div
      ref={scrollTriggerRef}
      id="advantages"
      className="relative bg-[#FEF9F4] max-[743px]:h-auto min-[744px]:h-[170vh] min-[1400px]:h-[185vh]"
    >
      {/* Пин-контейнер: без растяжения на 100vh, чтобы не создавать пустых отступов сверху и снизу */}
      <div className="relative min-[744px]:sticky min-[744px]:top-0 w-full flex flex-col justify-start z-10 pt-[50px] min-[744px]:pt-[85px] lg:pt-[100px] min-[1400px]:pt-[115px] pb-[10px] min-[744px]:pb-[20px] overflow-x-clip">
        <section className="w-full overflow-x-clip">
          {/* Заголовок: строго единый отступ снизу */}
          <div className="w-full mb-[24px] min-[744px]:mb-[36px] min-[1400px]:mb-[48px]">
            <div className="w-full max-w-[1920px] mx-auto px-5 lg:px-[40px] xl:px-[60px] lg:max-[1399px]:!px-[50px] min-[744px]:max-[1023px]:!px-[25px] flex justify-start min-[744px]:justify-end">
              <SectionTitle className="text-left min-[744px]:text-right whitespace-nowrap">
                МОИ ПРЕИМУЩЕСТВА
              </SectionTitle>
            </div>
          </div>

          {/* Лента карточек: управляемый скроллом и свайпом фрейм */}
          <motion.div
            ref={trackContainerRef}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[1920px] mx-auto px-5 lg:px-[40px] xl:px-[60px] lg:max-[1399px]:!px-[50px] min-[744px]:max-[1023px]:!px-[25px] relative z-10 overflow-visible"
          >
            <motion.div
              style={{ x: trackTransform }}
              className="flex flex-nowrap items-stretch gap-[12px] min-[744px]:max-[1023px]:gap-[15px] lg:max-[1399px]:gap-[10px] min-[1400px]:gap-[32px] will-change-transform select-none"
            >
              {advantages.map((adv, index) => {
                const cardAnim = cardAnimations[index] || cardAnimations[cardAnimations.length - 1];
                const imgScale = imgScales[index] || imgScales[imgScales.length - 1];
                return (
                  <motion.div
                    key={index}
                    onClick={() => {
                      if (isMobile) {
                        mobileProgressMotion.set(index / 4);
                      }
                    }}
                    style={{
                      opacity: isMobile ? 1 : cardAnim.opacity,
                      y: isMobile ? 0 : cardAnim.y,
                    }}
                    className="relative shrink-0 w-[78%] cursor-pointer select-none max-[743px]:aspect-auto max-[743px]:h-auto min-[744px]:max-[1023px]:w-[calc((100%-30px)/3)] lg:max-[1399px]:w-[calc((100%-30px)/4)] min-[1400px]:w-[calc((100%-96px)/4)] min-[1400px]:aspect-square flex flex-col justify-between items-start text-left will-change-[transform,opacity] transform-gpu bg-[#FA7250] p-[18px] max-[743px]:pb-[36px] min-[744px]:p-6 min-[1200px]:p-7 min-[1400px]:p-8 rounded-none"
                  >
                    {/* Иконка преимущества */}
                    <div className="relative z-10 h-[105px] min-[390px]:h-[115px] min-[744px]:h-[125px] lg:h-[140px] min-[1400px]:h-[150px] min-[1600px]:h-[185px] mb-[10px] min-[744px]:mb-[16px] min-[1400px]:mb-[20px] w-full flex items-center justify-center shrink-0">
                      <motion.img
                        style={{ scale: isMobile ? 1 : imgScale }}
                        src={adv.icon}
                        alt={adv.title}
                        loading="lazy"
                        decoding="async"
                        className="max-h-full max-w-full w-auto h-auto object-contain select-none pointer-events-none will-change-transform transform-gpu"
                      />
                    </div>

                    {/* Текстовая часть: нижнее расстояние увеличено в 2 раза (pb-[36px] против pt-[18px]) */}
                    <div className="w-full min-w-0 flex flex-col items-start text-left gap-[6px] min-[744px]:gap-[15px]">
                      <CardTitle className="text-left !text-[#FEF9F4]">
                        {adv.title}
                      </CardTitle>
                      <BodyText className="text-left !text-[#FEF9F4] break-words">
                        {adv.description}
                      </BodyText>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};
