import { editprofilesuccess } from "../type";

const initialState={
    loading:false,
    data:null,
    error:null
}



const EditProfileReducer=(state=initialState,action)=>{
switch(action.type){
    case editprofilesuccess:
        return{
            ...state,
            data:action.payload,
            loading:false
        }
        default:
            return state
}
}


export default EditProfileReducer