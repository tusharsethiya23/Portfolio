import { useEffect, useRef, useState } from "react";

/*
  Handwritten signature. A clip rectangle sweeps left to right like a pen
  writing the name, then a red underline swoosh draws itself beneath.
*/
function Signature({ drawn }) {
  const ease = "cubic-bezier(0.65, 0, 0.35, 1)";

  return (
    <svg
      viewBox="0 0 1000 240"
      role="img"
      aria-label="Tushar Sethiya, signature"
      className="h-auto w-[min(85vw,640px)] overflow-visible"
    >
      <defs>
        <clipPath id="signature-pen">
          <rect
            x="-20"
            y="-40"
            width="1060"
            height="320"
            style={{
              transformBox: "fill-box",
              transformOrigin: "left center",
              transform: drawn ? "scaleX(1)" : "scaleX(0)",
              transition: drawn ? `transform 2.4s ${ease} 0.5s` : "transform 0.3s ease",
            }}
          />
        </clipPath>
      </defs>

      <text
        x="10"
        y="170"
        textLength="980"
        lengthAdjust="spacingAndGlyphs"
        clipPath="url(#signature-pen)"
        fill="#ffffff"
        className="font-signature"
        fontSize="170"
      >
        Tushar Sethiya
      </text>

      <path
        d="M40 205 C 300 238, 660 168, 970 192"
        pathLength="1"
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="1"
        style={{
          strokeDashoffset: drawn ? 0 : 1,
          transition: drawn ? `stroke-dashoffset 0.9s ${ease} 2.8s` : "stroke-dashoffset 0.3s ease",
        }}
      />
    </svg>
  );
}

const TIME_ZONE = "Asia/Kolkata";
const TIME_LABEL = "IST";

function useLocalTime() {
  const format = () =>
    new Intl.DateTimeFormat("en-GB", {
      timeZone: TIME_ZONE,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date());

  const [time, setTime] = useState(format);

  useEffect(() => {
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}


/*
  Curtain-reveal ending: the footer is pinned to the bottom of the screen
  underneath the Contact section (which sits above it with z-10). As Contact
  scrolls away, it lifts like a curtain and uncovers this full-screen footer.
*/
export default function Footer({ scrollToSection }) {
  const footerRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const time = useLocalTime();

  // Once most of the footer is uncovered, the sign-off rises in
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setRevealed(entry.isIntersecting),
      { threshold: 0.6 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const label = "mb-2 block font-mono text-[11px] uppercase tracking-[0.25em] text-white/45";
  const rise = (delay) => ({
    className: `block transition-[translate,opacity] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
      revealed ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
    }`,
    style: { transitionDelay: revealed ? `${delay}ms` : "0ms" },
  });

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="
        sticky
        bottom-0
        z-0
        flex
        h-[100dvh]
        flex-col
        justify-between
        overflow-hidden
        bg-[#0b0b0b]
        px-[clamp(16px,3vw,64px)]
        pt-[clamp(88px,8vw,120px)]
        pb-[clamp(24px,4vw,64px)]
        text-white
      "
    >
      {/* =========================================
          TOP ROW — back to top
      ========================================= */}
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-end gap-6">

        <button
          type="button"
          onClick={() => scrollToSection?.("home")}
          className="
            shrink-0
            cursor-pointer
            rounded-full
            border
            border-white/40
            px-5
            py-2.5
            font-mono
            text-[11px]
            uppercase
            tracking-[0.2em]
            text-white
            transition-colors
            duration-300
            hover:border-brand
            hover:bg-brand
          "
        >
          ↑ Back to top
        </button>
      </div>

      {/* =========================================
          SIGN-OFF — rises in as the curtain lifts
      ========================================= */}
      <div className="mx-auto grid w-full max-w-[1600px] gap-8 lg:grid-cols-12 lg:items-end lg:gap-[clamp(32px,4vw,80px)]">
      <p className="lg:col-span-8">
        <span className="block overflow-hidden">
          <span
            {...rise(0)}
            className={`${rise(0).className} font-display text-[clamp(2.5rem,10vw,10rem)] uppercase leading-[0.9] text-white`}
          >
            Thanks for scrolling.
          </span>
        </span>
        <span className="mt-3 block overflow-hidden pb-[0.1em]">
          <span
            {...rise(200)}
            className={`${rise(200).className} font-loader text-[clamp(1.4rem,3.6vw,3.5rem)] font-bold leading-[1.15] tracking-tight text-brand`}
          >
            See you on the other side.
          </span>
        </span>
      </p>

      {/* SIDE PANEL — what's going on right now */}
      <dl className="hidden sm:grid grid-cols-2 gap-x-6 border-t border-white/15 lg:col-span-4 lg:grid-cols-1">
        {[
          { label: "Role", value: "MERN Stack Developer" },
          {
            label: "Local time",
            value: (
              <span className="font-mono tabular-nums">
                {time} <span className="text-white/45">{TIME_LABEL}</span>
              </span>
            ),
          },
        ].map((row) => (
          <div key={row.label} className="border-b border-white/15 py-3">
            <dt className={label}>{row.label}</dt>
            <dd className="text-base text-white sm:text-lg">{row.value}</dd>
          </div>
        ))}
      </dl>
      </div>

      {/* =========================================
          BOTTOM — horizon line, signature, credits
      ========================================= */}
      <div>
        {/* red horizon line: draws across while a dot travels along it */}
        <div aria-hidden="true" className="relative mx-auto mb-8 h-px w-full max-w-[1600px]">
          <div
            className={`absolute inset-0 origin-left bg-brand transition-transform duration-[1400ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
              revealed ? "scale-x-100" : "scale-x-0"
            }`}
            style={{ transitionDelay: revealed ? "300ms" : "0ms" }}
          />
          <span
            className={`absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_12px_rgba(225,6,0,0.8)] transition-[left,opacity] duration-[1400ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
              revealed ? "left-full opacity-100" : "left-0 opacity-0"
            }`}
            style={{ transitionDelay: revealed ? "300ms" : "0ms" }}
          />
        </div>

        <div className="mx-auto mb-4 w-full max-w-[1600px]">
          <Signature drawn={revealed} />
        </div>

        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-1 border-t border-white/15 pt-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <span>© {new Date().getFullYear()} Tushar Sethiya. All rights reserved.</span>
          <span className="uppercase tracking-[0.2em]">Designed &amp; built by Tushar</span>
        </div>
      </div>
    </footer>
  );
}
