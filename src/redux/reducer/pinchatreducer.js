import {pinchatsuccess} from '../type';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const PinChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case pinchatsuccess:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default PinChatReducer;
