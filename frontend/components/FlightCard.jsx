import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

const FlightCard = ({flight}) => {
    const hours = parseInt(flight.duration/60);
    const minutes = flight.duration - hours * 60;
    const [date, setDate] = useState(new Date(flight.dateAndTime));
    const time = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    const {user} = useOutletContext();

    return (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="relative">
            <img
                src={flight.photo}
                alt="Flight"
                className="h-40 w-full rounded-t-2xl object-cover"
            />
            <span className="absolute left-4 top-4 rounded-lg bg-blue-900/90 px-3 py-1 text-xs font-semibold text-white">
                Economy
            </span>
            </div>

            <div className="space-y-4 p-5">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-500">
                    Departure
                </p>
                <p className="truncate text-base font-semibold text-gray-900">{flight.departure}</p>
                </div>
                <div className="min-w-0 flex-1 text-right">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-500">
                    Arrival
                </p>
                <p className="truncate text-base font-semibold text-gray-900">{flight.arrival}</p>
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

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Price
                </p>
                <p className="mt-1 text-xl font-bold text-blue-900">${flight.price}</p>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2">
                {
                    user?.role === 'admin' ?
                    <Link
                    to={`/flights/update/${flight.slug}`}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-lg border-2 border-[#1E3A8A] bg-white px-4 py-2.5 text-sm font-semibold text-[#1E3A8A] transition-colors hover:bg-[#F9FAFB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
                    >
                    Update
                    </Link> :
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
    )
}

export default FlightCard