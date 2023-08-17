import { homedatasuccess } from "../type";

const initialState={
    
    data:null,

}



const HomeDataReducer=(state=initialState,action)=>{
switch(action.type){
    case homedatasuccess:
        return{
            ...state,
           data:action.payload,
         
        }
        default:
            return state
}
}


export default HomeDataReducer