import React, {useState} from 'react';
import {connect} from 'react-redux';
import {toggleIsOpenGame} from '../../redux/actions';
import './ModalWin.scss';

const ModalWin = ({playerWin, toggleIsOpenGame}) => {
  const [isOpenModal, setOpenModal] = useState(true);

  const renderModal = () => {
    setTimeout(() => {
      setOpenModal(true);
      return (
        <div className="modal-overlay">
          <div className="modal-content">
            <button type="button" className="close" onClick={() => setOpenModal(false)}>
              <span>&times;</span>
            </button>
            <p className="message">
              <i className="fas fa-star"></i>
              {playerWin} Won!
              <i className="fas fa-star"></i>
            </p>
            <button type="button" className="btn btn-secondary" onClick={toggleIsOpenGame}>
              Menu
            </button>
          </div>
        </div>
      );
    }, 1000);
  };

  if (!isOpenModal) return null;

  return <>{renderModal()}</>;
};

const mapDispatchToProps = {
  toggleIsOpenGame
};

export default connect(null, mapDispatchToProps)(ModalWin);
