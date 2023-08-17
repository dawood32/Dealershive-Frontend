import {chatmediasuccess} from '../type';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const ChatMediaReducer = (state = initialState, action) => {
  switch (action.type) {
    case chatmediasuccess:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default ChatMediaReducer;
