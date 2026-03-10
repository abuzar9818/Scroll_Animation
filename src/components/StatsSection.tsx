import React from "react";

const STATS = [
  { value: "95%", label: "Customer Satisfaction" },
  { value: "150+", label: "Projects Delivered" },
  { value: "10K+", label: "Active Users" },
  { value: "24/7", label: "Support" },
];

export default function StatsSection() {
  return (
    <div className="stats-container grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full max-w-5xl z-20">
      {STATS.map((stat, index) => (
        <div 
          key={index} 
          className="stat-card flex flex-col items-center justify-center text-center group cursor-default"
        >
          {/* Hover scale and color shift for premium feel */}
          <span className="text-4xl md:text-5xl lg:text-6xl font-outfit font-light text-white mb-3 transition-all duration-300 group-hover:scale-105 group-hover:text-indigo-300 group-hover:drop-shadow-2xl drop-shadow-lg">
            {stat.value}
          </span>
          <span className="text-xs md:text-sm font-inter text-neutral-400 tracking-[0.2em] uppercase transition-colors duration-300 group-hover:text-white">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
