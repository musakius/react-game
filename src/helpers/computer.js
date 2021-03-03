const fieldsWin = {
  lineWin_3x3: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  lineWin_4x4: [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12]
  ],
  lineWin_5x5: [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20]
  ]
};

const ownSortNum = (a, b) => a[0] - b[0];

const randomIndex = (maxIndex) => Math.floor(Math.random() * maxIndex);

const getSuitableCell = (arr, size, fieldFlat) => {
  let line;

  arr = arr.sort(ownSortNum);
  if (arr.every((el) => el[0] === 0)) {
    line = arr[randomIndex(arr.length - 1)];
  } else {
    line = arr[arr.length - 1];
  }

  const row = fieldsWin[`lineWin_${size}x${size}`][line[1]];
  let indexRow = 0;
  let indexCol = row.find((index) => fieldFlat[index] === '');

  while (indexCol >= size) {
    indexRow++;
    indexCol -= size;
  }

  return {idRow: indexRow, idCol: indexCol};
};

const getOptionsForMoves = (field, size, currentPlayer) => {
  /* console.log(currentPlayer.symbol); */
  const symbol = currentPlayer.symbol;
  const fieldFlat = field.flat();
  let suitableLinesWin = [];
  let additionalListLine = [];

  fieldsWin[`lineWin_${size}x${size}`].forEach((combination, i) => {
    if (combination.every((x) => fieldFlat[x] === 'O' || fieldFlat[x] === '')) {
      let counter = 0;
      combination.forEach((index) => {
        if (fieldFlat[index] === 'O') counter++;
      });
      suitableLinesWin.push([counter, i]);
    } else if (combination.some((x) => fieldFlat[x] === '')) {
      additionalListLine.push([0, i]);
    }
  });

  if (suitableLinesWin.length) {
    return getSuitableCell(suitableLinesWin, size, fieldFlat);
  } else if (!suitableLinesWin.length && additionalListLine.length) {
    return getSuitableCell(additionalListLine, size, fieldFlat);
  } else {
    return false;
  }
};

export {getOptionsForMoves};
