const ReviewCard = () => {
  return (
    <article
        className="flex h-full flex-col rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] p-5 shadow-sm sm:p-6"
        >
        <div
            className="mb-3 flex gap-0.5 text-lg leading-none"
            aria-label="Rating: 5 out of 5 stars"
        >
            <span className="text-amber-400" aria-hidden="true">★</span
            ><span className="text-amber-400" aria-hidden="true">★</span
            ><span className="text-amber-400" aria-hidden="true">★</span
            ><span className="text-amber-400" aria-hidden="true">★</span
            ><span className="text-amber-400" aria-hidden="true">★</span>
        </div>
        <p
            className="mb-4 flex-1 text-sm leading-relaxed text-[#111827] sm:text-base"
        >
            “Search was fast and the seat map made choosing our row easy. We
            had our confirmation in minutes.”
        </p>
        <p className="text-sm font-semibold text-[#1E3A8A] sm:text-base">
            Maya Chen
        </p>
    </article>
  )
}

export default ReviewCard