import {init_LS} from '../../helpers/LS';

init_LS();

const initialState = {
  autoplay: false,
  playerCurrentTurn: {name: 'player1', symbol: 'X'}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PLAYER_TURN':
      return {...state, playerCurrentTurn: action.payload};
    case 'SET_AUTOPLAY':
      return {...state, autoplay: action.payload};
    default:
      return state;
  }
};

export default reducer;
