import * as actionTypes from "../actions/actionTypes"
import { authLoginSuccess } from "../actions/auth";
import { updateObject } from "../utility";

const initialState = {
    token: null,
    _id: null,
    loading: false,
    error: null,
    success: null,
    registerSuccess: null,
    loginFormDetails: null,
    loginError: null,
    loginSuccess: null,
    emailTokenStatus: null
}

const authStart = (state, action) => {
    return updateObject( state, { error: null, loading: true } );
}

const authRegisterSuccess = (state, action ) => {
    return updateObject(
         state, { registerSuccess: action.success, loading: true } );
}

const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.idToken,
        _id: action._id,
        error: null,
        loading: false
     } );
}

const authLoginPage = (state, action ) => {
    console.log()
    return updateObject(
        state, { loginFormDetails: action.loginFormDetails
    })
}
 
const authFail = (state, action) => {
    console.log(action.error)
    console.log(state.error)
    return updateObject( state, {
        error: action.error,
        loading: false
    });
}

const authErrorChange = (state, action) => {
    return updateObject( state, {
        error: ''
    });
}

const authLogout = (state, action) => {
    return updateObject(state, { token: null, _id: null });
}
 
const authLoginFail = (state, action) => {
    return updateObject(state, {
        loginError: action.loginError
    })
}

const authLoginSuccessful = (state, action) => {
    return updateObject(state, {
        token: action.token,
        _id: action._id
        
    })
}

const authLoginSuccessAlert = (state, action) => {
    return updateObject(state, {
        loginSuccess: action.msg
    })
}

const reducer = (state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.AUTH_REGISTER_SUCCESS: return authRegisterSuccess(state, action);
        case actionTypes.AUTH_ERRORNULL: return authErrorChange(state, action);
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.AUTH_LOGIN_PAGE: return authLoginPage(state, action);
        case actionTypes.AUTH_LOGIN_FAIL: return authLoginFail(state, action);
        case actionTypes.AUTH_LOGIN_SUCCESS: return authLoginSuccessful(state, action);
        case actionTypes.AUTH_LOGIN_SUCCESS_ALERT: return authLoginSuccessAlert(state, action);
        default: 
        return state;
    }
};

export default reducer;