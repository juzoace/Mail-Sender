import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";
import { Button, Card, CardBody, CardGroup,FormGroup, Input, FormText, Col, Container, FormFeedback, Form, Row, Alert, Label } from "reactstrap";
import "./PasswordChange.css";
const required = value => value ? undefined : 'Required';

const minLength = min => value => {
    return value && value.length < min ? `Must be ${min} characters or more` : undefined
}

const groupName = minLength(6);

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <Input
            type={type}
            placeholder={label}
            {...input}
        />
        {touched && error && <span><FormFeedback className="help-block" style={{ 'display': 'block' }}>{error}</FormFeedback></span>}
    </div>
)


const PasswordChange = ({ onConfirmResetToken, onPasswordChange, match}, props) => {
    console.log('Here is password change');
    const { handleSubmit, toggle, submitting } = props
    const initialState = {
        password: "",
        confirmPassword: "",
        token: ""
    }
    const [ passwordChangeDetails, setPasswordChangeDetails ] = useState(initialState);
    const [loading, loadingState ] = useState(false);
    const [success, successState ] = useState(true);
    const [ submitError, setSubmitError ] = useState(false);
    
    useEffect(() => {
        // console.log('Here is password change');
        let tokenFromParams = match.params;
        setPasswordChangeDetails({...passwordChangeDetails, token: tokenFromParams.token })
        // console.log(tokenFromParams);
        onConfirmResetToken({resetToken: tokenFromParams })
    
        .then((response) => {
            console.log(response)
            if (response.statusText === 'OK') {
                loadingState(false)
                successState(true)
                // Depict a successful password change using setTimeout and redirect
                
            } 

        })

        .catch((err) => {
            console.log(err)
            loadingState(false)
            successState(false)
        })

    }, [])

    // let tokenFromParams = match.params;
    const onSubmit = (e) => {
        // let tokenFromParams = match.params;
        // setPasswordChangeDetails({...passwordChangeDetails, token: tokenFromParams })
        
        e.preventDefault();
        console.log(passwordChangeDetails); 
        if (passwordChangeDetails.password === passwordChangeDetails.confirmPassword) {
            
            onPasswordChange(passwordChangeDetails)
            .then(() => {
                console.log('Password change was successful')
            })
            .catch( () => {

            })
         
    } else {
        // Submit errror tells us that there is an error, use state to show error
        setSubmitError(true);
    }

    }
    return (

        <div className="body">
             <header>
                <div class="header">
                        Change Your Password 
                </div>
             </header>
            {loading && (
                <div>Validating Token</div>
            )
            }

            {!loading && 
             success && (
                 
                 <div >
                     
                    {/* <Container> */}

                    <Form className="form" onSubmit={onSubmit}>
                    {/* <h1>Kindly fill the form below</h1> */}
                        <FormGroup className="form-group" row>
                            <Col md="3">
                                <Label htmlFor="password">Password<span style={{ color: 'red' }}>*</span></Label>
                            </Col>
                            <Col xs="12" md="9">
                             <Input
                             className="form-input"
                             type="password"
                             onChange={(e) => setPasswordChangeDetails({...passwordChangeDetails, password: e.target.value })}
                             placeholder="Enter Password"
                             value={passwordChangeDetails.password}
                             component={renderField}
                             label="Password"
                             validate={[required, groupName]}
                             />
                            </Col>
                                
                        </FormGroup>
                            <FormGroup className="form-group" row>
                                <Col md="3"> 
                                <Label htmlFor="password">Re-type Password<span style={{ color: 'red' }}>*</span></Label>
                                </Col>
                                <Input
                                className="form-input"
                                type="password"
                                onChange={(e) => setPasswordChangeDetails({...passwordChangeDetails, confirmPassword: e.target.value })}
                                placeholder="Enter Password"
                                value={passwordChangeDetails.confirmPassword}
                                component={renderField}
                                label="Password"
                                validate={[required, groupName]}
                                
                                />
                            </FormGroup>
                            <div className="form-buttons">
                                <button
                                type="submit"
                                color="primary"
                                >
                                Confirm
                                </button>
                            </div>
                    </Form>
                    {/* </Container> */}
                 </div>
            )
            }

            {!loading &&
            !success && (
                <div>
                    Oooops. Invalid token it seems.
                </div>
            )
            }
            
        </div>
    )

}

PasswordChange.propTypes = {
    confirm: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

const mapStateToProps = state => {

};

const mapDispatchToProps = dispatch => { 
    return {
        onConfirmResetToken: (resetToken) => dispatch(
            actions.confirmResetToken(resetToken)
        
        ),
        onPasswordChange: (passwordData) => dispatch(
            actions.PasswordChange(passwordData)
        )
    
 }
}
export default connect(mapStateToProps, mapDispatchToProps)(PasswordChange);