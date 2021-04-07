import React, { Component, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { authenticate } from 'passport';
import NavBar from "./components/NavBar/NavBar";
import * as actions from "./store/actions/index";
import setAuthToken from './utils/setAuthToken'
const Register = React.lazy(() => import("./views/Register/Register"));

const Login = React.lazy(() => import("./views/Login/Login"));
const NotFound = React.lazy(() => import("./views/NotFound/NotFound"));
const Mailer = React.lazy(() => import ("./views/Mailer/Mailer"));
const Welcome = React.lazy(() => import ("./views/Welcome/Welcome"));
const PasswordReset =  React.lazy(() => import ("./views/PasswordReset/PasswordReset"));
const RegistrationConfirmation = React.lazy(() => import("./views/RegistrationConfirmation/RegistrationConfirmation"));
const loading = () => <div className='animated fadeIn pt-3 text-center'>Loading...</div>;

class App extends Component {
  componentDidMount () {
   console.log('Try am')
    this.props.onTryAutoSignup(); 
 }

render () {
  console.log(this.props.tokenValue)
  console.log('hey man')
  let routes = (
    <Suspense fallback={loading()}>
    <NavBar />
    <Switch>
       <Route exact path='/confirmregistration/:token' name='Registration Confirmation' component={RegistrationConfirmation}/>
       <Route exact path='/register' component={Register}/>
       <Route exact path='/login' name='Login' component={Login}/>
       <Route exact path='/reset' name='Reset Password' component={PasswordReset}/>
       <Route exact path='/' name='Welcome' component={Welcome}/>
       <Redirect to="/login" />
       <Route exact path='/*' name='' component={NotFound}/>
    </Switch>
    </Suspense>    
  );
// console.log(this.props.isAuthenticated);
  if ( this.props.isAuthenticated ) {
    console.log("Here");
    routes = (
      <Suspense fallback={loading()}>
      <Switch>
        <Route path='/mailer' name='Mailer' component={Mailer} />
        <Redirect to="/mailer" />
      </Switch>
      </Suspense>
    );     
  }

  return (
    <div>
      {routes}
    </div>
  )
}

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    // isAuthenticated: state.auth.token,
    tokenValue: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState()),
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
