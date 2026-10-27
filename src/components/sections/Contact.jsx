import { useEffect, useRef, useState } from "react";
import { SiGithub } from "react-icons/si";
import { CONTACT } from "../../data/contact";

const HEADING_LINES = ["LET'S WORK", "TOGETHER"];
const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function Contact() {
  const [heading, setHeading] = useState(HEADING_LINES);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef(null);
  const scrambleRef = useRef(() => {});

  // Heading scrambles into place every time the section comes into view (and on hover)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let interval;
    let running = false;
    const scramble = () => {
      if (running) return;
      running = true;
      const full = HEADING_LINES.join("\n");
      let iteration = 0;
      interval = setInterval(() => {
        const text = full
          .split("")
          .map((char, i) => {
            if (char === " " || char === "\n" || char === "'") return char;
            if (i < iteration) return full[i];
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join("");
        setHeading(text.split("\n"));
        iteration += 0.5;
        if (iteration >= full.length) {
          clearInterval(interval);
          setHeading(HEADING_LINES);
          running = false;
        }
      }, 40);
    };
    scrambleRef.current = scramble;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) scramble();
      },
      { threshold: 0.35 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  };

  const links = [
    CONTACT.github && { label: "GitHub", href: CONTACT.github, icon: <SiGithub aria-hidden="true" /> },
    CONTACT.linkedin && { label: "LinkedIn", href: CONTACT.linkedin },
    CONTACT.resume && { label: "Résumé ↓", href: CONTACT.resume },
  ].filter(Boolean);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="
        relative
        flex
        min-h-[100dvh]
        flex-col
        justify-between
        gap-12
        overflow-hidden
        bg-brand
        px-[clamp(16px,3vw,64px)]
        py-[clamp(72px,8vw,140px)]
        text-white
      "
    >
      <div className="mx-auto flex w-full max-w-[1800px] items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-white/75">
        <span>( Contact )</span>
        <span>Got a project in mind?</span>
      </div>

      {/* HEADING */}
      <h2
        aria-label="Let's work together"
        onMouseEnter={() => scrambleRef.current()}
        className="
          mx-auto
          w-full
          max-w-[1800px]
          font-display
          text-[clamp(3.75rem,14vw,14rem)]
          uppercase
          leading-[1.02]
          text-ink

          lg:leading-[0.95]
        "
      >
        {heading.map((line, i) => (
          <span key={i} aria-hidden="true" className="block whitespace-nowrap">
            {line}
          </span>
        ))}
      </h2>

      {/* EMAIL + LINKS */}
      <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-8 border-t border-white/35 pt-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex min-w-0 flex-col gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/75">
            Drop me a line
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${CONTACT.email}`}
              className="
                break-all
                text-[clamp(1.6rem,4.5vw,4rem)]
                font-semibold
                leading-none
                tracking-tight
                text-white
                underline-offset-[0.15em]
                hover:underline
              "
            >
              {CONTACT.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="
                cursor-pointer
                rounded-full
                border
                border-white/60
                px-4
                py-2
                font-mono
                text-[11px]
                uppercase
                tracking-[0.2em]
                text-white
                transition-colors
                duration-300
                hover:border-ink
                hover:bg-ink
              "
            >
              <span aria-live="polite">{copied ? "Copied ✓" : "Copy"}</span>
            </button>
          </div>
        </div>

        {links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="
                  flex
                  items-center
                  gap-2
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
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
