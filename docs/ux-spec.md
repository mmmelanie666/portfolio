# UX Specification

## Interactions & States

### 1. Navigation
- **Smooth Scrolling**: Clicking a navigation link should smoothly scroll to the corresponding section.
- **Active State**: The current section should highlight the corresponding nav link (via Intersection Observer).
- **Sticky Header**: Consider making the header sticky with a frosted glass effect (`backdrop-filter: blur()`) on scroll, so users can easily navigate or click the CTA from anywhere.

### 2. Buttons
- **Hover State**: 
  - Slight scale up (e.g., `transform: scale(1.02)`).
  - Background color brightness increase or shadow.
- **Active State**: Slight scale down (`transform: scale(0.98)`).
- **Focus State**: Clear `outline` for keyboard navigation accessibility.

### 3. Animations & Micro-interactions
- **Scroll Reveal**: Sections (Process steps, Advantage cards, Project cards) should subtly fade in and translate slightly upward as they enter the viewport to make the site feel alive and premium.
- **Marquee (Services)**: The "МНОГОСТРАНИЧНЫЙ САЙТ - ЛЕНДИНГ..." text should infinitely scroll horizontally (marquee effect) to add dynamism without requiring user interaction.
- **Project Cards**:
  - Hovering over a case study should reveal a subtle overlay or lift the image slightly.
  - Clicking a case study should either open a modal with more details, or link to a live site/Behance case. *(Needs clarification from the user)*.

### 4. Accessibility (a11y)
- **Contrast**: Ensure text color against the light/gradient background passes WCAG AA standards.
- **Alt Text**: All project images and AI blobs must have appropriate `alt` text (empty `alt=""` for purely decorative blobs).
- **Semantic HTML**: Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>`.

### 5. Open Questions
- **Case Studies interaction**: What happens when a user clicks a case study? Do they go to a separate page, open a modal, or go to an external link?
- **Contact Mechanism**: Does the "Заказать сайт" button open a popup form, an email client (`mailto:`), or scroll to a contact section/Telegram link?
