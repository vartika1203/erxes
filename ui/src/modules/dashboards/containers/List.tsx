import Bulk from 'modules/common/components/Bulk';
import React from 'react';
import { Alert, withProps } from 'modules/common/utils';
import List from '../components/List';

import * as compose from 'lodash.flowright';
import { IRouterProps } from '../../common/types';
import gql from 'graphql-tag';
import { mutations } from '../graphql';
import { graphql } from 'react-apollo';

type Props = {
  queryParams?: any;
};

type FinalProps = {
  addDashboardMutation: any;
} & IRouterProps;

class HomeContainer extends React.Component<FinalProps> {
  render() {
    const { addDashboardMutation, history } = this.props;

    const addDashboard = () => {
      addDashboardMutation({
        variables: {
          name: 'Your dashboard title'
        }
      })
        .then(data => {
          console.log(data);

          history.push({
            pathname: `/dashboards/details/${data.data.dashboardAdd._id}`,
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
      return <List {...updatedProps} {...props} />;
    };

    return <Bulk content={dashboardsList} />;
  }
}

export default withProps<Props>(
  compose(
    graphql(gql(mutations.dashboardsAdd), {
      name: 'addDashboardMutation'
    })
  )(HomeContainer)
);
