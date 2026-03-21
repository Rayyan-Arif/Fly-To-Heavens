import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
        <div>Hello from the flyers</div>
        <Outlet />
    </>
  )
}

export default MainLayout