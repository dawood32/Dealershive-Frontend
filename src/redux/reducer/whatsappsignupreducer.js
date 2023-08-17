import { whatsappsignupsuccess } from "../type";

const initialState={
    loading:false,
    data:null,
    error:null

}

const WhatsAppSignupReducer=(state=initialState,action)=>{
switch(action.type){
    case whatsappsignupsuccess:
        return{
            ...state,
            data:action.payload,
            loading:false
        }

      default:
        return state
}
}


export default WhatsAppSignupReducer