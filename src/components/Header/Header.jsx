import React, {useState, useEffect} from 'react';
import BarUsers from '../../components/BarUsers';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getSec_LS, getMin_LS, getMove_LS} from '../../helpers/LS';
import './Header.scss';

const Header = ({playerCurrentTurn, time, startTimer, stopTimer, countMoves}) => {
  useEffect(() => {
    if (window.location.pathname === '/game') {
      startTimer(getMin_LS(), getSec_LS());
    }
  }, []);

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-warning bg-warning d-flex flex-column">
        <div className="content-top d-flex justify-content-between align-items-center w-100">
          <h1 className="m-0">Tic Tac Toe</h1>
          <BarUsers playerCurrentTurn={playerCurrentTurn} />
          <Link to="/" className="btn btn-secondary my-2 my-sm-0" onClick={stopTimer}>
            Menu
          </Link>
        </div>
        <div className="content-bottom d-flex justify-content-between align-items-center w-100">
          <span className="time">Time: {time}</span>
          <span className="move">Move: {countMoves}</span>
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = ({playerCurrentTurn}) => {
  return {playerCurrentTurn};
};

export default connect(mapStateToProps)(Header);
