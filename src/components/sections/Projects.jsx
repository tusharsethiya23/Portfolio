import { useEffect, useState } from "react";

export default function Projects({ projects }) {
  const [hoveredProject, setHoveredProject] = useState(0);
  const [visibleProject, setVisibleProject] = useState(null);

  useEffect(() => {
    const cards = document.querySelectorAll("[data-project-card]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setVisibleProject(Number(entry.target.dataset.projectCard));
      });
    }, { threshold: 0.45 });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="relative w-full bg-[#F3F2EE] px-[clamp(16px,3vw,64px)] py-[clamp(72px,8vw,160px)]">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-[clamp(48px,6vw,112px)]">
          <h2 className="max-w-full text-[clamp(3.4rem,9vw,10rem)] font-medium leading-[0.82] tracking-[-0.07em] text-black">Selected Projects</h2>
          <div className="mt-10 border-t border-neutral-300" />
        </div>

        <div className="w-full">
          {projects.map((project, index) => {
            const isHovered = hoveredProject === index;
            const isVisible = visibleProject === index;
            return (
              <article
                key={project.id}
                data-project-card={index}
                onMouseEnter={() => setHoveredProject(index)}
                className={`group relative w-full border-b border-neutral-300 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] py-5 md:py-0 ${isHovered ? "md:h-[300px]" : "md:h-[150px]"}`}
              >
                {/* MOBILE */}
                <div className="md:hidden">
                  <a
                    href={project.link || "#"}
                    target={project.link ? "_blank" : undefined}
                    rel={project.link ? "noopener noreferrer" : undefined}
                    onClick={(e) => { if (!project.link) e.preventDefault(); }}
                    aria-label={`Open ${project.title}`}
                    className="relative block w-full overflow-hidden"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200">
                      <img src={project.image} alt={project.title} className={`h-full w-full object-cover grayscale transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "scale-105" : "scale-100"}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                      <div className="absolute left-5 top-5 z-10">
                        <h3 className="max-w-[85%] text-[clamp(2.5rem,11vw,4.2rem)] font-medium leading-[0.88] tracking-[-0.06em] text-white">{project.title}</h3>
                      </div>
                      <div className="absolute right-4 top-4 font-mono text-[10px] tracking-[0.15em] text-white/70">0{index + 1}</div>
                      <div className={`absolute bottom-0 left-0 w-full p-5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                          <ProjectMeta label="Role" value={project.role} mobile />
                          <ProjectMeta label="Timeline" value={project.timeline} mobile />
                          <ProjectMeta label="Year" value={project.year} mobile />
                          <ProjectMeta label="Team" value={project.team} mobile />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>

                {/* DESKTOP */}
                <div className="hidden md:block">
                  <div className="absolute left-0 top-7 z-20">
                    <h3 className={`text-[clamp(3rem,5vw,5rem)] font-medium leading-none tracking-[-0.05em] transition-all duration-500 ${isHovered ? "text-[#D52B2B]" : "text-neutral-400"}`}>{project.title}</h3>
                  </div>

                  <a
                    href={project.link || "#"}
                    target={project.link ? "_blank" : undefined}
                    rel={project.link ? "noopener noreferrer" : undefined}
                    onClick={(e) => { if (!project.link) e.preventDefault(); }}
                    aria-label={`Open ${project.title}`}
                    className={`absolute right-0 top-8 z-10 block w-[28%] min-w-[320px] cursor-pointer overflow-visible transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHovered ? "translate-x-0 scale-100 opacity-100" : "pointer-events-none translate-x-12 scale-95 opacity-0"}`}
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-200">
                      <img src={project.image} alt={project.title} className="h-full w-full object-cover grayscale transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/5 transition-colors duration-500 group-hover:bg-black/0" />
                    </div>
                    {/* <div className="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col items-center gap-5 bg-black px-5 py-6 text-white md:-right-16">
                      <span className="font-mono text-xl font-bold">W.</span>
                      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-neutral-300 [writing-mode:vertical-lr] rotate-180">Nominee</span>
                    </div> */}
                  </a>

                  <div className={`absolute left-0 top-[215px] z-20 flex w-[62%] flex-nowrap items-start gap-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHovered ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"}`}>
                    <ProjectMeta label="Role" value={project.role} />
                    <ProjectMeta label="Timeline" value={project.timeline} />
                    <ProjectMeta label="Year" value={project.year} />
                    <ProjectMeta label="Team" value={project.team} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectMeta({ label, value, mobile = false }) {
  return (
    <div className={mobile ? "min-w-0" : label === "Role" ? "min-w-[220px] flex-1" : label === "Timeline" ? "min-w-[90px]" : label === "Year" ? "min-w-[60px]" : "min-w-[120px]"}>
      <span className={`mb-1.5 block uppercase tracking-[0.2em] ${mobile ? "text-[9px] text-white/50" : "mb-2 text-xs text-neutral-500"}`}>{label}</span>
      <span className={`block ${mobile ? "text-xs leading-relaxed text-white" : "text-base text-black"}`}>{value}</span>
    </div>
  );
}
