import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { processSteps } from '@/data/content';
import { SectionTitle, CardTitle, BodyText } from '@/components/ui/Typography';

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  // Отслеживаем прохождение секции при естественном скролле страницы,
  // чтобы этапы плавно появлялись один за другим, но блок никогда не обрезался по высоте экрана и на него не наезжали Кейсы
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 75%'],
  });

  // 5 этапов анимации, привязанных к проценту скролла:
  const opacity0 = useTransform(scrollYProgress, [0.00, 0.22], [0, 1]);
  const y0 = useTransform(scrollYProgress, [0.00, 0.22], [45, 0]);

  const opacity1 = useTransform(scrollYProgress, [0.16, 0.38], [0, 1]);
  const y1 = useTransform(scrollYProgress, [0.16, 0.38], [45, 0]);

  const opacity2 = useTransform(scrollYProgress, [0.32, 0.54], [0, 1]);
  const y2 = useTransform(scrollYProgress, [0.32, 0.54], [45, 0]);

  const opacity3 = useTransform(scrollYProgress, [0.48, 0.70], [0, 1]);
  const y3 = useTransform(scrollYProgress, [0.48, 0.70], [45, 0]);

  const opacity4 = useTransform(scrollYProgress, [0.64, 0.86], [0, 1]);
  const y4 = useTransform(scrollYProgress, [0.64, 0.86], [45, 0]);

  const stepAnimations = [
    { opacity: opacity0, y: y0 },
    { opacity: opacity1, y: y1 },
    { opacity: opacity2, y: y2 },
    { opacity: opacity3, y: y3 },
    { opacity: opacity4, y: y4 },
  ];

  return (
    <section
      ref={containerRef}
      className="bg-[#FEF9F4] relative z-20 pt-[80px] min-[744px]:pt-[100px] lg:pt-[100px] min-[1400px]:pt-[120px] pb-[40px] min-[744px]:pb-[60px] lg:pb-[80px] min-[1400px]:pb-[100px] overflow-x-clip"
      id="process"
    >
      <div className="relative w-full flex flex-col justify-start">
        {/* Заголовок: на 390px слева, на 744px+ справа */}
        <div className="static left-0 w-full z-30 mb-[30px] min-[744px]:mb-[45px] min-[1400px]:mb-[60px] pointer-events-auto">
          <div className="w-full max-w-[1920px] mx-auto px-5 lg:px-[40px] xl:px-[60px] lg:max-[1399px]:!px-[50px] min-[744px]:max-[1023px]:!px-[25px] flex justify-start min-[744px]:justify-end">
            <SectionTitle delay={0.15} className="text-left min-[744px]:text-right whitespace-nowrap">
              ЭТАПЫ РАБОТЫ
            </SectionTitle>
          </div>
        </div>

        {/* Фоновые декоративные элементы для десктопа (1400px+) */}
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
              style={{ position: 'absolute', left: '0px', bottom: '0px', width: '203px', height: '147px', transform: 'rotate(0deg)' }}
            />
          </div>
        </div>

        {/* Фоновые декоративные элементы для мобильных (<744px), планшета и 1024px */}
        <div className="block min-[1400px]:hidden absolute inset-0 w-full max-w-[1920px] mx-auto px-5 min-[744px]:px-[25px] lg:px-[50px] pointer-events-none z-0 transform-gpu translate-z-0">
          <div className="relative w-full h-full">
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
          <div className="w-full grid grid-cols-1 md:grid-cols-9 lg:max-[1399px]:grid-cols-8 gap-x-4 md:gap-x-8 lg:max-[1399px]:gap-x-[10px] gap-y-[28px] md:gap-y-12 lg:max-[1399px]:gap-y-7 relative z-20 mt-0 grid-744-6col">
            {/* stages-4: нижняя плашка слева */}
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

            {/* stages-2: градиентная плашка */}
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

            {/* stages-5: блюр с цветочком */}
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

              if (index === 0) {
                placementClass += ' max-[743px]:col-start-1 max-[743px]:row-start-1 max-[743px]:max-w-[194px] md:col-start-1 md:row-start-1 lg:max-[1399px]:col-start-1 lg:max-[1399px]:row-start-1 step-card-0';
              } else if (index === 1) {
                placementClass += ' max-[743px]:col-start-1 max-[743px]:row-start-2 max-[743px]:pl-[45%] md:col-start-5 md:row-start-1 lg:max-[1399px]:col-start-6 lg:max-[1399px]:row-start-1 step-card-1';
              } else if (index === 2) {
                placementClass += ' max-[743px]:col-start-1 max-[743px]:row-start-3 max-[743px]:pl-[60px] max-[743px]:max-w-[300px] md:col-start-3 md:row-start-2 lg:max-[1399px]:col-start-3 lg:max-[1399px]:row-start-2 step-card-2';
              } else if (index === 3) {
                placementClass += ' max-[743px]:col-start-1 max-[743px]:row-start-4 max-[743px]:pl-[60px] max-[743px]:max-w-[288px] md:col-start-3 md:row-start-3 lg:max-[1399px]:col-start-3 lg:max-[1399px]:row-start-3 step-card-3';
              } else if (index === 4) {
                placementClass += ' max-[743px]:col-start-1 max-[743px]:row-start-5 max-[743px]:pl-[45%] md:col-start-5 md:row-start-4 lg:max-[1399px]:col-start-6 lg:max-[1399px]:row-start-4 step-card-4';
              }

              return (
                <motion.div
                  key={index}
                  style={{
                    opacity: stepAnimations[index].opacity,
                    y: stepAnimations[index].y,
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
