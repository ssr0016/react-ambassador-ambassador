// import { User } from "../../models/user";

// export const SET_USER = 'SET_USER';

// export const setUser = (user: User) => ({
//   type: SET_USER,
//   user
// });

import { User } from "../../models/user";

export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

export const setUser = (user: User) => ({
  type: SET_USER,
  user
});

export const clearUser = () => ({
  type: CLEAR_USER
});
