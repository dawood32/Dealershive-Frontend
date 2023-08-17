import { loginemailsuccess } from "../type";

const initialState={
    loading:false,
    data:null,
    error:null
}


const LoginEmailReducer=(state=initialState,action)=>{

    switch(action.type){
        case loginemailsuccess:
            return{
                ...state,
                data:action.payload,
                loading:false
            }
            default:
                return state
    }
  
}

export default LoginEmailReducer