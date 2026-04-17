const arr = [
  { row: 1, col: 'B' },
  { row: 1, col: 'D' },
  { row: 2, col: 'A' },
  { row: 1, col: 'C' },
];

arr.sort((a, b) => {
  if (a.row === b.row) {
    return a.col - b.col;
  }
  return a.row - b.row;
});

console.log(arr);