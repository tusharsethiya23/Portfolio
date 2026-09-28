export default function Loader({ loading, visibleCount, splitProgress, cardIndex, loaderCards }) {
  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F3F2EE] px-[clamp(12px,2vw,48px)] overflow-hidden min-h-[100dvh]">

          <div className="flex scale-[clamp(0.58,18vw/100,1)] items-center justify-center relative w-full max-w-[min(90vw,1400px)] mx-auto m-0 p-0">

            {/* LEFT PAMI */}

            <div
              className="flex select-none transition-transform duration-75 ease-out m-0 p-0"
              style={{
                transform: `translateX(-${splitProgress * 45
                  }px)`,
              }}
            >
              {'TUS'.split('').map((char, index) => (
                <span
                  key={index}
                  className={`text-4xl sm:text-6xl md:text-8xl font-black tracking-wider uppercase font-mono transition-all duration-300 ${index < visibleCount
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-6 scale-90'
                    }`}
                >
                  {char}
                </span>
              ))}
            </div>

            {/* CENTER CARD */}

            <div
              className="flex items-center justify-center transition-all duration-300 ease-out overflow-hidden m-0 p-0"
              style={{
                opacity: splitProgress,
                transform: `scale(${0.4 + splitProgress * 0.6
                  })`,
                width: `${splitProgress * 160}px`,
              }}
            >
              <div
                className={`h-24 sm:h-36 md:h-44 flex items-center justify-center shadow-2xl rounded-md ${loaderCards[cardIndex]?.bg
                  } ${loaderCards[cardIndex]?.width
                  } transition-all duration-300 overflow-hidden m-0 p-0`}
              >
                <span className="text-3xl sm:text-5xl filter drop-shadow-md animate-pulse">
                  {loaderCards[cardIndex]?.content}
                </span>
              </div>
            </div>

            {/* RIGHT DOR */}

            <div
              className="flex select-none transition-transform duration-75 ease-out m-0 p-0"
              style={{
                transform: `translateX(${splitProgress * 45
                  }px)`,
              }}
            >
              {['H', 'A', 'R'].map((char, index) => {
                const globalIndex = index + 4;

                return (
                  <span
                    key={index}
                    className={`text-4xl sm:text-6xl md:text-8xl font-black tracking-wider uppercase font-mono transition-all duration-300 ${globalIndex < visibleCount
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-6 scale-90'
                      }`}
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
