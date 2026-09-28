export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden bg-[#0b0b0b] px-[clamp(16px,3vw,64px)] py-[clamp(56px,7vw,140px)] text-white"
    >
      <div className="mx-auto max-w-[1600px]">

        {/* BRAND */}
        <div className="overflow-hidden">
          <h2 className="break-words text-[clamp(3.4rem,10vw,13rem)] font-semibold leading-[0.82] tracking-[-0.08em] text-[#f3f1ed]">
            TUSHAR SETHIYA<span className="text-[0.45em] align-top">®</span>
          </h2>
        </div>

        {/* MIDDLE CONTENT */}
        <div className="mt-14 grid grid-cols-1 gap-10 sm:mt-20 sm:gap-12 lg:grid-cols-2">

          {/* TAGLINE */}
          <div>
            <p className="max-w-[620px] text-[clamp(2rem,9vw,4rem)] font-medium leading-[0.95] tracking-[-0.05em] text-[#f3f1ed] sm:text-[clamp(2rem,4vw,4rem)]">
              BUILDING DIGITAL
              <br />
              EXPERIENCES WITH
              <br />
              PURPOSE.
            </p>
          </div>

          {/* LINKS */}
          <div className="flex flex-col justify-end lg:items-end">

            {/* CONTACT */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm uppercase tracking-wide">
              <a
                href="mailto:tushar@example.com"
                className="transition-opacity duration-300 lowercase hover:opacity-50"
              >
                tusharsethiya023@gmail.com
              </a>

              <a
                href="https://www.linkedin.com/in/tusharsethiya23"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity duration-300 hover:opacity-50"
              >
                LinkedIn
              </a>

              <a
                href="https://github.com/tusharsethiya23"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity duration-300 hover:opacity-50"
              >
                GitHub
              </a>
              <a
                href="#"
                className="transition-opacity duration-300 hover:opacity-50"
              >
                Instagram
              </a>
            </div>

            {/* LEGAL */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-wide sm:gap-8 sm:text-sm">
              <a
                href="#privacy"
                className="transition-opacity duration-300 hover:opacity-50"
              >
                Privacy
              </a>

              <a
                href="#terms"
                className="transition-opacity duration-300 hover:opacity-50"
              >
                Terms
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/20 pt-6 text-xs text-white/60 sm:mt-24 sm:flex-row sm:items-center sm:justify-between sm:text-sm">

          <span>
            © {new Date().getFullYear()} Tushar Sethiya. All rights reserved.
          </span>

          <span className="uppercase tracking-[0.2em]">
            MERN Stack Developer
          </span>

        </div>
      </div>

      {/* W. BADGE */}
      {/* <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 bg-black px-5 py-7 sm:flex sm:flex-col sm:items-center sm:gap-4">
            <span className="font-mono text-2xl font-bold tracking-widest">
              W.
            </span>

            <span className="[writing-mode:vertical-lr] rotate-180 text-[11px] font-medium uppercase tracking-widest text-white/80">
              Nominee
            </span>
          </div> */}
    </footer>
  );
}
