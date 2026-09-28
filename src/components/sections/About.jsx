import { useEffect, useState, useRef } from "react";

export default function About() {
  const [aboutScrollProgress, setAboutScrollProgress] = useState(0);
  const aboutContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!aboutContainerRef.current) return;
      const rect = aboutContainerRef.current.getBoundingClientRect();
      const containerHeight = aboutContainerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollDistance = containerHeight - windowHeight;
      if (scrollDistance <= 0) return;
      const currentScroll = -rect.top;
      let progress = currentScroll / scrollDistance;
      progress = Math.max(0, Math.min(1, progress));
      setAboutScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const aboutTextFull = "Hi, I'm Dor - a brand & product designer with a name that sounds like an entrance. I build brands that people remember and products they don't have to think about. Identities, design systems and the interfaces they run on - and when the work needs art direction, motion or 3D, that gets made here too.";
  const aboutWords = aboutTextFull.split(" ");
  const highlightedWordCount = Math.floor(aboutScrollProgress * aboutWords.length);

  return (
        <div
          ref={aboutContainerRef}
          className="relative h-[280vh] 2xl:h-[300vh]"
        >

          <section
            id="about"
            className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between px-[clamp(16px,3vw,64px)] pt-[clamp(88px,8vw,150px)] pb-[clamp(16px,2vw,40px)] overflow-hidden bg-[#F3F2EE]"
          >

            <div className="grid grid-cols-1 gap-[clamp(24px,4vw,72px)] lg:grid-cols-12 lg:gap-[clamp(24px,3vw,64px)] items-center max-w-[1800px] mx-auto w-full pt-2">

              <div className="lg:col-span-9">

                <h2 className="text-[clamp(1.05rem,2.5vw,3.2rem)] leading-[1.35] tracking-tight">

                  {aboutWords.map((word, idx) => (
                    <span
                      key={idx}
                      className={`transition-colors duration-200 mr-2 inline-block ${idx < highlightedWordCount
                        ? 'text-[#111111] font-bold'
                        : 'text-neutral-400'
                        }`}
                    >
                      {word}{' '}
                    </span>
                  ))}

                </h2>

              </div>

              <div className="lg:col-span-3 relative flex justify-center lg:justify-end">

                <div className="relative w-[clamp(8rem,15vw,15rem)] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-neutral-800">

                  <img
                    src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop"
                    alt="Childhood Dor Sharaby"
                    className="w-full h-full object-cover grayscale contrast-125"
                  />

                </div>


              </div>

            </div>

            <div className="pb-4 max-w-[1800px] mx-auto w-full grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6 items-center border-t border-neutral-300/80 pt-4">

              <div className="lg:col-span-4 flex gap-3 sm:gap-4">

                <div className="w-1/2 bg-black rounded-xl overflow-hidden shadow-md flex items-center justify-center aspect-[16/10] border border-neutral-800">

                  <div className="w-full h-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center p-2">

                    <div className="w-full h-2 bg-neutral-700 rounded animate-pulse"></div>

                  </div>

                </div>

                <div className="w-1/2 bg-sky-200 rounded-xl overflow-hidden shadow-md flex items-center justify-center aspect-[16/10] border border-sky-300">

                  <span className="text-xl">
                    👕
                  </span>

                </div>

              </div>

              <div className="lg:col-span-8 min-w-0 overflow-hidden relative">

                <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">
                  (CLIENTS & COLLABORATIONS)
                </div>

                <div className="flex w-full overflow-hidden whitespace-nowrap relative">

                  <div className="flex animate-marquee gap-8 items-center text-neutral-800 font-bold text-sm tracking-wide">

                    <span className="flex items-center gap-2">
                      ✦ Komit Digital
                    </span>

                    <span className="flex items-center gap-2">
                      ❖ ממלכת
                    </span>

                    <span className="flex items-center gap-2">
                      ✦ Gardi
                    </span>

                    <span className="flex items-center gap-2">
                      ✦ טרימויס
                    </span>

                    <span className="flex items-center gap-2">
                      ✦ GETIN
                    </span>

                    <span className="flex items-center gap-2">
                      ❖ Santé
                    </span>

                    <span className="flex items-center gap-2">
                      ✦ iMotion
                    </span>

                    <span className="flex items-center gap-2">
                      ✦ Figcoms
                    </span>

                    <span className="flex items-center gap-2">
                      ✦ TWINTERA
                    </span>

                    <span className="flex items-center gap-2">
                      ❖ BEERBAZAAR
                    </span>

                    <span className="flex items-center gap-2">
                      ✦ STRONGSTFUL
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </section>

        </div>

  );
}
