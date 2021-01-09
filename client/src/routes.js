// import React from 'react';
// import {Route, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";

// import Login from "./views/Login/Login";
// import Register from "./views/Register/Register";
// import NotFound from "./views/NotFound/NotFound";
// import Mailer from "./views/Mailer/Mailer";

// const Routes = (props) => (
//     <Router {...props}>
//       <Switch>
//         <Route path="/login">
//           <Login />
//         </Route>
//         <Route path="/register">
//           <Register />
//         </Route>
//         <Route path="/dashboard">
//           <Mailer />
//         </Route>
//         <Route exact path="/">
//           <Redirect to="/dashboard" />
//         </Route>
//         <Route path="*">
//           <NotFound />
//         </Route>
//       </Switch>
//     </Router>
//   );
//   export default Routes;
  
import React from "react"
const Login = React.lazy(() => import("./views/Login/Login"))
const Register = React.lazy(() => import("./views/Register/Register"))
const NotFound = React.lazy(() => import("./views/NotFound/NotFound"))
const Mailer = React.lazy(() => import("./views/Mailer/Mailer"))


const routes = [
    { path: "/", exact: true, name: "Mailer", component: Mailer },
    { path: "/login", exact: true, name: "Login", component: Login },
    { path: "/register", exact: true, name: "Register", component: Register },
    { path: "*", exact: true, name: "NotFound", component: NotFound }
]


export default routes;