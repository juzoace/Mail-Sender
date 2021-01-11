import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from './store';
import "bulma/css/bulma.min.css"
// import * as serviceWorker from "./serviceWorker";
// import App from './App';
// import Routes from "./routes"

ReactDOM.render(

<React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    ,
  </React.StrictMode>,
document.getElementById('root'));


// serviceWorker.unregister();