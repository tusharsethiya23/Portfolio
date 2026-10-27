import { useEffect, useRef, useState } from "react";

const PORTRAIT =
  "https://ik.imagekit.io/tusharsethiya023/Tushar%20Images/portfolio%20transparent.png?updatedAt=1790599531637";

const SPECS = [
  { label: "Name", value: "Tushar Sethiya" },
  { label: "Role", value: "Frontend Developer" },
  { label: "Based in", value: "India" },
  { label: "Stack", value: "React · JavaScript · Tailwind CSS · GSAP" },
  { label: "Currently building", value: "ArenaX" },
  { label: "Open to", value: "Freelance & full-time roles" },
];

export default function AboutSpecSheet() {
  const cardRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Rows and the stamp animate in once, when the card scrolls into view
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(card);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="
        bg-[#F3F2EE]
        px-[clamp(16px,3vw,64px)]
        py-20
        sm:py-24
        lg:py-32
      "
    >
      <div
        className="
          mx-auto
          grid
          w-full
          max-w-[1800px]
          gap-10
          lg:grid-cols-12
          lg:items-center
          lg:gap-[clamp(32px,4vw,80px)]
        "
      >
        {/* =========================================
            INTRO
        ========================================= */}
        <div className="flex flex-col gap-5 lg:col-span-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
            ( About )
          </span>
          <h2
            className="
              font-display
              text-[clamp(3.5rem,9vw,8rem)]
              uppercase
              leading-[0.88]
              text-ink
            "
          >
            The spec
            <br />
            <span className="text-brand">sheet.</span>
          </h2>
          <p className="max-w-md text-base leading-relaxed text-neutral-600 sm:text-lg">
            Everything you need to know before we work together, on one card.
          </p>
        </div>

        {/* =========================================
            ID CARD
        ========================================= */}
        <div className="lg:col-span-7">
          <article
            ref={cardRef}
            className="
              relative
              overflow-hidden
              rounded-xl
              border
              border-ink
              bg-white
              shadow-[8px_8px_0_0_var(--color-ink)]
            "
          >
            {/* TOP STRIP */}
            <div className="flex items-center justify-between bg-ink px-4 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white sm:px-6 sm:text-[11px]">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand" />
                Developer ID
              </span>
              <span>No. TS-2026</span>
            </div>

            <div className="flex flex-col gap-6 p-4 sm:flex-row sm:p-6">
              {/* PHOTO */}
              <div className="w-28 shrink-0 sm:w-[clamp(8rem,14vw,11rem)]">
                <div className="aspect-[3/4] overflow-hidden rounded-md border border-ink bg-[#E6E4DF]">
                  <img
                    src={PORTRAIT}
                    alt="Tushar Sethiya"
                    className="h-full w-full object-cover object-[35%_100%] grayscale contrast-125"
                  />
                </div>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  Fig. 01 — Tushar
                </p>
              </div>

              {/* SPEC ROWS */}
              <dl className="min-w-0 flex-1">
                {SPECS.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`
                      grid
                      grid-cols-1
                      gap-0.5
                      border-b
                      border-dashed
                      border-neutral-300
                      py-2.5
                      transition-all
                      duration-700
                      ease-[cubic-bezier(0.16,1,0.3,1)]
                      first:pt-0

                      sm:grid-cols-[minmax(110px,34%)_1fr]
                      sm:gap-4

                      ${inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}
                    `}
                    style={{ transitionDelay: inView ? `${i * 90}ms` : "0ms" }}
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 sm:pt-1 sm:text-[11px]">
                      {spec.label}
                    </dt>
                    <dd className="text-base font-semibold text-ink sm:text-lg">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* FOOTER — barcode + motto */}
            <div className="flex items-end justify-between gap-4 border-t border-ink px-4 py-4 sm:px-6">
              <div
                aria-hidden="true"
                className="h-10 w-40 sm:w-56"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, var(--color-ink) 0 2px, transparent 2px 4px, var(--color-ink) 4px 5px, transparent 5px 8px, var(--color-ink) 8px 11px, transparent 11px 13px)",
                }}
              />
              <p className="text-right font-mono text-[10px] uppercase tracking-widest text-neutral-500 sm:text-[11px]">
                I make the chaos look good.
              </p>
            </div>

            {/* STAMP */}
            <div
              aria-hidden="true"
              className={`
                pointer-events-none
                absolute
                right-4
                top-14
                flex
                h-24
                w-24
                flex-col
                items-center
                justify-center
                rounded-full
                border-[3px]
                border-brand
                text-center
                font-mono
                uppercase
                text-brand
                outline
                outline-2
                outline-offset-[3px]
                outline-brand
                transition-all
                duration-500
                ease-[cubic-bezier(0.34,1.56,0.64,1)]

                sm:right-6
                sm:top-16
                sm:h-28
                sm:w-28

                ${inView ? "rotate-[-14deg] scale-100 opacity-90" : "rotate-[-30deg] scale-[1.8] opacity-0"}
              `}
              style={{ transitionDelay: inView ? `${SPECS.length * 90 + 200}ms` : "0ms" }}
            >
              <span className="text-[15px] font-bold leading-none tracking-wider sm:text-lg">Verified</span>
              <span className="mt-1 text-[8px] tracking-[0.2em] sm:text-[9px]">Frontend · 2026</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
