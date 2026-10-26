import React from 'react';
import { motion } from 'framer-motion';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// Главные заголовки секций (ЭТАПЫ РАБОТЫ, МОИ ПРЕИМУЩЕСТВА, КЕЙСЫ, УСЛУГИ)
// Начертание: ExtraBold (800)
// 390: 20px | 744: 24px | 1024: 28px | 1400+: 36px
export const SectionTitle: React.FC<TypographyProps> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`text-[#FA7250] font-extrabold text-[20px] min-[744px]:text-[24px] lg:text-[28px] min-[1400px]:text-[36px] leading-[1.07] uppercase ${className}`}
    >
      {children}
    </motion.h2>
  );
};

// Заголовки карточек (Названия этапов, преимуществ, кейсов)
// 390: 16px | 744: 18px | 1024: 20px | 1400+: 24px
export const CardTitle: React.FC<TypographyProps> = ({ children, className = '' }) => {
  return (
    <h3 className={`text-[#FA7250] font-bold uppercase text-[16px] min-[744px]:text-[18px] lg:text-[20px] min-[1400px]:text-[24px] leading-[1.07] ${className}`}>
      {children}
    </h3>
  );
};

// Наборный текст (Описания)
// 390: 12px | 744: 14px | 1024: 16px | 1400+: 18px
export const BodyText: React.FC<TypographyProps> = ({ children, className = '' }) => {
  return (
    <p className={`text-black font-normal leading-[1.07] text-[12px] min-[744px]:text-[14px] lg:text-[16px] min-[1400px]:text-[18px] ${className}`}>
      {children}
    </p>
  );
};
