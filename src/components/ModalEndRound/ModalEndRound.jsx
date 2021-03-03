import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getSec_LS, getMin_LS, getMove_LS} from '../../helpers/LS';
import './ModalEndRound.scss';

const ModalEndRound = ({endRound, messageEndRound}) => {
  const [isOpenModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (endRound) setOpenModal(true);
  }, [endRound]);

  return (
    <div className={`modal-overlay ${isOpenModal ? 'active' : ''}`}>
      <div className="modal-content">
        <button type="button" className="close" onClick={() => setOpenModal(false)}>
          <span>&times;</span>
        </button>
        <div className="block-message">
          <p className="message">{messageEndRound}</p>
          <p className="info">
            <span>
              Time {getMin_LS()} : {getSec_LS()}
            </span>
            <span>Moves: {getMove_LS()}</span>
          </p>
        </div>
        <Link to="/" className="btn btn-secondary">
          Menu
        </Link>
      </div>
    </div>
  );
};

export default connect(null, null)(ModalEndRound);
