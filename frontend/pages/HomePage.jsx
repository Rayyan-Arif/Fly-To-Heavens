import { Link, useNavigate, useOutletContext, useRouteLoaderData } from "react-router-dom"
import ReviewCard from '../components/ReviewCard'
import ReviewsSection from "../components/ReviewsSection";

const HomePage = () => {
  const {user, setUser} = useOutletContext();

  return (
    <>
        <div
            className="relative isolate min-h-[min(72vh,520px)] w-full overflow-hidden sm:min-h-[min(80vh,640px)] lg:min-h-[min(85vh,720px)]"
        >
            <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80"
            alt="Commercial airplane in flight above clouds"
            className="absolute inset-0 h-full w-full object-cover"
            width="1920"
            height="1080"
            decoding="async"
            />
            <div
            className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A]/80 via-[#1E3A8A]/55 to-[#1E3A8A]/85"
            aria-hidden="true"
            ></div>
            <div
            className="relative z-10 mx-auto flex h-full min-h-[min(72vh,520px)] max-w-6xl flex-col items-center justify-center px-4 py-12 text-center sm:min-h-[min(80vh,640px)] sm:px-6 sm:py-16 lg:min-h-[min(85vh,720px)] lg:py-20 lg:px-8"
            >
            <p
                className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#93C5FD] sm:text-sm sm:tracking-[0.2em]"
            >
                Book smarter. Fly calmer.
            </p>
            <h1
                className="mb-4 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
            >
                Your next journey starts with Fly To Heavens
            </h1>
            <p
                className="mb-8 max-w-2xl text-base leading-relaxed text-white/90 sm:mb-10 sm:text-lg lg:text-xl"
            >
                Search routes, compare flights, pick your seats, and manage bookings
                in one place. Built for clarity, speed, and peace of mind.
            </p>
            <div
                className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
            >
                <button
                onClick={() => {
                    document.getElementById("all-flights").scrollIntoView({ behavior: "smooth" });
                }}
                className="cursor-pointer inline-flex min-h-[48px] w-full touch-manipulation items-center justify-center rounded-lg bg-[#3B82F6] px-6 py-3 text-base md:text-lg font-semibold text-white shadow-lg transition-colors hover:bg-[#2563EB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#93C5FD] sm:w-auto sm:min-h-[44px]"
                >Browse flights</button>
                <button
                onClick={() => {
                    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
                }}
                className="cursor-pointer inline-flex min-h-[48px] w-full touch-manipulation items-center justify-center rounded-lg border border-white/40 bg-white/10 px-6 py-3 text-base md:text-lg font-semibold text-white backdrop-blur-sm transition-colors hover:border-[#3B82F6] hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#93C5FD] sm:w-auto sm:min-h-[44px]"
                >How it works</button>
            </div>
            </div>
        </div>
        <div
        id="about"
        className="scroll-mt-24 border-b border-[#E5E7EB] bg-[#F9FAFB] px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            className="mb-4 text-2xl font-bold leading-tight text-[#111827] sm:text-3xl md:text-4xl"
          >
            A full flight reservation experience
          </h2>
          <p
            className="mb-4 max-w-3xl text-base leading-relaxed text-[#6B7280] sm:text-lg"
          >
            Fly To Heavens is a flight reservation platform where you can search
            for available flights between locations, open detailed flight pages
            with schedules and pricing, and see seat availability before you
            commit. Signed-in travelers can select seats, complete bookings with
            passenger details, and manage or cancel reservations from their
            profile, while admins can maintain routes, schedules, seat layouts,
            and bookings behind the scenes.
          </p>
          <p
            className="mb-8 max-w-3xl text-sm leading-relaxed text-[#6B7280] sm:mb-10 sm:text-base"
          >
            The system is designed around real-world booking flows: fast search
            with pagination, future flights only, clear seat status, and
            short-lived seat locks so two people cannot claim the same seat at
            once. Whether you are planning a weekend away or a longer trip, you
            get a straightforward path from search to confirmed ticket.
          </p>
          <div
            id="all-flights"
            className="scroll-mt-24 flex flex-col gap-4 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6"
          >
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-[#111827] sm:text-lg">
                Ready to explore the schedule?
              </h3>
              <p className="mt-1 text-sm text-[#6B7280]">
                Jump to the full list of flights and pick the one that fits your
                plans.
              </p>
            </div>
            <Link
              to={`${user ? '/flights' : '/login'}`}
              className="inline-flex min-h-[48px] w-full shrink-0 touch-manipulation items-center justify-center rounded-lg bg-[#1E3A8A] px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#172554] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] sm:w-auto sm:px-6 sm:text-base"
              >See all flights available</Link>
          </div>
        </div>
      </div>

      <div
        id="reviews"
        className="border-b border-[#E5E7EB] bg-[#FFFFFF] py-12 sm:py-16"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2
            className="mb-2 text-center text-2xl font-bold text-[#111827] sm:text-3xl"
          >
            Travelers love the experience
          </h2>
          <p className="mb-3 text-center text-sm text-[#6B7280] sm:text-base">
            A preview of traveler reviews below. Click to see all reviews.
          </p>
          <div className="mb-8 flex justify-center sm:mb-10">
            <Link
              to={`${user ? '/reviews' : '/login'}`}
              className="inline-flex min-h-[44px] touch-manipulation items-center justify-center gap-1 rounded-lg border-2 border-[#1E3A8A] bg-[#FFFFFF] px-5 py-2.5 text-center text-base font-semibold text-[#1E3A8A] shadow-sm transition-colors hover:border-[#3B82F6] hover:bg-[#F9FAFB] hover:text-[#1E3A8A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] sm:px-6 sm:text-lg"
            >
              See all reviews
              <span aria-hidden="true" className="text-[#3B82F6]">→</span>
            </Link>
          </div>
        </div>

        <div
          className="border-y border-[#E5E7EB] bg-[#F9FAFB] py-8 sm:py-10"
          role="region"
          aria-label="Featured customer reviews"
        >
          <div
            className="mx-auto flex max-w-6xl items-start gap-2 px-4 sm:items-stretch sm:gap-4 sm:px-6 lg:px-8"
          >
            {/* <button
              type="button"
              data-review-prev
              className="cursor-pointer inline-flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center self-center rounded-full border border-[#E5E7EB] bg-[#FFFFFF] text-lg font-bold leading-none text-[#1E3A8A] shadow-sm transition-colors hover:border-[#3B82F6] hover:bg-[#EFF6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] sm:h-12 sm:w-12 sm:text-xl"
              aria-label="Show previous reviews"
            >
              &lt;
            </button> */}

            <ReviewsSection isHome={true}/>

            {/* <button
              type="button"
              data-review-next
              className="cursor-pointer inline-flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center self-center rounded-full border border-[#E5E7EB] bg-[#FFFFFF] text-lg font-bold leading-none text-[#1E3A8A] shadow-sm transition-colors hover:border-[#3B82F6] hover:bg-[#EFF6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] sm:h-12 sm:w-12 sm:text-xl"
              aria-label="Show next reviews"
            >
              &gt;
            </button> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage