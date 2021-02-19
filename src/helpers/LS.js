const LS = localStorage;

const createField = (size) => {
  const field = [];

  for (let i = 1; i <= size; i++) {
    const row = [];
    for (let j = 1; j <= size; j++) {
      row.push('');
    }
    field.push(row);
  }

  return JSON.stringify(field);
};

const init_LS = () => {
  if (LS.getItem('isMovePlayer1_rssGame') === null) LS.setItem('isMovePlayer1_rssGame', true);
  if (LS.getItem('isModeVsComp_rssGame') === null) LS.setItem('isModeVsComp_rssGame', false);
  if (LS.getItem('isAudio_rssGame') === null) LS.setItem('isAudio_rssGame', true);
  if (LS.getItem('sizeField_rssGame') === null) LS.setItem('sizeField_rssGame', 3);
  if (LS.getItem('field_rssGame') === null) {
    LS.setItem('field_rssGame', createField(LS.getItem('sizeField_rssGame')));
  }
};

const switchPlayers_LS = () => {
  LS.setItem('isMovePlayer1_rssGame', !JSON.parse(LS.getItem('isMovePlayer1_rssGame')));
};

const setField_LS = (field) => {
  LS.setItem('field_rssGame', JSON.stringify(field));
};

const getIsMovePlayer1_LS = () => JSON.parse(LS.getItem('isMovePlayer1_rssGame'));

const getIsModeVsComputer_LS = () => JSON.parse(LS.getItem('isModeVsComp_rssGame'));

const getSizeField_LS = () => JSON.parse(LS.getItem('sizeField_rssGame'));

const getField_LS = () => JSON.parse(LS.getItem('field_rssGame'));

export {
  init_LS,
  switchPlayers_LS,
  getIsMovePlayer1_LS,
  getIsModeVsComputer_LS,
  getSizeField_LS,
  getField_LS,
  setField_LS
};
