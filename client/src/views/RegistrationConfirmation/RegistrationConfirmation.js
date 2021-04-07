import React, {useState, useEffect} from 'react';
import { useSelector, connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import * as actions from "../../store/actions/index";
// import { confirm } from ''
const RegistrationConfirmation = ({onConfirmToken, props, match}) => {

    // const initialStae = {
    //     loading: true,
    //     success: false
    // }
    // const getToken = props.match.params.token;
    // let {tokenFromParams} = useParams();
    // let boy = tokenFromParams
    // console.log(boy);
    
    const [loading, loadingState ] = useState(true);
    const [success, successState ] = useState(false);
    useEffect(() => {
        // props.confirm(props.match.params.token)
        let tokenFromParams = match.params;
        
        console.log(tokenFromParams.token);

        onConfirmToken({tokenItem: tokenFromParams.token })
        .then(() =>  loadingState(false), successState(true))
        .catch(() => loadingState(false), successState(false))
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
                    <Link to="/">Proceed</Link>
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