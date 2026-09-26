import Link from "next/link"

export default function Hero() {
  return (
    <section className="font-poppins relative w-full overflow-hidden bg-linear-to-br from-blue-50 via-purple-50 to-orange-50 px-4 sm:px-6 py-16 sm:py-20 md:py-24">

      <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
       
        {/* Headline */}
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight break-words">
          Leave your
          <br />
          <span className="relative inline-block">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",
              }}
            >
              digital mark
            </span>
            <svg
              className="absolute -bottom-1 sm:-bottom-2 left-0 w-full overflow-visible"
              height="8"
              viewBox="0 0 300 8"
              preserveAspectRatio="none"
            >
              <path
                d="M0 4 Q150 -2 300 4"
                stroke="#4285F4"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                pathLength="1"
                className="animate-draw-underline"
              />
            </svg>
          </span>
          <br />
          forever.
        </h1>

        {/* Subtext */}
        <p className="mt-6 sm:mt-8 text-gray-500 text-xs sm:text-sm md:text-base max-w-xs sm:max-w-xl leading-relaxed px-2">
          A living record of everyone who's been part of GDGoC. Connect your wallet and leave a message that stays on the blockchain, forever.
        </p>

        {/* CTA buttons */}
        <div className="mt-8 sm:mt-10 w-full flex flex-row items-center justify-center gap-2 sm:gap-4 px-4 sm:px-0">
          <Link
            href="/dashboard"
            className="flex items-center justify-center text-center gap-1.5 sm:gap-2 bg-gray-900 text-white rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-[11px] sm:text-sm font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap"
          >
            Launch &amp; Connect
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center justify-center text-center bg-white text-gray-800 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-[11px] sm:text-sm font-semibold shadow-sm hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            Explore Entries
          </Link>
        </div>

      </div>
    </section>
  )
}