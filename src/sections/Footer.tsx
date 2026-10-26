import React from 'react';
import { motion } from 'framer-motion';
import { footerContent } from '@/data/content';

export const Footer: React.FC = () => {
  return (
    <footer className="relative py-6 min-[744px]:py-16 lg:py-20 min-[1400px]:py-24 overflow-hidden flex flex-col items-center justify-center min-h-[auto] min-[744px]:min-h-[50vh] bg-[#A9C1E8]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/images/basement.jpg" alt="" decoding="async" className="w-full h-full object-cover object-bottom" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[1920px] mx-auto px-5 lg:px-[40px] xl:px-[60px] lg:max-[1399px]:!px-[50px] min-[744px]:max-[1023px]:!px-[25px] relative z-10 text-center flex flex-col items-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[38px] min-[390px]:text-[48px] min-[744px]:text-[90px] min-[1400px]:text-[120px] font-bold uppercase text-[#FEF9F4] leading-[0.97] mb-6 min-[744px]:mb-10 lg:mb-12"
        >
          ВАШ ДИЗАЙНЕР<br/>МЕЛАНА
        </motion.h2>
        
        <a 
          href={footerContent.telegramLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#FA7250] text-[#FEF9F4] px-8 py-3.5 min-[744px]:px-14 min-[744px]:py-5 font-bold text-[18px] min-[744px]:text-[32px] leading-[1.07] uppercase hover:bg-[#EB4F2E] transition-colors rounded-none inline-flex items-center justify-center"
        >
          {footerContent.buttonText}
        </a>

        {/* Соцсети: строго ровно посередине между кнопкой и копирайтом */}
        <div className="my-6 min-[744px]:my-10 lg:my-12 flex flex-nowrap items-center justify-center gap-3 min-[375px]:gap-4 min-[414px]:gap-6 min-[744px]:gap-8 lg:gap-10 text-[#FEF9F4] font-bold text-[12px] min-[744px]:text-[14px] lg:text-[18px] leading-[1.07] uppercase whitespace-nowrap">
          {footerContent.socials?.map((social) => (
            <a
              key={social.title}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FA7250] transition-colors"
            >
              {social.title}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-[#FEF9F4] font-normal text-[12px] min-[744px]:text-[14px] lg:text-[16px] min-[1400px]:text-[18px] leading-[1.07]">
          © {new Date().getFullYear()} Мелания Ваниосова
        </p>
      </motion.div>
    </footer>
  );
};
