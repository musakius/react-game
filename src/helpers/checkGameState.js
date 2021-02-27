import {getModeVsAI_LS} from './LS';

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
  combinationsWin_5x5: [
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

const getStylesForWin = (indexCombination, size, fieldLength) => {
  const widthCol = Math.floor(100 / size);

  //horizontal
  if (indexCombination < size) {
    const horizontalPos = widthCol * indexCombination + widthCol / 2;
    return {
      top: `${horizontalPos}%`,
      width: `${fieldLength}px`,
      height: '3px'
    };
    //vertical
  } else if (indexCombination >= size && indexCombination < size * 2) {
    const centerPos = 50;
    const verticalPos = widthCol * (indexCombination - size) + widthCol / 2 - centerPos;

    return {
      top: `${centerPos}%`,
      left: `${verticalPos}%`,
      width: `${fieldLength}px`,
      height: '3px',
      transform: 'rotate(90deg)'
    };
    //diagonal
  } else if (indexCombination >= size * 2) {
    const diagonalPos = indexCombination - size * 2;
    const diagonalWidth = Math.sqrt(2) * fieldLength;
    const shiftLine = -((diagonalWidth - fieldLength) / 2);

    return {
      top: '50%',
      left: `${shiftLine}px`,
      width: `${diagonalWidth}px`,
      height: '3px',
      transform: diagonalPos ? 'rotate(-45deg)' : 'rotate(45deg)'
    };
  }
};

const getDataCheckGameState = (field, size) => {
  const fieldLength = size * 100;
  const newField = field.flat();
  let settingForWin = {isWin: false, player: '', styles: {}};

  fieldsWin[`combinationsWin_${size}x${size}`].forEach((combination, i) => {
    if (combination.every((x) => newField[x] === 'X')) {
      settingForWin = {
        isWin: true,
        player: 'player (X)',
        styles: getStylesForWin(i, size, fieldLength)
      };
    }
    if (combination.every((x) => newField[x] === 'O')) {
      settingForWin = {
        isWin: true,
        player: getModeVsAI_LS() ? 'computer (O)' : 'player (O)',
        styles: getStylesForWin(i, size, fieldLength)
      };
    }
  });

  return settingForWin;
};

export {getDataCheckGameState};
