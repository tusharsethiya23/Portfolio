export default function Loader({
  loading,
  visibleCount,
  splitProgress,
  cardIndex,
  loaderCards,
}) {
  return (
    <>
      {loading && (
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
            px-[clamp(12px,2vw,48px)]
          "
        >
          <div
            className="
              relative
              mx-auto
              flex
              w-full
              max-w-[min(90vw,1400px)]
              items-center
              justify-center
              scale-[clamp(0.58,18vw/100,1)]
              m-0
              p-0
            "
          >
            {/* LEFT TUS */}
            <div
              className="
                flex
                select-none
                transition-transform
                duration-75
                ease-out
                m-0
                p-0
              "
              style={{
                transform: `translateX(-${splitProgress * 2}px)`,
              }}
            >
              {"TUS".split("").map((char, index) => (
                <span
                  key={index}
                  className={`
                    text-4xl
                    font-black
                    uppercase
                    tracking-wider
                    font-mono

                    sm:text-6xl
                    md:text-8xl

                    transition-all
                    duration-300

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

            {/* CENTER CARD */}
            <div
              className="
                flex
                items-center
                justify-center
                overflow-hidden
                m-0
                p-0
                transition-all
                duration-300
                ease-out
              "
              style={{
                opacity: splitProgress,
                transform: `scale(${
                  0.4 + splitProgress * 0.6
                })`,
                width: `${splitProgress * 90}px`,
              }}
            >
              <div
                className={`
                  flex
                  h-24
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-md
                  shadow-2xl

                  sm:h-36
                  md:h-44

                  ${loaderCards[cardIndex]?.bg}
                  ${loaderCards[cardIndex]?.width}

                  transition-all
                  duration-300

                  m-0
                  p-0
                `}
              >
                <span
                  className="
                    text-3xl
                    animate-pulse
                    filter
                    drop-shadow-md

                    sm:text-5xl
                  "
                >
                  {loaderCards[cardIndex]?.content}
                </span>
              </div>
            </div>

            {/* RIGHT HAR */}
            <div
              className="
                flex
                select-none
                transition-transform
                duration-75
                ease-out
                m-0
                p-0
              "
              style={{
                transform: `translateX(${splitProgress * 2}px)`,
              }}
            >
              {["H", "A", "R"].map((char, index) => {
                const globalIndex = index + 4;

                return (
                  <span
                    key={index}
                    className={`
                      text-4xl
                      font-black
                      uppercase
                      tracking-wider
                      font-mono

                      sm:text-6xl
                      md:text-8xl

                      transition-all
                      duration-300

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
      )}
    </>
  );
}