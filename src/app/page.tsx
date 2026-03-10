import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <HeroSection />
      
      {/* Spacer sections to demonstrate the car's scroll parallax through the page */}
      <section className="h-screen w-full flex items-center justify-center bg-black/95 relative z-10 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/10 to-transparent pointer-events-none" />
        <h2 className="text-4xl md:text-6xl font-outfit font-light text-white/40 tracking-widest drop-shadow-xl z-10">
          E X P E R I E N C E
        </h2>
      </section>
      <section className="h-screen w-full flex items-center justify-center bg-neutral-950 relative z-10 border-t border-white/5">
        <h2 className="text-4xl md:text-6xl font-outfit font-light text-white/30 tracking-widest drop-shadow-xl z-10">
          T H E   F U T U R E
        </h2>
      </section>
    </main>
  );
}
