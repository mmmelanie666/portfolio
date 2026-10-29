import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { footerContent } from '@/data/content';
import { X } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Меняем стиль шапки при скролле
  useEffect(() => {
    const handleScroll = () => {
      // Меняем стиль, только когда шапка пересекает границу первого (тёмного/цветного) экрана
      if (window.scrollY > window.innerHeight - 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Закрываем меню при ресайзе экрана на десктоп (1024px+)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Блокируем скролл страницы, когда открыто мобильное меню
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-[20px] min-[744px]:top-[30px] left-0 w-full z-50"
      >
        {/* Мобильная и планшетная шапка (< 1024px): бургер и кнопка без подложки */}
        <div className="lg:hidden w-full px-5 min-[744px]:px-[25px] flex items-center justify-between">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Меню"
            className={`w-[44px] h-[44px] min-[744px]:w-[48px] min-[744px]:h-[48px] rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${
              isScrolled
                ? 'bg-[#FA7250]/20 text-[#FA7250]'
                : 'bg-[#FA7250]/15 text-[#FA7250]'
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 min-[744px]:w-6 min-[744px]:h-6 text-[#FA7250]" />
            ) : (
              <svg
                className="w-[18px] h-[14px] min-[744px]:w-[20px] min-[744px]:h-[16px]"
                viewBox="0 0 26 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1H25" stroke="#FA7250" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M1 11H25" stroke="#FA7250" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M1 21H25" stroke="#FA7250" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            )}
          </button>

          <a
            href={footerContent.telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-blur-hover h-[44px] min-[744px]:h-[48px] inline-flex items-center justify-center px-[24px] min-[744px]:px-[32px] font-bold text-[14px] min-[744px]:text-[16px] leading-[1.07] bg-[#FA7250] text-[#FEF9F4] whitespace-nowrap rounded-none"
          >
            заказать сайт
          </a>
        </div>

        {/* Десктопная плашка навигации (1024px+): по макетам 1024 и 1400 */}
        <div className="hidden lg:flex justify-center px-[50px] min-[1400px]:px-[80px]">
          <div
            className={`
              h-[54px] min-[1400px]:h-[66px] px-[45px] min-[1400px]:px-[100px] rounded-[75px] backdrop-blur-[12.5px]
              flex items-center justify-center gap-[30px] min-[1400px]:gap-[45px] transition-all duration-500
              ${isScrolled ? 'bg-[#FA7250]/20' : 'bg-[#FEF9F4]/80'}
            `}
          >
            <nav className="flex items-center gap-[30px] min-[1400px]:gap-[45px] text-[#FA7250] font-medium text-[14px] min-[1400px]:text-[18px] leading-[1.07]">
              <a href="#services" className="hover:text-[#EB4F2E] transition-colors">Услуги</a>
              <a href="#process" className="hover:text-[#EB4F2E] transition-colors">Процесс</a>
              <a href="#cases" className="hover:text-[#EB4F2E] transition-colors">Примеры работ</a>
            </nav>

            <a
              href={footerContent.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-blur-hover bg-[#FA7250] text-[#FEF9F4] w-[160px] h-[35px] min-[1400px]:w-[220px] min-[1400px]:h-[48px] inline-flex items-center justify-center font-bold text-[14px] min-[1400px]:text-[18px] leading-[1.07] whitespace-nowrap"
            >
              заказать сайт
            </a>
          </div>
        </div>
      </motion.header>

      {/* Полноэкранное меню для мобильных и планшетов (< 1024px) */}
      <div
        className={`fixed inset-0 bg-[#FEF9F4] z-40 flex flex-col items-center justify-center transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-10 text-black font-bold text-[24px] min-[744px]:text-[32px] leading-[1.07] uppercase">
          <a href="#services" onClick={closeMenu} className="hover:text-[#FA7250] transition-colors">Услуги</a>
          <a href="#process" onClick={closeMenu} className="hover:text-[#FA7250] transition-colors">Процесс</a>
          <a href="#cases" onClick={closeMenu} className="hover:text-[#FA7250] transition-colors">Примеры работ</a>
        </nav>

        <a
          href={footerContent.telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
          className="mt-14 bg-[#FA7250] text-[#FEF9F4] px-[60px] py-[20px] rounded-none font-bold text-[20px] min-[744px]:text-[32px] leading-[1.07] hover:bg-[#EB4F2E] transition-colors"
        >
          заказать сайт
        </a>
      </div>
    </>
  );
};
