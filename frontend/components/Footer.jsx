import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer
        className="mt-auto border-t border-[#E5E7EB] bg-[#1E3A8A] text-white"
        >
        <div
            className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:flex lg:items-start lg:justify-between lg:px-8 lg:py-14"
        >
            <div className="mb-8 max-w-md lg:mb-0">
            <p className="text-lg font-semibold sm:text-xl">Fly To Heavens</p>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
                Search, book, and manage flights with a flow designed for clarity
                and confidence from first search to boarding pass.
            </p>
            </div>
            <div
            className="grid grid-cols-1 gap-8 text-sm sm:grid-cols-2 sm:gap-10 lg:gap-16"
            >
            <div>
                <p className="font-semibold text-[#93C5FD]">Explore</p>
                <ul className="mt-3 space-y-2 text-white/85">
                <li>
                    <Link
                    to="/flights"
                    className="transition-colors hover:text-[#3B82F6]"
                    >All flights</Link>
                </li>
                <li>
                    <Link to="/reviews" className="transition-colors hover:text-[#3B82F6]"
                    >Reviews</Link>
                </li>
                </ul>
            </div>
            <div>
                <p className="font-semibold text-[#93C5FD]">Account</p>
                <ul className="mt-3 space-y-2 text-white/85">
                <li>
                    <Link to="/login" className="transition-colors hover:text-[#3B82F6]"
                    >Login</Link>
                </li>
                <li>
                    <Link to="/signup" className="transition-colors hover:text-[#3B82F6]"
                    >Sign up</Link>
                </li>
                </ul>
            </div>
            </div>
        </div>
        <div className="border-t border-white/15 bg-[#172554]">
            <div
            className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-white/70 sm:px-6 sm:text-sm lg:px-8"
            >
            <p>© 2026 Fly To Heavens. All rights reserved.</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer