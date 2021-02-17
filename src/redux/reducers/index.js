const initialState = {
  isOpenGame: false,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_IS_OPEN_GAME':
      return {
        ...state,
        isOpenGame: !state.isOpenGame
      };
    default:
      return state;
  }
};

export default reducer;
