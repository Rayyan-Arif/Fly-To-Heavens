import { useEffect, useState } from "react"
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import sendErrorSuccessMessage from "../utils/sendErrorSuccessMessage";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user, setUser} = useOutletContext();
  const [emailSent, setEmailSent] = useState(false)
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const loginToWebsite = async () => {
    const res = await fetch(`${API_URL}/api/users/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await res.json();
    if(data.status === 'success'){
      setEmail('');
      setPassword('');
      sendErrorSuccessMessage('success','Logged In Successfully!');
      setUser(data.data.user);
      navigate('/');
    } else {
      sendErrorSuccessMessage('error',data.message);
    }
  }

  const forgotPassword = async() => {
    setEmailSent(true);
    setLoading(true);

    const res = await fetch(`${API_URL}/api/users/forgot-password`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    });

    const data = await res.json();
    if(data.status === 'success') sendErrorSuccessMessage('success', `An email has been sent to ${email} for resetting password`);
    else sendErrorSuccessMessage('error', data.message);

    setEmailSent(false);
    setLoading(false);
  }

  useEffect(() => {
    const handleStorage = (e) => {
      if(e.key === 'passwordResetDone' && e.newValue === "true"){
        localStorage.removeItem("passwordResetDone");
        window.close();
      }
    }

    window.addEventListener("storage", handleStorage);

    //this return runs only when component unmounts (removed from screen) or rerendered
    return () => window.removeEventListener("storage", handleStorage);
  },[]);

  return (
    <main className="mx-auto flex w-full max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <section className="grid w-full gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="order-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:order-1">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-500">Secure Access</p>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">Login to continue</h2>
          <p className="text-base leading-relaxed text-gray-500">
            Access your booking dashboard, reservations, and travel details in one place.
          </p>
        </div>

        <div className="order-1 lg:order-2 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <form 
          onSubmit={(e) => {
            e.preventDefault();
            loginToWebsite();
          }} 
          className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Login to your account</h3>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="login-email"
                name="email"
                type="email"
                value={email}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="login-password"
                name="password"
                type="password"
                value={password}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Enter password"
              />
              <div className="mt-2 text-left">
                <button
                  type="button"
                  onClick={forgotPassword}
                  disabled={loading}
                  className={`${loading ? 'cursor-not-allowed' : 'cursor-pointer'} text-sm font-medium text-blue-600 underline decoration-blue-600/30 underline-offset-2 transition-colors hover:text-blue-800 hover:decoration-blue-800`}
                >
                  {emailSent ? 'Processing...' : 'Forgot Password?'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`${loading ? 'cursor-not-allowed bg-gray-600' : 'cursor-pointer bg-[#1E3A8A] hover:bg-blue-700'} w-full rounded-lg px-4 py-3 text-md font-semibold text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200`}
            >
              Login
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default LoginPage