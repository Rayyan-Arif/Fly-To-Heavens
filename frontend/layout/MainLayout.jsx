import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/Scroller'

const MainLayout = () => {
  return (
    <>
        <Navbar />
        <ScrollToTop />
        <Outlet />
        <Footer />
    </>
  )
}

export default MainLayout