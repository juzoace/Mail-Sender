import React, { useState, useEffect }from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { connect } from "react-redux";
import { connect, useSelector, useDispatch} from 'react-redux'
import * as actions from "../../store/actions/index"
import "./Register.css";
import {Alert} from "reactstrap";
import PropTypes from "prop-types";
const Register = ({onRegister, onSetErrorToNull}, props) => {

  const {
		authError
	} = props;

  let alertMessage = useSelector(state => state.auth.error);
  console.log(alertMessage);
    // const { authError } = props
    const initialState = {
        name: "",
        username: "",
        email: "",
        password: "",
    }


    const [ registerDetails, setRegisterDetails ] = useState(initialState);
    const [ passwordShown, setPasswordShown ] = useState(false);
    const [ alerts, setAlerts ] = useState(null);

    useEffect(() => {
      if (alertMessage) {
        setAlerts({ message: alertMessage.split("-")[0], type: "danger" })
      }
    }, [alertMessage])
    
	  const TimeoutAlert = function ({ message, type }) {

        const timer = setTimeout(onClick, 3000);
      function onClick() {
          clearTimeout(timer)

          onSetErrorToNull();
    
          setAlerts(null)};

      return (
        <div>
          <Alert  color={type} onClick={onClick} variant={type}>
            {message}
          </Alert>
        </div>
      )
    }

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };

    const onSubmit = (e) => {

        e.preventDefault();

        onRegister(registerDetails)
       
        setTimeout(() => {
         
          onSetErrorToNull();
          console.log(alertMessage)
        }, 3000)


        // this.props.history.push('/checkout');

    }  
    return (
        <div clasName="App">
             <header>
                <div class="header">
                        Register
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
                  value={registerDetails.name}
                  placeholder="Enter Name"
                  onChange={(e) => setRegisterDetails({...registerDetails, name: e.target.value })}
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
                  value={registerDetails.userName}
                  placeholder="Enter Username"
                  onChange={(e) => setRegisterDetails({...registerDetails, username: e.target.value })}
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
                  value={registerDetails.email}
                  placeholder="Enter Email"
                  onChange={(e) => setRegisterDetails({...registerDetails, email: e.target.value })}
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
                  value = {registerDetails.password}
                  placeholder = "Enter Password"
                  onChange = {(e) => setRegisterDetails({...registerDetails, password: e.target.value })}
                />
                <a href="#" className="toggle1" onClick={() => togglePasswordVisiblity()}>{passwordShown ? "Hide" : "Show"}</a>
              </div>
              <div className="form-buttons">
                
                <div className="login">
                <button
                type="submit"
                color="primary"
                >
                Register
                </button>
                </div>
                <div className="login-account">
                <Link className="login" to="/login">Logon Account</Link>
                </div>
                <div className="reset-account">
                <Link className="reset-password" to="/reset">Forgot Password</Link>
                </div>
               
              </div>


</form>
        </div>
    )
} 

Register.propTypes = {
  authError : PropTypes.string,
}

const mapStateToProps = state => {
    // return {
    //     authError: state.auth.error
    // }
};

const mapDispatchToProps = dispatch => {
    return {
       onRegister: (registerDetails) => dispatch(
           actions.register(registerDetails)
           ), 
       onSetErrorToNull: () => dispatch(
          actions.setErrorToNull()
       )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Register );