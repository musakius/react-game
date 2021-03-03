import React from 'react';
import './ControlAudio.scss';

const ControlAudio = ({title, onToggleSound, isSound, onChangeVolume, volume}) => {
  return (
    <fieldset className="form-group jumbotron w-47">
      <h3 className="name-block">{title}</h3>
      <div className="block justify-content-between">
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id={`switch-${title}`}
            checked={isSound}
            onChange={(e) => onToggleSound(e)}
          />
          <label className="custom-control-label label-switch" htmlFor={`switch-${title}`}>
            off / on
          </label>
        </div>
        <input
          type="range"
          className="custom-range"
          value={volume}
          onChange={(e) => onChangeVolume(e)}
        />
      </div>
    </fieldset>
  );
};

export default ControlAudio;
