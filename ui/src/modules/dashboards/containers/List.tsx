import Bulk from 'modules/common/components/Bulk';
import React from 'react';
import { Alert, withProps } from 'modules/common/utils';
import Home from '../components/List';
import { AddMutationResponse, IAutomationDoc } from '../types';

import * as compose from 'lodash.flowright';
import { IRouterProps } from '../../common/types';
import gql from 'graphql-tag';
import { mutations } from '../graphql';
import { graphql } from 'react-apollo';

type Props = {
  queryParams?: any;
};

type FinalProps = {} & AddMutationResponse & IRouterProps;

class HomeContainer extends React.Component<FinalProps> {
  render() {
    const { addDashboardMutation, history } = this.props;

    const addDashboard = () => {
      addDashboardMutation({
        variables: {
          name: 'Your dashboard title',
          status: 'draft',
          triggers: [],
          actions: []
        }
      })
        .then(data => {
          history.push({
            pathname: `/dashboard/${data.data.dashboardsAdd._id}`,
            // ${data.data.dashboardsAdd._id}
            search: '?isCreate=true'
          });
        })

        .catch(error => {
          Alert.error(error.message);
        });
    };

    const updatedProps = {
      ...this.props,
      addDashboard
    };

    const dashboardsList = props => {
      return <Home {...updatedProps} {...props} />;
    };

    return <Bulk content={dashboardsList} />;
  }
}

// export default HomeContainer;
export default withProps<Props>(
  compose(
    // mutations
    graphql<{}, AddMutationResponse, IAutomationDoc>(
      gql(mutations.dashboardsAdd),
      {
        name: 'addDashboardMutation',
        options: () => ({
          refetchQueries: ['dashboards', 'automationsMain', 'automationDetail']
        })
      }
    )
  )(HomeContainer)
);
