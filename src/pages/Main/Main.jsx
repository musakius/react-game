import React, {useState, useEffect} from 'react';
import BarUsers from '../../components/BarUsers';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {getDataCheckGameState} from '../../helpers/checkWin';
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
  const [playerWin, setPlayerWin] = useState(null);
  const [stylesForWin, setStylesForWin] = useState({});

  useEffect(() => {
    init_LS();
    setIsMovePlayer1(getIsMovePlayer1_LS());
    setField(getField_LS());
  }, [setField]);

  const addSymbolToField = (idRow, idCol) => {
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

    const {isWin, player, styles} = getDataCheckGameState(newField);

    if (isWin) {
      setPlayerWin(player);
      setStylesForWin(styles);
    }

    console.log(getDataCheckGameState(newField));
  };

  if (isOpenGame) return <Redirect to="/" />;

  return (
    <main className="main">
      <BarUsers isMovePlayer1={isMovePlayer1} />
      <div className="main__field">
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
        <div style={stylesForWin} className="line-win"></div>
      </div>
    </main>
  );
};

const mapStateToProps = ({isOpenGame}) => {
  return {isOpenGame};
};

export default connect(mapStateToProps)(Main);
