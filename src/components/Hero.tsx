"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
    { value: "95%", label: "Customer Satisfaction" },
    { value: "150+", label: "Projects Completed" },
    { value: "10K+", label: "Active Users" },
    { value: "24/7", label: "Support" },
];

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const statsContainerRef = useRef<HTMLDivElement>(null);
    const carRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // 1. Initial Load Animation Timeline
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Animate headline
            tl.fromTo(
                headlineRef.current,
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1.2, delay: 0.2 }
            );

            // Animate statistics (staggered)
            const statsElements = statsContainerRef.current?.children;
            if (statsElements) {
                tl.fromTo(
                    statsElements,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
                    "-=0.6"
                );
            }

            // Animate Car Initial Appearance
            tl.fromTo(
                carRef.current,
                { opacity: 0, scale: 0.85, y: 50 },
                { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power4.out" },
                "-=1.0"
            );

            // 2. Scroll-Based Animation (ScrollTrigger)
            gsap.to(carRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",      // when top of container hits top of viewport
                    end: "bottom top",     // when bottom of container hits top of viewport
                    scrub: 1,              // smooth scrubbing, takes 1 second to "catch up"
                },
                y: 600,                  // moves down visually
                scale: 1.5,              // scaling up slightly
                rotation: 3,             // slight rotation for dynamic feel
                ease: "none",
            });

            // Subtle parallax for headline on scroll
            gsap.to(headlineRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
                y: -150,
                opacity: 0,
            });

            // Fade out stats on scroll
            if (statsElements) {
                gsap.to(statsElements, {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "center top",
                        scrub: true,
                    },
                    y: -50,
                    opacity: 0,
                    stagger: 0.05,
                });
            }

        }, containerRef);

        return () => ctx.revert(); // Cleanup GSAP context on unmount
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center pt-20"
        >
            {/* Background ambient lighting/gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-neutral-900 rounded-full blur-[120px] opacity-50 pointer-events-none" />

            {/* Main Content */}
            <div className="relative z-20 flex flex-col items-center w-full max-w-7xl px-4 mt-[-10vh]">

                {/* Headline */}
                <h1
                    ref={headlineRef}
                    className="text-4xl md:text-6xl lg:text-8xl font-outfit font-light tracking-[0.3em] md:tracking-[0.4em] text-white text-center mb-16 uppercase drop-shadow-2xl"
                    style={{ paddingLeft: "0.3em" }} // visual balance for tracking
                >
                    W E L C O M E I T Z F I Z Z
                </h1>

                {/* Statistics Bar */}
                <div
                    ref={statsContainerRef}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full max-w-5xl"
                >
                    {STATS.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center justify-center text-center group">
                            <span className="text-3xl md:text-5xl font-outfit font-medium text-white mb-2 transition-transform duration-300 group-hover:scale-110">
                                {stat.value}
                            </span>
                            <span className="text-xs md:text-sm font-inter text-neutral-400 tracking-wider uppercase">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* The Scroll Visual Element (Car) */}
            <div
                ref={carRef}
                className="absolute bottom-10 md:bottom-20 left-1/2 -translate-x-1/2 w-[90vw] md:w-[70vw] lg:w-[1200px] aspect-[21/9] z-30 pointer-events-none will-change-transform"
            >
                <Image
                    src="/car.png"
                    alt="Premium Sports Car"
                    fill
                    priority
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 1200px"
                    className="object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
                />
            </div>

            {/* Scroll indicator (Optional, enhances UX) */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 animate-pulse z-40 pb-4">
                <span className="text-xs uppercase tracking-widest mb-2 font-inter text-neutral-500">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-neutral-500 to-transparent" />
            </div>
        </section>
    );
}
