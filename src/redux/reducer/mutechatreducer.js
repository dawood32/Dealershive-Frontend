import {mutechatsuccess} from '../type';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const MuteChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case mutechatsuccess:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default MuteChatReducer;
