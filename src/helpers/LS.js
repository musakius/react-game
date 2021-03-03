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

const getIsModeVsAI_LS = () => _getValueLS('isModeVsAI');

const getSizeField_LS = () => _getValueLS('sizeField');

const getStyleApp_LS = (value) => _getValueLS('styleApp');

const getField_LS = () => _getValueLS('field');

const getVolumeMusic_LS = () => _getValueLS('volumeMusic');

const getIsMusic_LS = () => _getValueLS('isMusic');

const getVolumeSound_LS = () => _getValueLS('volumeSound');

const getIsSound_LS = () => _getValueLS('isSound');

const getSec_LS = () => _getValueLS('sec');

const getMin_LS = () => _getValueLS('min');

const getMove_LS = () => _getValueLS('move');

const getStatistics_LS = () => _getValueLS('statistic');

const getStylesWin_LS = () => _getValueLS('stylesWin');

const getEndRound_LS = () => _getValueLS('endRound');

//Set

const setField_LS = (value) => _setValueLS('field', value);

const setIsModeVsAI_LS = (value) => _setValueLS('isModeVsAI', value);

const setSizeField_LS = (value) => _setValueLS('sizeField', value);

const setStyleApp_LS = (value) => _setValueLS('styleApp', value);

const setVolumeMusic_LS = (value) => _setValueLS('volumeMusic', value);

const setIsMusic_LS = (value) => _setValueLS('isMusic', value);

const setVolumeSound_LS = (value) => _setValueLS('volumeSound', value);

const setIsSound_LS = (value) => _setValueLS('isSound', value);

const setPlayerGoesFirst_LS = (value) => _setValueLS('playerGoesFirst', value);

const setPlayerCurrentTurn_LS = (value) => _setValueLS('playerCurrentTurn', value);

const setSec_LS = (value) => _setValueLS('sec', value);

const setMin_LS = (value) => _setValueLS('min', value);

const setMove_LS = (value) => _setValueLS('move', value);

const setStylesWin_LS = (value) => _setValueLS('stylesWin', value);

const setEndRound_LS = (value) => _setValueLS('endRound', value);
// General

const init_LS = () => {
  _addInitValueToLS('isModeVsAI', false);
  _addInitValueToLS('isMusic', false);
  _addInitValueToLS('isSound', false);
  _addInitValueToLS('volumeMusic', 1);
  _addInitValueToLS('volumeSound', 1);
  _addInitValueToLS('sizeField', 3);
  _addInitValueToLS('styleApp', 'warning');
  _addInitValueToLS('playerGoesFirst', {name: 'player', symbol: 'X'});
  _addInitValueToLS('playerCurrentTurn', _getValueLS('playerGoesFirst'));
  _addInitValueToLS('sec', 0);
  _addInitValueToLS('min', 0);
  _addInitValueToLS('move', 0);
  _addInitValueToLS('statistic', []);
  _addInitValueToLS('stylesWin', {});
  _addInitValueToLS('endRound', false);
  _addInitValueToLS('field', _createInitField(_getValueLS('sizeField')));
};

const startNewGame_LS = () => {
  _setValueLS('playerCurrentTurn', _getValueLS('playerGoesFirst'));
  _setValueLS('field', _createInitField(_getValueLS('sizeField')));
  _setValueLS('sec', 0);
  _setValueLS('min', 0);
  _setValueLS('move', 0);
  _setValueLS('stylesWin', {});
  _setValueLS('endRound', false);
};

const addDataForStatistics_LS = (playerWin) => {
  const statistic = _getValueLS('statistic');
  if (statistic.length > 9) {
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
  getIsModeVsAI_LS,
  getSizeField_LS,
  getField_LS,
  getStyleApp_LS,
  getVolumeMusic_LS,
  getIsMusic_LS,
  getVolumeSound_LS,
  getIsSound_LS,
  getStatistics_LS,
  getSec_LS,
  getMin_LS,
  getMove_LS,
  getStylesWin_LS,
  getEndRound_LS,
  setField_LS,
  setIsModeVsAI_LS,
  setSizeField_LS,
  setStyleApp_LS,
  setVolumeMusic_LS,
  setIsMusic_LS,
  setVolumeSound_LS,
  setIsSound_LS,
  setPlayerGoesFirst_LS,
  setPlayerCurrentTurn_LS,
  setSec_LS,
  setMin_LS,
  setMove_LS,
  setStylesWin_LS,
  setEndRound_LS
};
