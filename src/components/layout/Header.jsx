import { useEffect, useState } from "react";

export default function Header({
  scrollToSection,
  openMenu,
  closeMenu,
  menuOpen,
}) {
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show header near the top
      if (currentScrollY <= 20) {
        setShowHeader(true);
      }
      // Scrolling down
      else if (currentScrollY > lastScrollY) {
        setShowHeader(false);
      }
      // Scrolling up
      else if (currentScrollY < lastScrollY) {
        setShowHeader(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`
        fixed
        top-0
        left-0
        right-0
        z-[60]
        flex
        justify-between
        items-center
        px-[clamp(16px,3vw,64px)]
        py-[clamp(16px,2vw,32px)]
        bg-[#F3F2EE]/80
        backdrop-blur-md
        transition-transform
        duration-500
        ease-[cubic-bezier(0.77,0,0.175,1)]
        ${showHeader
          ? "translate-y-0"
          : "-translate-y-full"
        }
      `}
    >
      {/* LOGO */}
      <button
        onClick={() => scrollToSection("home")}
        className="
          font-bold
          tracking-wider
          text-xs
          sm:text-sm
          uppercase
          font-mono
          text-left
          cursor-pointer
          hover:opacity-75
          transition-opacity
          bg-transparent
          border-none
        "
      >
        PAMIDOR.STUDIO®
      </button>

      {/* MENU BUTTON */}
      <button
        onClick={menuOpen ? closeMenu : openMenu}
        className="
          relative
          flex
          items-center
          justify-center
          w-12
          h-12
          p-3
          focus:outline-none
          cursor-pointer
          bg-transparent
          border-none
        "
        aria-label={menuOpen ? "Close Menu" : "Open Menu"}
        aria-expanded={menuOpen}
      >
        <span
          className={`
            absolute
            w-7
            h-[2px]
            bg-black
            transition-all
            duration-500
            ease-[cubic-bezier(0.77,0,0.175,1)]
            ${menuOpen
              ? "rotate-45"
              : "-translate-y-[4px]"
            }
          `}
        />

        <span
          className={`
            absolute
            w-7
            h-[2px]
            bg-black
            transition-all
            duration-500
            ease-[cubic-bezier(0.77,0,0.175,1)]
            ${menuOpen
              ? "-rotate-45"
              : "translate-y-[4px]"
            }
          `}
        />
      </button>
    </header>
  );
}