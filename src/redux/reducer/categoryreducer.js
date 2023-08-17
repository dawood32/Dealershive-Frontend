import {categorysuccess} from '../type';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case categorysuccess:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default CategoryReducer;
