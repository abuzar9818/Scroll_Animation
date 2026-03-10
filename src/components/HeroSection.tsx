"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BackgroundParticles from "./BackgroundParticles";
import StatsSection from "./StatsSection";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_TEXT = "WELCOME ITZ FIZZ";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLHeadingElement>(null);
  const carWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Initial Load Animation Timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Identify elements
      const chars = textContainerRef.current?.querySelectorAll(".headline-char");
      const statCards = containerRef.current?.querySelectorAll(".stat-card");
      
      // Animate headline letters in with stagger
      if (chars && chars.length > 0) {
        tl.fromTo(
          chars,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.05, ease: "power4.out" }
        );
      }

      // Animate statistics cards sequentially after text
      if (statCards && statCards.length > 0) {
        tl.fromTo(
          statCards,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          "-=0.5" // Start slightly before the last letter finishes
        );
      }

      // 2. Scroll-Based Animation (Car entering from left to right center)
      // First, set initial state of car out of view to the left and slightly scaled down
      gsap.set(carWrapperRef.current, {
        xPercent: -100, // Move 100% of its width to the left
        scale: 0.8,
        rotation: -2,
      });

      // Then animate via scrub as the user scrolls
      gsap.to(carWrapperRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",      // Starts when the top of the container hits the top of the viewport
          end: "bottom top",     // Ends when the bottom of the container hits the top of the viewport
          scrub: 1.5,            // Smooth catching-up effect
        },
        xPercent: 50,            // Move to the center (and beyond based on scroll)
        y: 400,                  // Move downwards slightly as scrolling down
        scale: 1.4,              // Scale up
        rotation: 4,             // Rotate slightly
        ease: "none",            // Scrub handles the easing
      });

      // 3. Fade out text on scroll for a clean look
      gsap.to([textContainerRef.current, ".stats-container"], {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "center top",
          scrub: true,
        },
        y: -100,
        opacity: 0,
      });

    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center"
    >
      {/* Dynamic particles and ambient shapes */}
      <BackgroundParticles />

      {/* Foreground Content */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-7xl px-4 mt-[-5vh]">
        {/* Headline with staggered letter reveal */}
        <h1
          ref={textContainerRef}
          className="text-4xl md:text-6xl lg:text-[5rem] font-outfit font-light tracking-[0.2em] md:tracking-[0.3em] text-white text-center mb-16 uppercase drop-shadow-2xl flex flex-wrap justify-center overflow-hidden"
          style={{ paddingLeft: "0.2em" }} // balances tracking
        >
          {HEADLINE_TEXT.split("").map((char, index) => (
            <span
              key={index}
              className="headline-char inline-block whitespace-pre will-change-transform"
            >
              {char === " " ? "\u00A0\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Separated Stats Component */}
        <StatsSection />
      </div>

      {/* Main Visual Element (Car) */}
      <div
        ref={carWrapperRef}
        className="absolute bottom-10 left-0 w-[80vw] md:w-[60vw] lg:w-[1000px] aspect-[21/9] z-30 pointer-events-none will-change-transform"
      >
        <Image
          src="/car.png"
          alt="Premium Scroll Object"
          fill
          priority
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 60vw, 1000px"
          className="object-contain filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
        />
      </div>

      {/* Persistent Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40 animate-pulse z-40 pb-2">
        <span className="text-[10px] uppercase tracking-[0.3em] mb-3 font-inter text-neutral-400">
          Scroll to Explore
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-neutral-400 to-transparent" />
      </div>
    </section>
  );
}
