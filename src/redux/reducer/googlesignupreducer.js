import {googlesignupsuccess} from '../type';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const GoogleSignupReducer = (state = initialState, action) => {
  switch (action.type) {
    case googlesignupsuccess:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default GoogleSignupReducer;
