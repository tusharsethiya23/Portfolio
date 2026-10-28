import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const GREETINGS = [
  { text: "Hello", lang: "en" },
  { text: "नमस्ते", lang: "hi" },
  { text: "నమస్కారం", lang: "te" },
  { text: "வணக்கம்", lang: "ta" },
  { text: "Hola", lang: "es" },
];

const COUNT_DURATION = 1.6; // seconds for 0 → 100
const GREETING_HOLD = 0.18; // seconds each greeting stays before the next
const SWAP = 0.3; // seconds for one greeting to slide into the next

export default function Loader({ onReveal }) {
  const rootRef = useRef(null);
  const onRevealRef = useRef(onReveal);
  const [done, setDone] = useState(false);

  useEffect(() => {
    onRevealRef.current = onReveal;
  }, [onReveal]);

  useEffect(() => {
    const root = rootRef.current;
    const q = gsap.utils.selector(root);
    const counter = q(".ld-count")[0];
    const slot = q(".ld-slot")[0];
    const words = q(".ld-word");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // The slot glides to each greeting's width so "I am Tushar" moves smoothly.
      // Widths are read lazily, once the web fonts have had time to load.
      const widthOf = (i) => () => words[i].offsetWidth;
      gsap.set(words, { yPercent: 110 });
      gsap.set(words[0], { yPercent: 0 });

      const tl = gsap.timeline();

      if (reduceMotion) {
        tl.set(q(".ld-counter"), { autoAlpha: 0 })
          .set(slot, { width: widthOf(0) })
          .set(q(".ld-greeting"), { autoAlpha: 1 })
          .call(() => onRevealRef.current?.(), null, 1.6)
          .to(root, { autoAlpha: 0, duration: 0.5 }, 1.6)
          .call(() => setDone(true));
        return;
      }

      // 0 → 100
      const count = { v: 0 };
      tl.to(count, {
        v: 100,
        duration: COUNT_DURATION,
        ease: "power2.inOut",
        onUpdate: () => {
          counter.textContent = Math.round(count.v);
        },
      })
        .to(q(".ld-counter"), { yPercent: -40, autoAlpha: 0, duration: 0.4, ease: "power3.in" }, "+=0.1");

      // Hello, I am Tushar
      tl.set(slot, { width: widthOf(0) })
        .set(q(".ld-greeting"), { autoAlpha: 1 })
        .fromTo(
          q(".ld-rise"),
          { yPercent: 110 },
          { yPercent: 0, duration: 0.7, ease: "expo.out", stagger: 0.06 }
        );

      // Greeting changes language, the rest stays
      GREETINGS.slice(1).forEach((_, idx) => {
        const i = idx + 1;
        const at = `+=${GREETING_HOLD}`;
        tl.to(words[i - 1], { yPercent: -110, duration: SWAP, ease: "power3.inOut" }, at)
          .to(words[i], { yPercent: 0, duration: SWAP, ease: "power3.inOut" }, "<")
          .to(slot, { width: widthOf(i), duration: SWAP, ease: "power3.inOut" }, "<");
      });

      // Exit: the loader lifts away and the site fades in underneath
      tl.call(() => onRevealRef.current?.(), null, "+=0.45")
        .to(root, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "<")
        .call(() => setDone(true));
    }, root);

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="
        fixed
        inset-0
        z-[70]
        min-h-[100dvh]
        overflow-hidden
        bg-black
        font-loader
        text-white
        select-none
      "
    >
      {/* ================= COUNTER ================= */}
      <div className="ld-counter absolute inset-0 flex items-center justify-center">
        <div className="flex items-start font-black leading-none tracking-tight">
          <span className="ld-count tabular-nums text-[clamp(112px,32vw,280px)] sm:text-[clamp(96px,22vw,280px)]">0</span>
          <span className="mt-[0.6em] text-[clamp(22px,6vw,40px)] text-[#E10600] sm:text-[clamp(20px,3vw,40px)]">%</span>
        </div>
      </div>

      {/* ================= GREETING ================= */}
      <div className="ld-greeting invisible absolute inset-0 flex items-center justify-center px-4">
        {/* Phones: greeting and "I am Tushar" on two fixed lines, so swapping languages never reflows the text */}
        <h1
          className="
            flex
            flex-col
            items-center
            text-center
            text-[clamp(36px,11vw,64px)]
            font-greeting
            font-normal
            leading-[1.4]
            tracking-tight

            sm:flex-row
            sm:items-baseline
            sm:justify-center
            sm:gap-x-[0.3em]
            sm:text-[clamp(34px,6.5vw,96px)]
          "
        >
          <span className="flex items-baseline overflow-hidden">
            <span className="ld-rise flex items-baseline">
              {/* All greetings share one grid cell and one baseline, so each lines up with "I am Tushar" */}
              <span className="ld-slot inline-grid items-baseline justify-items-start overflow-hidden">
                {GREETINGS.map((g, i) => (
                  <span
                    key={i}
                    lang={g.lang}
                    className="ld-word whitespace-nowrap [grid-area:1/1]"
                    aria-hidden={i !== 0}
                  >
                    {g.text}
                  </span>
                ))}
              </span>
              <span>,</span>
            </span>
          </span>
          <span className="overflow-hidden">
            <span className="ld-rise inline-block whitespace-nowrap pr-[0.15em]">
              I am <span className="font-name text-[1.1em] font-normal tracking-normal text-[#E10600]">Tushar</span>
            </span>
          </span>
        </h1>
      </div>
    </div>
  );
}
