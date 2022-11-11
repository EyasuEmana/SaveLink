import {composeWithDevTools} from "redux-devtools-extension"
import {combineReducers} from "redux"
import { createStore, applyMiddleware,compose} from "redux"
import thunk from "redux-thunk";
import { authReducer } from "./reducers/auth";
import { linkReducer } from "./reducers/linkReducers";
import { catReducer } from "./reducers/categoryReducer";


const initialState={};
const finalReducer=combineReducers({
    authReducer:authReducer,
    linkReducer:linkReducer,
    catReducer:catReducer
});


const composeEnhancers = composeWithDevTools({});
const store = createStore(finalReducer,initialState,composeEnhancers(applyMiddleware(thunk)));
export default store;