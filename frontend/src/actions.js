import http from "./http";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const AUTH_ERROR = "AUTH_ERROR";

export function fetchToken() {
  return (dispatch) => {
    http.setToken(localStorage.getItem('token'))
  }
}

export const loginUser = (username, password) => (dispatch) => {
  http.Login(username, password)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      http.setToken(res.data.token)
      dispatch({ type: LOGIN, payload: res.data })
    })
    .catch((err) => {
      localStorage.removeItem("token");
      http.setToken(null);
      dispatch({ type: AUTH_ERROR });
    });
}

export const logout = () => {
  return {
    type: LOGOUT
  };
};
