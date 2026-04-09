import defaultAvatar from "../assets/default.jpg"

const ReviewCard = ({ review }) => {
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
            <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
                <img
                    src={review.user?.photo || '../assets/default.jpg'}
                    alt=""
                    className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-blue-100 sm:h-9 sm:w-9"
                />
                <p className="min-w-0 truncate text-sm font-semibold text-[#1E3A8A] sm:text-base">
                    {review.user?.name?.toUpperCase() || 'Anonymous'}
                </p>
            </div>
        </article>
    )
}

export default ReviewCard