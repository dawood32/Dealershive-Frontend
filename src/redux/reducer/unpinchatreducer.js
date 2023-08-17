import {unpinchatsuccess} from '../type';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const UnPinChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case unpinchatsuccess:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default UnPinChatReducer;
