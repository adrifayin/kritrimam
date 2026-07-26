"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

type Props = {
  desktopSrc: string;
  /** Optional mobile cut (<768px). Omit until the encode exists. */
  mobileSrc?: string;
  poster?: string;
  className?: string;
};

const noop = () => () => {};

/** Reads the browser Save-Data hint without setState-in-effect. */
function useSaveData(): boolean {
  return useSyncExternalStore(
    noop,
    () =>
      (navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData ?? false,
    () => false, // server snapshot
  );
}

/**
 * Background video with viewport source-switching (§11).
 * Renders poster-only under reduced-motion or Save-Data, and never fetches
 * the video in those cases.
 */
export function AdaptiveVideo({ desktopSrc, mobileSrc, poster, className }: Props) {
  const reduce = useReducedMotion();
  const saveData = useSaveData();
  const posterOnly = reduce || saveData;

  if (posterOnly) {
    return (
      <div
        className={className}
        style={
          poster
            ? {
                backgroundImage: `url(${poster})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
        aria-hidden="true"
      />
    );
  }

  return (
    <video
      aria-hidden="true"
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
    >
      {mobileSrc && (
        <source media="(max-width: 767px)" src={mobileSrc} type="video/mp4" />
      )}
      <source src={desktopSrc} type="video/mp4" />
    </video>
  );
}
