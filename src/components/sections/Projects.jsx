import { useEffect, useRef, useState } from "react";

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState(0);
  const projectRefs = useRef([]);

  const projects = [
    {
      id: 1,
      title: "ArenaX",
      role: "Frontend · React · Product",
      timeline: "6 Months",
      year: "2026",
      team: "Personal Project",
      image:
        "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200&auto=format&fit=crop",
      link: "",
    },
    {
      id: 2,
      title: "Figcoms",
      role: "Brand · Product · UX / UI",
      timeline: "12 Months",
      year: "2025",
      team: "In-House Studio",
      image:
        "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1200&auto=format&fit=crop",
      link: "",
    },
    {
      id: 3,
      title: "Task Management",
      role: "React · Tailwind · Role Based Access",
      timeline: "8 Months",
      year: "2026",
      team: "Personal Project",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
      link: "",
    },
    {
      id: 4,
      title: "Photo Editor",
      role: "React · Image Editing · UI",
      timeline: "6 Months",
      year: "2025",
      team: "Personal Project",
      image:
        "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop",
      link: "",
    },
  ];

  /* --------------------------------------------------
     SM + MD:
     Activate project while scrolling/swiping
  -------------------------------------------------- */
  useEffect(() => {
    const isSmallMediumScreen = window.matchMedia(
      "(max-width: 1023px)"
    );

    if (!isSmallMediumScreen.matches) {
      return;
    }

    const observers = [];

    projectRefs.current.forEach((element, index) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHoveredProject(index);
          }
        },
        {
          threshold: 0.4,
          rootMargin: "-10% 0px -10% 0px",
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  /* --------------------------------------------------
     DRAG / SWIPE INTERACTION
  -------------------------------------------------- */
  const handlePointerDown = (event, index) => {
    if (event.pointerType === "touch") {
      setHoveredProject(index);
    }
  };

  const handlePointerMove = (event, index) => {
    if (event.pointerType === "touch" || event.buttons === 1) {
      setHoveredProject(index);
    }
  };

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
        <div
          className="
            mb-[clamp(32px,4vw,64px)]
          "
        >
          <h2
            className="
              max-w-full

              text-[clamp(3.4rem,9vw,10rem)]
              font-medium
              leading-[0.82]
              tracking-[-0.07em]

              text-black
            "
          >
            Selected Projects
          </h2>

          <div
            className="
              mt-6
              sm:mt-8
              md:mt-8

              border-t
              border-neutral-300
            "
          />
        </div>

        {/* PROJECTS */}
        <div className="w-full">
          {projects.map((project, index) => {
            const isHovered = hoveredProject === index;

            return (
              <article
                key={project.id}
                ref={(element) => {
                  projectRefs.current[index] = element;
                }}
                onMouseEnter={() => setHoveredProject(index)}
                onPointerDown={(event) =>
                  handlePointerDown(event, index)
                }
                onPointerMove={(event) =>
                  handlePointerMove(event, index)
                }
                className={`
                  group
                  relative
                  w-full
                  overflow-visible

                  border-b
                  border-neutral-300

                  transition-all
                  duration-700
                  ease-[cubic-bezier(0.16,1,0.3,1)]

                  min-h-[520px]

                  md:min-h-0

                  ${
                    isHovered
                      ? "md:h-[410px] lg:h-[320px]"
                      : "md:h-[150px] lg:h-[110px]"
                  }
                `}
              >

                {/* PROJECT TITLE */}
                <div
                  className="
                    absolute
                    left-0
                    top-5
                    z-20

                    sm:top-6
                    md:top-6
                  "
                >
                  <h3
                    className={`
                      text-[clamp(2.7rem,10vw,5rem)]
                      sm:text-[clamp(3rem,5vw,5rem)]

                      font-medium
                      leading-none
                      tracking-[-0.05em]

                      transition-all
                      duration-500

                      ${
                        isHovered
                          ? "text-[#D52B2B]"
                          : "text-neutral-400"
                      }
                    `}
                  >
                    {project.title}
                  </h3>
                </div>

                {/* PROJECT IMAGE
                    IMAGE ITSELF IS THE LINK */}
                <a
                  href={project.link || "#"}
                  target={
                    project.link ? "_blank" : undefined
                  }
                  rel={
                    project.link
                      ? "noopener noreferrer"
                      : undefined
                  }
                  onClick={(event) => {
                    if (!project.link) {
                      event.preventDefault();
                    }
                  }}
                  aria-label={`Open ${project.title} project`}
                  className={`
                    block
                    cursor-pointer

                    /* SM + MD */
                    relative
                    left-0
                    top-0
                    w-full

                    pt-[80px]
                    sm:pt-[82px]
                    md:pt-[84px]

                    /* DESKTOP */
                    lg:absolute
                    lg:left-auto
                    lg:right-0
                    lg:top-5

                    lg:w-[28%]
                    lg:min-w-[320px]

                    lg:pt-0

                    z-10

                    overflow-visible

                    transition-all
                    duration-700
                    ease-[cubic-bezier(0.16,1,0.3,1)]

                    ${
                      isHovered
                        ? "translate-x-0 scale-100 opacity-100"
                        : `
                          translate-x-0
                          scale-100
                          opacity-100

                          lg:pointer-events-none
                          lg:translate-x-12
                          lg:scale-95
                          lg:opacity-0
                        `
                    }
                  `}
                >
                  <div
                    className="
                      relative

                      aspect-[16/9]
                      sm:aspect-[16/8]
                      md:aspect-[16/8]

                      w-full
                      max-w-full

                      overflow-hidden

                      bg-neutral-200
                    "
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      draggable="false"
                      className="
                        h-full
                        w-full

                        object-cover
                        grayscale

                        transition-transform
                        duration-[1200ms]
                        ease-[cubic-bezier(0.16,1,0.3,1)]

                        group-hover:scale-105
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0

                        bg-black/5

                        transition-colors
                        duration-500

                        group-hover:bg-black/0
                      "
                    />
                  </div>
                </a>

                {/* PROJECT DETAILS
                    SM + MD = BELOW IMAGE
                    LG = TIGHT DESKTOP POSITION */}
                <div
                  className={`
                    flex
                    w-full
                    flex-wrap

                    gap-x-6
                    gap-y-5

                    pt-5
                    sm:pt-5
                    md:pt-5

                    pb-8
                    sm:pb-8

                    transition-all
                    duration-700
                    ease-[cubic-bezier(0.16,1,0.3,1)]

                    lg:absolute
                    lg:left-0
                    lg:top-[210px]
                    lg:z-20

                    lg:w-[60%]

                    lg:flex-nowrap
                    lg:items-end
                    lg:gap-8

                    lg:pt-0
                    lg:pb-0

                    ${
                      isHovered
                        ? "translate-y-0 opacity-100"
                        : `
                          pointer-events-none
                          translate-y-6
                          opacity-0

                          lg:translate-y-10
                        `
                    }
                  `}
                >

                  {/* ROLE */}
                  <div
                    className="
                      min-w-[180px]
                      sm:min-w-[200px]
                      md:min-w-[220px]
                    "
                  >
                    <span
                      className="
                        mb-1.5
                        sm:mb-2

                        block

                        text-[10px]
                        sm:text-xs

                        uppercase
                        tracking-[0.18em]

                        text-neutral-500
                      "
                    >
                      Role
                    </span>

                    <span
                      className="
                        text-sm
                        sm:text-base

                        text-black
                      "
                    >
                      {project.role}
                    </span>
                  </div>

                  {/* TIMELINE */}
                  <div>
                    <span
                      className="
                        mb-1.5
                        sm:mb-2

                        block

                        text-[10px]
                        sm:text-xs

                        uppercase
                        tracking-[0.18em]

                        text-neutral-500
                      "
                    >
                      Timeline
                    </span>

                    <span
                      className="
                        text-sm
                        sm:text-base

                        text-black
                      "
                    >
                      {project.timeline}
                    </span>
                  </div>

                  {/* YEAR */}
                  <div>
                    <span
                      className="
                        mb-1.5
                        sm:mb-2

                        block

                        text-[10px]
                        sm:text-xs

                        uppercase
                        tracking-[0.18em]

                        text-neutral-500
                      "
                    >
                      Year
                    </span>

                    <span
                      className="
                        text-sm
                        sm:text-base

                        text-black
                      "
                    >
                      {project.year}
                    </span>
                  </div>

                  {/* TEAM */}
                  <div>
                    <span
                      className="
                        mb-1.5
                        sm:mb-2

                        block

                        text-[10px]
                        sm:text-xs

                        uppercase
                        tracking-[0.18em]

                        text-neutral-500
                      "
                    >
                      Team
                    </span>

                    <span
                      className="
                        text-sm
                        sm:text-base

                        text-black
                      "
                    >
                      {project.team}
                    </span>
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