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
import { loaderCards } from "../data/loaderCards";
import { projects } from "../data/projects";

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(0);
  const [splitProgress, setSplitProgress] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
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

  useEffect(() => {
    const letterIntervals = [80, 160, 240, 320, 400, 480, 560].map((time, idx) => setTimeout(() => setVisibleCount(idx + 1), time));
    const splitTimer = setTimeout(() => {
      let progress = 0;
      const splitInterval = setInterval(() => {
        progress += 0.05;
        if (progress >= 1) { progress = 1; clearInterval(splitInterval); }
        setSplitProgress(progress);
      }, 25);
    }, 700);
    const cardTimes = [1000, 1200, 1350, 1500, 1650, 1800, 1950, 2100];
    const cardTimeouts = cardTimes.map((time, idx) => setTimeout(() => setCardIndex(idx), time));
    const finishTimer = setTimeout(() => setLoading(false), 2800);
    return () => { letterIntervals.forEach(clearTimeout); clearTimeout(splitTimer); cardTimeouts.forEach(clearTimeout); clearTimeout(finishTimer); };
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
    <div className="cursor-none bg-[#F3F2EE] text-[#111111] font-sans selection:bg-black selection:text-white overflow-x-clip min-h-[100dvh]">
      <CustomCursor />
      <Loader loading={loading} visibleCount={visibleCount} splitProgress={splitProgress} cardIndex={cardIndex} loaderCards={loaderCards} />
      <Header
        scrollToSection={scrollToSection}
        openMenu={openMenu}
        closeMenu={closeMenu}
        menuOpen={sidebarRendered}
      />

      <div className={`transition-opacity duration-1000 ${loading ? "opacity-0" : "opacity-100"}`}>
        <Hero scrollToSection={scrollToSection} />
        <About />
        <Projects projects={projects} />
        <Skills />
        <Contact />
        <Footer />
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
