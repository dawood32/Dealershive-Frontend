import {unmutechatsuccess} from '../type';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const UnmuteChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case unmutechatsuccess:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default UnmuteChatReducer;
