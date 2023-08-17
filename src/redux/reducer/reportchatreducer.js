import {reportchatsuccess} from '../type';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const ReportChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case reportchatsuccess:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    default:
      return state;
  }
};
export default ReportChatReducer;
