import { userprofiledatasuccess } from "../type";

const initialState={
    loading:false,
    data:null,
    error:null
}



const UserProfileReducer=(state=initialState,action)=>{
switch(action.type){
    case userprofiledatasuccess:
        return{
            ...state,
            data:action.payload,
            loading:false
        }
        default:
            return state
}
}


export default UserProfileReducer