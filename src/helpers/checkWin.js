import {getSizeField_LS} from './LS';

const fieldsWin = {
  combinationsWin_3x3: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  combinationsWin_4x4: [
    [0, 1, 2, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
    [0, 5, 9, 13],
    [1, 6, 10, 14],
    [2, 7, 11, 15],
    [4, 8, 12, 16],
    [0, 6, 11, 16],
    [4, 7, 10, 13]
  ],
  combinationsWin_5x5: [
    [0, 1, 2, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25],
    [0, 6, 11, 16, 21],
    [1, 7, 12, 17, 22],
    [2, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [5, 10, 15, 20, 25],
    [5, 9, 13, 17, 21],
    [0, 7, 13, 19, 25]
  ]
};

const getStylesForWin = (indexCombination, size, widthField) => {
  const widthCol = Math.floor(100 / size);

  //vertical
  if (indexCombination < size) {
    const verticalPos = widthCol * indexCombination + widthCol / 2;

    return {
      top: `${verticalPos}%`,
      width: `${widthField}px`,
      height: '3px'
    };
    //horizontal
  } else if (indexCombination >= size && indexCombination < size * 2) {
    const horizontalPos = widthCol * (indexCombination - size) - widthCol;

    return {
      top: '50%',
      left: `${horizontalPos}%`,
      width: `${widthField}px`,
      height: '3px',
      transform: 'rotate(90deg)'
    };
    //diagonal
  } else if (indexCombination >= size * 2) {
    const diagonalPos = indexCombination - size * 2;
    const diagonalWidth = Math.sqrt(2) * widthField;
    const shiftLine = -((diagonalWidth - widthField) / 2);

    return {
      top: '50%',
      left: `${shiftLine}px`,
      width: `${diagonalWidth}px`,
      height: '3px',
      transform: diagonalPos ? 'rotate(-45deg)' : 'rotate(45deg)'
    };
  }
};

const getDataCheckGameState = (field, widthField) => {
  const size = getSizeField_LS();
  const newField = field.flat();
  let settingForWin = {isWin: false, player: '', styles: {}};

  fieldsWin[`combinationsWin_${size}x${size}`].forEach((combination, i) => {
    if (combination.every((x) => newField[x] === 'X')) {
      settingForWin = {
        isWin: true,
        player: 'X',
        styles: getStylesForWin(i, size, widthField)
      };
    }
    if (combination.every((x) => newField[x] === 'O')) {
      settingForWin = {
        isWin: true,
        player: 'O',
        styles: getStylesForWin(i, size, widthField)
      };
    }
  });

  return settingForWin;
};

export {getDataCheckGameState};
