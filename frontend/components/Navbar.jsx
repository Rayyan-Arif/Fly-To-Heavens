import { Link, useOutletContext } from "react-router-dom"
import defaultAvatar from "../assets/default.jpg"
import sendErrorSuccessMessage from '../utils/sendErrorSuccessMessage'

const Navbar = ({isLoggedIn, user, setUser}) => {
  let username = user?.name;

  const logOutUser = async () => {
    const res = await fetch('http://localhost:5000/api/users/logout', {
      credentials: 'include'
    });

    const data = await res.json();
    if(data.status === 'success'){
      sendErrorSuccessMessage('success', 'Logged Out Successfully!'); 
      setUser(null);
    } else {
      sendErrorSuccessMessage('error', data.message);
    }
  }

  return (
    <header
        className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-[#1E3A8A] text-white shadow-sm"
      >
        <nav
          className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-4 lg:px-8"
          aria-label="Main"
        >
          <Link
            to="/"
            className="text-center text-base font-semibold leading-snug tracking-tight text-white transition-colors hover:text-[#3B82F6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] sm:text-left sm:text-lg md:text-3xl"
            >Fly To Heavens</Link>

          <div
            className="flex w-full items-center justify-center gap-2 sm:w-auto sm:justify-end sm:gap-3 md:gap-4"
          >
            {
              !isLoggedIn ? 
              <div
                className="flex w-full max-w-md items-stretch justify-center gap-2 sm:w-auto sm:max-w-none sm:items-center sm:gap-3 md:gap-4"
                data-nav="guest"
              >
                <Link
                  to="/login"
                  className="inline-flex min-h-[44px] flex-1 touch-manipulation items-center justify-center rounded-lg px-3 text-base font-medium leading-snug text-white/90 transition-colors hover:bg-white/10 hover:text-[#3B82F6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] sm:flex-none sm:px-4 sm:py-2 md:min-h-[48px] md:text-lg md:leading-snug"
                  >Login</Link>
                <Link
                  to="/signup"
                  className="inline-flex min-h-[44px] flex-1 touch-manipulation items-center justify-center whitespace-nowrap rounded-lg bg-[#3B82F6] px-4 py-2.5 text-base font-semibold leading-snug text-white shadow-sm transition-colors hover:bg-[#2563EB] active:bg-[#1D4ED8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#93C5FD] sm:w-auto sm:flex-none sm:px-5 md:min-h-[48px] md:px-6 md:text-lg md:leading-snug"
                  >Sign up</Link>
              </div> :

              <div
                className="flex w-full max-w-md items-stretch justify-center gap-2 sm:w-auto sm:max-w-none sm:items-center sm:gap-3 md:gap-4"
                data-nav="authenticated"
              >
                <Link
                  to="/me"
                  className="inline-flex min-h-[44px] flex-none touch-manipulation items-center gap-2 rounded-full px-2 text-white/90 transition-colors hover:bg-white/10 hover:text-[#3B82F6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] sm:px-3 sm:py-2 md:min-h-[48px]"
                  aria-label="Profile"
                >
                  <img
                    src={defaultAvatar}
                    alt="User profile"
                    className="h-9 w-9 rounded-full object-cover md:h-10 md:w-10"
                    />
                  <span className="hidden whitespace-nowrap text-md font-semibold sm:inline">
                    {username?.split(" ")[0]?.toUpperCase()}
                  </span>
                </Link>
                <Link
                  onClick={() => {logOutUser()}}
                  to="/"
                  className="inline-flex min-h-[44px] flex-1 touch-manipulation items-center justify-center whitespace-nowrap rounded-lg border border-white/30 bg-transparent px-4 py-2.5 text-base font-semibold leading-snug text-white transition-colors hover:border-[#3B82F6] hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#93C5FD] sm:w-auto sm:flex-none sm:px-5 md:min-h-[48px] md:px-6 md:text-lg md:leading-snug"
                  >Log out</Link>
              </div>
            }
          </div>
        </nav>
      </header>
  )
}

export default Navbar