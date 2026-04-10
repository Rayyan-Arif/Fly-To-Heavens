import { useState } from "react";
import sendErrorSuccessMessage from '../utils/sendErrorSuccessMessage'
import { useNavigate } from "react-router-dom";

const UserCard = ({user}) => {
  const [hidden, setHidden] = useState(true);
  const [isConfirmButton, setIsConfirmButton] = useState(false);
  const [password, setPassword] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const deleteUser = async (e) => {
    e.preventDefault();
    setIsConfirmButton(true);

    const res = await fetch(`${API_URL}/api/users/${user._id}`,{
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            password
        })
    });

    if(res.status === 204){
        sendErrorSuccessMessage('success','User deleted succesfully! Redirecting....');

        setTimeout(() => {
            navigate(0);
            setHidden(true);
        }, 2000);
    }
    else if(res.status === 401){
        sendErrorSuccessMessage('error', 'Incorrect password!');
    } else {
        sendErrorSuccessMessage('error', 'Something went wrong! Try again later!');
    }

    setIsConfirmButton(false);
    setPassword('');
  }

  return (
    <>
      <div
        className={`${hidden ? 'hidden' : ''} z-1 fixed inset-0 flex items-center justify-center bg-black/70 p-4`}
        role="presentation"
        >
        <div
            className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-2xl sm:p-7"
            role="dialog"
            aria-labelledby="close-account-title"
            aria-describedby="close-account-warning"
        >
            <div className="flex items-start justify-between gap-3">
            <h1 id="close-account-title" className="text-xl font-bold text-gray-900">
                Delete User
            </h1>
            <button
                onClick={() => {setHidden(true)}}
                type="button"
                aria-label="Close"
                className="cursor-pointer -m-1 shrink-0 rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
                <span className="block text-2xl font-light leading-none" aria-hidden="true">
                &times;
                </span>
            </button>
            </div>

            <p
            id="close-account-warning"
            className="mt-3 text-sm leading-relaxed text-gray-600"
            >
            This action cannot be undone, please enter admin password to confirm.
            </p>

            <form className="mt-5 space-y-4" onSubmit={deleteUser}>
                <div>
                    <label htmlFor="close-password" className="mb-1 block text-sm font-medium text-gray-700"
                    >Password</label
                    >
                    <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="close-password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    placeholder="Admin password"
                    />
                </div>

                <button
                    type="submit"
                    className={`${isConfirmButton ? 'cursor-not-allowed bg-gray-600' : 'cursor-pointer bg-[#1E3A8A] hover:bg-blue-700'} w-full rounded-lg px-4 py-2.5 text-md font-semibold text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200`}
                >
                    {isConfirmButton ? 'Processing....' : 'Confirm'}
                </button>
            </form>
        </div>
    </div>


    <article
          className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={user?.photo}
                alt="User profile"
                className="h-14 w-14 rounded-full border-2 border-blue-100 object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-base font-bold text-gray-900">{user?.name}</p>
                <p className="truncate text-sm text-blue-700">{user?.email}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setHidden(false)}
              aria-label="Delete user"
              className="cursor-pointer inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition-colors hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18"></path>
                <path d="M8 6V4h8v2"></path>
                <path d="M19 6l-1 14H6L5 6"></path>
                <path d="M10 11v6"></path>
                <path d="M14 11v6"></path>
              </svg>
            </button>
          </div>

          <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Address
            </p>
            <p className="mt-1 text-sm leading-relaxed text-gray-700">
              {user?.address}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-blue-100 bg-white px-3 py-2">
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Age
                </p>
                <p className="text-sm font-semibold text-blue-900">{user?.age}</p>
              </div>
              <div className="rounded-lg border border-blue-100 bg-white px-3 py-2">
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Role
                </p>
                <p className="text-sm font-semibold capitalize text-blue-900">
                  {user?.role ?? "user"}
                </p>
              </div>
            </div>
          </div>
        </article>
      </>
    )
}

export default UserCard