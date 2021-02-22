import React from 'react';
import {getIsModeVsComputer_LS} from '../../helpers/LS';
import './BarUsers.scss';

const BarUsers = ({isMovePlayer1}) => {
  return (
    <section className="bar-users">
      <div className="content">
        <div className={isMovePlayer1 ? 'content__user active' : 'content__user'}>
          <i className="fas fa-smile"></i>
          <span className="name">player ( X )</span>
        </div>
        <span className="content__vs">VS</span>
        {getIsModeVsComputer_LS() ? (
          <div className={isMovePlayer1 ? 'content__user' : 'content__user active'}>
            <i className="fas fa-robot"></i>
            <span className="name">computer ( O )</span>
          </div>
        ) : (
          <div className={isMovePlayer1 ? 'content__user' : 'content__user active'}>
            <i className="fas fa-smile"></i>
            <span className="name">player ( O )</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default BarUsers;
