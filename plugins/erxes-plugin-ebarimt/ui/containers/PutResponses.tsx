import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import { Bulk, withProps, router, } from 'erxes-ui';
import React from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { IRouterProps } from 'erxes-ui/lib/types';
import PutResponse from '../components/PutResponses';
import { queries } from '../graphql';
import {
  ListQueryVariables,
  PutResponsesQueryResponse
} from '../types';

type Props = {
  queryParams: any;
  history: any;
};

type FinalProps = {
  putResponsesQuery: PutResponsesQueryResponse;
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
      history
    } = this.props;

    const searchValue = this.props.queryParams.searchValue || '';
    const list = putResponsesQuery.putResponses || [];

    const updatedProps = {
      ...this.props,
      list,
      searchValue,
      putResponses: list,
      loading: putResponsesQuery.loading,
    };

    const carsList = props => {
      return <PutResponse {...updatedProps} {...props} />;
    };

    const refetch = () => {
      this.props.putResponsesQuery.refetch();
    };

    return <Bulk content={carsList} refetch={refetch} />;
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
  )(withRouter<IRouterProps>(PutResponsesContainer))
);