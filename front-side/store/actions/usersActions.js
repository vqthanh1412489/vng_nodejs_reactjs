import axios from "../../libs/axios";

import actions from "./index";

export const getUsers = () => async dispatch => {
  const users = await axios.get("/users");
  return dispatch({ type: actions.GET_USERS, users: users.data });
};

export const getUser = id => async dispatch => {
  const user = await axios.get(`/users/${id}`);
  return dispatch({ type: actions.GET_USER, user: user.data });
};
