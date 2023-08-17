
import { otpsignupsuccess } from "../type"
const initialState={
 loading:false,
 data:null,
 error:null
}


const otpsignupemailreducer=(state=initialState,action)=>{
switch(action.type){
    case otpsignupsuccess:
        return {
            ...state,
            loading:false,
            data:action.payload
            
        }
        default:
            return state
            
}
}


export default otpsignupemailreducer
