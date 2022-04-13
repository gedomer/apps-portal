import { LOGIN, LOGOUT } from "./actions";

export default (
  state = {
    isAuthUser: !!localStorage.getItem("user"),
    user: JSON.parse(localStorage.getItem("user")) || {}
  },
  action
) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return { ...state, isAuthUser: true, user: action.payload.user };
    case LOGOUT:
      localStorage.removeItem("user");
      return { ...state, isAuthUser: false, user: {} };
    default:
      return state;
  }
};
