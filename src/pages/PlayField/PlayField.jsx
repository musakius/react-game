import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {setPlayerCurrentTurn} from '../../redux/actions';
import {getDataCheckGameState} from '../../helpers/checkGameState';
import {
  getField_LS,
  setField_LS,
  getIsAudioApp_LS,
  getSizeField_LS,
  getPlayerCurrentTurn_LS,
  setPlayerCurrentTurn_LS,
  addDataForStatistics_LS
} from '../../helpers/LS';
import './PlayField.scss';

const PlayField = ({sound_X, sound_O, setPlayerCurrentTurn, stopTimer, addCountMoves}) => {
  const [field, setField] = useState([]);
  const [playerWin, setPlayerWin] = useState('');
  const [isWin, setIsWin] = useState(false);
  const [stylesForLineWin, setStylesForLineWin] = useState({});
  const [sizeField, setSizeField] = useState(0);

  useEffect(() => {
    setPlayerCurrentTurn(getPlayerCurrentTurn_LS());
    setField(getField_LS());
    setSizeField(getSizeField_LS());
  }, []);

  const disabledAllElemField = (field) => {
    const disabledField = field.map((row) => row.map((el) => ` ${el} `));
    setField(disabledField);
    setField_LS(disabledField);
  };

  const addSymbolToField = (idRow, idCol) => {
    const currentTurn = getPlayerCurrentTurn_LS();

    const newField = field.map((row, i) => {
      return row.map((col, j) => {
        if (idRow === i && idCol === j) {
          return currentTurn;
        } else {
          return col;
        }
      });
    });

    setPlayerCurrentTurn_LS(currentTurn === 'X' ? 'O' : 'X');
    setPlayerCurrentTurn(currentTurn);
    setField(newField);
    setField_LS(newField);
    addCountMoves();

    const {isWin, player, styles} = getDataCheckGameState(newField, sizeField);

    if (isWin) {
      setPlayerWin(player);
      setIsWin(isWin);
      setStylesForLineWin(styles);
      disabledAllElemField(newField);
      stopTimer();
      addDataForStatistics_LS(currentTurn);
    }

    if (getIsAudioApp_LS()) {
      currentTurn === 'X' ? sound_X.play() : sound_O.play();
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
                    className={Boolean(el) ? 'col disabled' : 'col'}
                    disabled={Boolean(el)}
                    style={{width: `${100 / sizeField}%`}}
                    key={j}
                    onClick={() => addSymbolToField(i, j)}
                  >
                    {el}
                  </button>
                );
              })}
            </div>
          );
        })}
        <div style={stylesForLineWin} className="line-win">
          <div className={isWin ? 'progress active' : 'progress'}></div>
        </div>
        <p className={isWin ? 'message-win active' : 'message-win'}>{playerWin} Won!</p>
      </div>

      {/* {isWin ? <ModalWin playerWin={playerWin} /> : null} */}
    </main>
  );
};

/* const mapStateToProps = ({isIncludedSounds}) => {
  return {isIncludedSounds};
}; */

const mapDispatchToProps = {
  setPlayerCurrentTurn
};

export default connect(/* mapStateToProps */ null, mapDispatchToProps)(PlayField);
