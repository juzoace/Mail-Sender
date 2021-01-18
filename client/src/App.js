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
const Mailer = React.lazy(() => import ("./views/Mailer/Mailer"))
const Welcome = React.lazy(() => import ("./views/Welcome/Welcome"))
const PasswordReset =  React.lazy(() => import ("./views/PasswordReset/PasswordReset"))
const loading = () => <div className='animated fadeIn pt-3 text-center'>Loading...</div>;

class App extends Component {
  componentDidMount () {
   
    this.props.onTryAutoSignup(); 
 }

render () {
  console.log(this.props.tokenValue)
  let routes = (
    <Suspense fallback={loading()}>
    <NavBar />
    <Switch>
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
    console.log("Here")
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
    // onAuthSuccess: () => dispatch( actions.authSuccess()),
    // onCheckTimeOut:() => dispatch({
    //   type: actions.checkAuthTimeout()
    // }),
    // onLogOut: () => dispatch({
    //   type: actions.logout()
    // })
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
