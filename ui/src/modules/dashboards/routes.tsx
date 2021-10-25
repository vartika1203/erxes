import asyncComponent from 'modules/common/components/AsyncComponent';
import React from 'react';
import { Route } from 'react-router-dom';

const Dashboard = asyncComponent(() =>
  import(/* webpackChunkName: "Dashboard" */ './containers/List')
);

const Dashboard1 = asyncComponent(() =>
  import(/* webpackChunkName: "Dashboard" */ './containers/Home1')
);

const routes = () => {
  return (
    <>
      <Route
        key="/dashboards"
        exact={true}
        path="/dashboards"
        component={Dashboard}
      />
      <Route
        path="/dashboard2"
        exact={true}
        key="/dashboard2"
        component={Dashboard1}
      />
    </>
  );
};

export default routes;
