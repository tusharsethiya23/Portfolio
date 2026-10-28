import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

import Loader from "../components/layout/Loader";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import CustomCursor from "../components/ui/CustomCursor";
import MarqueeStyles from "../components/ui/MarqueeStyles";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";
import { projects } from "../data/projects";

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [sidebarRendered, setSidebarRendered] = useState(false);
  const [sidebarAnimating, setSidebarAnimating] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true, wheelMultiplier: 0.8, touchMultiplier: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4) });
    lenisRef.current = lenis;
    let animationFrame;
    const raf = (time) => { lenis.raf(time); animationFrame = requestAnimationFrame(raf); };
    animationFrame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(animationFrame); lenis.destroy(); lenisRef.current = null; };
  }, []);

  const openMenu = () => {
    setSidebarRendered(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setSidebarAnimating(true)));
  };

  const closeMenu = () => {
    setSidebarAnimating(false);
    setTimeout(() => setSidebarRendered(false), 400);
  };

  const scrollToSection = (id) => {
    closeMenu();
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: 0, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="md:cursor-none bg-[#F3F2EE] text-[#111111] font-sans selection:bg-black selection:text-white overflow-x-clip min-h-[100dvh]">
      <CustomCursor />
      <Loader onReveal={() => setLoading(false)} />
      <Header
        scrollToSection={scrollToSection}
        openMenu={openMenu}
        closeMenu={closeMenu}
        menuOpen={sidebarRendered}
      />

      <div className={`transition-opacity duration-1000 ${loading ? "opacity-0" : "opacity-100"}`}>
        <Hero scrollToSection={scrollToSection} ready={!loading} />
        <About />
        <Projects projects={projects} />
        <Skills />
        {/* Contact lifts like a curtain to uncover the footer pinned beneath it */}
        <div className="relative">
          <Contact />
          <Footer scrollToSection={scrollToSection} />
        </div>
      </div>

      <Sidebar
        sidebarRendered={sidebarRendered}
        sidebarAnimating={sidebarAnimating}
        closeMenu={closeMenu}
        scrollToSection={scrollToSection}
      />
      <MarqueeStyles />
    </div>
  );
}
