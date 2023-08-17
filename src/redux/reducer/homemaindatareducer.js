import {homemaindatasuccess} from '../type';

const initialState = {
  data: null,
};

const HomeMainDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case homemaindatasuccess:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default HomeMainDataReducer;
