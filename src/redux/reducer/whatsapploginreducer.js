import { whatsapploginsuccess } from "../type";

const initialState={
    loading:false,
    data:null,
    error:null

}

const WhatsAppLoginReducer=(state=initialState,action)=>{
switch(action.type){
    case whatsapploginsuccess:
        return{
            ...state,
            data:action.payload,
            loading:false
        }

      default:
        return state
}
}


export default WhatsAppLoginReducer