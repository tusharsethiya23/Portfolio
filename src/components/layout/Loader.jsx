import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const GREETINGS = [
  { text: "Hello", lang: "en" },
  { text: "नमस्ते", lang: "hi" },
  { text: "నమస్కారం", lang: "te" },
  { text: "வணக்கம்", lang: "ta" },
  { text: "Hola", lang: "es" },
];

const MIN_COUNT_SECONDS = 1.2; // fast connections still get a visible count
const MAX_WAIT_SECONDS = 12; // never hold visitors longer than this
const GREETING_HOLD = 0.18; // seconds each greeting stays before the next
const SWAP = 0.3; // seconds for one greeting to slide into the next

/*
  Real loading progress: fonts, the window load event, and every image
  on the page that isn't lazy-loaded. Calls onProgress(done, total)
  each time one of them finishes (or fails, so nothing can stall it).
*/
function trackPageLoad(onProgress) {
  const tasks = [
    document.fonts ? document.fonts.ready : Promise.resolve(),
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise((resolve) => window.addEventListener("load", resolve, { once: true })),
    ...[...document.images]
      .filter((img) => img.loading !== "lazy" && !img.complete)
      .map(
        (img) =>
          new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
          })
      ),
  ];

  let done = 0;
  onProgress(done, tasks.length);
  tasks.forEach((task) =>
    task.then(() => {
      done += 1;
      onProgress(done, tasks.length);
    })
  );
}

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
    const ring = q(".ld-ring")[0];
    const slot = q(".ld-slot")[0];
    const words = q(".ld-word");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame;

    const ctx = gsap.context(() => {
      // The slot glides to each greeting's width so "I am Tushar" moves smoothly.
      // Widths are read lazily, once the web fonts have had time to load.
      const widthOf = (i) => () => words[i].offsetWidth;
      gsap.set(words, { yPercent: 110 });
      gsap.set(words[0], { yPercent: 0 });

      if (reduceMotion) {
        gsap
          .timeline()
          .set(q(".ld-counter"), { autoAlpha: 0 })
          .set(slot, { width: widthOf(0) })
          .set(q(".ld-greeting"), { autoAlpha: 1 })
          .call(() => onRevealRef.current?.(), null, 1.6)
          .to(root, { autoAlpha: 0, duration: 0.5 }, 1.6)
          .call(() => setDone(true));
        return;
      }

      // Everything after the count: number lifts away, greeting, exit
      const playGreeting = () => {
        const tl = gsap.timeline();
        // the closed ring gives a small pulse before the counter lifts away
        tl.to(q(".ld-ring-wrap"), { scale: 1.06, duration: 0.25, ease: "power2.out" }, 0)
          .to(q(".ld-counter"), { yPercent: -40, autoAlpha: 0, duration: 0.4, ease: "power3.in" }, 0.25)
          .set(slot, { width: widthOf(0) })
          .set(q(".ld-greeting"), { autoAlpha: 1 })
          .fromTo(q(".ld-rise"), { yPercent: 110 }, { yPercent: 0, duration: 0.7, ease: "expo.out", stagger: 0.06 }, 0.6);

        // Greeting changes language, the rest stays
        GREETINGS.slice(1).forEach((_, idx) => {
          const i = idx + 1;
          tl.to(words[i - 1], { yPercent: -110, duration: SWAP, ease: "power3.inOut" }, `+=${GREETING_HOLD}`)
            .to(words[i], { yPercent: 0, duration: SWAP, ease: "power3.inOut" }, "<")
            .to(slot, { width: widthOf(i), duration: SWAP, ease: "power3.inOut" }, "<");
        });

        // Exit: the loader lifts away and the site fades in underneath
        tl.call(() => onRevealRef.current?.(), null, "+=0.45")
          .to(root, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "<")
          .call(() => setDone(true));
      };

      /*
        0 → 100 follows real loading. The shown number glides toward the
        loaded share, can't run ahead of a minimum pace, and only reaches
        100 once everything is in. The red ring draws itself around it.
      */
      let loaded = 0;
      trackPageLoad((doneCount, total) => {
        loaded = total ? doneCount / total : 1;
      });

      const start = performance.now();
      let shown = 0;

      const tick = (now) => {
        const elapsed = (now - start) / 1000;
        const timedOut = elapsed > MAX_WAIT_SECONDS;
        const complete = loaded >= 1 || timedOut;

        const target = complete ? 100 : Math.min(99, loaded * 100);
        const paceCap = Math.min(100, (elapsed / MIN_COUNT_SECONDS) * 100);
        const goal = Math.min(target, paceCap);
        shown += Math.max(0, goal - shown) * 0.08 + (goal > shown ? 0.15 : 0);
        shown = Math.min(shown, goal);

        counter.textContent = Math.round(shown);
        ring.style.strokeDashoffset = String(1 - shown / 100);

        if (complete && shown >= 99.9) {
          counter.textContent = "100";
          ring.style.strokeDashoffset = "0";
          playGreeting();
          return;
        }
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, root);

    return () => {
      cancelAnimationFrame(frame);
      ctx.revert();
    };
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
      {/* ================= COUNTER =================
          A thin red ring draws itself clockwise around the number
          as loading progresses, closing at 100. */}
      <div className="ld-counter absolute inset-0 flex items-center justify-center">
        <div className="ld-ring-wrap relative flex aspect-square w-[min(82vw,64vh)] items-center justify-center">
          <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
            <circle
              className="ld-ring"
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="var(--color-brand)"
              strokeWidth="1.2"
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset="1"
            />
          </svg>
          <span className="ld-count font-black leading-none tracking-tight tabular-nums text-[min(22vw,17vh)]">0</span>
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
