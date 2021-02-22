import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {toggleIsOpenGame} from '../../redux/actions';
import {startNewGame_LS} from '../../helpers/LS';
import './Menu.scss';

const Menu = ({isOpenGame, toggleIsOpenGame}) => {
  if (!isOpenGame) return <Redirect to="/game" />;

  const startNewGame = () => {
    startNewGame_LS();
    toggleIsOpenGame();
  };

  return (
    <main className="main">
      <section className="menu">
        <button type="button" className="btn btn-warning" onClick={startNewGame}>
          New Game
        </button>
        <button type="button" className="btn btn-warning">
          Settings
        </button>
        <button type="button" className="btn btn-warning">
          Autoplay
        </button>
        <button type="button" className="btn btn-warning">
          Statistics
        </button>
        <button type="button" className="btn btn-warning" onClick={toggleIsOpenGame}>
          Exit
        </button>
      </section>
    </main>
  );
};

const mapStateToProps = ({isOpenGame}) => {
  return {isOpenGame};
};

const mapDispatchToProps = {
  toggleIsOpenGame
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
