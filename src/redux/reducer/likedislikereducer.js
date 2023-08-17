import { likedislikesuccess } from "../type";

const initialState={
    loading:false,
    data:null,
    error:null
}



const LikedislikeReducer=(state=initialState,action)=>{
 switch(action.type){
    case likedislikesuccess:
        return{
            ...state,
            data:action.payload,
            loading:false
        }
        default:
            return state
 }
}


export default LikedislikeReducer