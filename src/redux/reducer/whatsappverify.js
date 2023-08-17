import { whatsappsignupscuccess } from "../type";

const initialState={
    loading:false,
    data:null,
    error:null
}


const WhatsappVerify=(state=initialState,action)=>{
switch(action.type){
    case whatsappsignupscuccess:
        return{
            ...state,
            data:action.payload,
            loading:false
        }
        default:
            return state
}


}


export default WhatsappVerify