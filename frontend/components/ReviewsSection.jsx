import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { useNavigate, useOutletContext } from "react-router-dom";
import sendErrorSuccessMessage from '../utils/sendErrorSuccessMessage';

const ReviewsSection = ({isHome}) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState('');
  
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const {user, setUser} = useOutletContext();
  let username = user?.name;
  if(username) username = username.split(' ').map(name => name.slice(0,1).toUpperCase() + name.slice(1)).join(' ');

  const submitReview = async() => {
    const res = await fetch(`${API_URL}/api/reviews`,{
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        review: review,
        rating: rating,
        user: user._id
      })
    });

    const data = await res.json();
    if(data.status === 'error'){
      sendErrorSuccessMessage('error', data.message);
    }
    const newReview = {...data.data.review, user};

    setReviews([...reviews, newReview]);
  }

  const clearForm = () => {
    setReview('');
    setRating(1);
  }

  useEffect(() => {
    const getReviews = async() => {
      const res = await fetch(`${API_URL}/api/reviews`);
      const data = await res.json();

      setReviews(data.data.reviews);
    }

    getReviews();
  },[]);

  return (
    <>
    {
      reviews.length !== 0 ?
      <section
          id="reviews-track"
          className={`grid min-w-0 flex-1 grid-cols-1 gap-4 ${isHome ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}
      >
        {
          reviews.map((ind_review, index) => {
            return isHome && index>2 ? '' : <ReviewCard key={ind_review._id} review={ind_review}/>
          })
        }
          
      </section> :
      <span className="text-base md:text-xl p-6">No reviews yet! Be the first to give us a review...</span>
    }

    {
      isHome === false ? 
      <article className="flex h-full flex-col rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] p-5 shadow-sm sm:p-6">
        <h3 className="mb-3 md:text-3xl text-lg font-semibold text-[#111827]">
          Create a review
        </h3>
        <p className="mb-4 md:text-lg text-sm text-[#6B7280]">
          This review will be submitted by {username}.
        </p>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            submitReview();
            clearForm();
          }} 
          className="flex h-full flex-col gap-4">
            <label className="md:text-lg text-sm font-semibold text-[#111827]">
              Review text
              <textarea
                onChange={(e) => {setReview(e.target.value)}}
                value={review}
                placeholder="Share your travel experience..."
                className="md:text-lg mt-1 min-h-[110px] w-full rounded-lg border border-[#D1D5DB] px-3 py-2 text-sm text-[#111827] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#BFDBFE]"
                required
              />
            </label>

            <label className="md:text-lg text-sm font-semibold text-[#111827]">
              Rating
              <select
                onChange={(e) => {setRating(e.target.value)}}
                value={rating}
                className="md:text-lg mt-1 w-full rounded-lg border border-[#D1D5DB] bg-[#FFFFFF] px-3 py-2 text-sm text-[#111827] outline-none transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#BFDBFE]"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>

            <button
              type="submit"
              className="cursor-pointer mt-auto inline-flex min-h-[44px] touch-manipulation items-center justify-center rounded-lg bg-[#1E3A8A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#172554] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]"
            >
              Submit review
            </button>
        </form>
      </article> :
      ''
    }
    </>
  )
}

export default ReviewsSection