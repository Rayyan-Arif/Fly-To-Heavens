import ReviewCard from "./ReviewCard"

const ReviewsSection = ({isHome}) => {
  return (
    <section
        id="reviews-track"
        className={`grid min-w-0 flex-1 grid-cols-1 gap-4 md:grid-cols-${isHome ? '3' : '1'}`}
    >
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
    </section>
  )
}

export default ReviewsSection