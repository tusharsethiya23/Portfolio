// import { useEffect, useRef, useState } from "react";

// export default function Skills() {
//   const [activeSkill, setActiveSkill] = useState(null);

//   const skillImageRef = useRef(null);

//   const skillTargetRef = useRef({ x: 0, y: 0 });
//   const skillCurrentRef = useRef({ x: 0, y: 0 });

//   useEffect(() => {
//     let animationFrame;

//     const animateSkillImage = () => {
//       const current = skillCurrentRef.current;
//       const target = skillTargetRef.current;

//       current.x += (target.x - current.x) * 0.12;
//       current.y += (target.y - current.y) * 0.12;

//       if (skillImageRef.current) {
//         skillImageRef.current.style.left = `${current.x}px`;
//         skillImageRef.current.style.top = `${current.y}px`;
//       }

//       animationFrame = requestAnimationFrame(animateSkillImage);
//     };

//     animationFrame = requestAnimationFrame(animateSkillImage);

//     return () => cancelAnimationFrame(animationFrame);
//   }, []);

//   const skills = [
//     {
//       number: "01",
//       title: "Product Design",
//       description:
//         "From “we have an idea” to flows, prototypes and systems ready to grow.",
//       image:
//         "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1200&auto=format&fit=crop",
//     },
//     {
//       number: "02",
//       title: "Brand & Art Direction",
//       description:
//         "Identities with a point of view, built to be recognized, remembered and used.",
//       image:
//         "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
//     },
//     {
//       number: "03",
//       title: "UX | UI",
//       description:
//         "Clear interfaces for real behavior, weird edge cases and every screen in between.",
//       image:
//         "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1200&auto=format&fit=crop",
//     },
//     {
//       number: "04",
//       title: "Motion & 3D",
//       description:
//         "Motion, interaction and dimensional details that make digital experiences feel alive.",
//       image:
//         "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop",
//     },
//   ];

//   return (
//     <section
//       id="skills"
//       className="
//         relative
//         min-h-[100dvh]
//         overflow-hidden
//         bg-[#111111]
//         px-[clamp(16px,3vw,64px)]
//         py-[clamp(72px,8vw,160px)]
//         text-white
//       "
//     >
//       <div className="mx-auto max-w-[1470px]">

//         {/* HEADER */}
//         <div className="mb-[clamp(48px,6vw,112px)]">
//           <h2
//             className="
//               text-[clamp(4rem,9vw,11rem)]
//               font-medium
//               leading-[0.8]
//               tracking-[-0.07em]
//             "
//           >
//             Skillset
//           </h2>

//           <div className="mt-8 border-t border-white/30 sm:mt-12" />
//         </div>

//         {/* SKILL LIST */}
//         <div className="relative">
//           {skills.map((skill, index) => {
//             const isActive = activeSkill === index;

//             return (
//               <div
//                 key={skill.title}
//                 className="
//                   relative
//                   flex
//                   min-h-[210px]
//                   flex-col
//                   items-start
//                   justify-center
//                   border-b
//                   border-white/30
//                   py-8

//                   sm:min-h-[230px]

//                   lg:min-h-[200px]
//                   lg:flex-row
//                   lg:items-center
//                   lg:justify-start
//                   lg:py-0

//                   touch-pan-y
//                   select-none
//                 "
//                 onClick={() => setActiveSkill(index)}
//                 onMouseEnter={(e) => {
//                   setActiveSkill(index);

//                   skillTargetRef.current = {
//                     x: e.clientX,
//                     y: e.clientY,
//                   };

//                   skillCurrentRef.current = {
//                     x: e.clientX,
//                     y: e.clientY,
//                   };
//                 }}
//                 onMouseMove={(e) => {
//                   skillTargetRef.current = {
//                     x: e.clientX,
//                     y: e.clientY,
//                   };
//                 }}
//                 onMouseLeave={() => {
//                   setActiveSkill(null);
//                 }}
//                 onPointerDown={(e) => {
//                   if (e.pointerType === "touch") {
//                     setActiveSkill(index);
//                   }
//                 }}
//                 onPointerEnter={(e) => {
//                   if (e.pointerType === "touch") {
//                     setActiveSkill(index);
//                   }
//                 }}
//                 onPointerMove={(e) => {
//                   if (
//                     e.pointerType === "touch" ||
//                     e.buttons === 1
//                   ) {
//                     setActiveSkill(index);
//                   }
//                 }}
//               >

//                 {/* NUMBER */}
//                 <span
//                   className={`
//                     absolute
//                     left-0
//                     top-7
//                     text-sm
//                     transition-colors
//                     duration-500

//                     lg:top-1/2
//                     lg:-translate-y-1/2

//                     ${
//                       isActive
//                         ? "text-white"
//                         : "text-white/30"
//                     }
//                   `}
//                 >
//                   {skill.number}
//                 </span>

//                 {/* TITLE */}
//                 <h3
//                   className={`
//                     ml-9
//                     pr-2

//                     text-[clamp(2.3rem,6vw,4.5rem)]
//                     font-medium
//                     leading-[0.9]
//                     tracking-[-0.05em]

//                     transition-colors
//                     duration-500

//                     sm:ml-12

//                     lg:ml-24
//                     lg:pr-0
//                     lg:leading-none

//                     ${
//                       isActive
//                         ? "text-white"
//                         : "text-white/35"
//                     }
//                   `}
//                 >
//                   {skill.title}
//                 </h3>

//                 {/* DESCRIPTION */}
//                 <p
//                   className={`
//                     relative
//                     right-auto
//                     mt-5
//                     ml-9
//                     max-w-[90%]

//                     text-sm
//                     leading-relaxed

//                     transition-all
//                     duration-500

//                     sm:ml-12
//                     sm:max-w-[82%]
//                     sm:text-base

//                     lg:absolute
//                     lg:right-0
//                     lg:mt-0
//                     lg:ml-0
//                     lg:max-w-[38%]

//                     ${
//                       isActive
//                         ? "translate-x-0 text-white/80 opacity-100"
//                         : "translate-x-3 text-white/30 opacity-70"
//                     }
//                   `}
//                 >
//                   {skill.description}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* FOLLOWING IMAGE — DESKTOP ONLY */}
//       <div
//         ref={skillImageRef}
//         className={`
//           pointer-events-none
//           fixed
//           left-0
//           top-0
//           z-[100]
//           hidden
//           aspect-[4/3]
//           w-[clamp(280px,18vw,520px)]
//           -translate-x-1/2
//           -translate-y-1/2
//           overflow-hidden
//           transition-opacity
//           duration-300

//           lg:block

//           ${
//             activeSkill !== null
//               ? "opacity-100"
//               : "opacity-0"
//           }
//         `}
//       >
//         {activeSkill !== null && (
//           <img
//             src={skills[activeSkill].image}
//             alt=""
//             className="h-full w-full object-cover"
//           />
//         )}
//       </div>
//     </section>
//   );
// }



import { useEffect, useRef, useState } from "react";

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState(null);

  const skillImageRef = useRef(null);
  const skillRefs = useRef([]);

  const skillTargetRef = useRef({ x: 0, y: 0 });
  const skillCurrentRef = useRef({ x: 0, y: 0 });

  const skills = [
    {
      number: "01",
      title: "Product Design",
      description:
        "From “we have an idea” to flows, prototypes and systems ready to grow.",
      image:
        "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1200&auto=format&fit=crop",
    },
    {
      number: "02",
      title: "Brand & Art Direction",
      description:
        "Identities with a point of view, built to be recognized, remembered and used.",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
    },
    {
      number: "03",
      title: "UX | UI",
      description:
        "Clear interfaces for real behavior, weird edge cases and every screen in between.",
      image:
        "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      number: "04",
      title: "Motion & 3D",
      description:
        "Motion, interaction and dimensional details that make digital experiences feel alive.",
      image:
        "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop",
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
        bg-[#111111]
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
              text-[clamp(4rem,9vw,11rem)]
              font-medium
              leading-[0.8]
              tracking-[-0.07em]
            "
          >
            Skillset
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
                {/* NUMBER */}
                <span
                  className={`
                    absolute
                    left-0
                    top-7

                    text-sm

                    transition-colors
                    duration-500

                    lg:top-1/2
                    lg:-translate-y-1/2

                    ${
                      isActive
                        ? "text-white"
                        : "text-white/30"
                    }
                  `}
                >
                  {skill.number}
                </span>

                {/* TITLE */}
                <h3
                  className={`
                    ml-9
                    pr-2

                    text-[clamp(2.3rem,6vw,4.5rem)]
                    font-medium
                    leading-[0.9]
                    tracking-[-0.05em]

                    transition-colors
                    duration-500

                    sm:ml-12

                    lg:ml-24
                    lg:pr-0
                    lg:leading-none

                    ${
                      isActive
                        ? "text-white"
                        : "text-white/35"
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
                    ml-9

                    max-w-[90%]

                    text-sm
                    leading-relaxed

                    transition-all
                    duration-500

                    sm:ml-12
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