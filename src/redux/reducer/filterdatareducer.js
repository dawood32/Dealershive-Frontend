import { filterdatasuccess } from "../type";

const initialState={
    loading:false,
    data:null,
    error:null
}

const FilterDataReducer=(state=initialState,action)=>{
 switch(action.type){
    case filterdatasuccess:
        return{
            ...state,
            data:action.payload,
            loading:false,
        }
        default:
            return state
 }
}

export default FilterDataReducer