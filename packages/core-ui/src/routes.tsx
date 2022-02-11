import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppConsumer, AppProvider } from './appContext';

import InboxRoutes from 'app2/routes'

const InApp = () => {
  return (
    <AppConsumer>
      {({ currentUser }) => {
        return <div>{JSON.stringify(currentUser || {})}</div>
      }}
    </AppConsumer>
  )
}

const Container = () => {
  const cu = { username: 'username' };

  return (
    <AppProvider currentUser={cu}>
        <InApp />
        {/* {pluginRouters()} */}

        <InboxRoutes />
    </AppProvider>
  )
}


const Routes = ({ currentUser }) => (
  <Router>
    <Container />
  </Router>
);

export default Routes;