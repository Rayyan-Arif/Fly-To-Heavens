import { useState, useEffect } from "react"
import { useOutletContext, Link, useNavigate } from "react-router-dom"
import sendErrorSuccessMessage from '../utils/sendErrorSuccessMessage'

const ProfilePage = () => {
    const { user } = useOutletContext()
    const [isFieldChanged, setIsFieldChanged] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [age, setAge] = useState(user?.age || 0);
    const [address, setAddress] = useState(user?.address || '');
    const [photo, setPhoto] = useState(user?.photo || '');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const updateUserData = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('age', age);
        formData.append('address', address);
        formData.append('photo', photo);

        const res = await fetch(`${API_URL}/api/users/update-me`,{
            method: 'PATCH',
            credentials: 'include',
            body: formData
        });

        if(res.status == 401) sendErrorSuccessMessage('error', 'Please log in before this operation!');
        if(res.status == 200) {
            sendErrorSuccessMessage('success', 'Changes saved! Reloading....');
            setIsFieldChanged(false);
            setTimeout(() => {navigate(0)}, 3000);
        }
    }

    useEffect(() => {
        if(!user){
            navigate('/login');
            return;
        }
    },[])

    return (
        <section
        className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 lg:flex-row lg:px-8 lg:py-10"
        >
        <aside
            className="w-full shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white text-gray-900 shadow-lg lg:w-80"
            aria-label="Dashboard navigation"
        >
            <div className="border-b border-gray-200 bg-gray-50 px-5 py-5 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 sm:text-sm">
                Dashboard
            </p>
            <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">Menu</h2>
            </div>

            <div className="space-y-8 px-5 py-6 sm:px-6">
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 sm:text-sm">
                    User options
                    </h3>
                    <nav className="mt-3 space-y-3">
                    <Link
                        to="/me/bookings"
                        className="flex w-full items-center justify-center rounded-lg bg-[#1E3A8A] px-4 py-3 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#172554] sm:text-lg"
                    >
                        View bookings
                    </Link>
                    </nav>
                </div>

                {
                    user?.role === 'admin' ?
                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 sm:text-sm">
                        Admin options
                        </h3>
                        <nav className="mt-4 space-y-3">
                        <Link
                            to="/admin/create-flight"
                            className="flex w-full items-center justify-center rounded-lg bg-[#1E3A8A] px-4 py-3 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#172554] sm:text-lg"
                        >
                            Create flight
                        </Link>
                        <Link
                            to="/flights"
                            className="flex w-full items-center justify-center rounded-lg bg-[#1E3A8A] px-4 py-3 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#172554] sm:text-lg"
                        >
                            Update flights
                        </Link>
                        <Link
                            to="/admin/manage-users"
                            className="flex w-full items-center justify-center rounded-lg bg-[#1E3A8A] px-4 py-3 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#172554] sm:text-lg"
                        >
                            Manage users
                        </Link>
                        <Link
                            to="/admin/manage-bookings"
                            className="flex w-full items-center justify-center rounded-lg bg-[#1E3A8A] px-4 py-3 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#172554] sm:text-lg"
                        >
                            Manage bookings
                        </Link>
                        </nav>
                    </div> : 
                    ''
                }
            </div>
        </aside>

        <main className="min-w-0 flex-1">
            <section className="overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-lg">
            <div
                className="bg-[#1E3A8A] px-5 py-6 text-white sm:px-8 sm:py-8"
            >
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 sm:text-sm">
                Your account
                </p>
                <h2 className="mt-2 text-2xl font-bold sm:text-3xl lg:text-4xl">Profile</h2>
            </div>

            <form className="space-y-8 bg-gray-50 p-5 sm:p-8" 
                onSubmit={
                (e) => {
                    e.preventDefault();
                    updateUserData();
                }}>

                <div
                className="flex flex-col gap-6 rounded-xl border border-indigo-100 bg-white p-5 shadow-sm sm:flex-row sm:items-start sm:p-6"
                >
                <div className="flex flex-shrink-0 flex-col items-start gap-3">
                    <p className="mb-0 text-xs font-semibold uppercase tracking-widest text-blue-600 sm:text-sm">
                    Profile photo
                    </p>
                    <img
                    src={user?.photo}
                    alt=""
                    className="h-28 w-28 rounded-full border-4 border-blue-500 object-cover shadow-md ring-4 ring-blue-100 sm:h-32 sm:w-32"
                    />
                    <label className="cursor-pointer">
                    <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => {
                            setIsFieldChanged(true);
                            setPhoto(e.target.files[0]);
                        }}
                    />
                    <span
                        className="inline-flex min-h-10 items-center justify-center rounded-lg border-2 border-blue-900 bg-white px-4 py-2 text-sm font-semibold text-blue-900 shadow-sm transition-colors hover:bg-gray-50 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-500"
                    >
                        Change photo
                    </span>
                    </label>
                </div>
                <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                    <label
                        className="mb-1 block text-sm font-semibold text-blue-900 sm:text-base"
                    >
                        Name
                    </label>
                    <input
                        value={name}
                        onChange={(e) => {
                            setIsFieldChanged(true);
                            setName(e.target.value);
                        }}
                        id="pd-name"
                        name="name"
                        type="text"
                        className="w-full rounded-lg border border-blue-200 bg-white px-4 py-3 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    </div>

                    <div className="sm:col-span-2">
                    <label
                        className="mb-1 block text-sm font-semibold text-blue-900 sm:text-base"
                    >
                        Email
                    </label>
                    <input
                        value={email}
                        onChange={(e) => {
                            setIsFieldChanged(true);
                            setEmail(e.target.value);
                        }}
                        id="pd-email"
                        name="email"
                        type="email"
                        className="w-full rounded-lg border border-blue-200 bg-white px-4 py-3 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    </div>

                    <div className="sm:col-span-2">
                    <label
                        className="mb-1 block text-sm font-semibold text-blue-900 sm:text-base"
                    >
                        Current Password
                    </label>
                    <input
                        id="pd-current-password"
                        name="current-password"
                        type="password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-base text-gray-600"
                    />
                    </div>

                    <div className="sm:col-span-2">
                    <label
                        className="mb-1 block text-sm font-semibold text-blue-900 sm:text-base"
                    >
                        Change Password
                    </label>
                    <input
                        id="pd-password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-base text-gray-600"
                    />
                    </div>

                    <div className="sm:col-span-2">
                    <label
                        className="mb-1 block text-sm font-semibold text-blue-900 sm:text-base"
                    >
                        Confirm New Password
                    </label>
                    <input
                        id="pd-password-confirm"
                        name="password-confirm"
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => {setPasswordConfirm(e.target.value)}}
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-base text-gray-600"
                    />
                    <button
                        type="button"
                        className="mt-4 inline-flex min-h-12 cursor-pointer items-center justify-center rounded-lg bg-[#1E3A8A] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#172554] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                    >
                        Reset password
                    </button>
                    </div>

                    <div>
                    <label
                        className="mb-1 block text-sm font-semibold text-blue-900 sm:text-base"
                    >
                        Age
                    </label>
                    <input
                        value={age}
                        onChange={(e) => {
                            setIsFieldChanged(true);
                            setAge(e.target.value);
                        }}
                        id="pd-age"
                        name="age"
                        type="number"
                        min="18"
                        className="w-full rounded-lg border border-blue-200 bg-white px-4 py-3 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    </div>

                    <div className="sm:col-span-2">
                    <label
                        className="mb-1 block text-sm font-semibold text-blue-900 sm:text-base"
                    >
                        Address
                    </label>
                    <input
                        value={address}
                        onChange={(e) => {
                            setIsFieldChanged(true);
                            setAddress(e.target.value);
                        }}
                        id="pd-address"
                        name="address"
                        type="text"
                        className="w-full rounded-lg border border-blue-200 bg-white px-4 py-3 text-base text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    </div>
                </div>
                </div>

                <div
                className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-white px-5 py-6 sm:px-6"
                >
                <button
                    type="submit"
                    disabled={!isFieldChanged}
                    className={`inline-flex min-h-12 ${isFieldChanged ? 'bg-[#1E3A8A] text-white cursor-pointer hover:bg-[#172554]' : 'cursor-not-allowed bg-gray-300 text-gray-500'} items-center justify-center rounded-lg px-8 py-3 text-base font-semibold`}
                >
                    Save changes
                </button>
                </div>
            </form>
            </section>
        </main>
        </section>
    )
}

export default ProfilePage