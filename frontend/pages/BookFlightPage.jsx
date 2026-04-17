import { useCallback, useState, useMemo } from "react";
import { useEffect } from "react"
import {Link, useNavigate, useOutletContext, useParams} from 'react-router-dom'
import RowCard from "../components/RowCard";

const BookFlightPage = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const { user } = useOutletContext();
    const { slug } = useParams();
    const navigate = useNavigate();

    //flight related states
    const [flight, setFlight] = useState(null);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seats, setSeats] = useState([]);

    //booking related states
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [passengers, setPassengers] = useState([]);

    const selectedSet = useMemo(() => {
        // console.log(selectedSeats);
        return new Set(selectedSeats);
    },[selectedSeats]);

    // console.log("selectedSeats:", selectedSeats);

    const selectSeats = useCallback((seatId) => {
        setSelectedSeats(prev => {
            if(prev.includes(seatId)){
                return prev.filter(id => id !== seatId);
            } else {
                return [...prev, seatId];
            }
        });
    },[]);

    const confirmPayment = (e) => {
        e.preventDefault();
        // console.log(selectedSeats);
    }

    useEffect(() => {
        if(!user){
            navigate('/login');
            return;
        }

        const fetchFlight = async () => {
            const res = await fetch(`${API_URL}/api/flights/${slug}`, {
                credentials: 'include'
            });
            const data = await res.json();

            setFlight(data?.data?.flight);
            setDate(new Date(data?.data?.flight.dateAndTime));
            setHours(parseInt(data?.data?.flight.duration/60));
            setMinutes(data?.data?.flight.duration - parseInt(data?.data?.flight.duration/60) * 60);

            setTime(new Date(data?.data?.flight.dateAndTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            }));

            let temp_seats = data?.data?.flight.seats;
            let temp_flight = data?.data?.flight;

            temp_seats.sort((a, b) => {
                if(a.rowNumber === b.rowNumber){
                    return a.seatColumn.localeCompare(b.seatColumn);
                }
                return a.rowNumber - b.rowNumber;
            });

            let layout = [];
            let count = 0;

            for(let i=0 ; i<temp_flight?.totalRows ; i++){
                layout.push(temp_seats.slice(count, count + temp_flight?.seatsPerRow));
                count += temp_flight?.seatsPerRow;
            }

            setSeats(layout);
        }

        fetchFlight();
    },[]);

    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="mb-6">
                <Link
                    to="/flights"
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm md:text-base font-medium text-gray-700 transition-colors hover:border-blue-400 hover:text-blue-800"
                >
                    ← Back to flights
                </Link>
            </div>
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            
            <div className="bg-gradient-to-r from-blue-900 via-[#1e3a8a] to-blue-900 px-5 py-7 text-white sm:px-8 sm:py-9">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 sm:text-sm">Reserve your seat</p>
                <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Complete your booking</h1>
                <p className="mt-2 max-w-2xl text-sm text-blue-100 sm:text-base">
                Review the flight below, then choose your seats. Tap a seat card to select it
                </p>
            </div>

            <div className="p-5 sm:p-7 lg:p-8">
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm ring-1 ring-gray-100">
                <div className="grid lg:grid-cols-12">
                    <div className="relative min-h-[14rem] h-full lg:col-span-5">
                    <img
                        src={flight?.photo}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 lg:bg-gradient-to-r lg:from-black/35 lg:via-transparent lg:to-transparent"></div>
                    <p className="absolute bottom-4 left-4 right-4 text-sm font-semibold tracking-wide text-white drop-shadow-md lg:bottom-auto lg:left-6 lg:right-auto lg:top-6 lg:text-xs lg:uppercase lg:tracking-widest lg:text-blue-100">
                        Your flight
                    </p>
                    </div>

                    <div className="flex flex-col border-t border-gray-100 bg-white p-5 sm:p-6 lg:col-span-7 lg:border-l lg:border-t-0 lg:p-8">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-widest text-blue-500">Route</p>
                        <h2 className="mt-1 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                            {flight?.departure.slice(0,1).toUpperCase() + flight?.departure.slice(1)} <span className="mx-1 text-blue-400" aria-hidden="true">→</span> {flight?.arrival.slice(0,1).toUpperCase() + flight?.arrival.slice(1)}
                        </h2>
                        </div>
                        <div className="shrink-0 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white px-4 py-3 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-widest text-blue-700">Price</p>
                        <p className="mt-1 text-2xl font-bold tabular-nums text-blue-900">Rs. {flight?.price}<span className="text-lg font-bold text-blue-800/90">.00</span></p>
                        <p className="mt-0.5 text-xs font-medium text-blue-700/80">per person</p>
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-blue-200/60 hover:bg-gray-50/80">
                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Departure</p>
                        <p className="mt-1.5 text-base font-semibold text-gray-900">{flight?.departure.slice(0,1).toUpperCase() + flight?.departure.slice(1)}</p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-blue-200/60 hover:bg-gray-50/80">
                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Arrival</p>
                        <p className="mt-1.5 text-base font-semibold text-gray-900">{flight?.arrival.slice(0,1).toUpperCase() + flight?.arrival.slice(1)}</p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-blue-200/60 hover:bg-gray-50/80">
                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Date &amp; time</p>
                        <p className="mt-1.5 text-base font-semibold text-gray-900">{date.toLocaleDateString()}</p>
                        <p className="mt-1 text-sm font-medium text-blue-800">{time}</p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-blue-200/60 hover:bg-gray-50/80">
                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Duration</p>
                        <p className="mt-1.5 text-base font-semibold text-gray-900">{hours}h {minutes}m</p>
                        <p className="mt-1 text-sm text-gray-500">Total time in the air</p>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-gray-100 pt-8">
                        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">Stops</h3>
                        <p className="mt-1 text-sm text-gray-500">Connections and layovers for this itinerary.</p>
                        <ol className="mt-4 space-y-3">
                        {
                            flight?.stops.map((stop, i) => {
                                return  <li key={i} className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm ring-1 ring-gray-100">
                                            <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" aria-hidden="true"></span>
                                            <div className="min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 sm:text-base">{stop.slice(0,1).toUpperCase() + stop.slice(1)}</p>
                                            </div>
                                        </li>
                            })
                        }
                        {
                            flight?.stops.length === 0 ? 
                            <p className="ml-4 text-sm font-semibold text-gray-900 sm:text-base">This flight is non-stop.</p>
                            :
                            ''
                        }
                        </ol>
                    </div>
                    </div>
                </div>
                </div>

                <div className="mt-10 border-t border-gray-200 pt-10">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                    <h2 className="text-xl font-bold text-[#1E3A8A] sm:text-2xl">Choose your seats</h2>
                    <p className="mt-1 text-sm text-gray-600">Layout: {Math.ceil(flight?.seatsPerRow / 2)} seats · aisle · {parseInt(flight?.seatsPerRow / 2)} seats. Click cards to toggle.</p>
                    </div>
                    <div className="rounded-lg bg-slate-100 px-4 py-2 text-center text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                    Front of aircraft
                    <span className="mt-1 block text-[10px] font-normal uppercase tracking-wider text-slate-400">← cockpit</span>
                    </div>
                </div>

                <div className="relative overflow-x-auto rounded-2xl border border-gray-200 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 p-4 sm:p-8">
                    <div className="pointer-events-none absolute inset-4 rounded-[2rem] border border-slate-200/80 sm:inset-6"></div>

                    <form className="relative mx-auto max-w-3xl space-y-3 sm:space-y-4" action="#" method="get">
                    
                        {
                            seats?.map((rowSeats, i) => {
                                return <RowCard selectedSet={selectedSet} onSelect={selectSeats} key={i} rowNumber={i+1} seatsPerRow={flight?.seatsPerRow} seats={rowSeats}/> 
                            })
                        }

                        <div className="mt-6 border-t border-gray-200 pt-6">
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold text-[#1E3A8A]">Tip:</span> use keyboard — focus a seat and press Space to toggle.
                            </p>
                        </div>
                    </form>
                </div>

                <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-[#1E3A8A] sm:text-2xl">Passenger details</h3>
                    </div>

                    <form method="post" onSubmit={confirmPayment}>

                        {
                            selectedSeats?.map((seat, i) => {
                                return <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
                                            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-500">Passenger {i+1}</p>
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                <div>
                                                    <label htmlFor={`passengerName${i+1}`} className="mb-1 block text-sm font-medium text-gray-700">Full name</label>
                                                    <input
                                                        id={`passengerName${i+1}`}
                                                        name={`passengerName${i+1}`}
                                                        type="text"
                                                        placeholder="e.g. Rayyan Arif"
                                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor={`passengerEmail${i+1}`} className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                                                    <input
                                                        id={`passengerEmail${i+1}`}
                                                        name={`passengerEmail${i+1}`}
                                                        type="email"
                                                        placeholder="e.g. rayyan@email.com"
                                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                            })
                        }

                        <div className="flex justify-end border-t border-gray-200 pt-6">
                            <button
                                type="submit"
                                className="cursor-pointer inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[#1E3A8A] px-8 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#172554] focus:outline-none focus:ring-2 focus:ring-blue-200 sm:w-auto"
                            >
                                Confirm Payment
                            </button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
            </section>
        </main>
    )
}

export default BookFlightPage