import {sendmessagesuccess} from '../type';
const initialState = {
  loading: false,
  data: null,
  error: null,
};

const SendMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case sendmessagesuccess:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default SendMessageReducer;
