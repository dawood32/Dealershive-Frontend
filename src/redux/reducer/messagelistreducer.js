import {messagelistsuccess} from '../type';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const MessageListReducer = (state = initialState, action) => {
  switch (action.type) {
    case messagelistsuccess:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default MessageListReducer;
