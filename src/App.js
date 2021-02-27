import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PlayField from './pages/PlayField';
import Menu from './pages/Menu';
import Settings from './pages/Settings';
import Statistics from './pages/Statistics';
import audio_X from './assets/X.mp3';
import audio_O from './assets/O.mp3';
import audio_bg from './assets/music.mp3';
import {setSec_LS, setMin_LS, setMove_LS, getSec_LS, getMin_LS, getMove_LS} from './helpers/LS';
import './App.scss';

function App() {
  const [clockTimer, setClockTimer] = useState(undefined);
  const [time, setTime] = useState('00 : 00');
  const [countMoves, setCountMoves] = useState(0);

  const sound_X = new Audio(audio_X);
  const sound_O = new Audio(audio_O);
  const music_bg = new Audio(audio_bg);
  const cycleMusicBg = music_bg.duration * 1000 + 300;
  let timerAudioBg;

  useEffect(() => {
    setTime(`${getMin_LS()} : ${getSec_LS()}`);
    setCountMoves(getMove_LS());
  }, []);

  const startAudioBg = () => {
    music_bg.play();

    if (timerAudioBg) clearInterval(timerAudioBg);

    timerAudioBg = setInterval(() => {
      if (music_bg.paused) music_bg.play();
    }, cycleMusicBg);
  };

  const stopAudioBg = () => {
    music_bg.pause();
    music_bg.currentTime = 0;
    clearInterval(timerAudioBg);
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

  return (
    <div className="app">
      <Header time={time} startTimer={startTimer} stopTimer={stopTimer} countMoves={countMoves} />
      <Switch>
        <Route
          path="/"
          exact
          render={() => <Menu startTimer={startTimer} setCountMoves={setCountMoves} />}
        />
        <Route
          path="/game"
          render={() => (
            <PlayField
              sound_X={sound_X}
              sound_O={sound_O}
              stopTimer={stopTimer}
              addCountMoves={addCountMoves}
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
              startAudioBg={startAudioBg}
              stopAudioBg={stopAudioBg}
            />
          )}
        />
        <Route path="/statistics" render={() => <Statistics />} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
