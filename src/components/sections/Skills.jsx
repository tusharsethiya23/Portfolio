import { useEffect, useRef, useState } from "react";

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState(null);

  const skillRefs = useRef([]);

  const skills = [
    {
      title: "Frontend Development",
      description:
        "Responsive, accessible interfaces built with HTML, CSS, JavaScript and Tailwind CSS.",
    },
    {
      title: "Backend & APIs",
      description:
        "REST APIs and server logic with Node.js and Express, built to be fast and reliable.",
    },
    {
      title: "Databases",
      description:
        "MongoDB data models that keep apps quick today and easy to grow tomorrow.",
    },
    {
      title: "Full-Stack Web Apps",
      description:
        "From idea to deployment: complete web apps with a clean frontend and a solid backend.",
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
                onMouseEnter={() => {
                  setActiveSkill(index);
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
    </section>
  );
}