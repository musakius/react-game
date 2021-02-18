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
  if (LS.getItem('isMovePlayer1') === null) LS.setItem('isMovePlayer1', true);
  if (LS.getItem('isModeVsPlayer2') === null) LS.setItem('isModeVsPlayer2', true);
  if (LS.getItem('isAudio') === null) LS.setItem('isAudio', true);
  if (LS.getItem('size') === null) LS.setItem('size', 3);
  if (LS.getItem('field') === null) LS.setItem('field', createField(LS.getItem('size')));
};

const switchPlayers_LS = () => {
  const isMovePlayer1 = JSON.parse(LS.getItem('isMovePlayer1'));
  LS.setItem('isMovePlayer1', !isMovePlayer1);
};

const setField_LS = (field) => {
  LS.setItem('field', JSON.stringify(field));
};

const getIsMovePlayer1_LS = () => JSON.parse(LS.getItem('isMovePlayer1'));

const getField_LS = () => JSON.parse(LS.getItem('field'));

export {init_LS, switchPlayers_LS, getIsMovePlayer1_LS, getField_LS, setField_LS};
