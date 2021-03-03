import {getField_LS} from '../helpers/LS.js';

const moveWithKeys = (posCell, field, sizeField, arrow) => {
  const row = posCell[0];
  const col = posCell[1];
  let countRow;
  let countCol;

  switch (arrow) {
    case 'up':
      countRow = sizeField - (sizeField - row);
      for (let i = countRow; 0 <= i; --i) {
        const pos = field[i === 0 ? 0 : i - 1][col];
        if (i >= 0 && pos !== 'X' && pos !== 'O') {
          return i === 0 ? [0, col] : [i - 1, col];
        } else {
          return i - 2 > 0 ? [i - 2, col] : posCell;
        }
      }
      break;
    case 'down':
      countRow = sizeField - (row + 1);
      for (let i = 0; i <= countRow; ++i) {
        const pos = field[row === sizeField - 1 ? row : row + 1][col];
        if (i <= sizeField - 1 && pos !== 'X' && pos !== 'O') {
          return row === sizeField - 1 ? [row, col] : [row + 1, col];
        } else {
          return row + 2 < sizeField ? [row + 2, col] : posCell;
        }
      }
      break;
    case 'left':
      countCol = sizeField - (sizeField - col);
      for (let i = countCol; 0 <= i; --i) {
        const pos = field[row][i - 1];
        if (i >= 0 && pos !== 'X' && pos !== 'O') {
          return i === 0 ? [row, 0] : [row, i - 1];
        } else {
          return i - 2 > 0 ? [row, i - 2] : posCell;
        }
      }
      break;
    case 'right':
      countCol = sizeField - (col + 1);
      for (let i = 0; i <= countCol; ++i) {
        const pos = field[row][col === sizeField - 1 ? col : col + 1];
        if (i <= sizeField - 1 && pos !== 'X' && pos !== 'O') {
          return col === sizeField - 1 ? [row, col] : [row, col + 1];
        } else {
          return col + 2 < sizeField ? [row, col + 2] : posCell;
        }
      }
      break;
    default:
      return posCell;
  }
};

const searchEmptyCells = () => {
  const field = getField_LS();
  const emptyCellArr = field.map((row, i) => {
    return row.map((el, j) => {
      return el === '' ? [i, j] : el;
    });
  });

  const emptyCell = emptyCellArr.flat().find((el) => Array.isArray(el));

  return Boolean(emptyCell) ? emptyCell : false;
};

export {moveWithKeys, searchEmptyCells};
