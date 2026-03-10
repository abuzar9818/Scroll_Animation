# Cinematic Scroll Animation

![Project Layout Representation](public/car.png)

A high-performance, premium scroll-driven hero section built with **React**, **Next.js**, **Tailwind CSS**, and **GSAP ScrollTrigger**. 

This project was engineered to replicate top-tier, cinematic horizontal scrolling experiences directly tied to vertical scroll progression. By parsing scroll distance into explicit multi-stage translation and scaling rules, it creates the illusion of a luxury sports car dynamically "driving" out of the viewport.

---

## ✨ Core Architecture & Features

### 1. The 4-Stage Cinematic GSAP Timeline
The core of the interaction lies within `HeroSection.tsx`, which pins a `100vh` container and intercepts normal scrolling for `2500px` (`end: "+=2500"`). The scrubbing is intentionally delayed (`scrub: 1.5`) for a heavy, luxurious weight.

The scroll sequence is mathematically divided into 4 specific stages of interaction:
- **Load State:** The Lamborghini acts as a massive (`w-[60vw]` max `1100px`) visual anchor. It uses `left-1/2 -translate-x-1/2` to preserve absolute centering geometry, but is initially offset to `x: "-25vw"`. This means the front half of the car is invitingly visible immediately on page load.
- **Stage 1 (Entering):** `x: "-25vw"` → `x: "-5vw"` (Scale: `0.95` → `1`). A subtle rotation (`0.5deg`) simulates the front suspension lifting under acceleration.
- **Stage 2 (Syncing):** `x: "-5vw"` → `x: "15vw"`. As the car crosses the exact center of the screen, the underlying typography (`W E L C O M E ITZ FIZZ`) and Metric statistics (`95%`, `150+`) are triggered to stagger elegantly upward sequentially.
- **Stage 3 (Accelerating):** `x: "15vw"` → `x: "35vw"`. The car's tail dips (`rotation: -0.5deg`) simulating rear-wheel traction as it prepares to exit.
- **Stage 4 (Exiting):** `x: "35vw"` → `x: "50vw"`. The rotation flattens out to `0` as the car leaves the stage gracefully.

### 2. Strict Z-Index Layering
To maintain depth and realism, a strict composition hierarchy is enforced using raw Tailwind CSS modifiers:
1. **Background Elements (`z-10`):** Ambient abstract orbs floating continuously, combined with a `mix-blend-screen` radial glow centered physically behind the car, and a CSS perspective mapped floor grid reflection.
2. **The Car Element (`z-20`):** Floating entirely transparent, positioned absolutely to move across the layout cleanly without displacing the DOM.
3. **The Typography (`z-30`):** The staggered `h1` letters and statistical cards render forcefully above the car grid, ensuring readability is never sacrificed.

### 3. Absolute Frame-Rate Performance
The animation is deliberately constrained to hardware-accelerated CSS properties:
- `translateX` (`x`)
- `scale`
- `rotation`

By combining this with `will-change-transform` on the `.carWrapper`, we bypass expensive browser layout recalculations (`reflow`) entirely, securing a perfectly locked `60fps` animation sequence.

---

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Directory routing structure)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Extensive use of utility classes for layout, gradients, and z-indexing)
- **Animation Engine:** [GSAP](https://gsap.com/) (GreenSock Animation Platform)
- **Scroll Hook:** [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) with `@gsap/react` integration for strict React DOM scoping and cleanup.
- **Language:** TypeScript

---

## 🛠️ Components Breakdown

- `src/app/page.tsx`: The primary wrapper assembling the Next.js page layouts. It integrates the `SmoothScrollProvider` wrapping library (Lenis) for buttery smooth system-level scrolling.
- `src/components/HeroSection.tsx`: The heart of the project. This component holds the `masterTl` (GSAP timeline), handles pinning, and manages the relative/absolute DOM structure of the hero element.
- `src/components/StatsSection.tsx`: A lightweight presentation component rendering the four grid layout statistics cards (`95% Customer Satisfaction`, etc.).
- `src/components/BackgroundParticles.tsx`: Provides the infinite ambient floating gradient orbs and strict deep dark overlay to ensure text contrast ratios remain high.

---

## 📦 Getting Started & Local Development

### Prerequisites
- Node.js version 18+

### Installation

1. Clone or download the repository.
2. Install the necessary NPM dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. Run the development server locally:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) and gently scroll down the page to trigger the cinematic Lamborghini sequence!

---

## 🖼️ Media Sources
- `public/car.png`: A high-resolution, perfectly masked side-profile racing vehicle featuring absolute true transparency completely free of checkerboard backing artifacts.
