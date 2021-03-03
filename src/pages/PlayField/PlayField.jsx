import React, {useState, useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import {getDataCheckGameState} from '../../helpers/checkGameState';
import {getOptionsForMoves} from '../../helpers/computer';
import ModalEndRound from '../../components/ModalEndRound';
import {moveWithKeys, searchEmptyCells} from '../../helpers/keyboardControl';
import {
  getField_LS,
  setField_LS,
  getSizeField_LS,
  getIsModeVsAI_LS,
  getStylesWin_LS,
  getEndRound_LS,
  getPlayerCurrentTurn_LS,
  setPlayerCurrentTurn_LS,
  setStylesWin_LS,
  setEndRound_LS,
  addDataForStatistics_LS
} from '../../helpers/LS';
import './PlayField.scss';

const PlayField = ({playSound, stopTimer, addCountMoves, autoplay, setWalksNow, walksNow}) => {
  const [field, setField] = useState([]);
  const [endRound, setEndRound] = useState(false);
  const [messageEndRound, setMessageEndRound] = useState('');
  const [stylesWin, setStylesWin] = useState({});
  const [sizeField, setSizeField] = useState(0);
  const [emptyCell, setEmptyCell] = useState([]);
  let timerComputer;

  useEffect(() => {
    setWalksNow(getPlayerCurrentTurn_LS());
    setField(getField_LS());
    setSizeField(getSizeField_LS());
    setStylesWin(getStylesWin_LS());
    setEndRound(getEndRound_LS());
  }, []);

  useEffect(() => {
    document.onkeydown = keyControl;
    document.addEventListener('keypress', keyControl);
    return () => {
      document.removeEventListener('keypress', keyControl);
    };
  }, [emptyCell]);

  useEffect(() => {
    if (autoplay) {
      const field = getField_LS();
      disabledAllElemField(field);
      addSymbolToField(field, 0, 0);
    }
  }, []);

  const keyControl = useCallback(
    (e) => {
      e.preventDefault();
      e = e || window.event;

      const resSearchEmptyCells = searchEmptyCells();

      const oneKeyControl = (direction) => {
        if (emptyCell.length) {
          setEmptyCell(moveWithKeys(emptyCell, field, sizeField, direction));
        } else {
          if (resSearchEmptyCells) setEmptyCell(resSearchEmptyCells);
        }
      };

      if (e.keyCode == '38') {
        oneKeyControl('up');
      } else if (e.keyCode == '40') {
        oneKeyControl('down');
      } else if (e.keyCode == '37') {
        oneKeyControl('left');
      } else if (e.keyCode == '39') {
        oneKeyControl('right');
      } else if (e.keyCode == '13') {
        addSymbolToField(field, emptyCell[0], emptyCell[1]);
        setEmptyCell(resSearchEmptyCells);
      } else if (e.keyCode == '27') {
        setEmptyCell([]);
      }
    },
    [emptyCell, field, sizeField]
  );

  const disabledAllElemField = (field) => {
    const disabledField = field.map((row) => row.map((el) => ` ${el} `));
    setField(disabledField);
    setField_LS(disabledField);
  };

  const addSymbolToField = (field, idRow, idCol) => {
    const currentTurn = getPlayerCurrentTurn_LS();
    const newField = field.map((row, i) => {
      return row.map((col, j) => {
        if (idRow === i && idCol === j) {
          return currentTurn.symbol;
        } else {
          return col;
        }
      });
    });

    if (currentTurn.symbol === 'X') {
      const name = getIsModeVsAI_LS() ? 'computer' : 'player';
      const nextPlayer = {name: name, symbol: 'O'};
      setPlayerCurrentTurn_LS(nextPlayer);
    } else {
      const nextPlayer = {name: 'player', symbol: 'X'};
      setPlayerCurrentTurn_LS(nextPlayer);
    }
    setWalksNow(currentTurn);
    setField(newField);
    setField_LS(newField);
    addCountMoves();

    const dataForMove = getOptionsForMoves(newField, getSizeField_LS(), getPlayerCurrentTurn_LS());

    // if tie
    if (!dataForMove) {
      setMessageEndRound('Tie!');
      setEndRound(true);
      disabledAllElemField(newField);
      stopTimer();
      addDataForStatistics_LS({name: 'Tie', symbol: '-'});
    }

    computerStroke(dataForMove, newField);

    const {isWin, styles} = getDataCheckGameState(newField, getSizeField_LS());

    // if win
    if (isWin) {
      clearTimeout(timerComputer);
      setMessageEndRound(`${currentTurn.name} ( ${currentTurn.symbol} ) wins!`);
      setEndRound(isWin);
      setEndRound_LS(isWin);
      setStylesWin(styles);
      setStylesWin_LS(styles);
      disabledAllElemField(newField);
      stopTimer();
      addDataForStatistics_LS(currentTurn);
    }

    playSound(currentTurn.symbol);
  };

  const computerStroke = (dataForMove, newField) => {
    if (getPlayerCurrentTurn_LS().name === 'computer' || autoplay) {
      if (dataForMove) {
        timerComputer = setTimeout(() => {
          addSymbolToField(newField, dataForMove.idRow, dataForMove.idCol);
        }, 400);
      }
    }
  };

  return (
    <main className="main">
      <div
        className="main__field"
        style={{width: `${sizeField * 100}px`, height: `${100 * sizeField}px`}}
      >
        {field.map((row, i) => {
          return (
            <div className="row" style={{height: `${100 / sizeField}%`}} key={i}>
              {row.map((el, j) => {
                return (
                  <button
                    className={`col ${Boolean(el) ? 'disabled' : ''} 
                    ${emptyCell[0] === i && emptyCell[1] === j ? 'active' : ''}`}
                    disabled={Boolean(el)}
                    style={{width: `${100 / sizeField}%`}}
                    key={j}
                    onClick={() => addSymbolToField(field, i, j)}
                  >
                    {el}
                  </button>
                );
              })}
            </div>
          );
        })}
        <div style={stylesWin} className="line-win">
          <div className={`progress ${endRound ? 'active' : ''}`}></div>
        </div>
        <ModalEndRound endRound={endRound} messageEndRound={messageEndRound} />
      </div>
    </main>
  );
};

const mapStateToProps = ({autoplay}) => {
  return {autoplay};
};

export default connect(mapStateToProps, null)(PlayField);
