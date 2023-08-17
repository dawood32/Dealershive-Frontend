import { searchsuggestsuccess } from "../type";
const initialState={
    loading:false,
    data:null,
    error:null
}


const SearchSuggestionReducer=(state=initialState,action)=>{
switch(action.type){
    case searchsuggestsuccess:
        return{
            ...state,
            data:action.payload,
            loading:false
        }
        default:
            return state
}
}


export default SearchSuggestionReducer