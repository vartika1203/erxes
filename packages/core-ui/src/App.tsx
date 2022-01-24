import React from "react";
import ReactDOM from "react-dom";
import Routers from './routes';

import "./index.css";

const App = () => (
  <div className="container">
    <div>Name: core-ui</div>

    <Routers currentUser={{ username: 'username' }} />
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
