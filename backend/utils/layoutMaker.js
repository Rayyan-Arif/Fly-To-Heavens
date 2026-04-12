const windowChecker = (seatsPerRow, seatColumn) => {
    if(seatColumn == 'A' || seatColumn == 'F') return true;
    else if(seatsPerRow == 3 && seatColumn == 'C') return true;
    else if(seatsPerRow == 4 && seatColumn == 'D') return true;
    return false;
}

const layoutMaker = (flightId, totalRows, seatsPerRow) => {
    const seatColumns = ['A','B','C','D','E','F'];
    const seats = [];

    for(let i=1 ; i<=totalRows ; i++){
        for(let j=1 ; j<=seatsPerRow ; j++){
            seats.push({
                flight: flightId,
                seatColumn: seatColumns[j-1],
                rowNumber: i,
                isWindow: windowChecker(seatsPerRow, seatColumns[j-1])
            });
        }
    }

    return seats;
}

module.exports = layoutMaker;