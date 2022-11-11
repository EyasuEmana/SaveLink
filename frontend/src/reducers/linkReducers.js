const initialState={
    links:[],
    islinkloaded:false,
    isLinkAdded:false,
    islinkdeleted:false
}
export const linkReducer=(state=initialState,action)=>{
    const {type,payload}=action;
    switch(type){
        case "LINKS_LOAD_SUCCESS":
           return {
             ...state,
            links:JSON.parse(payload),
            islinkloaded:true
           }
        case "LINKS_LOAD_FAIL":
            return {
                ...state,
                islinkloaded:false
            }
        case "LINK_ADD_SUCCESS":
            return {
                ...state,
                isLinkAdded:true
            }
        case "LINK_ADD_FAIL":
            return {
                ...state
            }
        case "LINK_DELETE_SUCCESS":
            console.log("data after delete: ",JSON.parse(payload));
            return {
                ...state,
                links:JSON.parse(payload),
                islinkdeleted:true,
            }
        case "LINK_DELETE_FAIL":
            return {
                ...state,
                islinkdeleted:true
            }
        default:
            return state
         
    }
}