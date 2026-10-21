"use client";

import { useEffect, useRef } from "react";

/**
 * Internet Monitor's Status Ring, drawn live instead of a static image.
 * A day of the connection as a ring: green uptime, a red outage, a yellow
 * sliver of degradation. While the hover target is hovered the ring spins
 * and the core emits radar pings; on leave, each animation rewinds its
 * current cycle back to the rest pose (leaving right after a completed lap
 * means there is nothing to rewind). Hovering again mid-rewind resumes
 * forward from wherever it is. Driven by the Web Animations API because
 * CSS alone cannot rewind an animation gracefully; the hover zoom is
 * plain CSS (.ring-thumb / .ring-hero rules in globals.css).
 *
 * Variants: "thumb" (square list thumbnail, reacts to the whole .post-row)
 * and "hero" (wide banner on the project page, reacts to itself).
 */
export function StatusRing({ variant }: { variant: "thumb" | "hero" }) {
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hoverTarget =
      (variant === "thumb" ? wrapper.closest(".post-row") : null) ?? wrapper;
    const ring = wrapper.querySelector<SVGGElement>(".ring-thumb-ring");
    const core = wrapper.querySelector<SVGCircleElement>(".ring-thumb-core");
    const ping = wrapper.querySelector<SVGCircleElement>(".ring-thumb-ping");
    if (!ring || !core || !ping) return;

    let animations: Animation[] = [];

    const start = () => {
      if (animations.length > 0) {
        for (const animation of animations) {
          animation.effect?.updateTiming({ iterations: Infinity });
          animation.playbackRate = 1;
          animation.play();
        }
        return;
      }
      animations = [
        ring.animate(
          [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
          { duration: 2800, iterations: Infinity, easing: "linear" }
        ),
        core.animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(1.14)" },
            { transform: "scale(1)" },
          ],
          {
            duration: 1400,
            iterations: Infinity,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          }
        ),
        // Fades in before expanding, so playing it backwards also lands
        // on opacity 0 and the ripple never pops in or out.
        ping.animate(
          [
            { transform: "scale(1)", opacity: 0 },
            { transform: "scale(1.2)", opacity: 0.7, offset: 0.15 },
            { transform: "scale(2.35)", opacity: 0 },
          ],
          {
            duration: 1400,
            iterations: Infinity,
            easing: "cubic-bezier(0, 0, 0.2, 1)",
          }
        ),
      ];
    };

    // Rewind the current cycle back to its start, i.e. the rest pose.
    const rewind = () => {
      for (const animation of animations) {
        const duration = Number(animation.effect?.getTiming().duration);
        const elapsed = Number(animation.currentTime);
        if (!duration || !Number.isFinite(elapsed)) continue;
        // Same visual pose, folded into the first iteration, so reversing
        // unwinds only the lap in progress, never every lap seen so far.
        animation.currentTime = elapsed % duration;
        animation.effect?.updateTiming({ iterations: 1 });
        animation.playbackRate = -1;
        animation.play();
      }
    };

    const onEnter = () => start();
    const onLeave = () => rewind();

    hoverTarget.addEventListener("mouseenter", onEnter);
    hoverTarget.addEventListener("mouseleave", onLeave);
    hoverTarget.addEventListener("focusin", onEnter);
    hoverTarget.addEventListener("focusout", onLeave);

    return () => {
      hoverTarget.removeEventListener("mouseenter", onEnter);
      hoverTarget.removeEventListener("mouseleave", onLeave);
      hoverTarget.removeEventListener("focusin", onEnter);
      hoverTarget.removeEventListener("focusout", onLeave);
      for (const animation of animations) animation.cancel();
    };
  }, [variant]);

  return (
    <span
      ref={wrapperRef}
      className={variant === "thumb" ? "ring-thumb" : "ring-hero"}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 120" role="img">
        <g className="ring-thumb-ring">
          {/* Uptime ring */}
          <circle
            cx="60"
            cy="60"
            r="37"
            fill="none"
            stroke="#3ECF6E"
            strokeWidth="14.5"
          />
          {/* Degraded sliver, just left of the outage */}
          <circle
            cx="60"
            cy="60"
            r="37"
            fill="none"
            stroke="#E8B339"
            strokeWidth="14.5"
            pathLength="100"
            strokeDasharray="4.5 95.5"
            transform="rotate(-113 60 60)"
          />
          {/* The outage */}
          <circle
            cx="60"
            cy="60"
            r="37"
            fill="none"
            stroke="#EF4A4A"
            strokeWidth="14.5"
            pathLength="100"
            strokeDasharray="8 92"
            transform="rotate(-105 60 60)"
          />
        </g>
        {/* Radar ping, visible while animating */}
        <circle
          className="ring-thumb-ping"
          cx="60"
          cy="60"
          r="16.5"
          fill="none"
          stroke="#3ECF6E"
          strokeWidth="2"
        />
        {/* Healthy core */}
        <circle
          className="ring-thumb-core"
          cx="60"
          cy="60"
          r="16.5"
          fill="#3ECF6E"
        />
      </svg>
    </span>
  );
}

export function StatusRingThumb() {
  return <StatusRing variant="thumb" />;
}

export function StatusRingHero() {
  return <StatusRing variant="hero" />;
}
