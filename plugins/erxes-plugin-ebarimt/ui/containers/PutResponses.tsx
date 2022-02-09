import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import { Bulk, withProps, router, Spinner } from 'erxes-ui';
import React from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { IRouterProps } from 'erxes-ui/lib/types';
import PutResponse from '../components/PutResponses';
import { queries } from '../graphql';
import {
  ListQueryVariables,
  PutResponsesQueryResponse,
  PutResponsesCountQueryResponse
} from '../types';

type Props = {
  queryParams: any;
  history: any;
};

type FinalProps = {
  putResponsesQuery: PutResponsesQueryResponse;
  putResponsesCountQuery: PutResponsesCountQueryResponse;
} & Props &
  IRouterProps;

type State = {
  loading: boolean;
};

class PutResponsesContainer extends React.Component<FinalProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  render() {
    const {
      putResponsesQuery,
      putResponsesCountQuery
    } = this.props;

    if (putResponsesQuery.loading || putResponsesCountQuery.loading) {
      return <Spinner />
    }

    const searchValue = this.props.queryParams.searchValue || '';
    const putResponses = putResponsesQuery.putResponses || [];
    const putResponsesCount = putResponsesCountQuery.putResponsesCount || 0;

    const updatedProps = {
      ...this.props,
      searchValue,
      putResponses,
      totalCount: putResponsesCount,
      loading: putResponsesQuery.loading,
    };

    const putResponsesList = props => {
      return <PutResponse {...updatedProps} {...props} />;
    };

    const refetch = () => {
      this.props.putResponsesQuery.refetch();
    };

    return <Bulk content={putResponsesList} refetch={refetch} />;
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
    graphql<{ queryParams: any }, PutResponsesQueryResponse, ListQueryVariables>(
      gql(queries.putResponses),
      {
        name: 'putResponsesQuery',
        options: generateParams
      }
    ),

    graphql<{ queryParams: any }, PutResponsesCountQueryResponse, ListQueryVariables>(
      gql(queries.putResponsesCount),
      {
        name: 'putResponsesCountQuery',
        options: generateParams
      }
    ),
  )(withRouter<IRouterProps>(PutResponsesContainer))
);