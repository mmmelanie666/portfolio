# Design System

## 1. Colors
*Values have been extracted from Figma design files.*

- `--color-bg`: `#FEF9F4` (Base background)
- `--color-text-primary`: `#1A1A1A` (Headings, primary text)
- `--color-text-secondary`: `#4A4A4A` (Body text, less important text)
- `--color-primary`: `#FA7250` (Brand accent, buttons, some H2s)
- `--color-primary-hover`: `#EB4F2E`
- `--color-surface`: `rgba(255, 255, 255, 0.7)` (For translucent cards/header, if needed)

## 2. Typography
*Using logical variables for fluid typography.*

- `--font-sans`: `'Montserrat', sans-serif`
- **Body Text**: MUST be `Regular` (`font-weight: 400`). Do not use medium or bold for standard description text.
- **Desktop Sizing**: Base font sizes on screens >= 1400px should be slightly smaller/tighter to maintain editorial elegance.

## 3. Strict Rules (Anti-patterns)
- **NO SHADOWS** on overlays, cards, or tooltips. The design relies on flat colors, gradients, and borders.
- **NO ROUNDED CORNERS (border-radius)** on UI cards like the Services tooltip. Use sharp, brutalist corners (`rounded-none`).

## 4. Spacing
*Using a base-4/base-8 spacing scale.*

- `--space-1`: `4px`
- `--space-2`: `8px`
- `--space-3`: `16px`
- `--space-4`: `24px`
- `--space-5`: `32px`
- `--space-6`: `48px`
- `--space-8`: `64px`
- `--space-12`: `96px`
- `--space-16`: `128px` (Typical section gap)

## 4. Radii & Shadows
- `--radius-sm`: `8px`
- `--radius-md`: `16px`
- `--radius-pill`: `100px` (For buttons, depending on exact design)
- `--shadow-sm`: `0 2px 8px rgba(0,0,0,0.05)`
- `--shadow-md`: `0 8px 24px rgba(0,0,0,0.08)`

## 5. Reusable Components (CSS Classes)
- `.btn` / `.btn-primary`
- `.section-title`
- `.container`
- `.card`
