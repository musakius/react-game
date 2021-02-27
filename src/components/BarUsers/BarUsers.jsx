import React from 'react';
import {
  getModeVsAI_LS,
  getNamePlayer1_LS,
  getNamePlayer2_LS,
  getNameComputer_LS
} from '../../helpers/LS';
import './BarUsers.scss';

const BarUsers = ({playerCurrentTurn}) => {
  return (
    <section className="bar-users">
      <div className="content">
        <div className={playerCurrentTurn === 'X' ? 'content__user active' : 'content__user'}>
          <i className="fas fa-smile"></i>
          <span className="name">{getNamePlayer1_LS()} ( X )</span>
        </div>
        <span className="content__vs">VS</span>
        {getModeVsAI_LS() ? (
          <div className={playerCurrentTurn === 'O' ? 'content__user active' : 'content__user'}>
            <i className="fas fa-robot"></i>
            <span className="name">{getNameComputer_LS()} ( O )</span>
          </div>
        ) : (
          <div className={playerCurrentTurn === 'O' ? 'content__user active' : 'content__user'}>
            <i className="fas fa-smile"></i>
            <span className="name">{getNamePlayer2_LS()} ( O )</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default BarUsers;
