import {markreadsuccess} from '../type';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const MarkReadReducer = (state = initialState, action) => {
  switch (action.type) {
    case markreadsuccess:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default MarkReadReducer;
