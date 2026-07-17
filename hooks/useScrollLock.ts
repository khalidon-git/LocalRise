"use client";

import { useEffect } from "react";

// ---------------------------------------------------------------------------
// Body scroll lock, reference counted.
//
// Nav (mobile menu) and the cart drawer can both be open at once. Previously
// each wrote document.body.style.overflow directly and reset it to "" on
// cleanup, so whichever closed first unlocked the page while the other overlay
// was still open — the background scrolled behind it. Counting locks means the
// body only unlocks when the LAST holder releases.
// ---------------------------------------------------------------------------

let lockCount = 0;
let previousOverflow = "";

function acquire() {
  if (lockCount === 0) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  lockCount += 1;
}

function release() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = previousOverflow;
  }
}

/** Locks body scroll while `locked` is true. Safe to use from several components at once. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    acquire();
    return release;
  }, [locked]);
}
