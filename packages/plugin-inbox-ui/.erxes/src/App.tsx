import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import Main from '../plugin-src';

const App = () => {
  return (
      <Main />
  );
};

ReactDOM.render(<App />, document.getElementById("app"));