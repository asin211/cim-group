export const loginStart = () => ({
  type: "LOGIN_START",
});
export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});
export const loginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const registerStart = () => ({
  type: "REGISTER_START",
});
export const registerSuccess = () => ({
  type: "REGISTER_SUCCESS",
});
export const registerFailure = () => ({
  type: "REGISTER_FAILURE",
});

//logout
export const logout = () => ({
  type: "LOGOUT",
});
