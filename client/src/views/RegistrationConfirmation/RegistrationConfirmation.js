import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";

const RegistrationConfirmation = ({onConfirmToken,  match}) => {

   
    const [loading, loadingState ] = useState(true);
    const [success, successState ] = useState(false);

    useEffect(() => {

        let tokenFromParams = match.params;
        

        onConfirmToken({tokenItem: tokenFromParams.token })

        .then((response) => {
    
            if (response.statusText === 'OK') {
                loadingState(false)
                successState(true)
            } 
          
        })
        .catch((err) => {
           
            loadingState(false)
            successState(false)
        }) 
            
    }, [])

    return (
        <div>
            <h1>Registration Confirmation Page</h1>
            {loading && (
                <div>Validating your email</div>
            )}

            {!loading && 
            success && (
                <div>
                    Thank you. Your account has been verified
                    <Link to="/login">Proceed</Link>
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
};

RegistrationConfirmation.propTypes = {
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
       onConfirmToken: (getToken) => dispatch(
           actions.confirmTokens(getToken)
       )
    };
};



export default connect( mapStateToProps, mapDispatchToProps)( RegistrationConfirmation);