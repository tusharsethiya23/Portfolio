import { CONTACT } from "../../data/contact";

export default function Sidebar({
  sidebarRendered,
  sidebarAnimating,
  closeMenu,
  scrollToSection,
}) {
  if (!sidebarRendered) {
    return null;
  }

  const menuItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" onKeyDown={(e) => e.key === "Escape" && closeMenu()}>

      {/* MENU PANEL */}
      <div
        className={`
          absolute
          inset-0
          bg-[#F3F2EE]
          transition-transform
          duration-700
          ease-[cubic-bezier(0.77,0,0.175,1)]
          ${
            sidebarAnimating
              ? "translate-y-0"
              : "-translate-y-full"
          }
        `}
      >
        <div
          className="
            flex
            h-full
            flex-col
            px-[clamp(20px,6vw,100px)]
            pt-[clamp(90px,10vw,130px)]
            pb-6
          "
        >

          {/* NAVIGATION */}
          <nav className="flex flex-col gap-1 sm:gap-2">

            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                }}
                className={`
                  group
                  w-fit
                  border-none
                  bg-transparent
                  text-left
                  cursor-pointer
                  py-1
                  text-[clamp(2rem,6vw,5rem)]
                  font-semibold
                  leading-[0.9]
                  tracking-tight
                  text-[#111111]
                  hover:text-brand
                  focus-visible:text-brand
                  focus-visible:outline-none
                  transition-all
                  duration-500
                  ease-out
                  ${
                    sidebarAnimating
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }
                `}
                style={{
                  transitionDelay: sidebarAnimating
                    ? `${150 + index * 100}ms`
                    : "0ms",
                }}
              >
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-3">
                  {item.name}
                </span>
              </button>
            ))}

          </nav>

          {/* BOTTOM INFO */}
          <div
            className={`
              mt-auto
              flex
              flex-col
              gap-3
              border-t
              border-neutral-300
              pt-4
              text-xs
              text-neutral-500
              transition-all
              duration-500

              sm:flex-row
              sm:items-end
              sm:justify-between
              ${
                sidebarAnimating
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }
            `}
            style={{
              transitionDelay: sidebarAnimating
                ? "700ms"
                : "0ms",
            }}
          >
            <div>
              <p className="font-mono uppercase tracking-widest">
                Get in touch
              </p>

              <a
                href={`mailto:${CONTACT.email}`}
                className="
                  mt-1
                  inline-block
                  text-sm
                  text-black
                  underline-offset-4
                  hover:text-brand
                  hover:underline
                "
              >
                {CONTACT.email}
              </a>
            </div>

            <p className="font-mono uppercase tracking-widest">
              © 2026 Tushar Sethiya · Frontend Developer
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}