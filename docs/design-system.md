# Design System

## 1. Colors
*Values are estimated and should be replaced with actual tokens once design files are inspected.*

- `--color-bg`: `#FAFAFA` (Base background)
- `--color-text-primary`: `#1A1A1A` (Headings, primary text)
- `--color-text-secondary`: `#4A4A4A` (Body text, less important text)
- `--color-primary`: `#FF6B4A` (Brand accent, buttons, some H2s)
- `--color-primary-hover`: `#FF502B`
- `--color-surface`: `rgba(255, 255, 255, 0.7)` (For translucent cards/header, if needed)

## 2. Typography
*Using logical variables for fluid typography.*

- `--font-sans`: `'Inter', 'Montserrat', sans-serif`
- `--text-h1`: `clamp(2.5rem, 6vw, 6rem)` / `1.1` line-height / `700` weight
- `--text-h2`: `clamp(1.75rem, 4vw, 3rem)` / `1.2` line-height / `600` weight
- `--text-h3`: `clamp(1.25rem, 2vw, 1.5rem)` / `1.3` line-height / `600` weight
- `--text-body`: `1.125rem` / `1.6` line-height / `400` weight
- `--text-small`: `0.875rem` / `1.5` line-height / `400` weight

## 3. Spacing
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
