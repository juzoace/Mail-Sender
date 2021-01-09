import { createStore, applyMiddleware, compose,  combineReducers } from "redux";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers";
import auth from "./store/reducers/auth"
import thunk from 'redux-thunk'
// const middlewares = [ thunk ];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth
})
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));
export default store;
