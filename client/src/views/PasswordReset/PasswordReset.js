import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";

const PasswordReset = ({onResetPassword}) => {

    const initialState = {
       username: '' 
    };

    const [ resetDetails, setResetDetails ] = useState(initialState)
    const [success, successState ] = useState(false);
    const [ errorPasswordReset, errorPasswordResetState ] = useState(false);
    // useEffect(() => {

    // }, [])

    const onSubmit = (e) => {
        
        e.preventDefault();
        successState(true)
        onResetPassword(resetDetails)


        .then((response) => {
            console.log(response)
            successState(true);
            errorPasswordResetState(false);
        })
        .catch((err) => {
            


            errorPasswordResetState(true);
            successState(false);



        })
    }
    return (
        <div>

            <h1>Reset Password</h1>
            <p>Kindly provide your registered username</p>

            {/* {!success && errorPasswordReset(
                <div>
                    
                </div>
            )} */}

            {success && 
            !errorPasswordReset  &&(
                <div>Password reset instructions has been sent to corresponding Email address. </div>
            )} 


            {!success && (
                <div>
                    <form className="form" onSubmit={onSubmit}>
                        <div className="form-group">
                            <br></br> 
                            <label for='subject'>Username<span class="required">*</span></label>
  
                            <br></br>

                            <input
                            className="form-input"
                            type="text"
                            required={true}
                            id="userName"
                            value={resetDetails.username}
                            placeholder="Enter Username"
                            onChange={(e) => setResetDetails({...setResetDetails, username: e.target.value})}
                            />
                        </div>
                        <br></br> 
                        <div className="login">
                        <button
                        type="submit"
                        color="primary"
                        >
                        Reset Password
                        </button>
                </div>
                    </form>
                </div>
            )}

            {!success && 
            errorPasswordReset && (
                <div>
                    Something went wrong, retry
                </div>
            )}
        </div>
    )
}

PasswordReset.propTypes = {

}

const mapStateToProps = state => {

};

const mapDispatchToProps = dispatch => {
    return {
        onResetPassword: (resetDetails) => dispatch(
            actions.resetPassword(resetDetails)
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps ) (PasswordReset);