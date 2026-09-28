export default function Hero({ scrollToSection }) {
  return (
    <section
      id="home"
      className="
        flex
        min-h-[100dvh]
        flex-col

        px-4
        pt-20
        pb-0

        sm:px-6
        sm:pt-20
        sm:pb-0

        md:pt-20

        lg:min-h-[100dvh]
        lg:px-[clamp(16px,3vw,64px)]
        lg:pt-8
        lg:pb-0
      "
    >
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-[1800px]
          flex-1
          flex-col

          lg:grid
          lg:grid-cols-12
          lg:items-center
          lg:gap-[clamp(24px,3vw,72px)]
        "
      >
        {/* =========================================
            MOBILE + MEDIUM IMAGE
        ========================================= */}
        <div
          className="
            order-1
            flex
            w-full
            items-center
            justify-center
            overflow-visible

            h-[52vh]

            sm:h-[58vh]

            md:h-[54vh]

            -mt-6

            sm:-mt-6

            md:-mt-5

            lg:hidden
          "
        >
          <div
            className="
              relative
              h-full
              w-full
              overflow-visible
            "
          >
            <img
              src="https://ik.imagekit.io/tusharsethiya023/Tushar%20Images/portfolio%20transparent.png?updatedAt=1790599531637"
              alt="Tushar Sethiya Portrait"
              className="
                absolute
                left-1/2
                top-1/2

                -translate-x-1/2
                -translate-y-1/2

                w-[105vw]

                sm:w-[115vw]

                md:w-[115vw]

                max-w-none
                h-auto

                object-contain
              "
            />
          </div>
        </div>

        {/* =========================================
            LEFT CONTENT
        ========================================= */}
        <div
          className="
            order-2

            mt-2

            sm:mt-4

            md:mt-3

            flex
            flex-col
            justify-center

            space-y-4

            sm:space-y-5

            lg:col-span-6
            lg:order-none
            lg:mt-0
            lg:space-y-[clamp(20px,2vw,32px)]
          "
        >
          <div
            className="
              space-y-2

              sm:space-y-3
            "
          >
            {/* NAME */}
            <h1
              className="
                w-full

                font-normal

                tracking-[-0.035em]
                leading-[0.78]

                text-[clamp(4rem,17vw,8rem)]

                sm:text-[clamp(5rem,15vw,9rem)]

                md:text-[clamp(5.5rem,12vw,9rem)]

                lg:text-[clamp(3.2rem,9vw,9rem)]
              "
              style={{
                fontFamily: "'Galgo Condensed', sans-serif",
              }}
            >
              Tushar
              <br />
              <span>Sethiya</span>
            </h1>

            {/* MAIN DESCRIPTION */}
            <p
              className="
                max-w-xl

                pt-1

                text-base
                font-normal
                leading-relaxed
                text-neutral-600

                sm:text-lg

                md:text-lg
              "
            >
              Brands, pixels & the chaos in between.
            </p>

            {/* SMALL DESCRIPTION */}
            <p
              className="
                text-sm
                font-medium
                leading-relaxed
                text-neutral-500

                sm:text-base
              "
            >
              I make the chaos look good.
            </p>
          </div>

          {/* =========================================
              SKILLS
          ========================================= */}
          <div
            className="
              flex
              flex-wrap
              gap-2

              pt-0

              sm:gap-2
              sm:pt-0
            "
          >
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
                  cursor-pointer

                  rounded-full
                  border
                  border-neutral-300

                  bg-white/40

                  px-[clamp(12px,1vw,20px)]
                  py-[clamp(8px,0.7vw,12px)]

                  text-[clamp(11px,0.8vw,14px)]
                  font-medium

                  shadow-2xs

                  transition-all
                  duration-300

                  hover:border-black
                  hover:bg-black
                  hover:text-white
                "
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* =========================================
            DESKTOP IMAGE — RIGHT SIDE
        ========================================= */}
        <div
          className="
            hidden

            lg:col-span-6
            lg:flex
            lg:order-none

            lg:relative
            lg:h-full
            lg:w-full

            lg:items-center
            lg:justify-end

            lg:overflow-visible
          "
        >
          <div
            className="
              relative

              h-[76vh]
              w-[60vw]

              xl:h-[82vh]
              xl:w-[66vw]

              2xl:h-[88vh]
              2xl:w-[70vw]

              max-w-none

              overflow-visible
            "
          >
            <img
              src="https://ik.imagekit.io/tusharsethiya023/Tushar%20Images/portfolio%20transparent.png?updatedAt=1790599531637"
              alt="Tushar Sethiya Portrait"
              className="
                h-full
                w-full

                object-contain
                object-center

                scale-125
              "
            />
          </div>
        </div>
      </div>

      {/* =========================================
          SCROLL INDICATOR
      ========================================= */}
      <div
        className="
          mt-3

          sm:mt-4

          md:mt-4

          lg:mt-13

          pb-0

          text-center

          font-mono
          text-lg
          tracking-widest
          text-neutral-400

          animate-bounce
        "
      >
        ↓ SCROLL TO EXPLORE
      </div>
    </section>
  );
}