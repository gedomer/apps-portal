import http from "./http";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const AUTH_ERROR = "AUTH_ERROR";

export const loginUser = (username, password) => (dispatch) => {
  http.Login(username, password)
    .then((res) => {
      dispatch({ type: LOGIN, payload: res.data })
    })
    .catch((err) => {
      dispatch({ type: AUTH_ERROR });
    });
}

export const login = user => {
  return {
    type: LOGIN,
    payload: user
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};
