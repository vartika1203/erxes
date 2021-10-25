import asyncComponent from 'modules/common/components/AsyncComponent';
import React from 'react';
import { Route } from 'react-router-dom';

const List = asyncComponent(() =>
  import(/* webpackChunkName: "List" */ './containers/List')
);

const Details = asyncComponent(() =>
  import(/* webpackChunkName: "DashboardDetail" */ './containers/Details')
);

const routes = () => {
  return (
    <>
      <Route
        path="/dashboards"
        exact={true}
        key="/dashboards"
        component={List}
      />
      <Route
        path="/dashboards/details/:id"
        exact={true}
        key="/dashboards/details/:id"
        component={Details}
      />
    </>
  );
};

export default routes;
