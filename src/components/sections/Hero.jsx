import { useEffect, useRef } from "react";
import gsap from "gsap";
import { createFluidName } from "../../lib/fluidName";

const PORTRAIT =
  "https://ik.imagekit.io/tusharsethiya023/Tushar%20Images/portfolio%20transparent.png?updatedAt=1790599531637";

function CtaButtons({ scrollToSection, className = "" }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      <button
        type="button"
        onClick={() => scrollToSection("projects")}
        className="
          flex-1
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

          lg:flex-none
        "
      >
        See my work
      </button>
      <button
        type="button"
        onClick={() => scrollToSection("contact")}
        className="
          flex-1
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

          lg:flex-none
        "
      >
        Get in touch
      </button>
    </div>
  );
}

/*
  Fluid name: moving the pointer over the giant name stirs a real fluid
  simulation (see lib/fluidName.js). The letters swirl with the flow and
  drift back into shape once the water calms.
*/
const NAME_LETTERS = "TUSHAR".split("");

function useFluidName() {
  const nameRef = useRef(null);
  const letterRefs = useRef([]);
  const fluidRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fluid = createFluidName(nameRef.current, letterRefs.current);
    fluidRef.current = fluid;
    return () => {
      fluid?.destroy();
      fluidRef.current = null;
    };
  }, []);

  const handlers = {
    onPointerMove: (e) => fluidRef.current?.pointerMove(e),
    onPointerLeave: () => fluidRef.current?.pointerLeave(),
    onPointerCancel: () => fluidRef.current?.pointerLeave(),
  };

  return { nameRef, letterRefs, handlers };
}

export default function Hero({ scrollToSection, ready = true }) {
  const rootRef = useRef(null);
  const fluid = useFluidName();

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

  /*
    Phones stack three bands: copy → portrait over the giant name → buttons.
    From lg up the portrait and name fill the whole section behind the copy.
  */
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
          gap-4
          px-4
          pt-20

          sm:px-6
          sm:pt-24

          lg:flex-row
          lg:items-start
          lg:justify-between
          lg:gap-6
          lg:px-[clamp(16px,3vw,64px)]
          lg:pt-32
        "
      >
        {/* LEFT — headline */}
        <div className="flex max-w-xl flex-col gap-3 lg:gap-4">
          <p
            className="
              hero-reveal
              text-[clamp(30px,8.5vw,48px)]
              font-semibold
              leading-[1.02]
              tracking-tight
              text-balance

              lg:text-[clamp(28px,4.2vw,64px)]
            "
          >
            I make the <span className="font-display font-normal uppercase text-ink">chaos</span> look good.
          </p>
          <p className="hero-reveal max-w-xs text-sm leading-relaxed text-white/85 lg:hidden">
            I build fast, animated interfaces for the web — from first sketch to shipped product.
          </p>
        </div>

        {/* RIGHT — intro + actions (desktop) */}
        <div className="hidden max-w-sm flex-col items-end gap-5 text-right lg:flex">
          <p className="hero-reveal text-base leading-relaxed text-white/85">
            I build fast, animated interfaces for the web — from first sketch to shipped product.
          </p>
          <CtaButtons scrollToSection={scrollToSection} className="hero-reveal" />
        </div>
      </div>

      {/* =========================================
          PORTRAIT + GIANT NAME
          The giant name sits behind the photo. On large screens it runs along
          the bottom; on phones the hoodie fills the bottom, so the name moves to
          the top and only the head overlaps it.
          The figure stands at ~35% of the image width; that point is centred.
      ========================================= */}
      <div
        className="
          relative
          min-h-[44vh]
          flex-1

          lg:absolute
          lg:inset-0
          lg:min-h-0
        "
      >
        <h1
          ref={fluid.nameRef}
          {...fluid.handlers}
          aria-label="Tushar Sethiya"
          className="
            touch-pan-y
            absolute
            inset-x-0
            top-[12%]
            z-0
            flex
            justify-center
            overflow-hidden
            font-display
            text-[35vw]
            leading-[0.8]
            text-ink
            select-none

            lg:top-auto
            lg:bottom-[-0.06em]
            lg:text-[31vw]
          "
        >
          {/* outer span: intro animation; inner span: drawn into the fluid texture */}
          {NAME_LETTERS.map((char, i) => (
            <span key={i} aria-hidden="true" className="hero-letter block">
              <span
                ref={(el) => (fluid.letterRefs.current[i] = el)}
                className="block origin-bottom will-change-transform"
              >
                {char}
              </span>
            </span>
          ))}
        </h1>

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
            h-full
            w-auto
            max-w-none
            -translate-x-[35%]
            object-contain
            object-bottom

            lg:h-[92vh]
          "
        />
      </div>

      {/* =========================================
          MOBILE ACTIONS
      ========================================= */}
      <div className="relative z-20 px-4 pt-4 pb-[max(20px,env(safe-area-inset-bottom))] sm:px-6 lg:hidden">
        <CtaButtons scrollToSection={scrollToSection} className="hero-reveal mx-auto max-w-md" />
      </div>
    </section>
  );
}
