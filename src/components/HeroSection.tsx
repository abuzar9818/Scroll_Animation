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
      // Unified Scroll-Driven Timeline for Lambo and Text
      // 1. Initial Styles
      const chars = textContainerRef.current?.querySelectorAll(".headline-char") || [];
      const statCards = containerRef.current?.querySelectorAll(".stat-card") || [];

      // Hide text initially
      gsap.set(chars, { opacity: 0, y: 40 });
      gsap.set(statCards, { opacity: 0, y: 40 });

      // Set initial car state off-screen left
      gsap.set(carWrapperRef.current, {
        x: "-40vw",
        y: 0,
        scale: 0.9,
        rotation: 0,
        opacity: 1, // solid car
      });

      // 2. Build Master Scroll Timeline
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1800", // Pinned duration
          scrub: 1,      // Smooth scrubbing
          pin: true,     // Pin the entire section
        }
      });

      // Stage 1: Car entering from left to center
      masterTl.to(carWrapperRef.current, {
        x: "0vw",
        scale: 1,
        duration: 2,
        ease: "power1.inOut"
      })
      // Stage 2a: Text fades in while car is centered
      .to(chars, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power3.out"
      }, "+=0.2") // slight pause after car centers
      // Stage 2b: Stats fade in right after text
      .to(statCards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
      }, "-=0.2") // overlap slightly with text finishing
      // Stage 3: Car peels out to the right
      .to(carWrapperRef.current, {
        x: "50vw",
        duration: 2,
        ease: "power2.in"
      }, "+=0.5"); // hold the full view for a moment before exiting

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

      {/* Ground Floor Grid & Lighting */}
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
        {/* Deep radial glow behind the car centered */}
        <div 
          className="absolute w-[80vw] h-[80vh] rounded-full mix-blend-screen opacity-20"
          style={{ background: "radial-gradient(circle at center, rgba(0,150,255,1), transparent 70%)" }}
        />
        {/* Subtle floor grid/reflection at bottom */}
        <div 
          className="absolute bottom-0 w-full h-[30vh] opacity-10 origin-bottom"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "3rem 3rem",
            transform: "perspective(1000px) rotateX(80deg)"
          }}
        />
      </div>

      {/* Main Visual Element (Car) */}
      <div className="absolute bottom-10 w-full flex justify-center z-30 pointer-events-none overflow-visible">
        <div
          ref={carWrapperRef}
          className="relative w-[80vw] md:w-[60vw] lg:w-[1000px] aspect-[21/9] will-change-transform flex-shrink-0"
        >
          <Image
            src="/lambo-side.png"
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
