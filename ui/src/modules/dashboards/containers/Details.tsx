import React from 'react';
import DashboardForm from '../components/forms/DashboardForm';
import * as compose from 'lodash.flowright';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { queries } from '../graphql';

class DetailContainer extends React.Component {
  render() {
    return <DashboardForm />;
  }
}

export default compose(
  graphql(gql(queries.dashboardDetails), {
    name: 'dashboardDetailsQuery'
  })
)(DetailContainer);
