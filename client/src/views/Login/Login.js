import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector, useDispatch } from 'react-redux';
import PropTypes from "prop-types";
import {Alert} from "reactstrap";
import * as actions from "../../store/actions/index"
import "./Login.css";
const Login = ({onLogin,setToken, loginUser, onSetLoginErrorToNull}) => {

const dispatch = useDispatch()    
let formDetails = useSelector(state => state.auth.loginFormDetails)

const initialState = {
    name: "",
    username: "",
    email: "",
    password: "",
}

let failureAlertMessage = useSelector(state => state.auth.loginError);
const [ loginDetails, setLoginDetails ] = useState(initialState);
const [ passwordShown, setPasswordShown ] = useState(false);
const [ alerts, setAlerts ] = useState(null);

const togglePasswordVisiblity = () => {
  setPasswordShown(passwordShown ? false : true);
};

    useEffect(() => {
        console.log(failureAlertMessage)
    }, [])

    useEffect(() => {
        if (failureAlertMessage) {
          setAlerts({ message: failureAlertMessage.split("-")[0], type: "danger" })
        }
      }, [failureAlertMessage])

    // useEffect(() => {
    //     if (successAlertMessage) {
          
    //       let  successAlertMessage = "Registration successfully, kindly check your mailbox to confirm your registration";
    //       setAlerts({ message: successAlertMessage, type: "success" })
    //     }
    //   }, [successAlertMessage])

    const TimeoutAlert = function ({ message, type }) {

        const timer = setTimeout(onClick, 3000);
        
        function onClick() {
          clearTimeout(timer)

          onSetLoginErrorToNull()
    
          setAlerts(null)};
     
      return (
        <div>
          <Alert  color={type} onClick={onClick} variant={type}>
            {message}
          </Alert>
        </div>
      )
    }

// Toggle Password Visibility

    const onSubmit = async (e) => {
        
        e.preventDefault();

        onLogin(loginDetails)
    }

    return (

        <div clasName="App">
            <header>
                <div class="header">
                    Login
                </div> 
            </header>

            <div>
             {alerts && <TimeoutAlert message={ alerts.message} type={ alerts.type}  />}
             </div>
         
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
                <Link className="reset-password" to="/reset">Forgot Password?</Link>
                </div>
            </div>
                
            </form>
        </div>
    )
    
};

Login.propTypes = {
    loginUser: PropTypes.func.isRequired
}

const mapStateToProps = state => {

};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (loginDetails) => dispatch(
            actions.login(loginDetails)
        ),
        onSetLoginErrorToNull: () => dispatch(
            actions.setLoginErrorToNull()
        )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Login );