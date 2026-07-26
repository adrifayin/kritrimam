import { Header } from "@/components/nav/Header";
import { Hero } from "@/components/sections/Hero";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { Fork } from "@/components/sections/Fork";
import { Nest } from "@/components/sections/Nest";
import { CtaBand } from "@/components/sections/CtaBand";
import { Budhi } from "@/components/sections/Budhi";
import { Vision } from "@/components/sections/Vision";
import { Motto } from "@/components/sections/Motto";
import { Waitlist } from "@/components/sections/Waitlist";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Divider } from "@/components/ui/Divider";

function SectionDivider() {
  return (
    <div className="container-content">
      <Divider />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <ProofStrip />
        <Fork />
        <SectionDivider />
        <Nest />
        <CtaBand />
        <Budhi />
        <SectionDivider />
        <Vision />
        <Motto />
        <Waitlist />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
