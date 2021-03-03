import React from 'react';
import './BarUsers.scss';

const BarUsers = ({walksNow, modeVsAI}) => {
  return (
    <section className="bar-users">
      <div className="content">
        <div className={walksNow.symbol === 'X' ? 'content__user active' : 'content__user'}>
          <i className="fas fa-smile"></i>
          <span className="name">player ( X )</span>
        </div>
        <span className="content__vs">VS</span>
        {modeVsAI ? (
          <div className={walksNow.symbol === 'O' ? 'content__user active' : 'content__user'}>
            <i className="fas fa-robot"></i>
            <span className="name">computer ( O )</span>
          </div>
        ) : (
          <div className={walksNow.symbol === 'O' ? 'content__user active' : 'content__user'}>
            <i className="fas fa-smile"></i>
            <span className="name">player ( O )</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default BarUsers;
