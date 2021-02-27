const LS = localStorage;
const prefix = 'rssReactGame__';

const _createInitField = (size) => {
  const field = [];

  for (let i = 1; i <= size; i++) {
    const row = [];
    for (let j = 1; j <= size; j++) {
      row.push('');
    }
    field.push(row);
  }

  return field;
};

const _addInitValueToLS = (key, value) => {
  if (LS.getItem(`${prefix}${key}`) === null) LS.setItem(`${prefix}${key}`, JSON.stringify(value));
};

const _getValueLS = (key) => JSON.parse(LS.getItem(`${prefix}${key}`));

const _setValueLS = (key, value) => LS.setItem(`${prefix}${key}`, JSON.stringify(value));

// Get

const getPlayerGoesFirst_LS = () => _getValueLS('playerGoesFirst');

const getPlayerCurrentTurn_LS = () => _getValueLS('playerCurrentTurn');

const getModeVsAI_LS = () => _getValueLS('isModeVsAI');

const getSizeField_LS = () => _getValueLS('sizeField');

const getField_LS = () => _getValueLS('field');

const getVolume_LS = () => _getValueLS('volumeInApp');

const getIsAudioApp_LS = () => _getValueLS('isAudioApp');

const getNamePlayer1_LS = () => _getValueLS('namePlayer1');

const getNamePlayer2_LS = () => _getValueLS('namePlayer2');

const getNameComputer_LS = () => _getValueLS('nameComputer');

const getSec_LS = () => _getValueLS('sec');

const getMin_LS = () => _getValueLS('min');

const getMove_LS = () => _getValueLS('move');

const getStatistics_LS = () => _getValueLS('statistic');

//Set

const setField_LS = (value) => _setValueLS('field', value);

const setSizeField_LS = (value) => _setValueLS('sizeField', value);

const setVolume_LS = (value) => _setValueLS('volumeInApp', value);

const setIsAudioApp_LS = (value) => _setValueLS('isAudioApp', value);

const setPlayerGoesFirst_LS = (value) => _setValueLS('playerGoesFirst', value);

const setPlayerCurrentTurn_LS = (value) => _setValueLS('playerCurrentTurn', value);

const setNamePlayer1_LS = (value) => _setValueLS('namePlayer1', value);

const setNamePlayer2_LS = (value) => _setValueLS('namePlayer2', value);

const setNameComputer_LS = (value) => _setValueLS('nameComputer', value);

const setSec_LS = (value) => _setValueLS('sec', value);

const setMin_LS = (value) => _setValueLS('min', value);

const setMove_LS = (value) => _setValueLS('move', value);

// General

const init_LS = () => {
  _addInitValueToLS('playerGoesFirst', 'X');
  _addInitValueToLS('playerCurrentTurn', _getValueLS('playerGoesFirst'));
  _addInitValueToLS('isModeVsAI', false);
  _addInitValueToLS('isAudioApp', false);
  _addInitValueToLS('sizeField', 3);
  _addInitValueToLS('volumeInApp', 1);
  _addInitValueToLS('namePlayer1', 'player1');
  _addInitValueToLS('namePlayer2', 'player2');
  _addInitValueToLS('nameComputer', 'computer');
  _addInitValueToLS('sec', 0);
  _addInitValueToLS('min', 0);
  _addInitValueToLS('move', 0);
  _addInitValueToLS('statistic', []);
  _addInitValueToLS('field', _createInitField(_getValueLS('sizeField')));
};

const startNewGame_LS = () => {
  _setValueLS('playerCurrentTurn', _getValueLS('playerGoesFirst'));
  _setValueLS('field', _createInitField(_getValueLS('sizeField')));
  _setValueLS('sec', 0);
  _setValueLS('min', 0);
  _setValueLS('move', 0);
};

const addDataForStatistics_LS = (playerWin) => {
  const statistic = _getValueLS('statistic');
  if (statistic.length > 9) {
    console.log('object');
    statistic.shift();
  }

  statistic.push({
    playerWin: playerWin,
    sizeField: getSizeField_LS(),
    time: `${getMin_LS()} : ${getSec_LS()}`,
    moves: getMove_LS()
  });

  _setValueLS('statistic', statistic);
};

export {
  init_LS,
  startNewGame_LS,
  addDataForStatistics_LS,
  getPlayerGoesFirst_LS,
  getPlayerCurrentTurn_LS,
  getModeVsAI_LS,
  getSizeField_LS,
  getField_LS,
  getVolume_LS,
  getIsAudioApp_LS,
  getNamePlayer1_LS,
  getNamePlayer2_LS,
  getNameComputer_LS,
  getStatistics_LS,
  getSec_LS,
  getMin_LS,
  getMove_LS,
  setField_LS,
  setSizeField_LS,
  setVolume_LS,
  setIsAudioApp_LS,
  setPlayerGoesFirst_LS,
  setPlayerCurrentTurn_LS,
  setNamePlayer1_LS,
  setNamePlayer2_LS,
  setNameComputer_LS,
  setSec_LS,
  setMin_LS,
  setMove_LS
};
