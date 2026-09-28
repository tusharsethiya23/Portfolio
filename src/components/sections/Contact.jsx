import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const [contactHeading, setContactHeading] = useState("OPEN THE DOOR");
  const contactSectionRef = useRef(null);
  const scrambleStartedRef = useRef(false);

  useEffect(() => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const scrambleText = (finalText) => {
      let iteration = 0;
      const interval = setInterval(() => {
        setContactHeading(finalText.split("").map((char, index) => {
          if (char === " ") return " ";
          if (index < iteration) return finalText[index];
          return characters[Math.floor(Math.random() * characters.length)];
        }).join(""));
        iteration += 1 / 2;
        if (iteration >= finalText.length) { clearInterval(interval); setContactHeading(finalText); }
      }, 45);
      return interval;
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !scrambleStartedRef.current) {
        scrambleStartedRef.current = true;
        scrambleText("OPEN THE DOOR");
      }
    }, { threshold: 0.35 });
    if (contactSectionRef.current) observer.observe(contactSectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
        {/* CONTACT SECTION */}
        <section
          ref={contactSectionRef}
          id="contact"
          className="relative min-h-[100dvh] overflow-hidden bg-black px-[clamp(12px,3vw,64px)] py-[clamp(12px,2vw,40px)]"
        >
          {/* CLOUD BACKGROUND */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2400&auto=format&fit=crop"
              alt=""
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* CONTACT PANEL */}
          <div className="relative z-10 flex min-h-[calc(100dvh-1.5rem)] items-center justify-center py-2 lg:min-h-[calc(100dvh-3rem)]">
            <div className="relative w-full max-w-[clamp(880px,68vw,1280px)] max-h-[calc(100dvh-1.5rem)] overflow-y-auto bg-[#0b0b0b] px-[clamp(20px,4vw,72px)] py-[clamp(24px,3vw,56px)] text-white lg:max-h-[calc(100dvh-3rem)] lg:overflow-hidden">

              {/* TOP LABEL */}
              <div className="mb-5 text-[12px] font-medium uppercase tracking-wide text-neutral-400">
                (LEAVE YOUR DETAILS)
              </div>

              {/* SCRAMBLE HEADING */}
              <h2 className="min-h-[1.1em] text-[clamp(2.7rem,12vw,6rem)] font-medium leading-[0.9] tracking-[-0.06em] text-[#f3f1ed] sm:text-[clamp(3rem,6.5vw,6rem)]">
                {contactHeading}
              </h2>

              {/* EMAIL */}
              <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-neutral-400 sm:mt-6 sm:gap-x-3 sm:text-[19px]">
                <span>Or just write:</span>

                <a
                  href="mailto:pamidordesign@gmail.com"
                  className="border-b border-neutral-500 pb-1 text-white transition-colors duration-300 hover:border-white"
                >
                  tusharsethiya023@gmail.com
                </a>
              </div>

              {/* FORM */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-6 sm:mt-8"
              >
                {/* NAME + EMAIL */}
                <div className="grid grid-cols-1 gap-7 md:grid-cols-2">

                  {/* NAME */}
                  <div>
                    <label className="mb-3 block text-[11px] font-medium uppercase tracking-wide text-neutral-400">
                      Name
                    </label>

                    <input
                      type="text"
                      placeholder="Your full name"
                      className="w-full border-0 border-b border-neutral-700 bg-transparent pb-3 text-base text-white outline-none placeholder:text-neutral-500 transition-colors duration-300 focus:border-white sm:text-[18px]"
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="mb-3 block text-[11px] font-medium uppercase tracking-wide text-neutral-400">
                      Email
                    </label>

                    <input
                      type="email"
                      placeholder="name@company.com"
                      className="w-full border-0 border-b border-neutral-700 bg-transparent pb-3 text-base text-white outline-none placeholder:text-neutral-500 transition-colors duration-300 focus:border-white sm:text-[18px]"
                    />
                  </div>

                  {/* PHONE */}
                  <div>
                    <label className="mb-3 block text-[11px] font-medium uppercase tracking-wide text-neutral-400">
                      Phone
                    </label>

                    <input
                      type="tel"
                      placeholder="+91"
                      className="w-full border-0 border-b border-neutral-700 bg-transparent pb-3 text-base text-white outline-none placeholder:text-neutral-500 transition-colors duration-300 focus:border-white sm:text-[18px]"
                    />
                  </div>

                  {/* REASON */}
                  <div>
                    <label className="mb-3 block text-[11px] font-medium uppercase tracking-wide text-neutral-400">
                      Reason
                    </label>

                    <div className="relative">
                      <select
                        defaultValue=""
                        className="w-full appearance-none border-0 border-b border-neutral-700 bg-transparent pb-3 text-[18px] text-white outline-none transition-colors duration-300 focus:border-white"
                      >
                        <option
                          value=""
                          disabled
                          className="bg-[#0b0b0b]"
                        >
                          Select reason
                        </option>

                        <option
                          value="freelance"
                          className="bg-[#0b0b0b]"
                        >
                          Freelance project
                        </option>

                        <option
                          value="collaboration"
                          className="bg-[#0b0b0b]"
                        >
                          Collaboration
                        </option>

                        <option
                          value="job"
                          className="bg-[#0b0b0b]"
                        >
                          Job opportunity
                        </option>

                        <option
                          value="other"
                          className="bg-[#0b0b0b]"
                        >
                          Something else
                        </option>
                      </select>

                      <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-lg text-white">
                        ↓
                      </span>
                    </div>
                  </div>
                </div>

                {/* MESSAGE */}
                <div className="mt-6 sm:mt-8">
                  <label className="mb-3 block text-[11px] font-medium uppercase tracking-wide text-neutral-400">
                    Message
                  </label>

                  <textarea
                    rows="1"
                    placeholder="A few words"
                    className="w-full resize-none border-0 border-b border-neutral-700 bg-transparent pb-3 text-[18px] text-white outline-none placeholder:text-neutral-500 transition-colors duration-300 focus:border-white"
                  />
                </div>

                {/* ACTION */}
                <div className="mt-7 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-center">

                  <button
                    type="submit"
                    className="group flex w-fit items-center gap-7 bg-[#f3f1ed] px-5 py-3.5 text-[15px] font-medium text-black transition-all duration-300 hover:bg-white"
                  >
                    <span>Send Details</span>

                    <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </button>

                  <p className="text-[12px] text-neutral-500">
                    No spam. A real reply, usually the same day.
                  </p>
                </div>

                {/* PRIVACY */}
                <p className="mt-3 text-[12px] text-neutral-500">
                  Sent details land in my inbox and nowhere else -
                  <a
                    href="#privacy"
                    className="ml-1 border-b border-neutral-600 transition-colors duration-300 hover:border-white hover:text-white"
                  >
                    privacy policy
                  </a>
                </p>
              </form>
            </div>
          </div>

          {/* W. NOMINEE BADGE */}
          {/* <div className="absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 bg-black px-5 py-6 text-white sm:flex sm:flex-col sm:items-center sm:gap-4">
            <span className="font-bold text-2xl tracking-widest font-mono">
              W.
            </span>

            <span className="text-[11px] font-medium uppercase tracking-widest text-white [writing-mode:vertical-lr] rotate-180">
              Nominee
            </span>
          </div> */}
        </section>
    </>
  );
}
