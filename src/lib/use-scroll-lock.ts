"use client";

import { useEffect } from "react";

/**
 * Locks background scrolling while an overlay is open.
 *
 * `body { overflow: hidden }` alone is not enough: iOS Safari happily scrolls
 * the document behind a fixed overlay anyway, so opening the waitlist sheet and
 * dragging would drift the page underneath it. Pinning the body with
 * `position: fixed` at a negative offset is the reliable fix, with the scroll
 * position restored on unlock.
 *
 * The gutter left by the hidden scrollbar is padded out so desktop layout
 * doesn't shift sideways as the overlay opens.
 */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const { body, documentElement: html } = document;
    const scrollY = window.scrollY;
    const scrollbar = window.innerWidth - html.clientWidth;

    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
      overscroll: html.style.overscrollBehavior,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    // Stops pull-to-refresh and scroll chaining past the overlay.
    html.style.overscrollBehavior = "none";

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      body.style.paddingRight = prev.paddingRight;
      html.style.overscrollBehavior = prev.overscroll;

      // `html { scroll-behavior: smooth }` would otherwise animate this.
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
    };
  }, [locked]);
}
