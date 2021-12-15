import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import { Bulk, withProps, router, } from 'erxes-ui';
import React from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { IRouterProps } from 'erxes-ui/lib/types';
import List from '../components/List';
import { queries } from '../graphql';
import {
  ListQueryVariables,
  OrdersQueryResponse
} from '../types';

type Props = {
  queryParams: any;
  history: any;
};

type FinalProps = {
  ordersQuery: OrdersQueryResponse;
} & Props &
  IRouterProps;

type State = {
  loading: boolean;
};

class OrdersContainer extends React.Component<FinalProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  render() {
    const {
      ordersQuery,
      history
    } = this.props;

    const searchValue = this.props.queryParams.searchValue || '';
    const list = ordersQuery.posOrders || [];

    const updatedProps = {
      ...this.props,
      searchValue,
      orders: list,
      loading: ordersQuery.loading,
    };

    const ordersList = props => {
      return <List {...updatedProps} {...props} />;
    };

    const refetch = () => {
      this.props.ordersQuery.refetch();
    };

    return <Bulk content={ordersList} refetch={refetch} />;
  }
}

const generateParams = ({ queryParams }) => ({
  variables: {
    ...router.generatePaginationParams(queryParams || {}),
    sortField: queryParams.sortField,
    sortDirection: queryParams.sortDirection
      ? parseInt(queryParams.sortDirection, 10)
      : undefined
  },
  fetchPolicy: 'network-only'
});

export default withProps<Props>(
  compose(
    graphql<{ queryParams: any }, OrdersQueryResponse, ListQueryVariables>(
      gql(queries.posOrders),
      {
        name: 'ordersQuery',
        options: generateParams
      }
    ),
  )(withRouter<IRouterProps>(OrdersContainer))
);