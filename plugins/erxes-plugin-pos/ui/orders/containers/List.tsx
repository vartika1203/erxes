import * as compose from 'lodash.flowright';
import gql from 'graphql-tag';
import List from '../components/List';
import queryString from 'query-string';
import React from 'react';
import { graphql } from 'react-apollo';
import { IRouterProps } from 'erxes-ui/lib/types';
import { ListQueryVariables, OrdersQueryResponse, OrdersSummaryQueryResponse, PosOrderSyncErkhetMutationResponse } from '../types';
import { mutations, queries } from '../graphql';
import { withRouter } from 'react-router-dom';
import { Bulk, withProps, router, Alert, Spinner } from 'erxes-ui';
import { FILTER_PARAMS } from '../../constants';

type Props = {
  queryParams: any;
  history: any;
};

type FinalProps = {
  ordersQuery: OrdersQueryResponse;
  ordersSummaryQuery: OrdersSummaryQueryResponse
} & Props &
  IRouterProps & PosOrderSyncErkhetMutationResponse;

type State = {
  loading: boolean;
};

const generateQueryParams = ({ location }) => {
  return queryString.parse(location.search);
};

class OrdersContainer extends React.Component<FinalProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  onSearch = (search: string) => {
    if (!search) {
      return router.removeParams(this.props.history, 'search');
    }

    router.setParams(this.props.history, { search });
  };

  onSelect = (values: string[] | string, key: string) => {
    const params = generateQueryParams(this.props.history);

    if (params[key] === values) {
      return router.removeParams(this.props.history, key);
    }

    return router.setParams(this.props.history, { [key]: values });
  };

  isFiltered = (): boolean => {
    const params = generateQueryParams(this.props.history);

    for (const param in params) {
      if (FILTER_PARAMS.includes(param)) {
        return true;
      }
    }

    return false;
  };

  clearFilter = () => {
    const params = generateQueryParams(this.props.history);
    router.removeParams(this.props.history, ...Object.keys(params));
  };

  onSyncErkhet = (posId) => {
    const { posOrderSyncErkhet, ordersQuery } = this.props;

    posOrderSyncErkhet({
      variables: { _id: posId }
    })
      .then(() => {
        // refresh queries
        ordersQuery.refetch();

        Alert.success('You successfully synced erkhet.');
      })
      .catch(e => {
        Alert.error(e.message);
      });

  }

  render() {
    const {
      ordersQuery,
      ordersSummaryQuery
    } = this.props;

    if (ordersSummaryQuery.loading || ordersQuery.loading) {
      return <Spinner />
    }

    const summary = ordersSummaryQuery.posOrdersSummary;
    const list = ordersQuery.posOrders || [];

    const updatedProps = {
      ...this.props,
      orders: list,
      summary,
      loading: ordersQuery.loading,

      onSelect: this.onSelect,
      onSearch: this.onSearch,
      isFiltered: this.isFiltered(),
      clearFilter: this.clearFilter,
      onSyncErkhet: this.onSyncErkhet
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
      : undefined,
    search: queryParams.search,
    paidStartDate: queryParams.paidStartDate,
    paidEndDate: queryParams.paidEndDate,
    createdStartDate: queryParams.createdStartDate,
    createdEndDate: queryParams.createdEndDate,
    paidDate: queryParams.paidDate,
    userId: queryParams.userId,
    customerId: queryParams.customerId,
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
    graphql<{ queryParams: any }, OrdersSummaryQueryResponse, ListQueryVariables>(
      gql(queries.posOrdersSummary),
      {
        name: 'ordersSummaryQuery',
        options: generateParams
      }
    ),
    graphql<Props, PosOrderSyncErkhetMutationResponse, { _id: string }>(
      gql(mutations.posOrderSyncErkhet),
      {
        name: 'posOrderSyncErkhet',
      }
    ),
  )(withRouter<IRouterProps>(OrdersContainer))
);