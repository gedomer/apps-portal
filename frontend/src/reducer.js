import { combineReducers } from 'redux';
import { LOGIN, LOGOUT, AUTH_ERROR } from "./actions";

const initialState = {
  isAuthUser: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  hasError: false
}

function auth(state = initialState, action){
  switch (action.type) {
    case LOGIN:
      return { ...state, isAuthUser: true, token:action.payload.token, hasError:false };
    case AUTH_ERROR:
      return { ...state, isAuthUser: false, hasError:true };
    case LOGOUT:
      localStorage.removeItem("token");
      return { ...state, isAuthUser: false, hasError:false };
    default:
      return state;
  }
};

export default combineReducers({auth});