"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BackgroundParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const shapes = gsap.utils.toArray<HTMLElement>(".bg-shape");

    // 1. Initial floating animation (ambient)
    shapes.forEach((shape, index) => {
      gsap.to(shape, {
        x: () => gsap.utils.random(-100, 100),
        y: () => gsap.utils.random(-100, 100),
        rotation: () => gsap.utils.random(-45, 45),
        duration: () => gsap.utils.random(10, 20),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 2. Parallax effect based on scroll (scrubbed)
      // They move slightly slower than the scroll mapping for depth
      gsap.to(shape, {
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=1800",
          scrub: 1, // Smooth scrub
        },
        y: -100, // Move slower than scroll exactly -100px up
        ease: "none",
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep dark gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80 z-10" />

      {/* Shapes with will-change for performance */}
      <div className="bg-shape absolute top-[20%] left-[10%] w-[30vw] h-[30vw] min-w-[300px] min-h-[300px] bg-indigo-900/30 rounded-full blur-[100px] will-change-transform" />
      <div className="bg-shape absolute top-[40%] right-[10%] w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] bg-purple-900/20 rounded-full blur-[120px] will-change-transform" />
      <div className="bg-shape absolute bottom-[-10%] left-[30%] w-[50vw] h-[50vw] min-w-[500px] min-h-[500px] bg-neutral-800/40 rounded-full blur-[150px] will-change-transform" />
      
      {/* Subtle background static grid pattern for premium tech feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0 opacity-50" />
    </div>
  );
}
