"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

/**
 * 3D tilt card — follows the cursor with spring physics.
 * maxTilt in degrees; glare adds a cursor-tracking sheen.
 * All cursor values are lerped (spring) — raw values feel twitchy.
 */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 7,
  glare = true,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [maxTilt, -maxTilt]), { stiffness: 180, damping: 22 });
  const ry = useSpring(useTransform(mx, [0, 1], [-maxTilt, maxTilt]), { stiffness: 180, damping: 22 });

  // Lerped glare position — springs, not raw state
  const gx = useSpring(mx, { stiffness: 260, damping: 28 });
  const gy = useSpring(my, { stiffness: 260, damping: 28 });
  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${useTransform(gx, (v) => v * 100)}% ${useTransform(gy, (v) => v * 100)}%, rgba(192,127,255,0.14), transparent 65%)`;

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        mx.set(0.5);
        my.set(0.5);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            opacity: hovering ? 1 : 0,
            background: glareBg,
          }}
          transition={{ opacity: { duration: 0.3 } }}
        />
      )}
    </motion.div>
  );
}
