import React from 'react';
import List from './pos/containers/List';
import PosContainer from './pos/containers/Pos';
import queryString from 'query-string';
import OrderList from './orders/containers/List'
import PosProductList from './orders/containers/ProductList'

const settingsComponent = ({ location, history }) => {
  return (
    <List queryParams={queryString.parse(location.search)} history={history} />
  );
};

const posComponent = ({ match, location, history }) => {
  const { posId } = match.params;
  const queryParams = queryString.parse(location.search);

  return <PosContainer queryParams={queryParams} posId={posId} history={history} />;
};

const OrderListComponent = ({ location, history }) => {
  return (
    <OrderList
      queryParams={queryString.parse(location.search)}
      history={history}
    />
  )
}
const OrderItemsComponent = ({ location, history }) => {
  return (
    <PosProductList
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
      component: posComponent
    },
    {
      path: '/pos/create',
      component: posComponent
    },
    {
      path: '/pos-orders',
      component: OrderListComponent
    },
    {
      path: '/pos-order-items',
      component: OrderItemsComponent
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
