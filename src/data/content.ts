export const heroContent = {
  title: 'МЕЛАНА ВАНИОСОВА',
  subtitle: 'Проектирую сайты для бизнеса с продуманной структурой и крутым визуалом',
  cta: 'заказать сайт',
};

export const processSteps = [
  {
    number: '01',
    title: 'Знакомство и бриф',
    description: 'По итогам созвона или брифа определяем цели, объемы и задачи сайта.',
  },
  {
    number: '02',
    title: 'Структура и UX',
    description: 'Анализирую информацию. Изучаю аудиторию, собираю логику сайта, определяю структуру и пишу текст.',
  },
  {
    number: '03',
    title: 'Дизайн-концепция',
    description: 'Ищу визуальный язык, подбираю типографику и цвета, которые идеально отражают ценности и вайб вашего бизнеса.',
  },
  {
    number: '04',
    title: 'Макет и прототип',
    description: 'Собираю структуру сайта в прототип. После согласования собираю макет сайта в выбранной дизайн-концепции.',
  },
  {
    number: '05',
    title: 'Верстка',
    description: 'Переношу сайт на Tilda, адаптирую под все разрешения, добавляю анимации и необходимый функционал. Подключаю формы, домен и базовые SEO-настройки.',
  },
];

export const advantages = [
  {
    title: 'Богатый опыт',
    description: 'У меня за плечами работа в больших международных и российских компаниях, успела поработать даже со Сбером и Газпромом.',
    icon: '/svg/advantages/pic-2.png',
  },
  {
    title: 'Гибкость и удобство',
    description: 'В общении всегда ищу компромисс. Нахожу идеальный баланс между крутыми визуальными идеями и реальными задачами вашего бизнеса.',
    icon: '/svg/advantages/pic-3.png',
  },
  {
    title: 'Код',
    description: 'Сделаю стандартный сайт на Тильде/Вебфлоу уникальным за счет индивидуальных модификаций.',
    icon: '/svg/advantages/pic.png',
  },
  {
    title: 'Нейросети',
    description: 'Заменяю банальные стоки уникальной графикой и кинематографичными AI-видео. Сделаю вам полностью уникальный проект.',
    icon: '/svg/advantages/pic-1.png',
  },
  {
    title: 'Прозрачный процесс',
    description: 'Я работаю по договору, выполняю свои обязательства и соблюдаю сроки, не пропадаю и не бросаю проекты, держу заказчика в курсе всех процессов.',
    icon: '/svg/advantages/pic-4.png',
  },
];

export const services = [
  {
    title: 'МНОГОСТРАНИЧНЫЙ САЙТ',
    description: 'Сложная архитектура, упакованная в подходящий визуал. Подробно и эстетично рассказываем о ваших услугах, команде и кейсах, выстраивая правильное позиционирование и доверие аудитории',
    timeframe: 'от 14 дней',
    price: 'от 40 000 ₽',
  },
  {
    title: 'ЛЕНДИНГ',
    description: 'Сайт-презентация под конкретную задачу: запуск продукта, анонс услуги или спецпроект. Проектирую чистый интерфейс и логику, которая уверенно ведет пользователя к заявке',
    timeframe: 'от 14 дней',
    price: 'от 25 000 ₽',
  },
  {
    title: 'ИНТЕРНЕТ-МАГАЗИН',
    description: 'Проектирую логичную структуру каталога, детальные карточки товаров и бесшовный путь клиента от выбора до корзины',
    timeframe: 'от 14 дней',
    price: 'от 50 000 ₽',
  },
  {
    title: 'БРЕНДИНГ',
    description: 'Создание уникального визуального стиля: логотип, цвета, типографика и правила использования.',
    timeframe: 'от 14 дней',
    price: 'от 50 000 ₽',
  },
];

export interface CaseItem {
  id: number;
  title: string;
  image: string;
  link: string;
  fullImage?: string;
}

export const cases: CaseItem[] = [
  {
    id: 1,
    title: 'МАХОВИК ПРОСТРАНСТВА',
    image: '/cases/case-1.jpg?v=3',
    link: 'https://outerspacer.tilda.ws/',
  },
  {
    id: 2,
    title: "HYBRID CONF' 25",
    image: '/cases/case-2.jpg',
    fullImage: '/cases/hybrid-conf-full.jpg',
    link: '#',
  },
  {
    id: 3,
    title: 'ВСЁ О PROGRAMMATIC',
    image: '/cases/case-3.jpg',
    link: 'https://academy.hybrid.ai/',
  },
  {
    id: 4,
    title: 'САЙТ ДЛЯ ФОТОГРАФА',
    image: '/cases/case-4.jpg',
    link: 'https://vaniosovaph.ru/',
  },
];

export const footerContent = {
  title: 'ВАШ ДИЗАЙНЕР МЕЛАНА',
  buttonText: 'заказать сайт',
  telegramLink: 'https://t.me/melanchonie',
  socials: [
    { title: 'THREADS', link: 'https://www.threads.com/@melnchks?igshid=NTc4MTIwNjQ2YQ==' },
    { title: 'INSTAGRAM', link: 'https://www.instagram.com/melnchks' },
    { title: 'BEHANCE', link: 'https://www.behance.net/m8ldessin' },
    { title: 'PINTEREST', link: 'https://pin.it/R1qXQBHYV' },
  ],
};
