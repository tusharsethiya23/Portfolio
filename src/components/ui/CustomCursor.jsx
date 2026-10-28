import { useEffect, useRef } from "react";

const BRAND_RED = "#E10600";
const RED_RGB = "rgb(225, 6, 0)"; // BRAND_RED as getComputedStyle reports it
const ON_RED = "#FFFFFF";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const cursorTrailRefs = useRef([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    if (!mediaQuery.matches) {
      return;
    }

    const cursor = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const trail = Array.from({ length: 12 }, () => ({
      x: cursor.x,
      y: cursor.y,
    }));

    /*
      Brand red everywhere, but white while over anything red (the hero,
      Contact, the red project card) so the cursor never disappears.
      The background is the first element with a solid background colour
      among everything stacked under the pointer, in on-screen order, so
      see-through layers like the header don't hide the red hero beneath.
    */
    let lastColor = null;
    const isOverRed = (x, y) => {
      for (const el of document.elementsFromPoint(x, y)) {
        const bg = getComputedStyle(el).backgroundColor;
        if (bg && bg !== "transparent" && !bg.startsWith("rgba(0, 0, 0, 0")) {
          return bg === RED_RGB;
        }
      }
      return false;
    };
    const applyColor = (x, y) => {
      const color = isOverRed(x, y) ? ON_RED : BRAND_RED;
      if (color === lastColor) return;
      lastColor = color;
      [cursorRef.current, ...cursorTrailRefs.current].forEach((el) => {
        if (el) el.style.backgroundColor = color;
      });
    };

    let colorCheck = 0;
    const handleMouseMove = (event) => {
      cursor.x = event.clientX;
      cursor.y = event.clientY;
      // check the colour under the pointer at most once per frame
      if (!colorCheck) {
        colorCheck = requestAnimationFrame(() => {
          colorCheck = 0;
          applyColor(cursor.x, cursor.y);
        });
      }
    };

    let animationFrame;

    const animateCursor = () => {
      let previous = cursor;

      trail.forEach((point, index) => {
        const ease = index === 0 ? 0.32 : 0.22;

        point.x += (previous.x - point.x) * ease;
        point.y += (previous.y - point.y) * ease;

        const element = cursorTrailRefs.current[index];

        if (element) {
          element.style.left = `${point.x}px`;
          element.style.top = `${point.y}px`;
        }

        previous = point;
      });

      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursor.x}px`;
        cursorRef.current.style.top = `${cursor.y}px`;
      }

      animationFrame = requestAnimationFrame(animateCursor);
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    animationFrame = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(colorCheck);
    };
  }, []);

  return (
    <div className="hidden md:block">
      {/* MAIN CURSOR */}
      <div
        ref={cursorRef}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[9999]
          h-3
          w-3
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-brand
          transition-colors
          duration-200
        "
        style={{
          willChange: "left, top",
        }}
      />

      {/* CURSOR TRAIL */}
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          ref={(element) => {
            cursorTrailRefs.current[index] = element;
          }}
          className="
            pointer-events-none
            fixed
            left-0
            top-0
            z-[9998]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-brand
            transition-colors
            duration-200
          "
          style={{
            width: `${Math.max(3, 8 - index * 0.45)}px`,
            height: `${Math.max(3, 8 - index * 0.45)}px`,
            opacity: Math.max(0.05, 0.45 - index * 0.032),
            willChange: "left, top",
          }}
        />
      ))}
    </div>
  );
}