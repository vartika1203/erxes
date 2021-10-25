import asyncComponent from 'modules/common/components/AsyncComponent';
import React from 'react';
import { Route } from 'react-router-dom';

const List = asyncComponent(() =>
  import(/* webpackChunkName: "List" */ './containers/List')
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
    </>
  );
};

export default routes;
