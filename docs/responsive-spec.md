# Responsive Specification

## Breakpoints
Using standard modern breakpoints:
- **Mobile**: `320px` to `767px` (Design ref: 390.pdf)
- **Tablet**: `768px` to `1023px` (Design ref: 744.pdf)
- **Laptop / Small Desktop**: `1024px` to `1439px` (Design ref: 1024.pdf)
- **Large Desktop**: `1440px+` (Design ref: 1400.pdf)

## Grid & Layout Changes
- **Container**:
  - Mobile: `padding: 0 16px`
  - Tablet: `padding: 0 32px`
  - Desktop: `padding: 0 40px`, `max-width: 1200px`, `margin: 0 auto`

- **Process Section**:
  - Mobile/Tablet: 1-column stack.
  - Desktop: Alternating left/right zig-zag layout.

- **Advantages Section**:
  - Mobile: 1-column vertical stack (or horizontal scroll snap).
  - Tablet: 2-column grid (last item takes full width) or 1-column.
  - Desktop: 3-column grid (`grid-template-columns: repeat(3, 1fr)`).

- **Cases Section**:
  - Mobile/Tablet: 1-column vertical stack.
  - Desktop: 2-column grid (`grid-template-columns: repeat(2, 1fr)`).

## Typography Scaling (Fluid Typography)
- **H1**: Mobile `40px` -> Desktop `96px` (e.g., `clamp(2.5rem, 6vw, 6rem)`)
- **H2**: Mobile `28px` -> Desktop `48px` (e.g., `clamp(1.75rem, 4vw, 3rem)`)
- **Body**: Mobile `16px` -> Desktop `18px`

## Navigation Behavior
- **Mobile**: Hamburger icon opening a full-screen or slide-out menu.
- **Desktop**: Inline horizontal navigation.

## Images & Media
- Images must have `max-width: 100%` and `height: auto`.
- The decorative background gradients should use CSS gradients or SVG to ensure they scale without pixelation and do not cause horizontal scrolling (`overflow-x: hidden` on the `body` or `main` wrapper).
