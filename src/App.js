import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PlayField from './pages/PlayField';
import Menu from './pages/Menu';
import Settings from './pages/Settings';
import Statistics from './pages/Statistics';
import HotKeys from './pages/HotKeys';
import ModalForMusic from './components/ModalForMusic';
import audio_X from './assets/X.mp3';
import audio_O from './assets/O.mp3';
import audio_bg from './assets/music.mp3';
import {
  setSec_LS,
  setMin_LS,
  setMove_LS,
  getSec_LS,
  getMin_LS,
  getMove_LS,
  getIsSound_LS,
  getVolumeSound_LS,
  getVolumeMusic_LS,
  getStyleApp_LS,
  getIsModeVsAI_LS,
  getPlayerCurrentTurn_LS
} from './helpers/LS';
import './App.scss';

function App() {
  const [clockTimer, setClockTimer] = useState(undefined);
  const [time, setTime] = useState('00 : 00');
  const [countMoves, setCountMoves] = useState(0);
  const [styleApp, setStyleApp] = useState(false);
  const [modeVsAI, setModeVsAI] = useState(false);
  const [walksNow, setWalksNow] = useState('X');

  const [disableReturnGame, setDisableReturnGame] = useState(false);

  const sound_X = new Audio(audio_X);
  const sound_O = new Audio(audio_O);
  const music_bg = new Audio(audio_bg);

  useEffect(() => {
    setTime(`${getMin_LS()} : ${getSec_LS()}`);
    setCountMoves(getMove_LS());
    setStyleApp(getStyleApp_LS());
    setModeVsAI(getIsModeVsAI_LS());
    setWalksNow(getPlayerCurrentTurn_LS());
  }, []);

  const startMusicBg = () => {
    music_bg.loop = true;
    music_bg.play();
  };

  const stopMusicBg = () => {
    music_bg.pause();
    music_bg.currentTime = 0;
  };

  const setVolumeSound = () => {
    const value = getVolumeSound_LS();
    sound_X.volume = value;
    sound_O.volume = value;
  };

  const setVolumeMusic = () => {
    music_bg.volume = getVolumeMusic_LS();
  };

  const startTimer = (min = 0, sec = 0) => {
    sec++;
    if (sec > 60) {
      min++;
      sec = sec - 60;
    }
    if (sec.toString().length === 1) sec = '0' + sec;
    if (min.toString().length === 1) min = '0' + min;

    setTime(min + ' : ' + sec);
    setSec_LS(sec);
    setMin_LS(min);

    setClockTimer(
      setTimeout(() => {
        startTimer(min, sec);
      }, 1000)
    );
  };

  const stopTimer = () => {
    clearTimeout(clockTimer);
  };

  const addCountMoves = () => {
    const currentMoves = countMoves + 1;
    setCountMoves(currentMoves);
    setMove_LS(currentMoves);
  };

  const playSound = (symbol) => {
    if (getIsSound_LS()) {
      setVolumeSound();
      symbol === 'X' ? sound_X.play() : sound_O.play();
    }
  };

  return (
    <div className="app">
      <Header
        time={time}
        startTimer={startTimer}
        stopTimer={stopTimer}
        countMoves={countMoves}
        styleApp={styleApp}
        modeVsAI={modeVsAI}
        walksNow={walksNow}
      />
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <Menu
              startTimer={startTimer}
              setCountMoves={setCountMoves}
              styleApp={styleApp}
              setDisableReturnGame={setDisableReturnGame}
              disableReturnGame={disableReturnGame}
            />
          )}
        />
        <Route
          path="/game"
          render={() => (
            <PlayField
              playSound={playSound}
              stopTimer={stopTimer}
              addCountMoves={addCountMoves}
              setWalksNow={setWalksNow}
              walksNow={walksNow}
            />
          )}
        />
        <Route
          path="/settings"
          render={() => (
            <Settings
              sound_X={sound_X}
              sound_O={sound_O}
              music_bg={music_bg}
              startMusicBg={startMusicBg}
              stopMusicBg={stopMusicBg}
              setVolumeMusic={setVolumeMusic}
              setStyleApp={setStyleApp}
              styleApp={styleApp}
              setModeVsAI={setModeVsAI}
              modeVsAI={modeVsAI}
              setWalksNow={setWalksNow}
              setDisableReturnGame={setDisableReturnGame}
              disableReturnGame={disableReturnGame}
            />
          )}
        />
        <Route path="/statistics" render={() => <Statistics styleApp={styleApp} />} />
        <Route path="/hot-keys" render={() => <HotKeys styleApp={styleApp} />} />
      </Switch>
      <Footer />
      <ModalForMusic startMusicBg={startMusicBg} />
    </div>
  );
}

export default App;
