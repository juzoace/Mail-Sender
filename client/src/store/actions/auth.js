import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as urls from "../../api/index";
import setAuthToken from '../../utils/setAuthToken';
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, _id) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        _id: _id
    };
};

export const authRegisterSuccess = (success) => {
    return {
        type: actionTypes.AUTH_REGISTER_SUCCESS,
        success: success
    }
};

export const authLoginPage = (loginFormDetails) => {
    return {
        type: actionTypes.AUTH_LOGIN_PAGE,
        loginFormDetails: loginFormDetails
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('_id');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authCheckState = () => {
    console.log('Got to the authCheck Block')
    return dispatch => {
        console.log('Got to the authCheck Block')
        const token = localStorage.getItem('token');
        console.log(token)
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                setAuthToken(token);
                const _id = localStorage.getItem('_id');
                dispatch(authSuccess(token, _id));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};

export const errorToNull  = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const setErrorToNull = () => {
    return dispatch => {
        dispatch(errorToNull)
    }
}

export const register = (registerDetails) => {
   
    return async dispatch => {
        console.log("Got here frontend dispatch block")
        try {
            let response = await axios.post(urls.registerurl, registerDetails)
            console.log(response)
            
            if (response.data.success = true) {
                dispatch(authRegisterSuccess(response.data.msg))
                dispatch(authLoginPage(response.data.user))
            }

        } catch (error) {
            console.log(error)
            dispatch(authFail(error.response.data.msg + `-${new Date().getTime()}`))
        }

    }
}

export const LoginErrorToNull = () => {
    return dispatch => {
        dispatch(LoginErrorToNull)
    }
}

export const login = (loginDetails) => {
    return async dispatch => {
        try {
            let response = await axios.post(urls.loginurl, loginDetails)
            console.log(response);
            if (response.data.success = true) {

                const expirationDate= new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', expirationDate );
                localStorage.setItem('_id', response.data.user._id); 
                setAuthToken(response.data.token);
                dispatch(authLoginSuccess(response.data.token, response.data.user._id))
                dispatch(checkAuthTimeout(response.data.expiresIn));
            }
        } catch (error) {
            console.log(error.response.data.msg)
            dispatch(loginFail(error.response.data.msg + `-${new Date().getTime()}`))
        }
    }
}

export const authLoginSuccess = (token, _id) => {
    return {
        type: actionTypes.AUTH_LOGIN_SUCCESS,
        token: token,
        _id: _id
    }
}

export const loginFail = (loginError) => {
    return {
        type: actionTypes.AUTH_LOGIN_FAIL,
        loginError: loginError
    }
}

export const setLoginErrorToNull = () => {
    return dispatch => {
        dispatch(LoginErrorToNull)
    }
}