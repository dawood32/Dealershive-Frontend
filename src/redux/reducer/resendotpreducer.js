
import { resendotpsuccess } from "../type";

const initialState={
    loading:false,
    data:null,
    error:null
}


const Resendotpreducer=(state=initialState,action)=>{
 switch(action.type){
    case resendotpsuccess:
        return{
            ...state,
            loading:false,
            data:action.payload,
        }
        default:
            return state
 }
}
export default Resendotpreducer