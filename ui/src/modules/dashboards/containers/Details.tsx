import React from 'react';
import DashboardForm from '../components/forms/DashboardForm';
import * as compose from 'lodash.flowright';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { queries } from '../graphql';
import { DashboardDetailsQueryResponse } from '../types';

type Props = {
  id: string;
  queryParams: any;
};

type FinalProps = {
  dashboardDetailsQuery: DashboardDetailsQueryResponse;
} & Props;

class DetailContainer extends React.Component<FinalProps> {
  render() {
    const { dashboardDetailsQuery } = this.props;

    if (dashboardDetailsQuery.loading) {
      return null;
    }

    const updatedProps = {
      ...this.props,
      dashboard: dashboardDetailsQuery.dashboardDetails
    };

    return <DashboardForm {...updatedProps} />;
  }
}

export default compose(
  graphql<Props, DashboardDetailsQueryResponse, { _id: string }>(
    gql(queries.dashboardDetails),
    {
      name: 'dashboardDetailsQuery',
      options: ({ id }) => ({
        variables: {
          _id: id
        }
      })
    }
  )
)(DetailContainer);
