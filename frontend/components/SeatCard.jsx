import { useState } from "react"
import React from "react"

const SeatCard = ({seat, onSelect, isSelected}) => {
  // console.log(seat.rowNumber, isSelected);
  return (
    <label className="w-[4.5rem] cursor-pointer sm:w-24">
        <input 
          type="checkbox" 
          name="seat" 
          value="4D" 
          className="peer sr-only" 
          checked={isSelected}
          onChange={() => {onSelect(seat._id)}}
        />
        <span className={`flex h-full min-h-[6.75rem] flex-col items-center justify-center rounded-xl border-2 border-gray-200 bg-white p-2 text-center shadow-sm transition-all duration-150 peer-checked:border-[#1E3A8A] peer-checked:bg-blue-50 peer-checked:shadow-md peer-checked:ring-2 peer-checked:ring-[#3B82F6]/40 hover:border-[#3B82F6]/50 hover:shadow-md peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#3B82F6]`}>
            <span className="text-lg font-bold text-[#1E3A8A] sm:text-xl">{seat.rowNumber}{seat.seatColumn}</span>
            <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">{seat.isWindow ? 'Window' : 'No Window'}</span>
            <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-gray-400">{seat.status}</span>
        </span>
    </label>
  )
}

export default React.memo(SeatCard)