import SeatCard from "./SeatCard"
import React from "react"

const layoutMaker = (seatsPerRow) => {
    if(seatsPerRow == 3){
        return {leftColumn: 2, rightColumn: 1};
    } else if(seatsPerRow == 4){
        return {leftColumn: 2, rightColumn: 2};
    } else if(seatsPerRow == 6){
        return {leftColumn: 3, rightColumn: 3};
    }
}

const RowCard = ({rowNumber, seatsPerRow, seats, onSelect, selectedSet}) => {
    // console.log(rowNumber);
    const layout = layoutMaker(seatsPerRow);

    const leftSeats = seats.slice(0, layout.leftColumn);
    const rightSeats = seats.slice(seatsPerRow - layout.rightColumn);

    return (
        <div className="flex items-stretch justify-center gap-2 sm:gap-3">
            <span className="flex w-7 shrink-0 items-center justify-center text-md font-bold text-slate-400 sm:w-8">{rowNumber}</span>
            {/* left column */}
            <div className="flex flex-1 justify-end gap-2 sm:gap-3">
                {
                    leftSeats?.map((seat, i) => {
                        return <SeatCard isSelected={selectedSet.has(seat._id)} key={i} seat={seat} onSelect={onSelect}/>
                    })
                }
            </div>

            {/* aisle */}
            <div className="flex w-6 shrink-0 flex-col items-center justify-center sm:w-10" aria-hidden="true">
                <div className="h-full w-1 rounded-full bg-slate-300/90"></div>
            </div>
            
            {/* right column */}
            <div className="flex flex-1 justify-start gap-2 sm:gap-3">
                {
                    rightSeats?.map((seat, i) => {
                        return <SeatCard isSelected={selectedSet.has(seat._id)} key={i} seat={seat} onSelect={onSelect}/>
                    })
                }
            </div>
            <span className="w-7 sm:w-8" aria-hidden="true"></span>
        </div>
    )
}

export default React.memo(RowCard)