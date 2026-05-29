"use client";

import { Children, type ReactNode, useEffect, useRef, useState } from "react";

export function ScrollSwapSection({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateActiveIndex = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const cardProgress = progress * Math.max(items.length - 1, 1);
      const nextIndex = Math.min(
        items.length - 1,
        Math.max(0, Math.round(cardProgress))
      );

      setProgress(cardProgress);
      setActiveIndex(nextIndex);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveIndex);
    };

    updateActiveIndex();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, [items.length]);

  if (!items.length) {
    return null;
  }

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ minHeight: `${Math.max(items.length, 1) * 105}vh` }}
    >
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-center">
        <div className="w-full">
          <div className="relative mx-auto min-h-[640px] w-full overflow-hidden sm:min-h-[690px]">
            {items.map((item, index) => {
              const offset = index - progress;
              const distance = Math.min(Math.abs(offset), 1);

              return (
                <div
                  key={index}
                  className="absolute inset-x-0 top-0 will-change-transform"
                  style={{
                    opacity: Math.max(0, 1 - distance * 0.72),
                    pointerEvents: activeIndex === index ? "auto" : "none",
                    transform: `translate3d(0, ${offset * 112}%, 0) scale(${1 - distance * 0.025})`,
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
          <div className="mx-auto mt-5 flex w-fit gap-2 rounded-full border border-border bg-white/85 p-2 shadow-sm backdrop-blur">
            {items.map((_, index) => (
              <span
                key={index}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === index
                    ? "w-8 bg-[linear-gradient(90deg,var(--click-purple),var(--click-blue),var(--click-pink))]"
                    : "w-2 bg-[#dfdbd6]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
