import {inboxsearchsuccess} from '../type';
const initialState = {
  loading: false,
  data: null,
  error: null,
};

const SearchInboxReducer = (state = initialState, action) => {
  switch (action.type) {
    case inboxsearchsuccess:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default SearchInboxReducer;
