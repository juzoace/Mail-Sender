import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useSelector, useDispatch } from 'react-redux';
// Import the action 
// import { loginUser } from "../../actions/auth";
import PropTypes from "prop-types";
import axios from "axios"
// import authActionTypes from "../../actions/auth/types";
import "./Login.css";
const Login = ({setToken, loginUser}) => {

const dispatch = useDispatch()    

const initialState = {
    name: "",
    username: "",
    email: "",
    password: "",
    // confirm_password: ""
}

// const loginRequest = async () => {

// } 

const [ loginDetails, setLoginDetails ] = useState(initialState);
const [ passwordShown, setPasswordShown ] = useState(false);
// const [ confirmPasswordShown, setConfirmPasswordShown ] = useState(false);
const loginObject = useSelector(state => state.loginReducer)
const togglePasswordVisiblity = () => {
  setPasswordShown(passwordShown ? false : true);
};
// const toggleConfirmPasswordVisiblity = () => {
//   setConfirmPasswordShown(confirmPasswordShown ? false : true);
// };


    const onSubmit = async (e) => {
        e.preventDefault();
    // try {
    //     let res = await axios.post("http://localhost:4000/access/login", loginDetails)
    //     console.log(res.data.token);
    //     console.log(res.data);
    //     // setToken(res.data.token);
    //     const { data : payload} = res
    //     console.log(payload);
    //     dispatch({
    //         type: authActionTypes.loginUser,
    //         payload
    //     })
    //     const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
    //     localStorage.setItem('token', res.data.token)
    //     localStorage.setItem('expirationDate', expirationDate);
    //     localStorage.setItem('userId', res.data.user._id);
    //     // Dispatch 
    // } catch (error) {

    // }
    }

    return (

        <div clasName="App">
            <header>
                <div class="header">
                    Login
                </div> 
            </header>

         
            <form className="form" onSubmit={onSubmit}>

            <div className="form-group">
               <br></br> 
               <label for='subject'>Name<span class="required">*</span></label>
               <br></br>
               <input
                className="form-input"
                type="text"
                required={true}
                id="userName"
                value={loginDetails.name}
                placeholder="Enter Name"
                onChange={(e) => setLoginDetails({...loginDetails, name: e.target.value })}
               />
            </div>    
            <div className="form-group">
               <br></br> 
               <label for='subject'>Username<span class="required">*</span></label>
               <br></br>
               <input
                className="form-input"
                type="text"
                required={true}
                id="userName"
                value={loginDetails.userName}
                placeholder="Enter Username"
                onChange={(e) => setLoginDetails({...loginDetails, username: e.target.value })}
               />
            </div>
         
               <div className="form-group">
               <br></br> 
               <label for='subject'>Email<span class="required">*</span></label>
               <br></br>
               <input
                className="form-input"
                type="email"
                required={true}
                id="email"
                value={loginDetails.email}
                placeholder="Enter Email"
                onChange={(e) => setLoginDetails({...loginDetails, email: e.target.value })}
               />
                </div>

                
               <div className="form-group">
               <br></br> 
               <label for='subject'>Password<span class="required">*</span></label>
               <br></br>
               <input
                className ="form-input"
                type = {passwordShown ? "text" : "password"}
                required = {true}
                id = "password"
                value = {loginDetails.password}
                placeholder = "Enter Password"
                onChange = {(e) => setLoginDetails({...loginDetails, password: e.target.value })}
               />
               <a href="#" className="toggle1" onClick={() => togglePasswordVisiblity()}>{passwordShown ? "Hide" : "Show"}</a>
               </div>

               {/* <div className="form-group">
               <br></br> 
               <label for='subject'>Confirm Password<span class="required">*</span></label>
               <br></br>
               <input
                className ="form-input"
                type = {confirmPasswordShown ? "text" : "password"}
                // type= "password"
                required = {true}
                id = "password"
                value = {loginDetails.confirm_password}
                placeholder = "Re-type Password"
                onChange = {(e) => setLoginDetails({...loginDetails, confirm_password: e.target.value })}
               />
               <a href="#" className="toggle2"  onClick={() => toggleConfirmPasswordVisiblity()}>{confirmPasswordShown ? "Hide" : "Show"}</a>
               </div> */}
                <div className="form-buttons">
                
                <div className="login">
                <button
                type="submit"
                color="primary"
                >
                Login
                </button>
                </div>
                <div className="create-account">
                <Link className="register" to="/register">Need a new account?</Link>
                </div>
                <div className="reset-account">
                <Link className="reset-password" to="/password-reset">Forgot Password?</Link>
                </div>
                {/* </span> */}
                </div>
                
            </form>
        </div>
    )
    
};

Login.propTypes = {
    // setToken: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired
}

export default Login;