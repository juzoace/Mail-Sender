
  
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