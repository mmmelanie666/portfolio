import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { advantages } from '@/data/content';
import { SectionTitle, CardTitle, BodyText } from '@/components/ui/Typography';

export const Advantages: React.FC = () => {
  const scrollTriggerRef = useRef<HTMLDivElement>(null);
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenWidth < 744;

  // Отслеживаем вертикальный скролл пин-секции на всех разрешениях (включая мобилку)
  const { scrollYProgress } = useScroll({
    target: scrollTriggerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 22,
    mass: 0.45,
    restDelta: 0.0005,
  });

  // Появление каждой карточки по вертикальному скроллу:
  const cardOpacity0 = useTransform(smoothProgress, isMobile ? [0.00, 0.12] : [0.00, 0.12], [0, 1]);
  const cardY0 = useTransform(smoothProgress, isMobile ? [0.00, 0.12] : [0.00, 0.12], [36, 0]);

  const cardOpacity1 = useTransform(smoothProgress, isMobile ? [0.10, 0.25] : [0.09, 0.21], [0, 1]);
  const cardY1 = useTransform(smoothProgress, isMobile ? [0.10, 0.25] : [0.09, 0.21], [36, 0]);

  const cardOpacity2 = useTransform(smoothProgress, isMobile ? [0.26, 0.43] : [0.18, 0.30], [0, 1]);
  const cardY2 = useTransform(smoothProgress, isMobile ? [0.26, 0.43] : [0.18, 0.30], [36, 0]);

  const cardOpacity3 = useTransform(smoothProgress, isMobile ? [0.44, 0.61] : [0.27, 0.39], [0, 1]);
  const cardY3 = useTransform(smoothProgress, isMobile ? [0.44, 0.61] : [0.27, 0.39], [36, 0]);

  const cardOpacity4 = useTransform(smoothProgress, isMobile ? [0.62, 0.79] : [0.42, 0.62], [0, 1]);
  const cardY4 = useTransform(smoothProgress, isMobile ? [0.62, 0.79] : [0.42, 0.62], [36, 0]);

  const cardAnimations = [
    { opacity: cardOpacity0, y: cardY0 },
    { opacity: cardOpacity1, y: cardY1 },
    { opacity: cardOpacity2, y: cardY2 },
    { opacity: cardOpacity3, y: cardY3 },
    { opacity: cardOpacity4, y: cardY4 },
  ];

  // Плавный горизонтальный сдвиг ленты от вертикального скролла (без ручного перетаскивания фрейма):
  // - На мобилке (<744px): карточка 78% ширины контейнера, gap 12px -> сдвиг по всем 5 карточкам (-290% - 48px)
  // - На планшетах 744px–1023px: 3 колонки (gap 15px) -> сдвиг на 2 колонки (-66.667% - 10px)
  // - На десктопе 1024px–1399px: 4 колонки (gap 10px) -> сдвиг на 1 колонку (-25% - 2.5px)
  // - На десктопе 1400px+: 4 колонки (gap 32px) -> сдвиг на 1 колонку (-25% - 8px)
  const trackProgress = useTransform(
    smoothProgress,
    isMobile ? [0.08, 0.85] : [0.35, 0.80],
    [0, 1]
  );

  const trackTransform = useTransform(trackProgress, (t) => {
    const clamped = Math.min(1, Math.max(0, t));
    const ease = -(Math.cos(Math.PI * clamped) - 1) / 2;
    if (screenWidth >= 1400) {
      return `calc(${-25 * ease}% - ${8 * ease}px)`;
    } else if (screenWidth >= 1024) {
      return `calc(${-25 * ease}% - ${2.5 * ease}px)`;
    } else if (screenWidth >= 744) {
      return `calc(${-66.667 * ease}% - ${10 * ease}px)`;
    } else {
      return `calc(${-290 * ease}% - ${48 * ease}px)`;
    }
  });

  // Акцентное увеличение иконки при въезде карточки в фокус:
  const imgScale0 = useTransform(smoothProgress, [0.00, 0.08, 0.14], [0.92, 1.08, 1]);
  const imgScale1 = useTransform(smoothProgress, isMobile ? [0.10, 0.19, 0.27] : [0.09, 0.17, 0.23], [0.92, 1.08, 1]);
  const imgScale2 = useTransform(smoothProgress, isMobile ? [0.26, 0.36, 0.45] : [0.18, 0.26, 0.32], [0.92, 1.08, 1]);
  const imgScale3 = useTransform(smoothProgress, isMobile ? [0.44, 0.54, 0.63] : [0.27, 0.35, 0.41], [0.92, 1.08, 1]);
  const imgScale4 = useTransform(smoothProgress, isMobile ? [0.62, 0.72, 0.81] : [0.42, 0.52, 0.62], [0.92, 1.08, 1]);

  const imgScales = [imgScale0, imgScale1, imgScale2, imgScale3, imgScale4];

  return (
    <div
      ref={scrollTriggerRef}
      id="advantages"
      className="relative bg-[#FEF9F4] h-[260vh] min-[744px]:h-[220vh] min-[1400px]:h-[230vh]"
    >
      {/* Пин-контейнер: выровнен по вертикальному центру экрана (justify-center), чтобы снизу не было пустого места */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center z-10 pt-[70px] pb-[30px] min-[744px]:pt-[85px] min-[744px]:pb-[40px] lg:pt-[90px] lg:pb-[40px] overflow-x-clip">
        <section className="w-full overflow-x-clip">
          {/* Заголовок: слева на мобилке (<744px), справа на планшете и десктопе (744px+) */}
          <div className="w-full mb-[24px] min-[744px]:mb-[40px] min-[1400px]:mb-[52px]">
            <div className="w-full max-w-[1920px] mx-auto px-5 min-[390px]:px-6 lg:px-[40px] xl:px-[60px] lg:max-[1399px]:!px-[50px] min-[744px]:max-[1023px]:!px-[25px] flex justify-start min-[744px]:justify-end">
              <SectionTitle className="text-left min-[744px]:text-right whitespace-nowrap">
                МОИ ПРЕИМУЩЕСТВА
              </SectionTitle>
            </div>
          </div>

          {/* Лента карточек: управляется строго вертикальным скроллом страницы (без ручного скролла фрейма) */}
          <div className="w-full max-w-[1920px] mx-auto px-5 min-[390px]:px-6 lg:px-[40px] xl:px-[60px] lg:max-[1399px]:!px-[50px] min-[744px]:max-[1023px]:!px-[25px] relative z-10 overflow-visible">
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
                    style={{ opacity: cardAnim.opacity, y: cardAnim.y }}
                    className="relative shrink-0 w-[78%] max-[743px]:aspect-square min-[744px]:max-[1023px]:w-[calc((100%-30px)/3)] lg:max-[1399px]:w-[calc((100%-30px)/4)] min-[1400px]:w-[calc((100%-96px)/4)] min-[1400px]:aspect-square flex flex-col justify-start items-start text-left will-change-[transform,opacity] transform-gpu bg-[#FA7250] p-[18px] min-[744px]:p-6 min-[1200px]:p-7 min-[1400px]:p-8 rounded-none"
                  >
                    {/* Иконка преимущества */}
                    <div className="relative z-10 h-[95px] min-[390px]:h-[105px] min-[744px]:h-[100px] lg:h-[125px] min-[1400px]:h-[160px] mb-[16px] min-[744px]:mb-[26px] min-[1400px]:mb-[36px] w-full flex items-center justify-center shrink-0">
                      <motion.img
                        style={{ scale: imgScale }}
                        src={adv.icon}
                        alt={adv.title}
                        decoding="async"
                        className="max-h-full max-w-full w-auto h-auto object-contain select-none pointer-events-none will-change-transform transform-gpu"
                      />
                    </div>

                    {/* Текстовая часть */}
                    <div className="w-full min-w-0 flex flex-col items-start text-left gap-[10px] min-[744px]:gap-[15px]">
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
          </div>
        </section>
      </div>
    </div>
  );
};
