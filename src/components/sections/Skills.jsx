import { useEffect, useRef, useState } from "react";

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState(null);

  const skillImageRef = useRef(null);
  const skillRefs = useRef([]);

  const skillTargetRef = useRef({ x: 0, y: 0 });
  const skillCurrentRef = useRef({ x: 0, y: 0 });

  const skills = [
    {
      title: "Frontend Development",
      description:
        "Responsive, accessible interfaces built with HTML, CSS, JavaScript and Tailwind CSS.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Backend & APIs",
      description:
        "REST APIs and server logic with Node.js and Express, built to be fast and reliable.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Databases",
      description:
        "MongoDB data models that keep apps quick today and easy to grow tomorrow.",
      image:
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Full-Stack Web Apps",
      description:
        "From idea to deployment: complete web apps with a clean frontend and a solid backend.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  /* ==================================================
     SM + MD
     Same behavior as Projects:
     active skill changes according to the
     skill currently passing through the viewport
  ================================================== */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    if (!mediaQuery.matches) {
      return;
    }

    const observers = [];

    skillRefs.current.forEach((element, index) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSkill(index);
          }
        },
        {
          threshold: 0.45,
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

  /* ==================================================
     DESKTOP FLOATING IMAGE ANIMATION
  ================================================== */
  useEffect(() => {
    let animationFrame;

    const animateSkillImage = () => {
      const current = skillCurrentRef.current;
      const target = skillTargetRef.current;

      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;

      if (skillImageRef.current) {
        skillImageRef.current.style.left = `${current.x}px`;
        skillImageRef.current.style.top = `${current.y}px`;
      }

      animationFrame = requestAnimationFrame(animateSkillImage);
    };

    animationFrame = requestAnimationFrame(animateSkillImage);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      id="skills"
      className="
        relative
        min-h-[100dvh]
        overflow-hidden
        bg-ink
        px-[clamp(16px,3vw,64px)]
        py-[clamp(72px,8vw,160px)]
        text-white
      "
    >
      <div className="mx-auto max-w-[1470px]">

        {/* HEADER */}
        <div className="mb-[clamp(48px,6vw,112px)]">
          <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
            ( Services )
          </span>
          <h2
            className="
              font-display
              text-[clamp(3.5rem,9vw,8.5rem)]
              uppercase
              leading-[0.85]
            "
          >
            What I <span className="text-brand">do</span>
          </h2>

          <div
            className="
              mt-8
              border-t
              border-white/30

              sm:mt-12
            "
          />
        </div>

        {/* SKILL LIST */}
        <div className="relative">
          {skills.map((skill, index) => {
            const isActive = activeSkill === index;

            return (
              <div
                key={skill.title}
                ref={(element) => {
                  skillRefs.current[index] = element;
                }}
                className="
                  group
                  relative

                  flex
                  min-h-[210px]
                  flex-col
                  items-start
                  justify-center

                  border-b
                  border-white/30

                  py-8

                  sm:min-h-[230px]

                  lg:min-h-[200px]
                  lg:flex-row
                  lg:items-center
                  lg:justify-start
                  lg:py-0

                  select-none
                "
                /* DESKTOP HOVER */
                onMouseEnter={(event) => {
                  setActiveSkill(index);

                  skillTargetRef.current = {
                    x: event.clientX,
                    y: event.clientY,
                  };

                  skillCurrentRef.current = {
                    x: event.clientX,
                    y: event.clientY,
                  };
                }}
                onMouseMove={(event) => {
                  skillTargetRef.current = {
                    x: event.clientX,
                    y: event.clientY,
                  };
                }}
                onMouseLeave={() => {
                  setActiveSkill(null);
                }}
              >
                {/* TITLE — turns red while active */}
                <h3
                  className={`
                    pr-2

                    font-display
                    text-[clamp(2.3rem,6vw,5rem)]
                    uppercase
                    leading-[0.9]

                    transition-[color,translate]
                    duration-500

                    lg:max-w-[58%]
                    lg:pr-0
                    lg:leading-none

                    ${
                      isActive
                        ? "translate-x-3 text-brand"
                        : "translate-x-0 text-white/35"
                    }
                  `}
                >
                  {skill.title}
                </h3>

                {/* DESCRIPTION */}
                <p
                  className={`
                    relative
                    right-auto
                    mt-5

                    max-w-[90%]

                    text-sm
                    leading-relaxed

                    transition-all
                    duration-500

                    sm:max-w-[82%]
                    sm:text-base

                    lg:absolute
                    lg:right-0
                    lg:mt-0
                    lg:ml-0
                    lg:max-w-[38%]

                    ${
                      isActive
                        ? "translate-x-0 text-white/80 opacity-100"
                        : "translate-x-3 text-white/30 opacity-70"
                    }
                  `}
                >
                  {skill.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==================================================
          DESKTOP FLOATING IMAGE
          Only visible on LG and above
      ================================================== */}
      <div
        ref={skillImageRef}
        className={`
          pointer-events-none

          fixed
          left-0
          top-0

          z-[100]

          hidden

          aspect-[4/3]
          w-[clamp(280px,18vw,520px)]

          -translate-x-1/2
          -translate-y-1/2

          overflow-hidden

          transition-opacity
          duration-300

          lg:block

          ${
            activeSkill !== null
              ? "opacity-100"
              : "opacity-0"
          }
        `}
      >
        {activeSkill !== null && (
          <img
            src={skills[activeSkill].image}
            alt=""
            className="
              h-full
              w-full
              object-cover
            "
          />
        )}
      </div>
    </section>
  );
}