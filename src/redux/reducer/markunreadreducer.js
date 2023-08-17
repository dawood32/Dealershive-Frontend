import {markunreadsuccess} from '../type';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const MarkUnReadReducer = (state = initialState, action) => {
  switch (action.type) {
    case markunreadsuccess:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default MarkUnReadReducer;
