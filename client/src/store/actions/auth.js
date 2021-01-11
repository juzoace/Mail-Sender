import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as urls from "../../api/index";
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};


export const authFail = (error) => {
    console.log(error)
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
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
    return dispatch => {
        const token = localStorage.getItem('token');
        console.log(token)
        console.log("Got here")
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
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
// export const register = (reg =>isterDetails) => {
//     console.log("Got here")
// //    let res = await axios.post(urls.registerurl, registerDetails)
// //     console.log(registerDetails)
//     return dispatch => {
//         dispatch(authStart());
//         axios.post(urls.registerurl, registerDetails)
//         .then(res => {
//             console.log(res)
//             const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        
//         })
//         .catch(err => {
//             console.log(err)
//             console.log("After line 68")
//             // dispatch(authFail(err.msg));
//         })
//         // .then(res => {
//         //    console.log(res) 
//         // })
//     }
// }

export const register = (registerDetails) => {
   
    return async dispatch => {
        console.log("Got here frontend dispatch block")
        try {
            let res = await axios.post(urls.registerurl, registerDetails)
            console.log(res)
        } catch (error) {
            console.log(error.response)
            console.log(error.response.data.msg)
            dispatch(authFail(error.response.data.msg + `-${new Date().getTime()}`))
        }
        // let res = await axios.post(urls.registerurl, registerDetails)
        // console.log(res);

        // Error handling to display data to front End
        // if (res.data.type === "Error") {
        //     dispatch(authFail(res.data.msg))
        //     console.log(res.data.msg)
        // } 


        // Successful Registration

    }
}

// export const authFail = (error) => {
//     return {
//         type: actionTypes.AUTH_FAIL,
//         error: error
//     };
// };