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
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.05, ease: "power3.out" }
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

      // 2. Scroll-Based Animation (Car) mapping to 3 distinct stages
      // Set initial state of car off-screen left and slightly scaled down
      gsap.set(carWrapperRef.current, {
        x: "-40vw",
        scale: 0.8,
        rotation: 0,
        opacity: 0.9,
      });

      // Create a timeline linked to ScrollTrigger for the 3 stages
      const carTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",      // Starts when the top of the container hits the top of the viewport
          end: "+=1500",         // Pins for 1500px of scrolling for longer experience
          scrub: 1,              // Smooth catching-up effect
          pin: true,
        }
      });

      // Stage 1/2: Move from left to center with scale/rotation
      carTl.to(carWrapperRef.current, {
        x: "0vw",
        scale: 1,
        rotation: 1,
        opacity: 1,
        duration: 2,
        ease: "power1.inOut"
      })
      // Stage 3: Continue moving slightly right and scale up
      .to(carWrapperRef.current, {
        x: "20vw",
        scale: 1.05,
        rotation: 0,
        duration: 2,
        ease: "power1.in"
      });

      // 3. Fade out text on scroll for a clean look
      gsap.to([textContainerRef.current, ".stats-container"], {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1000",
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
      <div className="absolute bottom-10 w-full flex justify-center z-30 pointer-events-none overflow-visible">
        <div
          ref={carWrapperRef}
          className="relative w-[80vw] md:w-[60vw] lg:w-[1000px] aspect-[21/9] will-change-transform flex-shrink-0"
        >
          {/* Subtle Glow Behind Car for Depth */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[50%] bg-blue-500/20 blur-[80px] rounded-full pointer-events-none" />
          
          <Image
            src="/car.png"
            alt="Premium Scroll Object"
            fill
            priority
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 60vw, 1000px"
            className="object-contain filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] relative z-10"
          />
        </div>
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
