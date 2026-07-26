"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { WaitlistModal } from "@/components/forms/WaitlistModal";
import type { Interest } from "@/lib/waitlist";

type Ctx = { open: (interest?: Interest) => void };

const WaitlistContext = createContext<Ctx | null>(null);

export function useWaitlist(): Ctx {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error("useWaitlist must be used within <WaitlistProvider>");
  return ctx;
}

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [interest, setInterest] = useState<Interest | undefined>(undefined);

  const openModal = useCallback((i?: Interest) => {
    setInterest(i);
    setOpen(true);
  }, []);

  return (
    <WaitlistContext.Provider value={{ open: openModal }}>
      {children}
      <WaitlistModal
        open={open}
        onClose={() => setOpen(false)}
        initialInterest={interest}
      />
    </WaitlistContext.Provider>
  );
}
