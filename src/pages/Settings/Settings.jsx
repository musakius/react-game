import React, {useState, useEffect, useCallback} from 'react';
import ControlAudio from '../../components/ControlAudio';
import ControlSelect from '../../components/ControlSelect';
import {Link} from 'react-router-dom';
import {
  getSizeField_LS,
  getVolumeMusic_LS,
  getVolumeSound_LS,
  getPlayerGoesFirst_LS,
  getIsSound_LS,
  getIsMusic_LS,
  setIsMusic_LS,
  setIsSound_LS,
  setSizeField_LS,
  setVolumeMusic_LS,
  setVolumeSound_LS,
  setPlayerGoesFirst_LS,
  setPlayerCurrentTurn_LS,
  setIsModeVsAI_LS,
  setStyleApp_LS
} from '../../helpers/LS';
import './Settings.scss';

const Settings = ({
  startMusicBg,
  stopMusicBg,
  setVolumeMusic,
  setStyleApp,
  styleApp,
  setModeVsAI,
  modeVsAI,
  setWalksNow,
  setDisableReturnGame,
  disableReturnGame
}) => {
  const [size, setSize] = useState('3');
  const [volumeMusic, setVolumeMusicState] = useState(0);
  const [volumeSoundState, setVolumeSoundState] = useState(0);
  const [goesFirst, setGoesFirst] = useState('X');
  const [isMusic, setIsMusic] = useState(false);
  const [isSound, setIsSound] = useState(false);

  const initState = useCallback(() => {
    setSize(getSizeField_LS());
    setVolumeMusicState(getVolumeMusic_LS() * 100);
    setVolumeSoundState(getVolumeSound_LS() * 100);
    setGoesFirst(getPlayerGoesFirst_LS());
    setIsSound(getIsSound_LS());
    setIsMusic(getIsMusic_LS);
    setVolumeMusic();
  }, []);

  useEffect(() => {
    initState();
  }, []);
  // sound
  const onToggleSound = ({target: {checked}}) => {
    setIsSound(checked);
    setIsSound_LS(checked);
  };

  const onChangeVolumeSound = ({target: {value}}) => {
    setVolumeSound_LS(value / 100);
    setVolumeSoundState(value);
  };
  // music
  const onToggleMusic = ({target: {checked}}) => {
    setIsMusic(checked);
    setIsMusic_LS(checked);
    checked ? startMusicBg() : stopMusicBg();
  };

  const onChangeVolumeMusic = ({target: {value}}) => {
    setVolumeMusic_LS(value / 100);
    setVolumeMusicState(value);
    setVolumeMusic();
  };
  // size
  const onChangeSize = ({target: {value}}) => {
    setSizeField_LS(value);
    setSize(value);
    setDisableReturnGame(true);
  };
  // mode vs AI
  const onChangeModeVsAI = ({target: {value}}) => {
    const valueBool = value === 'true' ? true : false;
    setIsModeVsAI_LS(valueBool);
    setModeVsAI(valueBool);
    setDisableReturnGame(true);
  };
  // style app
  const onChangeStyleApp = ({target: {value}}) => {
    setStyleApp_LS(value);
    setStyleApp(value);
  };
  // goes first
  const onChangeGoesFirst = ({target: {value}}) => {
    const dataForMove = {name: goesFirst.name, symbol: value};
    setPlayerGoesFirst_LS(dataForMove);
    setPlayerCurrentTurn_LS(dataForMove);
    setGoesFirst(dataForMove);
    setWalksNow(dataForMove);
    setDisableReturnGame(true);
  };

  return (
    <main className="main justify-content-between">
      <h1 className="title">Settings</h1>
      <section className="container">
        <ControlAudio
          title="Sound"
          onToggleSound={onToggleSound}
          isSound={isSound}
          onChangeVolume={onChangeVolumeSound}
          volume={volumeSoundState}
        />
        <ControlAudio
          title="Music"
          onToggleSound={onToggleMusic}
          isSound={isMusic}
          onChangeVolume={onChangeVolumeMusic}
          volume={volumeMusic}
        />
        <ControlSelect
          title="Field size"
          onChangeValue={onChangeSize}
          value={size}
          disableReturnGame={disableReturnGame}
          elements={[
            {value: '3', content: '3x3'},
            {value: '4', content: '4x4'},
            {value: '5', content: '5x5'}
          ]}
        />
        <ControlSelect
          title="Versus"
          onChangeValue={onChangeModeVsAI}
          value={modeVsAI}
          disableReturnGame={disableReturnGame}
          elements={[
            {value: 'false', content: 'Player'},
            {value: 'true', content: 'Computer'}
          ]}
        />
        <ControlSelect
          title="Application styles"
          onChangeValue={onChangeStyleApp}
          value={styleApp}
          disableReturnGame={false}
          elements={[
            {value: 'warning', content: 'Orange'},
            {value: 'danger', content: 'Red'},
            {value: 'success', content: 'Green'},
            {value: 'info', content: 'Blue'}
          ]}
        />
        <ControlSelect
          title="Goes first"
          onChangeValue={onChangeGoesFirst}
          value={goesFirst.symbol}
          disableReturnGame={disableReturnGame}
          elements={[
            {value: 'X', content: 'X'},
            {value: 'O', content: 'O'}
          ]}
        />
        <div className="w-100">
          <Link to="/" className={`btn btn-${styleApp}`}>
            Back
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Settings;
