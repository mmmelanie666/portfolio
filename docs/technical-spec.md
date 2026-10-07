# Technical Architecture

## 1. Stack Selection
**Keep it simple.** This is a single-page portfolio.
- **Build Tool**: Vite (Lightning fast, minimal config).
- **Framework**: React (Allows clean componentization for steps, cards, and sections without spaghetti code).
- **Language**: TypeScript (For basic prop typing and preventing silly errors. No complex type gymnastics).
- **Styling**: Tailwind CSS (Perfect for rapidly implementing the design system, fluid typography, and responsive grids without writing massive CSS files).
- **Icons**: `lucide-react` (Lightweight, clean SVG icons if needed, or inline custom SVGs).

*Why not plain HTML?* React allows us to map over data (like the 4 case studies or 5 process steps) cleanly, preventing HTML duplication.
*Why not Next.js?* SSR is overkill for a single-page portfolio that can be perfectly SEO-optimized at build time using Vite.

## 2. Project Structure
```text
src/
├── assets/        # Fonts, Images, SVG blobs
├── components/    # Reusable UI parts
│   ├── Button.tsx
│   ├── SectionHeading.tsx
│   ├── ProcessCard.tsx
│   └── ProjectCard.tsx
├── sections/      # Major page sections
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Process.tsx
│   ├── Advantages.tsx
│   ├── ServicesMarquee.tsx
│   ├── Cases.tsx
│   └── Footer.tsx
├── data/          # Text content separated from UI
│   └── content.ts
├── index.css      # Tailwind directives & base variables
├── App.tsx        # Main composition
└── main.tsx       # Entry point
```

## 3. Styling Strategy
- Use Tailwind utility classes for 90% of styling.
- Use `index.css` for CSS variables (`--color-primary`), custom fonts (`@font-face`), and complex keyframe animations (like the marquee).
- Use Tailwind's `tailwind.config.js` to extend the theme with our Design System values (colors, fonts, breakpoints).

## 4. Animation Strategy
- **CSS Animations**: Use simple CSS `transition` for hover states.
- **Scroll Reveal**: Use `IntersectionObserver` via a simple custom React hook (e.g., `useScrollReveal`) to add a `.reveal-active` class when elements enter the viewport. No need for heavy libraries like Framer Motion or GSAP.

## 5. SEO & Performance
- semantic HTML5 tags (`<main>`, `<section>`, `<article>`, `<nav>`).
- Set appropriate `<title>` and `<meta name="description">` in `index.html`.
- Compress images (convert to WebP).
- Lazy load case study images (`loading="lazy"`).
