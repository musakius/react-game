import React, {useEffect} from 'react';
import BarUsers from '../../components/BarUsers';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getSec_LS, getMin_LS} from '../../helpers/LS';
import './Header.scss';

const Header = ({
  playerCurrentTurn,
  time,
  startTimer,
  stopTimer,
  countMoves,
  styleApp,
  modeVsAI,
  walksNow
}) => {
  useEffect(() => {
    if (window.location.pathname === '/game') {
      startTimer(getMin_LS(), getSec_LS());
    }
  }, []);

  return (
    <header className="header">
      <nav
        className={`navbar navbar-expand-lg navbar-${styleApp} bg-${styleApp} d-flex flex-column`}
      >
        <div className="content-top d-flex justify-content-between align-items-center w-100 flex-wrap">
          <h1 className="m-0 w-30 text-left">Tic Tac Toe</h1>
          <div className="w-bar-users-30">
            <BarUsers walksNow={walksNow} modeVsAI={modeVsAI} />
          </div>
          <div className="w-30 text-right align-self-start">
            <Link to="/" className="btn btn-primary my-2 my-sm-0" onClick={stopTimer}>
              Menu
            </Link>
          </div>
        </div>
        <div className="content-bottom d-flex justify-content-between align-items-center w-100 px-2">
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
