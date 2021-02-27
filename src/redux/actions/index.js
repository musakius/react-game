const setPlayerCurrentTurn = (value) => {
  return {
    type: 'SET_CURRENT_PLAYER_TURN',
    payload: value
  };
};

export {setPlayerCurrentTurn};
