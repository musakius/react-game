const setPlayerCurrentTurn = (value) => {
  return {
    type: 'SET_CURRENT_PLAYER_TURN',
    payload: value
  };
};

const setAutoplay = (value) => {
  return {
    type: 'SET_AUTOPLAY',
    payload: value
  };
};

export {setPlayerCurrentTurn, setAutoplay};
