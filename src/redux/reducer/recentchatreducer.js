import {recentchatsuccess} from '../type';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const RecentChatReducer = (state = initialState, action) => {
  console.log(action, 'ku89');
  switch (action.type) {
    case recentchatsuccess:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default RecentChatReducer;
