import { useEffect, useRef, useState } from "react";
import { SiCss, SiExpress, SiGit, SiHtml5, SiJavascript, SiMongodb, SiNodedotjs, SiTailwindcss } from "react-icons/si";

/*
  A tiny browser that builds a site as the paragraphs advance:
  stage 0 = blank page, 1 = dashed wireframe, 2 = finished page.
  Each block is one element whose look depends on the stage.
*/
function Block({ stage, delay = 0, done = "", className = "", children }) {
  const look =
    stage === 0
      ? "scale-95 border-transparent opacity-0"
      : stage === 1
        ? "scale-100 border-dashed border-white/30 bg-transparent opacity-100"
        : `scale-100 border-transparent opacity-100 ${done}`;

  return (
    <div
      className={`rounded-md border-2 transition-all duration-500 ease-out ${look} ${className}`}
      style={{ transitionDelay: stage > 0 ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

function MiniBrowser({ stage }) {
  const finished = stage === 2;

  return (
    <div aria-hidden="true" className="absolute inset-[6%] flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#141414] shadow-2xl">
      {/* window bar */}
      <div className="flex shrink-0 items-center gap-3 border-b border-white/10 bg-[#1f1f1f] px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 truncate rounded-md bg-[#2a2a2a] px-3 py-1 font-mono text-[10px] text-white/50">
          localhost:5173
        </div>
      </div>

      {/* page */}
      <div className="relative flex flex-1 flex-col gap-[4%] p-[5%]">
        {/* blank page cursor */}
        <div
          className={`absolute inset-0 flex items-center justify-center font-mono text-xs text-white/40 transition-opacity duration-300 ${stage === 0 ? "opacity-100" : "opacity-0"}`}
        >
          <span>// blank page</span>
          <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-brand" />
        </div>

        {/* nav */}
        <div className="flex items-center justify-between">
          <Block stage={stage} delay={0} done="bg-white" className="h-3 w-[22%]" />
          <Block stage={stage} delay={60} done="bg-white" className="h-3 w-[8%]" />
        </div>

        {/* hero */}
        <Block stage={stage} delay={120} done="bg-brand" className="relative flex flex-[1.4] flex-col justify-end gap-[6%] p-[4%]">
          <div className={`transition-opacity duration-500 ${finished ? "opacity-100 delay-300" : "opacity-0"}`}>
            <p className="font-display text-[clamp(1.75rem,4.5vw,4rem)] uppercase leading-[0.85] text-ink">Tushar</p>
          </div>
          <div className={`flex flex-col gap-1.5 transition-opacity duration-300 ${finished ? "absolute opacity-0" : "opacity-100"}`}>
            <Block stage={stage} delay={200} className="h-4 w-[60%]" />
            <Block stage={stage} delay={260} className="h-2 w-[40%]" />
          </div>
        </Block>

        {/* buttons */}
        <div className="flex gap-2">
          <Block stage={stage} delay={320} done="bg-brand" className="h-5 w-[24%] rounded-full" />
          <Block stage={stage} delay={380} done="border-white! bg-transparent" className="h-5 w-[24%] rounded-full" />
        </div>

        {/* cards */}
        <div className="grid flex-1 grid-cols-3 gap-[4%]">
          <Block stage={stage} delay={440} done="bg-[#2a2a2a]" />
          <Block stage={stage} delay={500} done="bg-brand" />
          <Block stage={stage} delay={560} done="bg-[#2a2a2a]" />
        </div>
      </div>
    </div>
  );
}

const PARAGRAPHS = [
  {
    label: "Who I am",
    text: "I'm Tushar Sethiya, a frontend developer who loves making the web feel fast, smooth and alive.",
  },
  {
    label: "What I do",
    text: "I turn ideas and designs into interfaces people enjoy using: responsive layouts, clean code from frontend to backend, and motion that feels natural.",
  },
  {
    label: "How I work",
    text: "I sweat the small stuff. The easing curve, the spacing, the way a page loads on a slow phone. That's where the chaos starts to look good.",
  },
];


function BrowserCard({ stage, className = "" }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl bg-ink ${className}`}
      style={{
        backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      <MiniBrowser stage={stage} />
    </div>
  );
}

// Each logo in its official brand color
const TOOLS = [
  { name: "HTML", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", Icon: SiCss, color: "#1572B6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E", backing: true },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Express", Icon: SiExpress, color: "#111111" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
];

/* Endless strip of tool logos + names; two copies so the -50% loop is seamless */
function ToolsMarquee({ className = "" }) {
  return (
    <div aria-label="Tools I work with" className={`flex overflow-hidden ${className}`}>
      <div className="animate-marquee items-center">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex items-center">
            {TOOLS.map(({ name, Icon, color, backing }) => (
              <li
                key={name}
                className="
                  flex
                  items-center
                  gap-[0.35em]
                  whitespace-nowrap
                  pr-[clamp(32px,5vw,80px)]
                  font-display
                  text-2xl
                  uppercase
                  leading-none
                  text-ink

                  md:text-[clamp(1.75rem,3vw,3rem)]
                "
              >
                {/* the JS logo's letters are cut-outs, so a black square behind them makes them read like the real logo */}
                <span className={`flex shrink-0 ${backing ? "rounded-[2px] bg-ink" : ""}`}>
                  <Icon className="h-[0.85em] w-[0.85em]" style={{ color }} aria-hidden="true" />
                </span>
                {name}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function Caption({ active }) {
  return (
    <div className="flex items-center justify-end font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
      <span className="text-ink">{PARAGRAPHS[active].label}</span>
    </div>
  );
}

export default function About() {
  const [active, setActive] = useState(0);
  const [paragraphProgress, setParagraphProgress] = useState(0); // small screens: 0..1 through the active paragraph
  const itemRefs = useRef([]);
  const mobileRef = useRef(null);

  // Large screens: the paragraph crossing the middle of the screen is the active one
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Small screens: the section is pinned, and scroll progress through it picks the paragraph
  useEffect(() => {
    const handleScroll = () => {
      const wrapper = mobileRef.current;
      if (!wrapper || wrapper.offsetParent === null) return; // hidden on larger screens

      const rect = wrapper.getBoundingClientRect();
      const distance = wrapper.offsetHeight - window.innerHeight;
      if (distance <= 0) return;

      const progress = Math.min(0.999, Math.max(0, -rect.top / distance));
      const position = progress * PARAGRAPHS.length;
      setActive(Math.floor(position));
      setParagraphProgress(position - Math.floor(position));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="about" className="bg-[#F3F2EE]">
      {/* =========================================
          SMALL SCREENS (under 768px) — pinned: card on top,
          one paragraph at a time below it
      ========================================= */}
      <div ref={mobileRef} className="relative h-[300vh] md:hidden">
        <div className="sticky top-0 flex h-[100dvh] flex-col gap-4 px-4 pt-20 pb-6 sm:px-6 sm:pt-24">
          <BrowserCard stage={active} className="aspect-[4/3] max-h-[46dvh] shrink-0" />
          <Caption active={active} />

          <div className="relative flex-1">
            {PARAGRAPHS.map((p, i) => (
              <div
                key={p.label}
                className={`
                  absolute
                  inset-0
                  flex
                  flex-col
                  justify-center
                  gap-3
                  transition-all
                  duration-500
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                  ${
                    i === active
                      ? "translate-y-0 opacity-100"
                      : i < active
                        ? "-translate-y-6 opacity-0"
                        : "translate-y-6 opacity-0"
                  }
                `}
                aria-hidden={i !== active}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand">
                  {p.label}
                </span>
                {/* words turn from grey to black as you scroll; fully black by ~80% of the way */}
                <p className="text-[clamp(1.4rem,6vw,2.25rem)] font-semibold leading-[1.15] tracking-tight">
                  {p.text.split(" ").map((word, w, words) => {
                    const revealed =
                      i < active || (i === active && w < Math.ceil(paragraphProgress * 1.25 * words.length));
                    return (
                      <span
                        key={w}
                        className={`transition-colors duration-200 ${revealed ? "text-ink" : "text-neutral-300"}`}
                      >
                        {word}{" "}
                      </span>
                    );
                  })}
                </p>
              </div>
            ))}
          </div>

          <ToolsMarquee className="-mx-4 shrink-0 py-1 sm:-mx-6" />
        </div>
      </div>

      {/* =========================================
          LARGE SCREENS — card sticks on the left,
          paragraphs scroll past on the right
      ========================================= */}
      <div
        className="
          mx-auto
          hidden
          w-full
          max-w-[1800px]
          px-[clamp(16px,3vw,64px)]
          md:grid
          md:grid-cols-12
          md:gap-[clamp(32px,5vw,96px)]
        "
      >
        <div className="md:col-span-5">
          <div className="sticky top-0 flex h-[100dvh] flex-col justify-center gap-3">
            <BrowserCard stage={active} className="h-[72vh]" />
            <Caption active={active} />
          </div>
        </div>

        <div className="flex flex-col py-[20vh] md:col-span-7">
          {PARAGRAPHS.map((p, i) => (
            <div
              key={p.label}
              ref={(el) => (itemRefs.current[i] = el)}
              data-index={i}
              className="flex min-h-[60vh] flex-col justify-center gap-4"
            >
              <span
                className={`
                  font-mono
                  text-[11px]
                  uppercase
                  tracking-[0.25em]
                  transition-colors
                  duration-500
                  ${active === i ? "text-brand" : "text-neutral-400"}
                `}
              >
                {p.label}
              </span>
              <p
                className={`
                  text-[clamp(1.6rem,3.2vw,3.25rem)]
                  font-semibold
                  leading-[1.15]
                  tracking-tight
                  text-balance
                  transition-colors
                  duration-500
                  ${active === i ? "text-ink" : "text-neutral-300"}
                `}
              >
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* LARGE SCREENS — tools marquee closes the section */}
      <ToolsMarquee className="hidden pb-16 md:flex" />
    </section>
  );
}
