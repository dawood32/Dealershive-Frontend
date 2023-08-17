import { resendwhatsappotpsuccess } from "../type";

const initialState={
    loading:false,
    data:null,
    error:null
}



const ResendWhatsappReducer=(state=initialState,action)=>{
    switch(action.type){
        case resendwhatsappotpsuccess:
            return{
                ...state,
                data:action.payload,
                loading:false
            }
    }
}

export default ResendWhatsappReducer