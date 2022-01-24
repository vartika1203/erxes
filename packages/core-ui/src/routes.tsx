// import { pluginRouters } from './pluginUtils';
import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContext } from './appContext';

import InboxRoutes from 'app2/routes'

const InApp = () => {
  const context = useContext(AppContext);

  return <div>{JSON.stringify(context)}</div>
}

const Container = () => {
  const cu = { username: 'username' };

  return (
    <AppContext.Provider value={{ currentUser: cu }}>
      <InApp />
	    {/* {pluginRouters()} */}

      <InboxRoutes />
    </AppContext.Provider>
  )
}


const Routes = ({ currentUser }) => (
  <Router>
    <Container />
  </Router>
);

export default Routes;