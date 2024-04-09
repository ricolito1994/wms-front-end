import { SET_TOKEN, CLEAR_TOKEN } from '../actions/AuthActions';

const initialState = {
  token: null
};

const authReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case CLEAR_TOKEN:
      return {
        ...state,
        token: null
      };
    default:
      return state;
  }
};

export default authReducer;