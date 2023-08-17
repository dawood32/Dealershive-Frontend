import { rememberme } from "../type";

const initialState={
    loading:false,
    data:true,
    error:null
}

const RembermeReducer=(state=initialState,action)=>{
switch(action.type){
    case rememberme:
        return {
            ...state,
            data:action.payload,
            
            loading:false
        }
        default:
            return state
}


}

export default RembermeReducer