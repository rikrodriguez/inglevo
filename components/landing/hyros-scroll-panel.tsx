"use client";

import { Children, type ReactNode, useEffect, useRef, useState } from "react";

export function HyrosScrollPanel({
  eyebrow,
  title,
  subtitle,
  labels,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  labels: readonly string[];
  children: ReactNode;
}) {
  const items = Children.toArray(children);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [baseIndex, setBaseIndex] = useState(0);
  const [transitionProgress, setTransitionProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionHeight = section.offsetHeight;
      const scrollStart = sectionTop;
      const scrollEnd = sectionTop + sectionHeight - window.innerHeight;
      const scrollable = Math.max(1, scrollEnd - scrollStart);
      const rawProgress = (window.scrollY - scrollStart) / scrollable;
      const progress = Math.min(1, Math.max(0, rawProgress));
      const stepProgress = progress * items.length;
      const nextBaseIndex = Math.min(items.length - 1, Math.floor(stepProgress));
      const localProgress = stepProgress - nextBaseIndex;
      const nextTransitionProgress =
        nextBaseIndex >= items.length - 1
          ? 0
          : Math.min(1, Math.max(0, (localProgress - 0.68) / 0.32));
      const nextActiveIndex =
        nextTransitionProgress > 0.55
          ? Math.min(items.length - 1, nextBaseIndex + 1)
          : nextBaseIndex;

      setBaseIndex(nextBaseIndex);
      setTransitionProgress(nextTransitionProgress);
      setActiveIndex(nextActiveIndex);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [items.length]);

  if (!items.length) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-black px-4 text-white sm:px-6"
      style={{ minHeight: `${Math.max(items.length, 1) * 120}vh` }}
    >
      <div className="sticky top-16 flex min-h-[calc(100vh-4rem)] items-center py-4">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-4 text-center lg:mb-5">
            <p className="mx-auto w-fit rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-semibold text-white/65">
              {eyebrow}
            </p>
            <h2 className="brand-section-title mx-auto mt-3 max-w-5xl text-4xl text-white sm:text-5xl lg:text-[3.7rem]">
              {title}
            </h2>
            <p className="mx-auto mt-2 max-w-3xl text-base leading-6 text-white/62 sm:text-lg">
              {subtitle}
            </p>
          </div>

          <div className="grid h-[min(470px,calc(100vh-15.5rem))] min-h-[390px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.075] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur lg:grid-cols-[300px_1fr] lg:p-7">
            <div className="hidden border-white/10 pr-8 lg:block lg:border-r">
              <div className="grid gap-5 pt-3">
                {labels.map((label, index) => (
                  <div key={label} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <span
                        className={`h-8 w-1 rounded-full transition ${
                          activeIndex === index
                            ? "bg-[linear-gradient(180deg,var(--click-purple),var(--click-blue),var(--click-pink))]"
                            : "bg-white/14"
                        }`}
                      />
                    </div>
                    <div>
                      <p
                        className={`text-lg font-semibold tracking-[-0.03em] transition ${
                          activeIndex === index ? "text-white" : "text-white/45"
                        }`}
                      >
                        {label}
                      </p>
                      {activeIndex === index ? (
                        <p className="mt-2 text-sm leading-6 text-white/55">
                          Step {index + 1} of {labels.length}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-full overflow-hidden lg:pl-8">
              {items.map((item, index) => {
                const isCurrent = index === baseIndex;
                const isNext = index === baseIndex + 1;
                const translateY = isCurrent
                  ? transitionProgress * -18
                  : isNext
                    ? (1 - transitionProgress) * 105
                    : index < baseIndex
                      ? -105
                      : 105;
                const opacity = isCurrent
                  ? 1 - transitionProgress * 0.18
                  : isNext
                    ? transitionProgress
                    : 0;
                const scale = isCurrent ? 1 - transitionProgress * 0.015 : 0.985;

                return (
                  <div
                    key={index}
                    className="absolute inset-0 flex items-center transition-[opacity,transform] duration-200 ease-out will-change-transform"
                    style={{
                      opacity,
                      pointerEvents: activeIndex === index ? "auto" : "none",
                      transform: `translate3d(0, ${translateY}%, 0) scale(${scale})`,
                    }}
                  >
                    <div className="w-full">{item}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
