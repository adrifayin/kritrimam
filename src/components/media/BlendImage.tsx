"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  /** Sizing/aspect classes for the container (e.g. "aspect-square w-full"). */
  className?: string;
  imgClassName?: string;
  /** Composite white-on-black art onto the page (black drops out). */
  blend?: boolean;
  /** Cursor-driven 3D tilt. */
  tilt?: boolean;
  priority?: boolean;
  sizes?: string;
  objectFit?: "contain" | "cover";
};

export function BlendImage({
  src,
  alt,
  className,
  imgClassName,
  blend = true,
  tilt = true,
  priority = false,
  sizes = "(max-width: 768px) 90vw, 40vw",
  objectFit = "contain",
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), {
    stiffness: 150,
    damping: 15,
  });
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), {
    stiffness: 150,
    damping: 15,
  });

  const enableTilt = tilt && !reduce;

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div
      ref={ref}
      onMouseMove={enableTilt ? onMove : undefined}
      onMouseLeave={enableTilt ? onLeave : undefined}
      className={cn("group relative [perspective:1000px]", className)}
    >
      <motion.div
        style={
          enableTilt
            ? { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }
            : undefined
        }
        className="relative size-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            objectFit === "cover" ? "object-cover" : "object-contain",
            blend && "mix-blend-screen",
            "transition-[filter,transform] duration-500 group-hover:brightness-110 motion-safe:group-hover:scale-[1.02]",
            imgClassName,
          )}
        />
      </motion.div>
    </div>
  );
}
