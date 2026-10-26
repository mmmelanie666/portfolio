import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { services } from '@/data/content';
import { SectionTitle, CardTitle, BodyText } from '@/components/ui/Typography';

export const Services: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="pt-[40px] min-[744px]:pt-[100px] lg:pt-[120px] min-[1400px]:pt-[150px] pb-[40px] min-[744px]:pb-0 lg:pb-[60px] min-[1400px]:pb-[75px] bg-[#FEF9F4] relative z-30" id="services">
      {/* Фоновые декоративные элементы с блюром: плавно появляются поочередно перед контентом */}
      <div className="absolute inset-0 w-full max-w-[1920px] mx-auto pointer-events-none z-0 overflow-hidden transform-gpu translate-z-0">
        <motion.img
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 0.9, scale: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          src="/stages/stages-1.svg"
          alt=""
          decoding="async"
          className="hidden lg:block absolute -left-[50px] top-[5%] w-[340px] min-[1400px]:w-[420px] h-auto"
        />
        <motion.img
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 0.85, scale: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          src="/stages/stages-3.svg"
          alt=""
          decoding="async"
          className="absolute -right-[140px] min-[744px]:-right-[180px] top-[18%] lg:top-[25%] w-[320px] min-[744px]:w-[480px] min-[1400px]:w-[580px] h-auto"
        />
        {/* В пустом углу слева на <1024px (напротив сдвинутых карточек Интернет-магазин и Брендинг) лежат блюр-элементы */}
        <motion.img
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 0.9, scale: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          src="/stages/stages-1.svg"
          alt=""
          decoding="async"
          className="lg:hidden absolute -left-[45px] bottom-[26%] w-[210px] min-[744px]:w-[310px] h-auto"
        />
        <motion.img
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 0.95, scale: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.85, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          src="/stages/Group 2131329139.svg"
          alt=""
          decoding="async"
          className="absolute left-[10px] min-[744px]:left-[25px] lg:left-[4%] bottom-[5%] min-[744px]:bottom-[6%] lg:bottom-[90px] w-[155px] min-[744px]:w-[210px] min-[1400px]:w-[250px] h-auto"
        />
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-5 lg:px-[40px] xl:px-[60px] lg:max-[1399px]:!px-[50px] min-[744px]:max-[1023px]:!px-[25px] relative z-10">
        {/* Заголовок секции: слева на мобилке, справа на планшете и десктопе (появляется после блюров) */}
        <div className="flex justify-start min-[744px]:justify-end mb-[20px] min-[744px]:mb-[45px] min-[1400px]:mb-[60px]">
          <SectionTitle delay={0.35} className="text-left min-[744px]:text-right whitespace-nowrap">
            УСЛУГИ
          </SectionTitle>
        </div>

        <div className="flex flex-col items-start lg:items-center gap-[28px] min-[744px]:gap-16 lg:gap-16">
          {services.map((service, index) => {
            const isOpen = hoveredIndex === index;
            const isIndentedMobile = index >= 2; // Интернет-магазин и Брендинг сдвинуты к 3-й колонке на <1024px

            // Высчитываем индивидуальные позиции и ширину для каждой плашки (для десктопа 1024px+)
            let positionClasses = "";
            let widthClass = "lg:w-[500px] lg:max-[1399px]:w-[440px]";

            if (index === 0) {
              // Многостраничка: под словом, по левому краю, расстояние от слова 40px
              positionClasses = "top-full lg:mt-5 lg:max-[1399px]:!mt-[40px] lg:left-0";
            } else if (index === 1) {
              // Лендинг: левый край плашки под буквой Г (десктоп), на 1024px ровно 50px от правой границы
              positionClasses = "top-full lg:mt-5 lg:left-full lg:max-[1399px]:left-[calc(50%+50vw-490px)]";
            } else if (index === 2) {
              // Интернет-магазин: под словом, смещена влево, ширина уменьшена на 50px (до 390px)
              positionClasses = "top-full lg:mt-5 lg:left-0 lg:-translate-x-32 lg:max-[1399px]:-translate-x-12";
              widthClass = "lg:w-[500px] lg:max-[1399px]:w-[390px]";
            } else if (index === 3) {
              // Брендинг: на одной горизонтальной оси со словом, справа от него, не выходит за правый край экрана
              positionClasses = "lg:top-1/2 lg:-translate-y-1/2 lg:left-[calc(100%+24px)] lg:max-[1599px]:left-auto lg:max-[1599px]:right-[-60px] lg:max-[1280px]:right-0";
              widthClass = "lg:w-[500px] lg:max-[1399px]:w-[390px]";
            }

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                transition={{ duration: 0.7, delay: 0.5 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`relative group lg:cursor-pointer text-left lg:text-center w-full lg:w-fit lg:mx-auto flex flex-col items-start lg:items-center ${
                  isIndentedMobile ? 'service-indent-stepped' : ''
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Заголовок: на десктопе (1024px+) крупно во всю ширину, на <1024px тем же стилем CardTitle, начертание ExtraBold (800) */}
                <h2 className="hidden lg:block lg:text-[calc((100vw-100px)/14.4)] min-[1400px]:text-[min(calc((100vw-120px)/14.4),115px)] font-extrabold text-[#FA7250] uppercase leading-[0.97] whitespace-nowrap transition-transform duration-300 lg:group-hover:scale-[1.02]">
                  {service.title}
                </h2>

                <CardTitle className="lg:hidden whitespace-nowrap !font-extrabold">
                  {service.title}
                </CardTitle>

                {/* Мобильные и планшеты (< 1024px): асимметричная композиция со скрина с единым отступом от заголовка до текста */}
                <div className="lg:hidden mt-[10px] min-[744px]:mt-[15px] w-full flex flex-col items-start text-left">
                  <BodyText className="text-left max-w-[540px]">
                    {service.description}
                  </BodyText>

                  {!isIndentedMobile ? (
                    <div className="mt-[15px] min-[744px]:mt-[20px] w-full flex items-center justify-between gap-4 text-black font-bold text-[12px] min-[744px]:text-[14px] leading-[1.07]">
                      <span>{service.price}</span>
                      <span>{service.timeframe}</span>
                    </div>
                  ) : (
                    <div className="mt-[15px] min-[744px]:mt-[20px] flex flex-col items-start gap-[8px] min-[744px]:gap-[10px] text-black font-bold text-[12px] min-[744px]:text-[14px] leading-[1.07]">
                      <span>{service.price}</span>
                      <span>{service.timeframe}</span>
                    </div>
                  )}
                </div>
                
                {/* Десктоп (1024px+): всплывающая плашка по наведению */}
                <div 
                  className={`
                    hidden lg:block absolute z-30 ${positionClasses}
                    ${widthClass}
                    service-tooltip-${index}
                    bg-[#FA7250]/20 backdrop-blur-xl shadow-none rounded-none lg:p-10 lg:max-[1399px]:p-8
                    transition-all duration-300 ease-out pointer-events-none
                    ${isOpen 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-95'}
                  `}
                >
                  <div className="flex flex-col items-start gap-[10px] mb-[15px]">
                    <div className="text-black font-bold uppercase text-[16px] min-[1400px]:text-[18px] leading-[1.07]">
                      {service.timeframe}
                    </div>
                    <div className="text-black font-bold uppercase text-[16px] min-[1400px]:text-[18px] leading-[1.07]">
                      {service.price}
                    </div>
                  </div>
                  <BodyText className="text-left">
                    {service.description}
                  </BodyText>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
