const ReviewCard = ({review}) => {
    const numbers = [1,2,3,4,5];

    return (
        <article
            className="flex h-full flex-col rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] p-5 shadow-sm sm:p-6"
            >
            <div
                className="mb-3 flex gap-0.5 text-lg leading-none"
                aria-label="Rating: 5 out of 5 stars"
            >
                {
                    numbers.map(num => {
                        return num <= review.rating ? <span key={num} className="text-amber-400" aria-hidden="true">★</span> : '';
                    })
                }
            </div>
            <p
                className="mb-4 flex-1 text-sm leading-relaxed text-[#111827] sm:text-base"
            >
                {review.review}
            </p>
            <p className="text-sm font-semibold text-[#1E3A8A] sm:text-base">
                {review.user?.name?.toUpperCase()}
            </p>
        </article>
    )
}

export default ReviewCard