import { useEffect } from "react";
import { useState } from "react"
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import sendErrorSuccessMessage from "../utils/sendErrorSuccessMessage";

const FlightForm = ({isCreated}) => {
    const { user } = useOutletContext();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState('');
    const [preview, setPreview] = useState('../assets/default.jpg');
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [time, setTime] = useState('');
    const [totalRows, setTotalRows] = useState('');
    const [seatsPerRow, setSeatsPerRow] = useState('');
    const [stops, setStops] = useState([]);

    const [tempStop, setTempStop] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;
    const { slug } = useParams();

    const handleStops = (index, value) => {
        let tempStops = [...stops];
        tempStops[index] = value;
        setStops([...tempStops]);
    }

    const createUpdateFlight = async(e) => {
        e.preventDefault();
        setLoading(true);
        const finalStops = [...stops, tempStop];

        const formData = new FormData();
        formData.append('photo',photo);
        formData.append('departure',departure);
        formData.append('arrival',arrival);
        formData.append('duration',duration);
        formData.append('price',price);
        formData.append('totalRows', totalRows);
        formData.append('seatsPerRow', seatsPerRow);
        formData.append('dateAndTime',new Date(`${date}T${time}`));
        
        finalStops?.forEach(stop => {
            formData.append("stops",stop);
        });

        let url = `${API_URL}/api/flights/`;
        if(!isCreated){
            url += `update-flight/${slug}`;
        }

        const res = await fetch(url,{
            method: `${isCreated ? 'POST' : 'PATCH'}`,
            credentials: 'include',
            body: formData
        });

        const data = await res.json();

        if(data.status === 'success'){
            sendErrorSuccessMessage('success', `Flight has been ${isCreated ? 'created' : 'updated'} succesfully!`);

            setTimeout(() => {
                navigate(0);
            },2000);
        }
        else sendErrorSuccessMessage('error', data.message);
    }

    const showPhoto = (e) => {
        setPhoto(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
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

            if(data.status === 'error'){
                sendErrorSuccessMessage('error',data.message);
                return;
            }

            let temp = data?.data?.flight || {};

            const date = new Date(temp.dateAndTime);

            const formattedDate =
            date.getFullYear() +
            "-" +
            String(date.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(date.getDate()).padStart(2, "0");

            const formattedTime =
            String(date.getHours()).padStart(2, "0") +
            ":" +
            String(date.getMinutes()).padStart(2, "0");

            setDeparture(temp.departure);
            setArrival(temp.arrival);
            setPrice(temp.price);
            setDuration(temp.duration);
            setTotalRows(temp.totalRows);
            setSeatsPerRow(
                temp.seatsPerRow != null && temp.seatsPerRow !== ''
                    ? String(temp.seatsPerRow)
                    : ''
            );
            setStops(temp.stops);
            setDate(formattedDate);
            setTime(formattedTime);
            setPreview(temp.photo);
        }

        if(!isCreated) fetchFlight();
    },[]);

    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="bg-blue-900 px-5 py-6 text-white sm:px-8 sm:py-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 sm:text-sm">
                Admin
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{isCreated ? 'Create' : 'Update'} a new flight</h2>
            <p className="mt-2 text-sm text-blue-100 sm:text-base">
                Fill all required details and {isCreated ? 'create' : 'update'} a flight.
            </p>
            </div>

            <form className="p-5 sm:p-8" 
                onSubmit={createUpdateFlight}
            >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
                    <label className="mb-2 block text-md font-semibold text-blue-900">
                    Upload Flight Cover Image
                    </label>
                    <img
                    src={preview}
                    alt="Flight preview"
                    className="mb-4 h-44 w-full rounded-lg border border-gray-200 object-cover"
                    />
                    <input
                    onChange={showPhoto}
                    type="file"
                    name="photo"
                    accept="image/*"
                    className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
                </div>

                <div className="lg:col-span-2">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                    <label htmlFor="departure" className="mb-1 block text-md font-medium text-gray-700">
                        Departure
                    </label>
                    <input
                        value={departure}
                        onChange={e => setDeparture(e.target.value)}
                        id="departure"
                        name="departure"
                        type="text"
                        required
                        placeholder="e.g., Lahore"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                    </div>

                    <div>
                    <label htmlFor="arrival" className="mb-1 block text-md font-medium text-gray-700">
                        Arrival
                    </label>
                    <input
                        value={arrival}
                        onChange={e => setArrival(e.target.value)}
                        id="arrival"
                        name="arrival"
                        type="text"
                        required
                        placeholder="e.g., Istanbul"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                    </div>

                    <div>
                    <label htmlFor="duration" className="mb-1 block text-md font-medium text-gray-700">
                        Duration (minutes)
                    </label>
                    <input
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                        id="duration"
                        name="duration"
                        type="number"
                        min="0"
                        required
                        placeholder="e.g., 180"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                    </div>

                    <div>
                    <label htmlFor="price" className="mb-1 block text-md font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        required
                        placeholder="e.g., 199.99"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                    </div>

                    <div>
                    <label htmlFor="date" className="mb-1 block text-md font-medium text-gray-700">
                        Date
                    </label>
                    <input
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        id="date"
                        name="date" 
                        type="date"
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                    </div>

                    <div>
                    <label htmlFor="time" className="mb-1 block text-md font-medium text-gray-700">
                        Time
                    </label>
                    <input
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        id="time"
                        name="time"
                        type="time"
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                    </div>

                    <div>
                    <label htmlFor="totalRows" className="mb-1 block text-md font-medium text-gray-700">
                        Total rows
                    </label>
                    <input
                        value={totalRows}
                        onChange={e => setTotalRows(e.target.value)}
                        id="totalRows"
                        name="totalRows"
                        type="number"
                        min="1"
                        max="50"
                        required
                        placeholder="e.g., 10"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                    </div>

                    <div>
                    <label htmlFor="seatsPerRow" className="mb-1 block text-md font-medium text-gray-700">
                        Seats per row
                    </label>
                    <select
                        value={seatsPerRow}
                        onChange={(e) => setSeatsPerRow(Number(e.target.value[0]))}
                        id="seatsPerRow"
                        name="seatsPerRow"
                        required
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    >
                        <option value="" disabled>
                            Select layout
                        </option>
                        <option value="3">3 seats per row</option>
                        <option value="4">4 seats per row</option>
                        <option value="6">6 seats per row</option>
                    </select>
                    </div>
                </div>

                <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
                    <p className="mb-3 text-md font-semibold text-blue-900">
                    Stops (array of cities)
                    </p>
                    <p className="mb-3 text-base text-gray-500">
                    Press Enter to add a new stop:
                    </p>
                    <div className="space-y-3">
                    {
                        stops.length != 0 ?
                        stops.map((stop, i) => {
                            return <input
                                key={i}
                                onKeyDown={(e) => {
                                        if(e.key === 'Enter'){
                                            e.preventDefault(); 
                                        }
                                    }
                                }
                                value={stop}
                                onChange={(e) => handleStops(i, e.target.value)}
                                type="text"
                                name="stops[]"
                                placeholder={`Stop ${i+1} city`}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            />
                        })
                        :
                        ''
                    }
                    <input
                        value={tempStop}
                        onChange={e => setTempStop(e.target.value)}
                        onKeyDown={(e) => {
                                if(e.key === 'Enter'){
                                    e.preventDefault(); 
                                    setTempStop('');
                                    setStops([...stops, e.target.value])
                                }
                            }
                        }
                        type="text"
                        name="stops[]"
                        placeholder={`Stop ${stops.length+1} city`}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                    </div>
                </div>
                </div>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
                <button
                type="submit"
                disabled={loading}
                className={`${loading ? 'cursor-not-allowed bg-gray-300' : 'bg-[#1E3A8A] cursor-pointer hover:bg-[#172554]'} inline-flex min-h-[48px] items-center justify-center rounded-lg px-8 py-3 text-base font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200`}
                >
                {loading ? 'Processing...' : `${isCreated ? 'Create' : 'Update'} Flight`}
                </button>
            </div>
            </form>
        </section>
        </main>
    )
}

export default FlightForm