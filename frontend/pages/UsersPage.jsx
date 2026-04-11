import { useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom";
import UserCard from "../components/UserCard";

const UsersPage = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const {user} = useOutletContext();

    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if(!user){
            navigate('/login');
            return;
        }

        const fetchUsers = async () => {
            const res = await fetch(`${API_URL}/api/users/`,{
                method: 'GET',
                credentials: 'include'
            });

            const data = await res.json();

            if(data.status === 'success'){
                setUsers(data.data?.users);
            }
        }

        fetchUsers();
    },[]);

    return (
        <>
            <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
                <section
                    className="mb-8 rounded-2xl border border-blue-100 bg-[#1E3A8A] px-5 py-6 text-white shadow-sm sm:px-7 sm:py-7"
                >
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 sm:text-sm">
                    Admin
                    </p>
                    <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Users directory</h2>
                    <p className="mt-2 text-sm text-blue-100 sm:text-base">
                        View users and remove accounts if needed.
                    </p>
                </section>

                <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        users?.map((user, i) => {
                            return <UserCard key={i} user={user}/>
                        })
                    }
                </section>
            </main>
        </>
    )
}

export default UsersPage