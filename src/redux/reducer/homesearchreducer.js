import { homesearchsuccess } from "../type";


const initialState={
    loading:false,
    data:null,
    error:null
}


const HomeSearchReducer=(state=initialState,action)=>{
switch(action.type){
    case homesearchsuccess:
        return{
            ...state,
            data:action.payload,
            loading:false
        }
        default:
        return state
}
}


export default HomeSearchReducer