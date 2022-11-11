const initialState={ 
    cats:[],
    categoryOption:[{id: 0,
        label: "Loading",}],
    isCatAdded:false,
    isCatLoaded:false,
    isCatLinkLoaded:false,
    catLinks:[]
   

}
export const catReducer=(state,action)=>{
const {type,payload}=action;
switch(type){
    case "CATEGORY_ADDED_SUCCESS":
        return {
            ...state,
            isCatAdded:true
        }
    case "CATEGORY_ADDED_FAIL":
        return {
            ...state,
            isCatAdded:false
        }
    case "CATEGORY_LOAD_SUCCESS":
        const category=JSON.parse(payload);
        const catArray= [];
        if (category) {
            for (var i = 0; i < category.length; i++) {
              catArray.push({ id: category[i].id, cat: category[i].category });
            }
          }
          const catOption=catArray.map((cat, index) => ({
            id: cat.id,
            label: cat.cat,
          }));

          
        return{
            ...state,
            cats:catArray,
            categoryOption:catOption,
            isCatLoaded:true
            
        }
    case "CATEGORY_LOAD_FAIL":
        return{
            ...state,
            isCatLoaded:false
        }
    case "CATLINKS_LOAD_SUCCESS":
        return{
            ...state,
            isCatLinkLoaded:true,
            catLinks:JSON.parse(payload)
        }
    default:
    return {
        ...state
    }
}
}