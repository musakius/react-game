import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
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

  useEffect(() => {
    init_LS();
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
    setField(newField);
    setField_LS(newField);
  };

  if (isOpenGame) return <Redirect to="/" />;

  return (
    <main className="main">
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
      </div>
    </main>
  );
};

const mapStateToProps = ({isOpenGame}) => {
  return {isOpenGame};
};

export default connect(mapStateToProps)(Main);
