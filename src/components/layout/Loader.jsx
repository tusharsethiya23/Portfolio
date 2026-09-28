import React from "react";

export default function Loader({
  loading,
  visibleCount,
  splitProgress,
  cardIndex,
  loaderCards,
}) {
  const currentCard = loaderCards?.[cardIndex];

  /*
    Width of each individual loader image.
  */
  const cardWidths = {
    "w-16": { base: 64, sm: 80, md: 100 },
    "w-20": { base: 80, sm: 100, md: 120 },
    "w-24": { base: 96, sm: 120, md: 140 },
    "w-28": { base: 112, sm: 140, md: 160 },
    "w-32": { base: 128, sm: 160, md: 180 },
    "w-36": { base: 144, sm: 180, md: 200 },
    "w-40": { base: 160, sm: 200, md: 220 },
    "w-44": { base: 176, sm: 220, md: 240 },
    "w-48": { base: 192, sm: 240, md: 260 },
    "w-52": { base: 208, sm: 260, md: 280 },
    "w-56": { base: 224, sm: 280, md: 300 },
    "w-60": { base: 240, sm: 300, md: 320 },
    "w-64": { base: 256, sm: 320, md: 340 },
  };

  const selectedWidth =
    cardWidths[currentCard?.width] || cardWidths["w-24"];

  const mobileWidth = selectedWidth.base * splitProgress;
  const smallWidth = selectedWidth.sm * splitProgress;
  const mediumWidth = selectedWidth.md * splitProgress;

  if (!loading) return null;

  const firstPart = "TUS".split("");
  const secondPart = ["H", "A", "R"];

  return (
    <>
      <style>{`
        .loader-card-dynamic {
          width: ${mobileWidth}px;
        }

        @media (min-width: 640px) {
          .loader-card-dynamic {
            width: ${smallWidth}px;
          }
        }

        @media (min-width: 768px) {
          .loader-card-dynamic {
            width: ${mediumWidth}px;
          }
        }
      `}</style>

      <div
        className="
          fixed
          inset-0
          z-50
          flex
          min-h-[100dvh]
          items-center
          justify-center
          overflow-hidden
          bg-[#F3F2EE]
        "
      >
        <div
          className="
            flex
            items-center
            justify-center
          "
        >
          {/* ================= TUS ================= */}
          <div
            className="
              flex
              shrink-0
              items-center
              justify-end
            "
          >
            {firstPart.map((char, index) => (
              <span
                key={`first-${index}`}
                className={`
                  block
                  text-4xl
                  sm:text-6xl
                  md:text-8xl
                  font-black
                  font-mono
                  uppercase
                  leading-none
                  tracking-wider
                  transition-all
                  duration-300
                  ease-out

                  ${
                    index < visibleCount
                      ? "translate-y-0 scale-100 opacity-100"
                      : "translate-y-6 scale-90 opacity-0"
                  }
                `}
              >
                {char}
              </span>
            ))}
          </div>

          {/* ================= IMAGE CARD ================= */}
          <div
            className="
              loader-card-dynamic
              mx-1
              sm:mx-1.5
              md:mx-2

              flex
              shrink-0
              overflow-hidden
              rounded-md
              shadow-2xl

              transition-[width,opacity]
              duration-300
              ease-out

              h-24
              sm:h-36
              md:h-44
            "
            style={{
              opacity: splitProgress,
            }}
          >
            <div
              className={`
                flex
                h-full
                w-full
                shrink-0
                items-center
                justify-center

                ${currentCard?.bg || "bg-black"}
              `}
            >
              <span
                className="
                  text-3xl
                  sm:text-5xl
                  animate-pulse
                  drop-shadow-md
                "
              >
                {currentCard?.content}
              </span>
            </div>
          </div>

          {/* ================= HAR ================= */}
          <div
            className="
              flex
              shrink-0
              items-center
              justify-start
            "
          >
            {secondPart.map((char, index) => {
              const globalIndex = index + 4;

              return (
                <span
                  key={`second-${index}`}
                  className={`
                    block
                    text-4xl
                    sm:text-6xl
                    md:text-8xl
                    font-black
                    font-mono
                    uppercase
                    leading-none
                    tracking-wider
                    transition-all
                    duration-300
                    ease-out

                    ${
                      globalIndex < visibleCount
                        ? "translate-y-0 scale-100 opacity-100"
                        : "translate-y-6 scale-90 opacity-0"
                    }
                  `}
                >
                  {char}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}