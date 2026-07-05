import { FadeIn } from "@/components/FadeIn";
import { WaitlistForm } from "@/components/WaitlistForm";

export default function WorkWithUsPage() {
  return (
    <div className="flex flex-col w-full bg-ink min-h-[90vh]">
      {/* Hero Section */}
      <section className="pt-48 pb-24 relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-20 text-center flex flex-col items-center relative z-10">
          <FadeIn>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-parchment mb-8">
              Work with us.
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-xl text-parchment-dim leading-relaxed max-w-2xl font-display">
              Whether you want to collaborate on evaluation research, hire us for freelance AI engineering, or get early access to NEST.ai — start the conversation here.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Unified Form Section */}
      <section className="py-12 pb-40">
        <div className="max-w-2xl mx-auto px-6 md:px-20">
          <FadeIn delay={0.2} className="bg-ink-soft p-8 md:p-16 border border-white/5 relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-laterite" />
            <h2 className="font-display text-3xl text-parchment mb-10 text-center">How can we help?</h2>
            <WaitlistForm showOptions={true} />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
