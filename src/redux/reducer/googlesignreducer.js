import { googlesignsuccess } from "../type";

const initialState={
    loading:false,
    data:null,
    error:null
}


const GooglesigninReducer=(state=initialState,action)=>{
    switch(action.type){
case googlesignsuccess:
    return{
        ...state,
        data:action.payload,
        loading:false
    }
    default:
        return state
    }
}
export default GooglesigninReducer