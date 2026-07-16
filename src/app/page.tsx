"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { NestAiSection } from "@/components/sections/NestAiSection";
import { BudhiSection } from "@/components/sections/BudhiSection";
import { VisionSection } from "@/components/sections/VisionSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <NestAiSection />
      <BudhiSection />
      <VisionSection />
      <ContactSection />
    </>
  );
}
