import React from 'react';
import List from './pos/containers/List';
import EditPos from './pos/containers/EditPos';
import queryString from 'query-string';
import CreatePos from './pos/containers/CreatePos';
import OrderList from './orders/containers/List'

const settingsComponent = ({ location, history }) => {
  return (
    <List queryParams={queryString.parse(location.search)} history={history} />
  );
};

const editPos = ({ match, location, history }) => {
  const { posId } = match.params;
  const queryParams = queryString.parse(location.search);

  return <EditPos queryParams={queryParams} posId={posId} history={history} />;
};

const createPos = ({ match, location, history }) => {
  return <CreatePos location={location} match={match} history={history} />;
};

const OrderListComponent = ({ location, history }) => {
  return (
    <OrderList
      queryParams={queryString.parse(location.search)}
      history={history}
    />
  )
}

export default () => ({
  routes: [
    {
      path: '/pos',
      component: settingsComponent
    },
    {
      path: '/pos/edit/:posId',
      component: editPos
    },
    {
      path: '/pos/create',
      component: createPos
    },
    {
      path: '/pos-orders',
      component: OrderListComponent
    }
  ],
  settings: [
    {
      name: 'POS',
      image: '/images/icons/erxes-05.svg',
      to: '/erxes-plugin-pos/pos/',
      action: 'posConfig',
      permissions: ['showPos']
    }
  ]
});
