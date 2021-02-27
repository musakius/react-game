import React from 'react';
import {Link} from 'react-router-dom';
import {startNewGame_LS, getSec_LS, getMin_LS} from '../../helpers/LS';
import './Menu.scss';

const Menu = ({startTimer, setCountMoves}) => {
  const startNewGame = () => {
    startNewGame_LS();
    startTimer();
    setCountMoves(0);
  };

  return (
    <main className="main">
      <section className="menu">
        <Link to="/game" className="btn btn-warning" onClick={startNewGame}>
          New Game
        </Link>
        <Link to="/settings" className="btn btn-warning">
          Settings
        </Link>
        <Link to="/statistics" className="btn btn-warning">
          Statistics
        </Link>
        <button type="button" className="btn btn-warning">
          Autoplay
        </button>
        <Link
          to="/game"
          className="btn btn-warning"
          onClick={() => startTimer(getMin_LS(), getSec_LS())}
        >
          Back
        </Link>
      </section>
    </main>
  );
};

export default Menu;
