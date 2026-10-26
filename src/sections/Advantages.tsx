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

  // Отслеживаем скролл пин-секции и сглаживаем его пружиной для максимально плавного хода карточек (планшет и десктоп)
  const { scrollYProgress } = useScroll({
    target: scrollTriggerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.5,
    restDelta: 0.0005,
  });

  // Появление карточек по скроллу (0 -> 1, y: 40 -> 0):
  // Карточка 0: Индивидуальный подход
  const cardOpacity0 = useTransform(smoothProgress, [0.00, 0.12], [0, 1]);
  const cardY0 = useTransform(smoothProgress, [0.00, 0.12], [40, 0]);

  // Карточка 1: Внимание к деталям
  const cardOpacity1 = useTransform(smoothProgress, [0.09, 0.21], [0, 1]);
  const cardY1 = useTransform(smoothProgress, [0.09, 0.21], [40, 0]);

  // Карточка 2: Соблюдение сроков
  const cardOpacity2 = useTransform(smoothProgress, [0.18, 0.30], [0, 1]);
  const cardY2 = useTransform(smoothProgress, [0.18, 0.30], [40, 0]);

  // Карточка 3: Прозрачность процессов
  const cardOpacity3 = useTransform(smoothProgress, [0.27, 0.39], [0, 1]);
  const cardY3 = useTransform(smoothProgress, [0.27, 0.39], [40, 0]);

  // Плавный горизонтальный скролл карточек на десктопе/планшете (744px+):
  // - На десктопе 1400px+: 4 колонки (gap 32px), плавный сдвиг ровно на 1 колонку (-25% - 8px)
  // - На десктопе 1024px–1399px: 4 колонки (gap 10px), плавный сдвиг ровно на 1 колонку (-25% - 2.5px)
  // - На планшетах 744px–1023px: 3 колонки (gap 15px), плавный сдвиг ровно на 2 колонки (-66.667% - 10px)
  const desktopTrackX = useTransform(smoothProgress, [0.35, 0.80], [0, 1]);
  const desktopTrackTransform = useTransform(desktopTrackX, (t) => {
    const clamped = Math.min(1, Math.max(0, t));
    // Плавная кривая без рывков (sine ease-in-out)
    const ease = -(Math.cos(Math.PI * clamped) - 1) / 2;
    if (screenWidth >= 1400) {
      return `calc(${-25 * ease}% - ${8 * ease}px)`;
    } else if (screenWidth >= 1024) {
      return `calc(${-25 * ease}% - ${2.5 * ease}px)`;
    } else {
      return `calc(${-66.667 * ease}% - ${10 * ease}px)`;
    }
  });

  // Карточка 4: Поддержка после запуска (появляется при сдвиге трека)
  const cardOpacity4 = useTransform(smoothProgress, [0.42, 0.62], [0, 1]);
  const cardY4 = useTransform(smoothProgress, [0.42, 0.62], [40, 0]);

  const desktopCardAnimations = [
    { opacity: cardOpacity0, y: cardY0 },
    { opacity: cardOpacity1, y: cardY1 },
    { opacity: cardOpacity2, y: cardY2 },
    { opacity: cardOpacity3, y: cardY3 },
    { opacity: cardOpacity4, y: cardY4 },
  ];

  // Акцентное увеличение иконки при въезде карточки в фокус:
  const desktopImgScale0 = useTransform(smoothProgress, [0.00, 0.08, 0.14], [0.92, 1.1, 1]);
  const desktopImgScale1 = useTransform(smoothProgress, [0.09, 0.17, 0.23], [0.92, 1.1, 1]);
  const desktopImgScale2 = useTransform(smoothProgress, [0.18, 0.26, 0.32], [0.92, 1.1, 1]);
  const desktopImgScale3 = useTransform(smoothProgress, [0.27, 0.35, 0.41], [0.92, 1.1, 1]);
  const desktopImgScale4 = useTransform(smoothProgress, [0.42, 0.52, 0.62], [0.92, 1.1, 1]);

  const desktopImgScales = [
    desktopImgScale0,
    desktopImgScale1,
    desktopImgScale2,
    desktopImgScale3,
    desktopImgScale4,
  ];

  return (
    <>
      {/* =========================================================================
          МОБИЛЬНАЯ ВЕРСИЯ (< 744px): 
          - В одну линию, горизонтальный свайп
          - В начальной позиции: отступ от левого края экрана (20px / 24px)
          - При листании: карточки скроллятся через края экрана (full bleed)
          - Каждая карточка ровно 3 колонки из 4 (aspect-square)
          - Картинки увеличены (h-[95px] min-[390px]:h-[105px])
          - Плавное появление блока при скролле
          ========================================================================= */}
      <div className="min-[744px]:hidden relative bg-[#FEF9F4] pt-[80px] pb-0 overflow-x-clip" id="advantages">
        {/* Заголовок */}
        <div className="w-full px-5 min-[390px]:px-6 mb-[30px]">
          <SectionTitle className="text-left whitespace-nowrap">
            МОИ ПРЕИМУЩЕСТВА
          </SectionTitle>
        </div>

        {/* Горизонтальная лента: в начальной позиции отступ от левого края экрана, при листании края уходят */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <div className="advantages-mobile-track">
            {advantages.map((adv, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0 snap-start aspect-square w-[calc((100vw-70px)*3/4+20px)] min-[390px]:w-[calc((100vw-78px)*3/4+20px)] bg-[#FA7250] p-[15px] rounded-none flex flex-col justify-start items-start text-left"
              >
                {/* Картинка сверху по центру: увеличена для выразительности */}
                <div className="relative z-10 h-[95px] mb-[12px] w-full flex items-center justify-center shrink-0">
                  <img
                    src={adv.icon}
                    alt={adv.title}
                    className="max-h-full max-w-full w-auto h-auto object-contain select-none pointer-events-none"
                  />
                </div>

                {/* Текст карточки: стандартные размеры из Typography.tsx */}
                <div className="w-full min-w-0 flex flex-col items-start text-left gap-[10px]">
                  <CardTitle className="text-left !text-[#FEF9F4]">
                    {adv.title}
                  </CardTitle>
                  <BodyText className="text-left !text-[#FEF9F4] break-words">
                    {adv.description}
                  </BodyText>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* =========================================================================
          ПЛАНШЕТ И ДЕСКТОП (744px+): 
          - Сетка: 4 колонки на 1024px+, 3 колонки на 744–1023px
          - Плавное появление карточек при скролле к блоку
          - Плавный сдвиг трека для показа 5-й карточки
          - Единый отступ сверху (100px / 120px / 150px) и pb-0 для точного расстояния до следующего блока
          ========================================================================= */}
      <div ref={scrollTriggerRef} className="hidden min-[744px]:block relative bg-[#FEF9F4] h-[220vh] min-[1400px]:h-[240vh]">
        {/* Пин-контейнер */}
        <div className="sticky top-0 h-auto w-full flex flex-col justify-start z-10">
          <section className="w-full min-[744px]:pt-[100px] lg:pt-[120px] min-[1400px]:pt-[150px] pb-0 overflow-x-clip" id="advantages-desktop">
            {/* Заголовок */}
            <div className="static left-0 w-full z-30 min-[744px]:mb-[45px] min-[1400px]:mb-[60px] pointer-events-auto">
              <div className="w-full max-w-[1920px] mx-auto px-5 lg:px-[40px] xl:px-[60px] lg:max-[1399px]:!px-[50px] min-[744px]:max-[1023px]:!px-[25px] flex justify-end">
                <SectionTitle className="text-right whitespace-nowrap">
                  МОИ ПРЕИМУЩЕСТВА
                </SectionTitle>
              </div>
            </div>

            <div className="w-full max-w-[1920px] mx-auto px-5 lg:px-[40px] xl:px-[60px] lg:max-[1399px]:!px-[50px] min-[744px]:max-[1023px]:!px-[25px] relative z-10 overflow-visible mt-0">
              <motion.div
                style={{ x: desktopTrackTransform }}
                className="flex flex-nowrap items-stretch min-[744px]:max-[1023px]:gap-[15px] lg:max-[1399px]:gap-[10px] min-[1400px]:gap-[32px] will-change-transform"
              >
                {advantages.map((adv, index) => {
                  const cardAnim = desktopCardAnimations[index] || desktopCardAnimations[desktopCardAnimations.length - 1];
                  const imgScale = desktopImgScales[index] || desktopImgScales[desktopImgScales.length - 1];
                  return (
                    <motion.div
                      key={index}
                      style={{ opacity: cardAnim.opacity, y: cardAnim.y }}
                      className="relative shrink-0 min-[744px]:max-[1023px]:w-[calc((100%-30px)/3)] lg:max-[1399px]:w-[calc((100%-30px)/4)] min-[1400px]:w-[calc((100%-96px)/4)] min-[1400px]:aspect-square flex flex-col justify-start items-start text-left will-change-[transform,opacity] transform-gpu bg-[#FA7250] min-[744px]:p-6 min-[1200px]:p-7 min-[1400px]:p-8 rounded-none"
                    >
                      {/* Картинка: выровнена ровно по середине карточки */}
                      <div className="relative z-10 h-[100px] lg:h-[125px] min-[1400px]:h-[160px] mb-[26px] min-[1400px]:mb-[36px] w-full flex items-center justify-center">
                        <motion.img
                          style={{ scale: imgScale }}
                          src={adv.icon}
                          alt={adv.title}
                          className="max-h-full w-auto object-contain select-none pointer-events-none will-change-transform transform-gpu"
                        />
                      </div>

                      {/* Текстовая часть: строго единые токены с блоком «Этапы» */}
                      <div className="w-full flex flex-col items-start text-left gap-[10px] min-[744px]:gap-[15px]">
                        <CardTitle className="text-left !text-[#FEF9F4]">
                          {adv.title}
                        </CardTitle>
                        <BodyText className="text-left !text-[#FEF9F4]">
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
    </>
  );
};
