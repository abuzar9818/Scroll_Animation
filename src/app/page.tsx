import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Hero />

      {/* Spacer sections to demonstrate the scroll animation */}
      <section className="h-screen w-full flex items-center justify-center bg-black/80 relative z-10 border-t border-white/10">
        <h2 className="text-4xl md:text-6xl font-outfit font-light text-white/50 tracking-widest">
          E X P L O R E
        </h2>
      </section>
      <section className="h-screen w-full flex items-center justify-center bg-black/90 relative z-10 border-t border-white/10">
        <h2 className="text-4xl md:text-6xl font-outfit font-light text-white/50 tracking-widest">
          D I S C O V E R
        </h2>
      </section>
    </main>
  );
}
