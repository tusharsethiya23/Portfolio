export default function Hero({ scrollToSection }) {
  return (
    <section
      id="home"
      className="
        min-h-[100dvh]
        flex flex-col
        px-[clamp(16px,3vw,64px)]
        pt-[clamp(80px,2vw,150px)]
        pb-2
      "
    >
      <div
        className="
          flex-none
          grid
          grid-cols-1
          gap-5
          sm:gap-6
          md:gap-8
          lg:grid-cols-12
          lg:gap-[clamp(24px,3vw,72px)]
          items-center
          w-full
          max-w-[1800px]
          mx-auto
        "
      >
        {/* LEFT CONTENT */}
        <div
          className="
            lg:col-span-6
            flex
            flex-col
            justify-center
            space-y-5
            sm:space-y-6
            lg:space-y-[clamp(20px,2vw,32px)]
          "
        >
          <div className="space-y-3 sm:space-y-4">
            <h1
              className="
                text-[clamp(3.2rem,9vw,9rem)]
                tracking-tight
                leading-[0.88]
                font-semibold
              "
            >
              Tushar <br />

              <span className="font-light">
                Sethiya
              </span>
            </h1>

            <p
              className="
                max-w-xl
                text-base
                leading-relaxed
                text-neutral-600
                font-normal
                pt-1
                sm:text-xl
              "
            >
              Brands, pixels & the chaos in between.
            </p>

            <p
              className="
                text-sm
                leading-relaxed
                text-neutral-500
                font-medium
                sm:text-base
              "
            >
              I make the chaos look good.
            </p>
          </div>

          {/* SKILLS */}
          <div className="flex flex-wrap gap-2 pt-0.5 sm:gap-2.5 sm:pt-1">
            {[
              "Brand Design",
              "Product Design",
              "UX | UI",
              "Art Direction",
              "Motion & 3D",
            ].map((skill, index) => (
              <span
                key={index}
                onClick={() => scrollToSection("about")}
                className="
                  px-[clamp(12px,1vw,20px)]
                  py-[clamp(8px,0.7vw,12px)]
                  rounded-full
                  border
                  border-neutral-300
                  text-[clamp(11px,0.8vw,14px)]
                  font-medium
                  bg-white/40
                  hover:bg-black
                  hover:text-white
                  hover:border-black
                  transition-all
                  duration-300
                  cursor-pointer
                  shadow-2xs
                "
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div
          className="
            lg:col-span-6
            relative
            flex
            justify-center
            lg:justify-end
            w-full
            overflow-visible
          "
        >
          <div
            className="
              relative
              w-full
              h-[48vh]

              sm:w-[82vw]
              sm:h-[55vh]

              md:w-[72vw]
              md:h-[65vh]

              lg:w-[60vw]
              lg:h-[78vh]

              xl:w-[66vw]
              xl:h-[84vh]

              2xl:w-[70vw]
              2xl:h-[90vh]

              max-w-none
              overflow-visible
            "
          >
            <img
              src="https://ik.imagekit.io/tusharsethiya023/Tushar%20Images/portfolio%20transparent.png?updatedAt=1790599531637"
              alt="Tushar Sethiya Portrait"
              className="
                w-full
                h-full
                object-contain
                object-center
                scale-125
              "
            />
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div
        className="
          mt-auto
          text-center
          pb-1
          text-xs
          text-neutral-400
          font-mono
          tracking-widest
          animate-bounce
        "
      >
        ↓ SCROLL TO EXPLORE
      </div>
    </section>
  );
}