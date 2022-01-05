import { csrfFetch } from './csrf';

const SET_USERS = 'users/setUsers';

const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

export const getUsers = () => async (dispatch) => {
  const res = await csrfFetch('/api/users');

  const { users } = await res.json();
  if (res.ok) dispatch(setUsers(users));
  return users;
}

const initialState = {
  byId: {},
  allIds: [],
};

const usersReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case SET_USERS:
      newState = { ...state };
      action.users.forEach((user) => {
        newState.byId[user.id] = user;
      });
      newState.allIds = Object.keys(newState.byId);
      return newState;
    default:
      return state;
  }
};

export default usersReducer;