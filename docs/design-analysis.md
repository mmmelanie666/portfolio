# Design Analysis

## Layout
- **Container**: Max-width of around `1200px` for desktop to keep content readable and centered, with responsive padding (e.g., `20px` on mobile, `40px` on tablet).
- **Desktop Grid (1400px)**:
  - **Process Section**: Staggered or alternating layout (steps zig-zag down the page).
  - **Advantages Section**: 3-column grid (`1fr 1fr 1fr`).
  - **Cases Section**: 2-column grid (`1fr 1fr`).
- **Mobile Grid (390px)**:
  - 1-column layout. Elements stack vertically.
- **Vertical Rhythm**: Generous spacing between sections (e.g., `120px` to `160px` on desktop, `80px` on mobile).

## Typography
*Note: Exact font families need to be confirmed via assets.*
- **Font-Family**: Suggesting a clean, geometric sans-serif (e.g., *Montserrat*, *Manrope*, or *Inter*).
- **H1 (Hero Name)**: ALL CAPS, ultra-large font size (fluid typography, e.g., `clamp(3rem, 8vw, 7rem)`), heavy font-weight (`700` or `800`), tight line-height (`1.1`).
- **H2 (Section Titles)**: ALL CAPS, primary color, large font size (e.g., `clamp(2rem, 5vw, 3rem)`), font-weight (`600`).
- **H3 (Card Titles / Process Steps)**: ALL CAPS, medium font size (`1.25rem` to `1.5rem`), font-weight (`600`), primary color or dark.
- **Body Text**: `1rem` to `1.125rem`, normal weight (`400`), readable line-height (`1.5` or `1.6`), dark gray/black.
- **Services Marquee/List**: Huge ALL CAPS text, possibly `800` weight, dark color.

## Colors
*Note: Exact hex codes need to be extracted from Figma or assets.*
- **Primary / Accent Color**: A vibrant coral/orange (used for buttons, section titles). Estimated: `#FF6B4A` (TBD).
- **Text Primary**: Dark slate/black for optimal readability. Estimated: `#1A1A1A`.
- **Text Secondary**: Lighter gray for descriptions. Estimated: `#4A4A4A`.
- **Background**: Soft, warm off-white or light gradients. Estimated: `#FAFAFA` (with decorative background gradient blobs).

## Components
- **Buttons**:
  - `default`: Primary background color, white text, uppercase or sentence case, moderate padding (e.g., `16px 32px`), rounded corners (e.g., `8px` or pill-shaped `100px`).
  - `hover`: Slightly darker or lighter background, potential transform (scale).
- **Navigation (Header)**:
  - Horizontal list on desktop, hidden/hamburger menu on mobile.
  - Links have hover states (color change or underline).
- **Process Steps**: Number/Icon/Graphic + Title + Description.
- **Advantages Cards**: Graphic element (AI blob) + Title + Description.
- **Project Cards (Cases)**: Laptop mockup image + Title. (Images act as links to live sites or modals).

## Assets Needed (OPEN QUESTIONS)
1. **Fonts**: Which exact font families are used?
2. **Colors**: Need the exact hex codes for the primary color and gradients.
3. **Images/Graphics**: Need exports of:
   - The decorative AI blobs/gradients.
   - The laptop mockups for the cases.
   - The background graphics (if any).
4. **Icons**: Need SVGs for mobile menu, any UI icons.

*(This document is based on a visual estimation from the provided PDFs. Adjustments will be made once exact assets and tokens are provided.)*
