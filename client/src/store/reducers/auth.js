import * as actionTypes from "../actions/actionTypes"
import { updateObject } from "../utility";

const initialState = {
    token: null,
    loading: false,
    error: null,
    success: null
}

const authStart = (state, action) => {
    return updateObject( state, { error: null, loading: true } );
}

const authSuccess = () => {

}

const authFail = (state, action) => {
    console.log(action.error)
    console.log(state.error)
    return updateObject( state, {
        error: action.error,
        loading: false
    });
}

const authLogout = () => {

}
 
const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: 
        return state;
    }
};

export default reducer;