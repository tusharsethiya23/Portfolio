import { useEffect, useRef } from "react";
import gsap from "gsap";

const PORTRAIT =
  "https://ik.imagekit.io/tusharsethiya023/Tushar%20Images/portfolio%20transparent.png?updatedAt=1790599531637";

const STACK = ["React", "JavaScript", "Tailwind CSS", "GSAP"];

export default function Hero({ scrollToSection, ready = true }) {
  const rootRef = useRef(null);

  /*
    Intro plays once the loader has lifted:
    giant name rises, portrait settles in, then the copy.
  */
  useEffect(() => {
    if (!ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(".hero-letter", { yPercent: 105, duration: 1.2, stagger: 0.06 })
        .from(".hero-portrait", { y: 80, opacity: 0, duration: 1.4 }, 0.15)
        .from(".hero-reveal", { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.45);
    }, rootRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      id="home"
      ref={rootRef}
      className="
        relative
        flex
        min-h-[100dvh]
        flex-col
        overflow-hidden
        bg-brand
        text-white
      "
    >
      {/* =========================================
          GIANT NAME — sits behind the portrait
      ========================================= */}
      <h1
        aria-label="Tushar Sethiya"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-[-0.06em]
          z-0
          flex
          justify-center
          overflow-hidden
          font-display
          text-[33vw]
          leading-[0.8]
          text-ink
          select-none

          lg:text-[31vw]
        "
      >
        {"TUSHAR".split("").map((char, i) => (
          <span key={i} aria-hidden="true" className="hero-letter block">
            {char}
          </span>
        ))}
      </h1>

      {/* =========================================
          PORTRAIT
      ========================================= */}
      <img
        src={PORTRAIT}
        alt="Tushar Sethiya"
        className="
          hero-portrait
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          z-10
          h-[62vh]
          w-auto
          max-w-none
          -translate-x-1/2
          object-contain
          object-bottom

          sm:h-[70vh]
          lg:h-[92vh]
        "
      />

      {/* =========================================
          COPY
      ========================================= */}
      <div
        className="
          relative
          z-20
          mx-auto
          flex
          w-full
          max-w-[1800px]
          flex-col
          gap-6
          px-4
          pt-24

          sm:px-6
          sm:pt-28

          lg:flex-row
          lg:items-start
          lg:justify-between
          lg:px-[clamp(16px,3vw,64px)]
          lg:pt-32
        "
      >
        {/* LEFT — headline */}
        <div className="flex max-w-xl flex-col gap-4">
          <span className="hero-reveal font-mono text-xs uppercase tracking-[0.25em] text-white/80">
            ( Frontend Developer )
          </span>
          <p
            className="
              hero-reveal
              text-[clamp(28px,4.2vw,64px)]
              font-semibold
              leading-[1.02]
              tracking-tight
              text-balance
            "
          >
            I make the <span className="font-display font-normal uppercase text-ink">chaos</span> look good.
          </p>
        </div>

        {/* RIGHT — intro + actions */}
        <div className="flex max-w-sm flex-col gap-5 lg:items-end lg:text-right">
          <p className="hero-reveal text-sm leading-relaxed text-white/85 sm:text-base">
            I build fast, animated interfaces for the web — from first sketch to shipped product.
          </p>
          <div className="hero-reveal flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => scrollToSection("projects")}
              className="
                cursor-pointer
                rounded-full
                bg-ink
                px-6
                py-3
                text-sm
                font-medium
                text-white
                transition-colors
                duration-300
                hover:bg-white
                hover:text-ink
              "
            >
              See my work
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="
                cursor-pointer
                rounded-full
                border
                border-white/70
                px-6
                py-3
                text-sm
                font-medium
                text-white
                transition-colors
                duration-300
                hover:border-ink
                hover:bg-ink
              "
            >
              Get in touch
            </button>
          </div>
        </div>
      </div>

      {/* =========================================
          BOTTOM BAR — stack + scroll cue
      ========================================= */}
      <div
        className="
          hero-reveal
          absolute
          inset-x-0
          bottom-0
          z-20
          hidden
          items-end
          justify-between
          px-[clamp(16px,3vw,64px)]
          pb-6
          font-mono
          text-[11px]
          uppercase
          tracking-[0.25em]
          text-white

          lg:flex
        "
      >
        <button
          type="button"
          onClick={() => scrollToSection("about")}
          className="cursor-pointer uppercase tracking-[0.25em] hover:opacity-70"
        >
          ↓ Scroll
        </button>
        <span>{STACK.join(" · ")}</span>
      </div>
    </section>
  );
}
