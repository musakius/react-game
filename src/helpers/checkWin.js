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

const getStylesForWin = (indexCombination, size) => {
  const widthCol = Math.floor(100 / size);
  let styles = {};

  if (indexCombination < size) {
    styles = {
      transition: 'width 0.7s',
      top: `${widthCol * indexCombination + widthCol / 2}%`,
      height: '3px',
      width: '100%'
    };
  } else if (indexCombination >= size && indexCombination < size * 2) {
    styles = {
      transition: 'height 0.7s',
      left: `${widthCol * (indexCombination - size) + widthCol / 2}%`,
      height: '100%',
      width: '3px'
    };
  } else if (indexCombination >= size * 2) {
    if (indexCombination - size * 2) {
      styles = {
        transition: 'width 0.7s',
        top: `${widthCol + widthCol / 2}%`,
        height: '3px',
        width: `${Math.sqrt(2) * 500}px`,
        transform: 'rotate(-45deg)',
        left: '-104px'
      };
    }
    /* styles = {
      transition: 'width 0.7s',
      top: `${widthCol + widthCol / 2}%`,
      height: '3px',
      width: `${Math.sqrt(2) * 500}px`,
      transform: indexCombination - size * 2 ? 'rotate(-45deg)' : 'rotate(45deg)',
      left: '-104px'
    }; */
  }

  return styles;
};

const getDataCheckGameState = (field) => {
  const size = getSizeField_LS();
  const newField = field.flat();
  let settingForWin = {isWin: false, player: null, typeAnimate: null, styles: null};

  fieldsWin[`combinationsWin_${size}x${size}`].forEach((combination, i) => {
    if (combination.every((x) => newField[x] === 'X')) {
      settingForWin = {
        isWin: true,
        player: 'X',
        styles: getStylesForWin(i, size)
      };
    }
    if (combination.every((x) => newField[x] === 'O')) {
      settingForWin = {
        isWin: true,
        player: 'O',
        styles: getStylesForWin(i, size)
      };
    }
  });

  return settingForWin;
};

export {getDataCheckGameState};
