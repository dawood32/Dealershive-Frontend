import {deletechatsuccess} from '../type';

const initialState = {
  data: null,
};

const DeleteChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case deletechatsuccess:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default DeleteChatReducer;
