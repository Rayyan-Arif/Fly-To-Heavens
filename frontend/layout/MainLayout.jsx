import { Outlet, useNavigate, useRouteLoaderData } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/Scroller'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'

const MainLayout = () => {
  const res = useRouteLoaderData('root');
  const [user, setUser] = useState(res.status === 'success' ? res.data.user : null);

  return (
    <>
        <Navbar isLoggedIn={user ? true : false} user={user} setUser={setUser}/>
        <ScrollToTop />
        <Outlet context={{user, setUser}}/>
        <Footer />
        <ToastContainer />
    </>
  )
}

export default MainLayout