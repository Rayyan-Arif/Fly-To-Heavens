import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import MainLayout from '../layout/MainLayout';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import ReviewsPage from '../pages/ReviewsPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import getUserLoader from '../utils/getUserLoader';
import FlightsPage from '../pages/FlightsPage';
import FlightPage from '../pages/FlightPage';
import ProfilePage from '../pages/ProfilePage';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />} id='root' loader={getUserLoader}>
        <Route index element={<HomePage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/signup' element={<SignUpPage />}/>
        <Route path='/reviews' element={<ReviewsPage />}/>
        <Route path='/flights' element={<FlightsPage />}/>
        <Route path='/flights/:slug' element={<FlightPage />}/> 
        <Route path='/me' element={<ProfilePage />}/>
        <Route path='*' element={<NotFoundPage />}/>
      </Route>
    )
  );

  return <RouterProvider router={router}/>
}

export default App