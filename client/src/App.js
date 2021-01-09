// import React, { Suspense } from 'react';
// import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
// import { useState } from "react";
// // import Ingredients from './components/Ingredients/Ingredients';

// const Register = React.lazy(() => import("./views/Register/Register"));
// const Login = React.lazy(() => import("./views/Login/Login"));
// const NotFound = React.lazy(() => import("./views/NotFound/NotFound"));
// const Mailer = React.lazy(() => import ("./views/Mailer/Mailer"))
// const loading = () => <div className='animated fadeIn pt-3 text-center'>Loading...</div>;

// const App = (props) => {

//   const [token, setToken ] = useState();

//   if (!token) {
//     return (
//       <Suspense fallback={loading()}>
//       <Login setToken={setToken} />
//       </Suspense>
//     ) 
//   }

//   return (

    
// 			<Suspense fallback={loading()}>
//         <BrowserRouter>
//         <Switch>
//           <Route exact path='/register' name='Register' render={(props) => <Register {...props} />} />
//           <Route exact path='/login' name='Login' render={(props) => <Login {...props} />} />
//           <Route exact path='/' name='Mailer' render={(props) => <Mailer {...props} />} />
//           <Route exact path='/*' name='NotFound' render={(props) => <NotFound {...props} />} />
//         </Switch>
//         </BrowserRouter>
//       </Suspense>
     
//   );

// };

// export default App;


import React, { Component, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import authActionTypes from "./actions/auth/types";
// import * as actions from "./actions/auth/index"
import { authenticate } from 'passport';
import * as actions from "./store/actions/index";
const Register = React.lazy(() => import("./views/Register/Register"));

const Login = React.lazy(() => import("./views/Login/Login"));
const NotFound = React.lazy(() => import("./views/NotFound/NotFound"));
const Mailer = React.lazy(() => import ("./views/Mailer/Mailer"))
const loading = () => <div className='animated fadeIn pt-3 text-center'>Loading...</div>;

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
 }

render () {
  console.log(this.props.tokenValue)
  let routes = (
    <Suspense fallback={loading()}>
    <Switch>
       <Route exact path='/register' component={Register}/>
       <Route exact path='/login' name='Login' component={Login}/>
       <Redirect to="/login" />
       <Route exact path='/*' name='' component={NotFound}/>
    </Switch>
    </Suspense>
  );

  if ( this.props.isAuthenticated ) {
    // console.log(this.props.isAuthenticated);
    console.log("Here")
    routes = (
      <Suspense fallback={loading()}>
      <Switch>
        <Route path='/' name='Mailer' component={Mailer} />
        <Redirect to="/" />
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
    tokenValue: state.auth.token
    // isAuthenticated:null
    // isAuthenticated: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( {
      type: actions.authCheckState(),
    }
      
   
     )
  };
};

 export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
