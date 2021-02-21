import React, {useState, useEffect, useRef} from 'react';
import BarUsers from '../../components/BarUsers';
import ModalWin from '../../components/ModalWin';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {getDataCheckGameState} from '../../helpers/checkGameState';
import {
  init_LS,
  switchPlayers_LS,
  getIsMovePlayer1_LS,
  getField_LS,
  setField_LS
} from '../../helpers/LS';
import './Main.scss';

const Main = ({isOpenGame}) => {
  const [field, setField] = useState([]);
  const [isMovePlayer1, setIsMovePlayer1] = useState(true);
  const [playerWin, setPlayerWin] = useState('');
  const [isWin, setIsWin] = useState(false);
  const [stylesForLineWin, setStylesForLineWin] = useState({});
  const refWidthField = useRef(0);

  useEffect(() => {
    init_LS();
    setIsMovePlayer1(getIsMovePlayer1_LS());
    setField(getField_LS());
  }, [setField]);

  const disabledAllElemField = (field) => {
    const disabledField = field.map((row) => row.map((el) => ` ${el} `));
    setField(disabledField);
    setField_LS(disabledField);
  };

  const addSymbolToField = (idRow, idCol) => {
    const widthField = refWidthField.current.offsetWidth;

    const newField = field.map((row, i) => {
      return row.map((col, j) => {
        if (idRow === i && idCol === j) {
          return getIsMovePlayer1_LS() ? 'X' : 'O';
        } else {
          return col;
        }
      });
    });

    switchPlayers_LS();
    setIsMovePlayer1(getIsMovePlayer1_LS());
    setField(newField);
    setField_LS(newField);

    const {isWin, player, styles} = getDataCheckGameState(newField, widthField);

    if (isWin) {
      setPlayerWin(player);
      setIsWin(isWin);
      setStylesForLineWin(styles);
      disabledAllElemField(newField);
    }
  };

  if (isOpenGame) return <Redirect to="/" />;

  return (
    <main className="main">
      <BarUsers isMovePlayer1={isMovePlayer1} />
      <div className="main__field" ref={refWidthField}>
        {field.map((row, i) => {
          return (
            <div className="row" key={i}>
              {row.map((el, j) => {
                return (
                  <button
                    className={Boolean(el) ? 'col disabled' : 'col'}
                    disabled={Boolean(el)}
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

const mapStateToProps = ({isOpenGame}) => {
  return {isOpenGame};
};

export default connect(mapStateToProps)(Main);
