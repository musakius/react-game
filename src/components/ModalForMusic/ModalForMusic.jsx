import React, {useState, useEffect} from 'react';
import {setIsMusic_LS, getIsMusic_LS} from '../../helpers/LS';
import './ModalForMusic.scss';

const ModalForMusic = ({startMusicBg}) => {
  const [isOpenModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (getIsMusic_LS()) {
      setOpenModal(true);
    }
  }, []);

  const onNoMusic = () => {
    setOpenModal(false);
    setIsMusic_LS(false);
  };

  const onYesMusic = () => {
    setOpenModal(false);
    setIsMusic_LS(true);
    startMusicBg();
  };

  if (!isOpenModal) return null;

  return (
    <div className="modal-music-overlay">
      <div className="modal-content">
        <div className="block-message">
          <p className="message">Continue with music?</p>
          <p className="info">
            <button type="button" className="btn btn-secondary px-4" onClick={onNoMusic}>
              No
            </button>
            <button type="button" className="btn btn-secondary px-4" onClick={onYesMusic}>
              Yes
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalForMusic;
