"use client";

import { Button } from "@/components/ui/Button";
import { useWaitlist } from "@/components/forms/WaitlistProvider";
import type { Interest } from "@/lib/waitlist";

type Props = {
  interest?: Interest;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
};

/** Opens the branching waitlist modal, optionally preset to a branch. */
export function WaitlistTrigger({ interest, children, ...rest }: Props) {
  const { open } = useWaitlist();
  return (
    <Button {...rest} onClick={() => open(interest)}>
      {children}
    </Button>
  );
}
