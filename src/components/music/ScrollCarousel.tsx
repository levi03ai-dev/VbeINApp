import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface ScrollCarouselProps {
  children: React.ReactNode[];
  autoplayInterval?: number;
  className?: string;
}

export function ScrollCarousel({
  children,
  autoplayInterval = 4000,
  className = "",
}: ScrollCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const isAutoScrolling = useRef(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const N = children.length;
  const showLoop = N > 1;

  // Duplicate the children three times to allow seamless infinite wrapping: [Set 1] [Set 2 (Main)] [Set 3]
  const renderedChildren = showLoop
    ? [
        ...children.map((child, i) =>
          React.isValidElement(child)
            ? React.cloneElement(child, { key: `set-0-${i}` } as { key: string })
            : child,
        ),
        ...children.map((child, i) =>
          React.isValidElement(child)
            ? React.cloneElement(child, { key: `set-1-${i}` } as { key: string })
            : child,
        ),
        ...children.map((child, i) =>
          React.isValidElement(child)
            ? React.cloneElement(child, { key: `set-2-${i}` } as { key: string })
            : child,
        ),
      ]
    : children;

  // Initialize the scroll position to the first card of the middle set
  const initScrollPosition = React.useCallback(() => {
    const container = containerRef.current;
    if (!container || !showLoop) return;

    const childNodes = Array.from(container.children);
    if (childNodes.length < N * 3) return;

    const targetChild = childNodes[N] as HTMLElement;
    if (targetChild) {
      const containerWidth = container.clientWidth;
      const childWidth = targetChild.clientWidth;
      const childOffset = targetChild.offsetLeft;
      container.scrollLeft = childOffset - (containerWidth - childWidth) / 2;
    }
  }, [N, showLoop]);

  useEffect(() => {
    const timer = setTimeout(() => {
      initScrollPosition();
    }, 50);
    return () => clearTimeout(timer);
  }, [initScrollPosition]);

  useEffect(() => {
    if (!showLoop) return;
    const handleResize = () => {
      initScrollPosition();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showLoop, initScrollPosition]);

  // Instantly snaps the scroll position back into the middle set when crossing sets
  const checkBoundaryLoop = React.useCallback(() => {
    const container = containerRef.current;
    if (!container || !showLoop) return;

    const childNodes = Array.from(container.children);
    if (childNodes.length < N * 3) return;

    const firstMiddleChild = childNodes[N] as HTMLElement;
    const lastMiddleChild = childNodes[2 * N - 1] as HTMLElement;
    const firstChild = childNodes[0] as HTMLElement;

    if (!firstMiddleChild || !lastMiddleChild || !firstChild) return;

    const setWidth = firstMiddleChild.offsetLeft - firstChild.offsetLeft;
    if (setWidth <= 0) return;

    const scrollLeft = container.scrollLeft;
    const middleStart =
      firstMiddleChild.offsetLeft - (container.clientWidth - firstMiddleChild.clientWidth) / 2;
    const middleEnd =
      lastMiddleChild.offsetLeft - (container.clientWidth - lastMiddleChild.clientWidth) / 2;

    const lowerBound = middleStart - setWidth / 2;
    const upperBound = middleEnd + setWidth / 2;

    if (scrollLeft < lowerBound) {
      container.scrollTo({
        left: scrollLeft + setWidth,
        behavior: "auto",
      });
    } else if (scrollLeft > upperBound) {
      container.scrollTo({
        left: scrollLeft - setWidth,
        behavior: "auto",
      });
    }
  }, [N, showLoop]);

  // Function to scroll to a specific index in the children list and center it
  const scrollToCard = React.useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container) return;

      const childNodes = Array.from(container.children);
      if (index < 0 || index >= childNodes.length) return;

      const child = childNodes[index] as HTMLElement;
      if (child) {
        const containerWidth = container.clientWidth;
        const childWidth = child.clientWidth;
        const childOffset = child.offsetLeft;
        const targetScrollLeft = childOffset - (containerWidth - childWidth) / 2;

        isAutoScrolling.current = true;
        container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });

        // Release lock and normalize boundaries once smooth-scroll is done
        setTimeout(() => {
          isAutoScrolling.current = false;
          checkBoundaryLoop();
        }, 600);
      }
    },
    [checkBoundaryLoop],
  );

  // Determine active index on manual or auto scrolling
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!isAutoScrolling.current) {
      checkBoundaryLoop();
    }

    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    const childNodes = Array.from(container.children);

    if (childNodes.length === 0) return;

    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < childNodes.length; i++) {
      const child = childNodes[i] as HTMLElement;
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const containerCenter = scrollLeft + containerWidth / 2;
      const distance = Math.abs(childCenter - containerCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    const activeRealIndex = showLoop ? closestIndex % N : closestIndex;
    if (activeRealIndex !== activeIndex) {
      setActiveIndex(activeRealIndex);
    }
  };

  // Autoplay loop that scrolls to the next element continuously
  useEffect(() => {
    if (isPaused || !showLoop) return;

    const timer = setInterval(() => {
      const currentContainerIndex = N + activeIndex;
      const nextContainerIndex = currentContainerIndex + 1;
      scrollToCard(nextContainerIndex);
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [activeIndex, isPaused, N, autoplayInterval, showLoop, scrollToCard]);

  // Handle manual interaction to pause autoplay and resume later
  const handleInteractionStart = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
  };

  const handleInteractionEnd = () => {
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 8000);
  };

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  return (
    <div className="w-full relative group/carousel">
      {/* Scroll container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
        onMouseDown={handleInteractionStart}
        onMouseUp={handleInteractionEnd}
        onMouseEnter={handleInteractionStart}
        onMouseLeave={handleInteractionEnd}
        className={`no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pt-1 ${className}`}
      >
        {renderedChildren}
      </div>

      {/* Modern, elegant Indicators */}
      {N > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {children.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                handleInteractionStart();
                scrollToCard(showLoop ? N + idx : idx);
                handleInteractionEnd();
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-5 bg-accent" : "w-1.5 bg-white/20"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
