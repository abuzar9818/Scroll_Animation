"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BackgroundParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Road Grid Motion (Moving downward to simulate ground rolling closer)
    const grid = containerRef.current?.querySelector(".abstract-road-grid");
    if (grid) {
      gsap.to(grid, {
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=1500",
          scrub: 1,
        },
        y: "20vh", // The ground grid moves down/closer
        scale: 1.2, // and wider
        ease: "none",
      });
    }

    // 2. Streaks of light zipping by (simulating horizontal/forward velocity blur)
    const streaks = gsap.utils.toArray<HTMLElement>(".light-streak");
    streaks.forEach((streak) => {
      // Ambient zip-by continuously
      gsap.to(streak, {
        x: () => (Math.random() > 0.5 ? "150vw" : "-150vw"),
        duration: () => gsap.utils.random(1.5, 3),
        repeat: -1,
        ease: "power1.inOut",
        delay: () => gsap.utils.random(0, 2),
      });

      // Also stretch and blur more on scroll
      gsap.to(streak, {
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=1500",
          scrub: 0.5,
        },
        scaleX: 3,
        opacity: 0.8,
        ease: "none",
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent z-10" />

      {/* Abstract Road Grid mapping perspective to the bottom */}
      <div 
        className="abstract-road-grid absolute bottom-0 left-[-50vw] right-[-50vw] h-[60vh] opacity-30 origin-bottom will-change-transform"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
          transform: "perspective(1000px) rotateX(75deg)"
        }}
      />

      {/* Velocity Streaks (Light Trails) */}
      <div className="light-streak absolute top-[30%] left-[20%] w-[10vw] h-[2px] bg-blue-400/50 blur-[2px] origin-center will-change-transform" />
      <div className="light-streak absolute top-[40%] right-[30%] w-[15vw] h-[3px] bg-indigo-500/40 blur-[4px] origin-center will-change-transform" />
      <div className="light-streak absolute top-[60%] left-[10%] w-[8vw] h-[2px] bg-cyan-400/60 blur-[2px] origin-center will-change-transform" />
      <div className="light-streak absolute top-[70%] right-[10%] w-[20vw] h-[4px] bg-purple-500/30 blur-[6px] origin-center will-change-transform" />
    </div>
  );
}
