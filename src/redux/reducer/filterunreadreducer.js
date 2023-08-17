import {filterunreadsuccess} from '../type';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const FilterUnreadReducer = (state = initialState, action) => {
  switch (action.type) {
    case filterunreadsuccess:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default FilterUnreadReducer;
