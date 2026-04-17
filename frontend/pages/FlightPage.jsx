import { useEffect, useState } from "react"
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import FlightNotFound from "../components/FlightNotFound";
import sendErrorSuccessMessage from "../utils/sendErrorSuccessMessage";

const FlightPage = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [date, setDate] = useState(new Date());
    const [flight, setFlight] = useState({});
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [time, setTime] = useState('');
    const { slug } = useParams();

    const {user, setUser} = useOutletContext();

    const navigate = useNavigate();

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

            if(data.message?.includes('Please log in')){
                sendErrorSuccessMessage('error',data.message);
                setUser(null);
                navigate('/login');
                return;
            }

            setFlight(data?.data?.flight);
            setDate(new Date(data?.data?.flight.dateAndTime));
            setHours(parseInt(data?.data?.flight.duration/60));
            setMinutes(data?.data?.flight.duration - parseInt(data?.data?.flight.duration/60) * 60);

            setTime(new Date(data?.data?.flight.dateAndTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            }));
        }

        fetchFlight();
    },[]);

    return (
        flight ?
        <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
            <div className="mb-6">
                <Link
                to="/flights"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm md:text-base font-medium text-gray-700 transition-colors hover:border-blue-400 hover:text-blue-800"
                >
                ← Back to flights
                </Link>
            </div>

            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <img
                src={flight.photo}
                alt="Flight image"
                style={{
                    width: '100%',
                    objectFit: "cover"
                }}
                className="h-56 w-full object-cover sm:h-72"
                />

                <div className="p-5 sm:p-7 lg:p-8">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-500">
                        Route
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                        {flight?.departure?.slice(0,1).toUpperCase() + flight?.departure?.slice(1)} → {flight?.arrival?.slice(0,1).toUpperCase() + flight?.arrival?.slice(1)}
                    </h2>
                    </div>
                    <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-700">
                        Price
                    </p>
                    <p className="mt-1 text-2xl font-bold text-blue-900">Rs. {flight.price}</p>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Departure
                    </p>
                    <p className="mt-1 text-base font-semibold text-gray-900">{flight?.departure?.slice(0,1).toUpperCase() + flight?.departure?.slice(1)}</p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Arrival
                    </p>
                    <p className="mt-1 text-base font-semibold text-gray-900">{flight?.arrival?.slice(0,1).toUpperCase() + flight?.arrival?.slice(1)}</p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Date & Time
                    </p>
                    <p className="mt-1 text-base font-semibold text-gray-900">{date.toLocaleDateString()}, {time}</p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Duration
                    </p>
                    <p className="mt-1 text-base font-semibold text-gray-900">{hours}h {minutes}m</p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Total rows
                    </p>
                    <p className="mt-1 text-base font-semibold text-gray-900">{flight.totalRows}</p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Seats per row
                    </p>
                    <p className="mt-1 text-base font-semibold text-gray-900">{flight.seatsPerRow}</p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Available Seats
                    </p>
                    <p className="mt-1 text-base font-semibold text-gray-900">{flight.availableSeats}</p>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">Stops</h3>
                    <p className="mt-1 text-sm text-gray-500">
                    Any stops for this flight appear below! 
                    </p>

                    { 
                        flight.stops?.length ? 
                        <ol className="mt-4 space-y-3">
                            {
                                flight.stops?.map(stop => {
                                    return <li key={stop} className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4">
                                                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-600"></span>
                                                <div>
                                                    <p className="text-sm md:test-base font-semibold text-gray-900">{stop?.slice(0,1).toUpperCase() + stop?.slice(1)}</p>
                                                    <p className="text-xs md:text-sm text-gray-500">Technical Stop</p>
                                                </div>
                                            </li>
                                })
                            }
                        </ol> :
                        <p className="md:text-base pt-4">→ This flight is non-stop!</p>
                    }

                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                    to={`/flights/bookings/${flight.slug}`}
                    className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[#1E3A8A] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#172554] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] sm:w-auto"
                    >
                    Book this flight
                    </Link>
                </div>
                </div>
            </section>
        </main> :
        <FlightNotFound />
    )
}

export default FlightPage