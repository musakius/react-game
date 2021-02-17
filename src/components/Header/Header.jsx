import React from 'react';
import { connect } from "react-redux";
import { toggleIsOpenGame } from '../../redux/actions';
import './Header.scss';

const Header = ({toggleIsOpenGame}) => {
  return (
    <header className="header">
     header
     <button onClick={toggleIsOpenGame}></button>
    </header>
  );
};

const mapDispatchToProps = {
  toggleIsOpenGame
};

export default connect(null, mapDispatchToProps)(Header);
