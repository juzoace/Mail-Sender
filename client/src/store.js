import { createStore, applyMiddleware, compose,  combineReducers } from "redux";
// import throttle from 'lodash.throttle';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import auth from "./store/reducers/auth"
import thunk from 'redux-thunk';
// import storage from 'redux-persist/lib/storage';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const rootReducer = combineReducers({
    auth
})

const persistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['auth'] // which reducer want to store
  };

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));
  
const persistor = persistStore(store);

export default store;
