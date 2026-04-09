import { useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom";
import sendErrorSuccessMessage from "../utils/sendErrorSuccessMessage";

const SignUpPage = () => {
  const {user, setUser} = useOutletContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const signUpUser = async () => {
    const res = await fetch(`${API_URL}/api/users/signup`,{
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password,
        passwordConfirm,
        age,
        address
      })
    });

    const data = await res.json();
    if(data.status === 'success'){
      sendErrorSuccessMessage('success', 'Sign up successfull!');
      setName('');
      setEmail('');
      setPassword('');
      setPasswordConfirm('');
      setAge(0);
      setAddress('');
      setUser(data.data.user);
      navigate('/');
    } else {
      sendErrorSuccessMessage('error', data.message);
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <section className="grid w-full gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="order-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:order-1">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-500">Get Started</p>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">Signup and start booking</h2>
          <p className="text-base leading-relaxed text-gray-500">
            Join us today and take control of your travel experience. Search flights, compare options, 
            reserve seats, and manage your trips all in one place. Fast, simple, and designed for your convenience.
          </p>
        </div>

        <div className="order-1 lg:order-2 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              signUpUser();
            }} 
            className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Create your account</h3>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
              <input
                value={name}
                onChange={(e) => {setName(e.target.value)}}
                id="signup-name"
                name="name"
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                id="signup-email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
              <input
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                id="signup-password"
                name="password"
                type="password"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Create password"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Age</label>
                <input
                  value={age}
                  onChange={(e) => {setAge(e.target.value)}}
                  id="signup-age"
                  name="age"
                  type="number"
                  min="1"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Age"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  value={passwordConfirm}
                  onChange={(e) => {setPasswordConfirm(e.target.value)}}
                  id="signup-password-confirm"
                  name="passwordConfirm"
                  type="password"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  placeholder="Repeat password"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Address</label>
              <input
                value={address}
                onChange={(e) => {setAddress(e.target.value)}}
                id="signup-address"
                name="address"
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Street, City, Country"
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full rounded-lg border border-blue-900 bg-[#1E3A8A] px-4 py-3 text-md font-semibold text-white transition-colors duration-300 hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              Create New Account
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default SignUpPage