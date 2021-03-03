import React from 'react';
import {connect} from 'react-redux';
import {setAutoplay} from '../../redux/actions';
import {Link} from 'react-router-dom';
import {startNewGame_LS, getSec_LS, getMin_LS} from '../../helpers/LS';
import './Menu.scss';

const Menu = ({
  startTimer,
  setCountMoves,
  setAutoplay,
  styleApp,
  setDisableReturnGame,
  disableReturnGame
}) => {
  const startNewGame = (flag) => {
    startNewGame_LS();
    startTimer();
    setCountMoves(0);
    setAutoplay(flag);
    setDisableReturnGame(false);
  };

  return (
    <main className="main">
      <section className="menu">
        <Link to="/game" className={`btn btn-${styleApp}`} onClick={() => startNewGame(false)}>
          New Game
        </Link>
        <Link to="/settings" className={`btn btn-${styleApp}`}>
          Settings
        </Link>
        <Link to="/statistics" className={`btn btn-${styleApp}`}>
          Statistics
        </Link>
        <Link to="/game" className={`btn btn-${styleApp}`} onClick={() => startNewGame(true)}>
          Autoplay
        </Link>
        <Link to="/hot-keys" className={`btn btn-${styleApp}`}>
          Hot Keys
        </Link>
        <Link
          to={`${disableReturnGame ? '/' : '/game'}`}
          className={`btn btn-${styleApp} ${disableReturnGame ? 'disabled' : ''}`}
          onClick={() => startTimer(getMin_LS(), getSec_LS())}
        >
          Back
        </Link>
      </section>
    </main>
  );
};

const mapDispatchToProps = {
  setAutoplay
};

export default connect(null, mapDispatchToProps)(Menu);
