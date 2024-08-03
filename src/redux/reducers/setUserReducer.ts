// import { User } from "../../models/user";

// const initialState = {
//   user: new User()
// };

// export const setUserReducer = (state = initialState, action: { type: string; user: User }) => {
//   switch (action.type) {
//     case 'SET_USER':
//       return { 
//         ...state, 
//         user: action.user
//       };

//     default:
//       return state;
//   }
// };

import { User } from "../../models/user";
import { SET_USER } from '../actions/setUserAction'; // Import action type

// Initial state with an empty user
const initialState = {
  user: new User()
};

// Reducer function
export const setUserReducer = (state = initialState, action: { type: string; user?: User }) => {
  switch (action.type) {
    case SET_USER:
      return { 
        ...state, 
        user: action.user || new User()
      };
    
    case 'CLEAR_USER':
      return { 
        ...state, 
        user: new User() // Reset user to initial state
      };

    default:
      return state;
  }
};
