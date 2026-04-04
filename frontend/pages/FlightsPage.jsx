import { useState } from "react";
import { useEffect } from "react"
import FlightCard from "../components/FlightCard";
import sendErrorSuccessMessage from '../utils/sendErrorSuccessMessage';
import { useNavigate, useOutletContext } from "react-router-dom";

const FlightsPage = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [flights, setFlights] = useState([]);

    const {user, setUser} = useOutletContext();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!user){
            navigate('/login');
            return;
        }

        const fetchFlights = async() => {
            const res = await fetch(`${API_URL}/api/flights`, {
                credentials: 'include'
            });
            const data = await res.json();
            
            if(data.message?.includes('Please log in')){
                sendErrorSuccessMessage('error',data.message);
                setUser(null);
                return;
            }

            setFlights(data?.data?.flights);
        }

        fetchFlights();
    },[]);

    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Search results
            </h2>
            <p className="mt-2 text-sm text-gray-500 sm:text-base">
            View flight details and book flights by clicking on the 'view' button on the flight card.
            </p>
        </div>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {
                flights?.map(flight => {
                    return <FlightCard key={flight._id} flight={flight}/>
                })
            }
        </section>
        </main>
    )
}

export default FlightsPage