import { emailsignup } from "../type";

const initialState={
    loading:false,
    data:null,
    error:null
}

const emailSignupreducer=(state=initialState,action)=>{
 switch(action.type){
    case emailsignup:
        return{
            ...state,
            loading:false,
            data:action.payload.data
        }
        default:
            return state
 }
}

export default emailSignupreducer