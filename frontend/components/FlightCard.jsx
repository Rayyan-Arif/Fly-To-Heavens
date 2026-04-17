import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import sendErrorSuccessMessage from "../utils/sendErrorSuccessMessage";

const FlightCard = ({flight}) => {
    //flight states
    const hours = parseInt(flight.duration/60);
    const minutes = flight.duration - hours * 60;
    const [date, setDate] = useState(new Date(flight.dateAndTime));
    const time = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    const {user} = useOutletContext();
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    //confirmation form states
    const [hidden, setHidden] = useState(true);
    const [isConfirmButton, setIsConfirmButton] = useState(false);
    const [password, setPassword] = useState('');

    const deleteFlight = async(e) => {
        e.preventDefault();
        setIsConfirmButton(true);

        const res = await fetch(`${API_URL}/api/flights/${flight.slug}`,{
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
            sendErrorSuccessMessage('success','Flight deleted succesfully! Redirecting....');

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
            {/* {confirmation form} */}
            <div
                className={`${hidden ? 'hidden' : ''} z-2 fixed inset-0 flex items-center justify-center bg-black/70 p-4`}
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
                        Remove Flight
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

                    <form className="mt-5 space-y-4" onSubmit={deleteFlight}>
                        <div>
                            <label htmlFor="close-password" className="mb-1 block text-sm font-medium text-gray-700"
                            >Password</label
                            >
                            <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
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


            {/* {flight card} */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                <div className="relative">
                <img
                    src={flight.photo}
                    alt="Flight"
                    className="h-40 w-full rounded-t-2xl object-cover"
                />
                <span className="absolute z-1 left-4 top-4 rounded-lg bg-blue-900/90 px-3 py-1 text-xs font-semibold text-white">
                    Economy
                </span>
                </div>

                <div className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-500">
                        Departure
                    </p>
                    <p className="truncate text-base font-semibold text-gray-900">{flight?.departure.slice(0,1).toUpperCase() + flight?.departure.slice(1)}</p>
                    </div>
                    <div className="min-w-0 flex-1 text-right">
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-500">
                        Arrival
                    </p>
                    <p className="truncate text-base font-semibold text-gray-900">{flight?.arrival.slice(0,1).toUpperCase() + flight?.arrival.slice(1)}</p>
                    </div>
                </div>

                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Date & time
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">{date.toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">{time}</p>
                    </div>
                    <div className="min-w-0 flex-1 text-right">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Duration
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">{`${hours}h ${minutes}m`}</p>
                    <p className="text-sm text-gray-600">{flight.stops.length ? `${flight.stops.length}-stops` : 'Non-Stop'}</p>
                    </div>
                </div>

                <div className="space-y-3 border-t border-gray-200 pt-4">
                    <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Price
                    </p>
                    <p className="mt-1 text-xl font-bold text-blue-900">Rs. {flight.price}</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                    {
                        user?.role === 'admin' ?
                        <>
                        <Link
                        to={`/flights/update/${flight.slug}`}
                        className="inline-flex min-h-[44px] items-center justify-center rounded-lg border-2 border-[#1E3A8A] bg-white px-4 py-2.5 text-sm font-semibold text-[#1E3A8A] transition-colors hover:bg-[#F9FAFB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
                        >
                        Update
                        </Link>
                        <button
                        type="button"
                        onClick={() => setHidden(false)}
                        className="cursor-pointer inline-flex min-h-[44px] items-center justify-center rounded-lg border-2 border-[#DC2626] bg-white px-4 py-2.5 text-sm font-semibold text-[#DC2626] transition-colors hover:bg-[#FEF2F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FCA5A5]"
                        >
                        Delete
                        </button>
                        </> :
                        ''
                    }
                    <Link
                    to={`/flights/${flight.slug}`}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#1E3A8A] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#172554] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
                    >
                    View
                    </Link>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default FlightCard