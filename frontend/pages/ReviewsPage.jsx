import { useNavigate, useOutletContext } from 'react-router-dom'
import ReviewsSection from '../components/ReviewsSection'
import { useEffect } from 'react';

const ReviewsPage = () => {
  const {user} = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user){
      navigate('/login');
      return;
    }
  },[]);

  return (
    <section>
        <ReviewsSection isHome={false}/>
    </section>
  )
}

export default ReviewsPage