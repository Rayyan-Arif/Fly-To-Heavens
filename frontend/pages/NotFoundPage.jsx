import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <section
        className="flex flex-1 flex-col items-center justify-center bg-[#F9FAFB] px-4 py-16 text-[#111827] antialiased sm:py-20"
        aria-labelledby="page-title"
      >
        <div className="w-full max-w-lg text-center">
          <p
            className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#3B82F6]"
          >
            Error 404
          </p>
          <h1
            id="page-title"
            className="mb-4 text-4xl font-bold text-[#1E3A8A] sm:text-5xl"
          >
            Page not found
          </h1>
          <p className="mb-8 text-base leading-relaxed text-[#6B7280] sm:text-lg">
            The address you opened does not match any page on Fly To Heavens. It
            may have been moved, removed, or typed incorrectly.
          </p>
          <div
            className="rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] p-6 shadow-sm sm:p-8"
          >
            <p className="mb-6 text-sm text-[#6B7280]">
              Check the URL for typos, or return to the site to continue booking
              and browsing flights.
            </p>
            <Link
              to="/"
              className="inline-flex min-h-[48px] w-full touch-manipulation items-center justify-center rounded-lg bg-[#1E3A8A] px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#172554] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] sm:w-auto"
            >
              Back to home
            </Link>
          </div>
        </div>
    </section>
  )
}

export default NotFoundPage