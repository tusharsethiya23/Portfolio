import { useEffect, useRef } from "react";
import { SiGithub } from "react-icons/si";

// Cards cycle through the site palette; titles on red stay black
const THEMES = [
  {
    card: "bg-ink text-white",
    title: "text-white",
    muted: "text-white/60",
    body: "text-white/75",
    badge: "border-white/25 text-white",
    primary: "bg-brand text-white hover:bg-white hover:text-ink",
    secondary: "border-white/40 text-white hover:bg-white hover:text-ink",
  },
  {
    card: "bg-brand text-white",
    title: "text-ink",
    muted: "text-white/75",
    body: "text-white/90",
    badge: "border-white/45 text-white",
    primary: "bg-ink text-white hover:bg-white hover:text-ink",
    secondary: "border-white/60 text-white hover:bg-ink hover:border-ink",
  },
  {
    card: "bg-white text-ink border border-neutral-200",
    title: "text-ink",
    muted: "text-neutral-500",
    body: "text-neutral-600",
    badge: "border-neutral-300 text-ink",
    primary: "bg-brand text-white hover:bg-ink",
    secondary: "border-neutral-300 text-ink hover:bg-ink hover:text-white hover:border-ink",
  },
];

const HEADER_OFFSET = 88; // clears the fixed header
const STACK_STEP = 22; // each card sticks a little lower than the one before

function ProjectCard({ project, index, cardRef }) {
  const t = THEMES[index % THEMES.length];
  const hasLinks = project.link || project.github;

  return (
    <article
      ref={cardRef}
      className={`
        group
        flex
        h-full
        origin-top
        flex-col
        gap-5
        overflow-hidden
        rounded-3xl
        p-4
        shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.35)]
        will-change-transform
        ${t.card}

        sm:p-6
        md:grid
        md:grid-cols-12
        md:gap-[clamp(24px,3vw,56px)]
        md:p-[clamp(24px,3vw,48px)]
      `}
    >
      {/* TEXT */}
      <div className="order-2 flex min-h-0 flex-1 flex-col gap-4 md:order-1 md:col-span-5 md:justify-between">
        <div className={`flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.2em] ${t.muted}`}>
          <span>{project.year}</span>
          <span>{project.team}</span>
          <span>{project.timeline}</span>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className={`font-display text-[clamp(2.5rem,7vw,6.5rem)] uppercase leading-[0.88] ${t.title}`}>
            {project.title}
          </h3>
          <p className={`max-w-md text-sm leading-relaxed sm:text-base ${t.body}`}>
            {project.description}
          </p>
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech} className={`rounded-full border px-3 py-1 text-xs font-medium ${t.badge}`}>
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${t.primary}`}
            >
              View live ↗
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${t.secondary}`}
            >
              <SiGithub aria-hidden="true" /> GitHub ↗
            </a>
          )}
          {!hasLinks && (
            <span className={`font-mono text-[11px] uppercase tracking-[0.2em] ${t.muted}`}>
              Links coming soon
            </span>
          )}
        </div>
      </div>

      {/* SCREENSHOT */}
      <div className="order-1 h-[38%] shrink-0 overflow-hidden rounded-2xl md:order-2 md:col-span-7 md:h-full">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
    </article>
  );
}

export default function Projects({ projects }) {
  const wrapperRefs = useRef([]);
  const cardRefs = useRef([]);

  /*
    As the next card slides over a card, the one underneath
    shrinks and dims slightly, so the deck reads as a stack.
  */
  useEffect(() => {
    let frame;

    const update = () => {
      cardRefs.current.forEach((card, i) => {
        const next = wrapperRefs.current[i + 1];
        if (!card || !next) return;

        const rect = card.getBoundingClientRect();
        const covered = Math.min(1, Math.max(0, (rect.bottom - next.getBoundingClientRect().top) / rect.height));
        card.style.transform = `scale(${1 - covered * 0.06})`;
        card.style.filter = `brightness(${1 - covered * 0.35})`;
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [projects.length]);

  return (
    <section
      id="projects"
      className="
        relative
        w-full
        bg-[#F3F2EE]
        px-[clamp(16px,3vw,64px)]
        py-[clamp(72px,8vw,160px)]
      "
    >
      <div className="mx-auto max-w-[1600px]">
        {/* HEADER */}
        <div className="mb-[clamp(32px,4vw,64px)] flex flex-col gap-4 border-b border-neutral-300 pb-6 sm:pb-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">
              ( Projects )
            </span>
            <h2 className="font-display text-[clamp(3.5rem,9vw,8.5rem)] uppercase leading-[0.85] text-ink">
              Selected <span className="text-brand">work</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-neutral-600 md:text-right">
            A few things I've designed and built. Scroll to flip through the stack.
          </p>
        </div>

        {/* STACKING CARDS */}
        <div className="flex flex-col gap-[8vh]">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (wrapperRefs.current[index] = el)}
              className="sticky h-[78vh] max-h-[760px]"
              style={{ top: HEADER_OFFSET + index * STACK_STEP }}
            >
              <ProjectCard
                project={project}
                index={index}
                cardRef={(el) => (cardRefs.current[index] = el)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
