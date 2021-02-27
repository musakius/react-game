import React, {useState, useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import {
  getSizeField_LS,
  getVolume_LS,
  getPlayerGoesFirst_LS,
  getNamePlayer1_LS,
  getNamePlayer2_LS,
  getNameComputer_LS,
  setSizeField_LS,
  setVolume_LS,
  setIsAudioApp_LS,
  setPlayerGoesFirst_LS,
  setNamePlayer1_LS,
  setNamePlayer2_LS,
  setNameComputer_LS
} from '../../helpers/LS';
import './Settings.scss';

const Settings = ({sound_X, sound_O, music_bg, startAudioBg, stopAudioBg}) => {
  const [size, setSize] = useState('3');
  const [volume, setVolume] = useState(0);
  const [sound, setIsAudioApp] = useState(false);
  const [goesFirst, setGoesFirst] = useState('X');
  const [namePlayer1, setNamePlayer1] = useState('player1');
  const [namePlayer2, setNamePlayer2] = useState('player2');
  const [nameComputer, setNameComputer] = useState('computer');

  const initState = useCallback(() => {
    setSize(getSizeField_LS());
    setVolume(getVolume_LS() * 100);
    setVolumeForAudio(getVolume_LS());
    setGoesFirst(getPlayerGoesFirst_LS());
    setNamePlayer1(getNamePlayer1_LS());
    setNamePlayer2(getNamePlayer2_LS());
    setNameComputer(getNameComputer_LS());
  }, []);

  useEffect(() => {
    initState();
  }, []);

  const setVolumeForAudio = (value) => {
    [music_bg, sound_X, sound_O].forEach((el) => (el.volume = value));
  };

  const onChangeToggleAudio = ({target: {checked}}) => {
    setIsAudioApp(checked);
    setIsAudioApp_LS(checked);
    checked ? startAudioBg() : stopAudioBg();
  };

  const onChangeSound = ({target: {value}}) => {
    const valueForAudio = value / 100;

    setVolumeForAudio(valueForAudio);
    setVolume_LS(valueForAudio);
    setVolume(value);
  };

  const onChangeSize = ({target: {value}}) => {
    setSizeField_LS(value);
    setSize(value);
  };

  const onChangeGoesFirst = ({target: {value}}) => {
    setPlayerGoesFirst_LS(value);
    setGoesFirst(value);
  };

  const onChangeNamePlayer1 = ({target: {value}}) => {
    setNamePlayer1_LS(value);
    setNamePlayer1(value);
  };

  const onChangeNamePlayer2 = ({target: {value}}) => {
    setNamePlayer2_LS(value);
    setNamePlayer2(value);
  };

  const onChangeNameComputer = ({target: {value}}) => {
    setNameComputer_LS(value);
    setNameComputer(value);
  };

  return (
    <main className="main justify-content-between">
      <h1 className="title">Settings</h1>
      <section className="container">
        <fieldset className="form-group jumbotron w-47">
          <h3 className="name-block">Sound</h3>
          <div className="block">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="switch"
                checked={sound}
                onChange={(e) => onChangeToggleAudio(e)}
              />
              <label className="custom-control-label label-switch" htmlFor="switch">
                off / on
              </label>
            </div>
            <input
              type="range"
              className="custom-range"
              value={volume}
              onChange={(e) => onChangeSound(e)}
            />
          </div>
        </fieldset>
        <fieldset className="form-group jumbotron w-47">
          <h3 className="name-block">Field size</h3>
          <select className="form-control" value={size} onChange={(e) => onChangeSize(e)}>
            <option value="3">3x3</option>
            <option value="4">4x4</option>
            <option value="5">5x5</option>
          </select>
        </fieldset>
        <fieldset className="form-group jumbotron w-47">
          <h3 className="name-block">Goes first</h3>
          <select className="form-control" value={goesFirst} onChange={(e) => onChangeGoesFirst(e)}>
            <option value="X">X</option>
            <option value="O">O</option>
          </select>
        </fieldset>
        <fieldset className="form-group jumbotron w-100">
          <h3 className="name-block mb-0">Change name</h3>
          <div className="block d-flex justify-content-between">
            <div className="item">
              <label className="col-form-label" htmlFor="player1">
                player 1
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="player 1"
                id="player1"
                value={namePlayer1}
                onChange={onChangeNamePlayer1}
              />
            </div>
            <div className="item">
              <label className="col-form-label" htmlFor="player2">
                player 2
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="player 2"
                id="player2"
                value={namePlayer2}
                onChange={onChangeNamePlayer2}
              />
            </div>
            <div className="item">
              <label className="col-form-label" htmlFor="computer">
                computer
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="computer"
                id="computer"
                value={nameComputer}
                onChange={onChangeNameComputer}
              />
            </div>
          </div>
        </fieldset>
        <div className="w-100">
          <Link to="/" className="btn btn-warning">
            Back
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Settings;
