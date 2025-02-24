"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, useSpring, useTransform, SpringOptions } from "framer-motion";
import { cn } from "~/lib/utils";
import { useHydrated } from "~/hooks/use-hydrated";

type SpotlightProps = {
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
};

export function Spotlight({
  className,
  size = 200,
  springOptions = { bounce: 0 },
}: SpotlightProps) {
  const isHydrated = useHydrated();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  useEffect(() => {
    if (isHydrated && containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        parent.style.position = "relative";
        parent.style.overflow = "hidden";
        setParentElement(parent);
      }
    }
  }, [isHydrated]);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement) return;
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    },
    [mouseX, mouseY, parentElement],
  );

  useEffect(() => {
    if (!isHydrated || !parentElement) return;

    parentElement.addEventListener("mousemove", handleMouseMove);
    parentElement.addEventListener("mouseenter", () => setIsHovered(true));
    parentElement.addEventListener("mouseleave", () => setIsHovered(false));

    return () => {
      parentElement.removeEventListener("mousemove", handleMouseMove);
      parentElement.removeEventListener("mouseenter", () => setIsHovered(true));
      parentElement.removeEventListener("mouseleave", () =>
        setIsHovered(false),
      );
    };
  }, [isHydrated, parentElement, handleMouseMove]);

  if (!isHydrated) {
    return null;
  }

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 z-30 transition duration-300",
        className,
      )}
      style={{
        opacity: isHovered ? 1 : 0,
      }}
      data-oid="kgb66lu"
    >
      <motion.div
        className="absolute inset-0 z-30 bg-gradient-to-r from-transparent via-accent-foreground/10 to-transparent"
        style={{
          left: spotlightLeft,
          top: spotlightTop,
          width: size,
          height: size,
        }}
        data-oid="4v9ckpe"
      />
    </motion.div>
  );
}
