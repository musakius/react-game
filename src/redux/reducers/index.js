import {init_LS} from '../../helpers/LS';

init_LS();

const initialState = {
  isOpenGame: false,
  playerCurrentTurn: 'X'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PLAYER_TURN':
      return {...state, playerCurrentTurn: action.payload};
    default:
      return state;
  }
};

export default reducer;
