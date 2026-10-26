import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cases, type CaseItem } from '@/data/content';
import { SectionTitle } from '@/components/ui/Typography';
import { X, ExternalLink } from 'lucide-react';

export const Cases: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);

  // Блокируем скролл страницы, когда открыта модалка с макетом
  useEffect(() => {
    if (selectedCase) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedCase(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedCase]);

  return (
    <section className="pt-[20px] min-[744px]:pt-[100px] lg:pt-[120px] min-[1400px]:pt-[150px] pb-[32px] min-[744px]:pb-[145px] lg:pb-[230px] min-[1400px]:pb-[300px] bg-[#FEF9F4] relative z-20 overflow-x-clip overflow-y-visible" id="cases">
      {/* Верхний блюр-элемент: плавно появляется первым */}
      <div className="absolute inset-x-0 top-0 w-full max-w-[1920px] mx-auto pointer-events-none z-0 overflow-visible transform-gpu translate-z-0">
        <motion.img
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 0.9, scale: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          src="/stages/stages-1.svg"
          alt=""
          decoding="async"
          className="absolute left-1/2 -translate-x-1/2 top-[5px] min-[744px]:top-[10px] w-[320px] min-[744px]:w-[600px] min-[1400px]:w-[760px] h-auto max-w-none -scale-y-100"
        />
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-5 min-[600px]:px-[25px] lg:max-[1399px]:!px-[50px] min-[1400px]:px-[60px] relative z-10">
        
        {/* Заголовок: на 390px слева, на 744px+ справа (появляется после блюра) */}
        <div className="flex justify-start min-[744px]:justify-end mb-[20px] min-[744px]:mb-[45px] min-[1400px]:mb-[60px]">
          <SectionTitle delay={0.25} className="text-left min-[744px]:text-right whitespace-nowrap">
            КЕЙСЫ
          </SectionTitle>
        </div>
        
        {/* Сетка: ровно по 2 кейса в строку на всех разрешениях без ступеньки */}
        <div className="grid grid-cols-2 gap-x-[10px] min-[600px]:gap-x-[15px] lg:gap-x-[40px] min-[1400px]:gap-x-[60px] gap-y-[24px] min-[744px]:gap-y-[36px] lg:gap-y-[60px] items-start">
          {cases.map((project, index) => {
            const isPlaceholderLink = !project.link || project.link === '#';
            const cardDelay = index < 2 ? 0.3 + (index % 2) * 0.15 : (index % 2) * 0.15;

            return (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.75,
                  delay: cardDelay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full relative"
              >

                <a 
                  href={project.link !== '#' ? project.link : (project.fullImage || '#')}
                  target={project.link !== '#' ? '_blank' : undefined}
                  rel={project.link !== '#' ? 'noopener noreferrer' : undefined}
                  onClick={(e) => {
                    if (project.fullImage) {
                      e.preventDefault();
                      setSelectedCase(project);
                    } else if (isPlaceholderLink) {
                      e.preventDefault();
                    }
                  }}
                  className="group block relative w-full cursor-pointer"
                >
                  <div className="relative hover:-translate-y-4 transition-transform duration-500 w-full">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      decoding="async"
                      className="w-full h-auto object-contain block" 
                    />
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Модальное окно для полного просмотра макета */}
      <AnimatePresence>
        {selectedCase && selectedCase.fullImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedCase(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10 cursor-zoom-out"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[850px] max-h-[90vh] bg-[#FEF9F4] rounded-2xl flex flex-col overflow-hidden shadow-2xl cursor-default"
            >
              {/* Шапка модального окна */}
              <div className="px-5 py-4 border-b border-[#FA7250]/20 flex items-center justify-between shrink-0 bg-[#FEF9F4]/90 backdrop-blur-sm">
                <div>
                  <span className="text-[11px] font-bold uppercase text-[#FA7250] tracking-wider">Макет в Figma</span>
                  <h3 className="text-[18px] sm:text-[22px] font-extrabold text-[#FA7250] leading-tight">
                    {selectedCase.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={selectedCase.fullImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-bold text-[#FA7250] hover:text-[#EB4F2E] transition-colors"
                  >
                    В полный размер <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setSelectedCase(null)}
                    aria-label="Закрыть"
                    className="w-9 h-9 rounded-full bg-[#FA7250] text-[#FEF9F4] flex items-center justify-center hover:bg-[#EB4F2E] transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Прокручиваемый макет страницы */}
              <div className="w-full flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FEF9F4] overscroll-contain">
                <img
                  src={selectedCase.fullImage}
                  alt={selectedCase.title}
                  className="w-full h-auto object-contain mx-auto rounded-lg shadow-sm"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
