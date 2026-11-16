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
  const totalSteps = Math.max(1, advantages.length - 1);

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

      // Горизонтальный свайп по карточкам: прямое отзывчивое следование за пальцем (~200px на карточку)
      if (absX > absY && absX > 6) {
        isHorizontalGesture = true;
        didMoveCards = true;
        if (e.cancelable) e.preventDefault();
        const nextProg = Math.max(0, Math.min(1, touchStartProg + dx / (200 * totalSteps)));
        mobileProgressMotion.set(nextProg);
        return;
      }

      // Вертикальный свайп только при фиксации секции в рабочей зоне экрана:
      if (!isHorizontalGesture && absY > absX && absY > 6 && isDocked) {
        if (dy > 0 && currentProg < 0.985) {
          didMoveCards = true;
          if (e.cancelable) e.preventDefault();
          const nextProg = Math.min(1, touchStartProg + dy / (140 * totalSteps));
          mobileProgressMotion.set(nextProg);
          return;
        } else if (dy < 0 && currentProg > 0.015) {
          didMoveCards = true;
          if (e.cancelable) e.preventDefault();
          const nextProg = Math.max(0, touchStartProg - Math.abs(dy) / (140 * totalSteps));
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
          mobileProgressMotion.set(Math.min(1, Math.ceil(currentProg * totalSteps) / totalSteps));
        } else if (dx < -20) {
          mobileProgressMotion.set(Math.max(0, Math.floor(currentProg * totalSteps) / totalSteps));
        } else {
          mobileProgressMotion.set(Math.round(currentProg * totalSteps) / totalSteps);
        }
        return;
      }

      if (absY > absX && absY > 20) {
        if (dy > 20 && currentProg < 0.985) {
          mobileProgressMotion.set(Math.min(1, Math.ceil(currentProg * totalSteps) / totalSteps));
        } else if (dy < -20 && currentProg > 0.015) {
          mobileProgressMotion.set(Math.max(0, Math.floor(currentProg * totalSteps) / totalSteps));
        } else {
          mobileProgressMotion.set(Math.round(currentProg * totalSteps) / totalSteps);
        }
        return;
      }

      if (currentProg > 0.03 && currentProg < 0.97) {
        mobileProgressMotion.set(Math.round(currentProg * totalSteps) / totalSteps);
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
          // Отзывчивый лёгкий ход: ~180px скролла на одну карточку
          const nextProg = Math.min(1, currentProg + Math.abs(delta) / (180 * totalSteps));
          mobileProgressMotion.set(nextProg);

          // Мягкий довод к карточке при остановке прокрутки:
          if (wheelSnapTimer) clearTimeout(wheelSnapTimer);
          wheelSnapTimer = setTimeout(() => {
            const p = mobileProgressMotion.get();
            if (p > 0.03 && p < 0.97) {
              mobileProgressMotion.set(Math.round(p * totalSteps) / totalSteps);
            }
          }, 90);
          return;
        }
      }

      // Скролл вверх / листание назад (delta < 0):
      if (delta < 0) {
        if (currentProg > 0.015) {
          if (e.cancelable) e.preventDefault();
          const nextProg = Math.max(0, currentProg - Math.abs(delta) / (180 * totalSteps));
          mobileProgressMotion.set(nextProg);

          if (wheelSnapTimer) clearTimeout(wheelSnapTimer);
          wheelSnapTimer = setTimeout(() => {
            const p = mobileProgressMotion.get();
            if (p > 0.03 && p < 0.97) {
              mobileProgressMotion.set(Math.round(p * totalSteps) / totalSteps);
            }
          }, 90);
          return;
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
  }, [isMobile, mobileProgressMotion, totalSteps]);

  // Горизонтальный сдвиг ленты на десктопе:
  const desktopTrackProgress = useTransform(
    smoothProgress,
    [0.25, 0.92],
    [0, 1]
  );

  const desktopTrackTransform = useTransform(desktopTrackProgress, (t) => {
    const clamped = Math.min(1, Math.max(0, t));
    const ease = -(Math.cos(Math.PI * clamped) - 1) / 2;
    if (screenWidth >= 1400) {
      const extraCols = Math.max(0, advantages.length - 4);
      return `calc(${-25 * extraCols * ease}% - ${8 * extraCols * ease}px)`;
    } else if (screenWidth >= 1024) {
      const extraCols = Math.max(0, advantages.length - 4);
      return `calc(${-25 * extraCols * ease}% - ${2.5 * extraCols * ease}px)`;
    } else if (screenWidth >= 744) {
      const extraCols = Math.max(0, advantages.length - 3);
      return `calc(${-(100 / 3) * extraCols * ease}% - ${5 * extraCols * ease}px)`;
    } else {
      return `0px`;
    }
  });

  // Плавный физический трансформ для ленты карточек на мобилке (0..1):
  const mobileTrackTransform = useTransform(smoothMobileProgress, (t) => {
    const clamped = Math.max(0, Math.min(1, t));
    const val = clamped * totalSteps;
    const i = Math.floor(val);
    const frac = val - i;

    const getPercent = (idx: number) =>
      idx >= totalSteps ? -(advantages.length * 78 - 100) : -78 * idx;
    const getPx = (idx: number) => -12 * Math.min(idx, totalSteps);

    if (i >= totalSteps) {
      return `calc(${getPercent(totalSteps)}% + ${getPx(totalSteps)}px)`;
    }

    const p1 = getPercent(i);
    const p2 = getPercent(i + 1);
    const px1 = getPx(i);
    const px2 = getPx(i + 1);

    const currentP = p1 + (p2 - p1) * frac;
    const currentPx = px1 + (px2 - px1) * frac;

    return `calc(${currentP}% + ${currentPx}px)`;
  });

  const trackTransform = isMobile ? mobileTrackTransform : desktopTrackTransform;

  return (
    <div
      ref={scrollTriggerRef}
      id="advantages"
      className="relative bg-[#FEF9F4] max-[743px]:h-auto min-[744px]:h-[210vh] min-[1400px]:h-[225vh]"
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
              {advantages.map((adv, index) => (
                <motion.div
                  key={adv.title}
                  onClick={() => {
                    if (isMobile) {
                      mobileProgressMotion.set(index / totalSteps);
                    }
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{
                    duration: 0.65,
                    delay: Math.min(index, 3) * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative shrink-0 w-[78%] cursor-pointer select-none max-[743px]:aspect-auto max-[743px]:h-auto min-[744px]:max-[1023px]:w-[calc((100%-30px)/3)] lg:max-[1399px]:w-[calc((100%-30px)/4)] min-[1400px]:w-[calc((100%-96px)/4)] min-[1400px]:aspect-square flex flex-col justify-start items-start text-left will-change-[transform,opacity] transform-gpu bg-[#FEF9F4] border border-[#FA7250] p-[18px] max-[743px]:pb-[32px] min-[744px]:p-6 min-[1200px]:p-7 min-[1400px]:p-8 rounded-none"
                >
                  {/* Иконка преимущества фиксированной высоты, чтобы заголовки всех карточек начинались строго на одной общей верхней линии */}
                  <div className="relative z-10 h-[105px] min-[390px]:h-[115px] min-[744px]:h-[125px] lg:h-[135px] min-[1400px]:h-[145px] min-[1600px]:h-[175px] mb-[14px] min-[744px]:mb-[20px] min-[1400px]:mb-[24px] w-full flex items-center justify-center shrink-0">
                    <img
                      src={adv.icon}
                      alt={adv.title}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full w-auto h-auto object-contain select-none pointer-events-none"
                    />
                  </div>

                  {/* Текстовая часть: все заголовки карточек выровнены по одной верхней направляющей */}
                  <div className="w-full min-w-0 flex flex-col items-start text-left gap-[8px] min-[744px]:gap-[12px] min-[1400px]:gap-[15px]">
                    <CardTitle className="text-left">
                      {adv.title}
                    </CardTitle>
                    <BodyText className="text-left break-words">
                      {adv.description}
                    </BodyText>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};
