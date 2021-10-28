import asyncComponent from 'modules/common/components/AsyncComponent';
import React from 'react';
import { Route } from 'react-router-dom';
import queryString from 'query-string';

const List = asyncComponent(() =>
  import(/* webpackChunkName: "List" */ './containers/List')
);

const Details = asyncComponent(() =>
  import(/* webpackChunkName: "DashboardDetail" */ './containers/Details')
);

const details = ({ match, location }) => {
  const id = match.params.id;
  const queryParams = queryString.parse(location.search);

  return <Details id={id} queryParams={queryParams} />;
};

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
        component={details}
      />
    </>
  );
};

export default routes;
