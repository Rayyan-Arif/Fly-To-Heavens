import { useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import sendErrorSuccessMessage from '../utils/sendErrorSuccessMessage'

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const {user, setUser} = useOutletContext();

  const resetPassword = async(e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`${API_URL}/api/users/reset-password/${token}`,{
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password,
        passwordConfirm
      })
    });

    const data = await res.json();

    if(data.status === 'success') {
      sendErrorSuccessMessage('success', 'Password changed successfully! Redirecting...');

      localStorage.setItem("passwordResetDone","true");

      setTimeout(() => {
        setUser(data.data?.user);
        setLoading(false);
        navigate('/');
      }, 3000);
    } else {
      sendErrorSuccessMessage('error', data.message);
    }
  }

  useEffect(() => {
    if(user){
      navigate('/');
      return;
    }
  },[]);

  return (
    <main className="mx-auto flex w-full max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <section className="grid w-full gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="order-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:order-1">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-500">Secure Access</p>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">Choose a new password</h2>
          <p className="text-base leading-relaxed text-gray-500">
            Reset your password to continue to Fly To Heavens
          </p>
        </div>

        <div className="order-1 lg:order-2 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <form className="space-y-4" onSubmit={resetPassword}>
            <h3 className="text-xl font-bold text-gray-900">Reset password</h3>

            <div>
              <label htmlFor="reset-password" className="mb-1 block text-sm font-medium text-gray-700"
                >Password</label
              >
              <input
                id="reset-password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
                autoComplete="new-password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="New password (min. 8 characters)"
              />
            </div>

            <div>
              <label htmlFor="reset-password-confirm" className="mb-1 block text-sm font-medium text-gray-700"
                >Confirm password</label
              >
              <input
                id="reset-password-confirm"
                name="passwordConfirm"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                minLength="8"
                autoComplete="new-password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Confirm new password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`${loading ? 'cursor-not-allowed bg-gray-600' : 'cursor-pointer bg-[#1E3A8A] hover:bg-blue-700'} w-full rounded-lg px-4 py-3 text-sm font-semibold text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200`}
            >
              Save new password
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default ResetPasswordPage