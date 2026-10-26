import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { processSteps } from '@/data/content';
import { SectionTitle, CardTitle, BodyText } from '@/components/ui/Typography';

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  // Отслеживаем скролл внутри секции напрямую (без инерционного цикла useSpring поверх тяжелых SVG-фильтров)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Настраиваем 5 этапов анимации, привязанных к проценту скролла:
  // Бриф (0 - 20%)
  const opacity0 = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y0 = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  // Структура (15% - 35%)
  const opacity1 = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const y1 = useTransform(scrollYProgress, [0.15, 0.35], [50, 0]);

  // Дизайн (30% - 50%)
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const y2 = useTransform(scrollYProgress, [0.3, 0.5], [50, 0]);

  // Макет (45% - 65%)
  const opacity3 = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const y3 = useTransform(scrollYProgress, [0.45, 0.65], [50, 0]);

  // Верстка (60% - 90%)
  const opacity4 = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);
  const y4 = useTransform(scrollYProgress, [0.6, 0.9], [50, 0]);

  const stepAnimations = [
    { opacity: opacity0, y: y0 },
    { opacity: opacity1, y: y1 },
    { opacity: opacity2, y: y2 },
    { opacity: opacity3, y: y3 },
    { opacity: opacity4, y: y4 },
  ];

  return (
    <section ref={containerRef} className="bg-[#FEF9F4] relative z-20 min-h-[1400px] min-[1200px]:min-h-[2100px] h-[220vh] min-[1200px]:h-[280vh] min-[1400px]:h-[360vh]" id="process">
      {/* Пин-контейнер: залипает при скролле, расстояние от предыдущего блока и до следующего строго единое на каждом адаптиве */}
      <div className="sticky top-0 h-auto w-full flex flex-col justify-start pt-[80px] min-[744px]:pt-[100px] lg:pt-[60px] min-[1400px]:pt-[75px] pb-0 overflow-x-clip">
        {/* Заголовок: на 390px слева, на 744px+ справа */}
        <div className="static left-0 w-full z-30 mb-[30px] min-[744px]:mb-[45px] min-[1400px]:mb-[60px] pointer-events-auto">
          <div className="w-full max-w-[1920px] mx-auto px-5 lg:px-[40px] xl:px-[60px] lg:max-[1399px]:!px-[50px] min-[744px]:max-[1023px]:!px-[25px] flex justify-start min-[744px]:justify-end">
            <SectionTitle delay={0.3} className="text-left min-[744px]:text-right whitespace-nowrap">
              ЭТАПЫ РАБОТЫ
            </SectionTitle>
          </div>
        </div>

        {/* Фоновые декоративные элементы для десктопа (1400px+) - поочередное появление в фоне */}
        <div className="hidden min-[1400px]:block absolute inset-0 top-[96px] w-full max-w-[1920px] mx-auto px-5 lg:px-[40px] xl:px-[60px] pointer-events-none z-0 transform-gpu translate-z-0">
          <div className="relative w-full h-full">
            <motion.img
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              src="/stages/stages-1.svg"
              alt=""
              decoding="async"
              style={{ position: 'absolute', left: '0px', top: '140px', width: '330px', height: '300px', transform: 'rotate(180deg)' }}
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              src="/stages/stages-3.svg"
              alt=""
              decoding="async"
              style={{ position: 'absolute', right: '0px', top: '180px', width: '420px', height: '420px', transform: 'scale(1.5)' }}
            />
            <motion.img
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.85, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              src="/stages/stages-4.svg"
              alt=""
              decoding="async"
              style={{ position: 'absolute', left: '0px', top: '680px', width: '203px', height: '147px', transform: 'rotate(0deg)' }}
            />
          </div>
        </div>

        {/* Фоновые декоративные элементы для мобильных (<744px), планшета и 1024px - поочередное появление */}
        <div className="block min-[1400px]:hidden absolute inset-0 w-full max-w-[1920px] mx-auto px-5 min-[744px]:px-[25px] lg:px-[50px] pointer-events-none z-0 transform-gpu translate-z-0">
          <div className="relative w-full h-full">
            {/* stages-1: маленький блюр слева — между Брифом и Дизайн-концепцией по левому краю */}
            <motion.img 
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              src="/stages/stages-1.svg" 
              alt="" 
              decoding="async"
              className="absolute -left-[55px] min-[744px]:-left-[70px] top-[190px] min-[744px]:top-[260px] w-[200px] h-[180px] min-[744px]:w-[300px] min-[744px]:h-[270px] rotate-180"
            />
            
            {/* stages-3: большой блюр справа — позади правых карточек (внутри SVG уже заложен feGaussianBlur stdDeviation=33) */}
            <motion.img 
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              src="/stages/stages-3.svg" 
              alt="" 
              decoding="async"
              className="absolute -right-[160px] min-[744px]:-right-[240px] top-[90px] min-[744px]:top-[100px] w-[360px] h-[360px] min-[744px]:w-[540px] min-[744px]:h-[540px]"
            />
          </div>
        </div>

        <div className="w-full max-w-[1920px] mx-auto px-5 lg:px-[40px] xl:px-[60px] lg:max-[1399px]:!px-[50px] min-[744px]:max-[1023px]:!px-[25px] relative z-10">
          {/* Сетка карточек: на <744 — ступенькой с gap 28px (по запросу пользователя); на 744 — 6 колонок с gutter 15px; на 1024 — 8 колонок с gutter 10px; на 1400 — 9 колонок */}
          <div className="w-full grid grid-cols-1 md:grid-cols-9 lg:max-[1399px]:grid-cols-8 gap-x-4 md:gap-x-8 lg:max-[1399px]:gap-x-[10px] gap-y-[28px] md:gap-y-16 lg:max-[1399px]:gap-y-7 relative z-20 mt-0 grid-744-6col">
            {/* stages-4: нижняя плашка слева — динамически выровнена строго по нижней границе самого нижнего текста */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.85, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="block min-[1400px]:hidden max-[743px]:col-start-1 max-[743px]:row-start-5 lg:max-[1399px]:col-start-1 lg:max-[1399px]:row-start-4 relative h-full pointer-events-none stage-4-pin"
            >
              <img 
                src="/stages/stages-4.svg" 
                alt="" 
                className="absolute bottom-0 -left-[20px] min-[744px]:-left-[25px] lg:-left-[50px] w-[115px] min-[744px]:w-[160px] lg:w-[170px] h-auto max-w-none"
              />
            </motion.div>

            {/* stages-2: градиентная плашка — на <744px в 1-м ряду справа от 'ЗНАКОМСТВО И БРИФ' по верхней линии, на 744px+ под 'СТРУКТУРА И UX' */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.85, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="block max-[743px]:col-start-1 max-[743px]:row-start-1 max-[743px]:ml-[45%] stage-2-pin relative h-full pointer-events-none z-0"
            >
              <img 
                src="/stages/stages-2.svg" 
                alt="" 
                className="stage-2-img"
              />
            </motion.div>

            {/* stages-5: блюр с цветочком — на <744px в 4-м ряду справа у 'МАКЕТ И ПРОТОТИП', на 744px+ слева от колонки 'ВЕРСТКА' */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.85, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="block max-[743px]:col-start-1 max-[743px]:row-start-4 max-[743px]:w-full stage-5-pin relative h-full pointer-events-none z-0"
            >
              <img 
                src="/stages/stages-5.svg" 
                alt="" 
                className="stage-5-img"
              />
            </motion.div>

            {processSteps.map((step, index) => {
              let placementClass = 'md:col-span-2 w-full max-w-full min-w-0 lg:max-[1399px]:col-span-2'; 
              
              if (index === 0) { // ЗНАКОМСТВО И БРИФ
                placementClass += ' max-[743px]:col-start-1 max-[743px]:row-start-1 max-[743px]:max-w-[194px] md:col-start-1 md:row-start-1 lg:max-[1399px]:col-start-1 lg:max-[1399px]:row-start-1 step-card-0'; 
              } else if (index === 1) { // СТРУКТУРА И UX
                placementClass += ' max-[743px]:col-start-1 max-[743px]:row-start-2 max-[743px]:pl-[45%] md:col-start-5 md:row-start-1 lg:max-[1399px]:col-start-6 lg:max-[1399px]:row-start-1 step-card-1'; 
              } else if (index === 2) { // ДИЗАЙН-КОНЦЕПЦИЯ
                placementClass += ' max-[743px]:col-start-1 max-[743px]:row-start-3 max-[743px]:pl-[60px] max-[743px]:max-w-[300px] md:col-start-3 md:row-start-2 lg:max-[1399px]:col-start-3 lg:max-[1399px]:row-start-2 step-card-2'; 
              } else if (index === 3) { // МАКЕТ И ПРОТОТИП (по одной направляющей с ДИЗАЙН-КОНЦЕПЦИЯ)
                placementClass += ' max-[743px]:col-start-1 max-[743px]:row-start-4 max-[743px]:pl-[60px] max-[743px]:max-w-[288px] md:col-start-3 md:row-start-3 lg:max-[1399px]:col-start-3 lg:max-[1399px]:row-start-3 step-card-3'; 
              } else if (index === 4) { // ВЕРСТКА (по одной направляющей со СТРУКТУРА И UX)
                placementClass += ' max-[743px]:col-start-1 max-[743px]:row-start-5 max-[743px]:pl-[45%] md:col-start-5 md:row-start-4 lg:max-[1399px]:col-start-6 lg:max-[1399px]:row-start-4 step-card-4'; 
              }
              
              return (
                <motion.div 
                  key={index} 
                  style={{ 
                    opacity: stepAnimations[index].opacity, 
                    y: stepAnimations[index].y 
                  }}
                  className={`${placementClass} will-change-[transform,opacity] transform-gpu`}
                >
                  <div className="relative w-full max-w-full break-words flex flex-col gap-[10px] min-[744px]:gap-[15px]">
                    <CardTitle className="whitespace-nowrap">
                      {step.title}
                    </CardTitle>
                    <BodyText>
                      {step.description}
                    </BodyText>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
