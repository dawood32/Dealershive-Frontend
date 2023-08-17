import {chatsearchsuccess} from '../type';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const ChatSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case chatsearchsuccess:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default ChatSearchReducer;
