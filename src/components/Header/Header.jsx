import React from 'react';
import {connect} from 'react-redux';
import {toggleIsOpenGame} from '../../redux/actions';
import './Header.scss';

const Header = ({toggleIsOpenGame}) => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-warning bg-warning d-flex justify-content-between align-items-center">
        <h1 className="m-0">Tic Tac Toe</h1>
        <button className="btn btn-secondary my-2 my-sm-0" type="submit" onClick={toggleIsOpenGame}>
          Menu
        </button>
      </nav>
    </header>
  );
};

const mapDispatchToProps = {
  toggleIsOpenGame
};

export default connect(null, mapDispatchToProps)(Header);
