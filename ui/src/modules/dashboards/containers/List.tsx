import Bulk from 'modules/common/components/Bulk';
import React from 'react';
import { Alert, withProps, confirm } from 'modules/common/utils';
import List from '../components/List';
import * as compose from 'lodash.flowright';
import { IRouterProps } from '../../common/types';
import gql from 'graphql-tag';
import { mutations, queries } from '../graphql';
import { graphql } from 'react-apollo';
import { MainQueryResponse } from '../types';
type Props = {
  queryParams?: any;
};

type FinalProps = {
  automationsMainQuery: MainQueryResponse;
  addDashboardMutation: any;
  removeDashboardMutation: any;
  dashboardsQuery: any;
} & IRouterProps;

class HomeContainer extends React.Component<FinalProps> {
  private timer?: NodeJS.Timer;

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const {
      addDashboardMutation,
      history,
      dashboardsQuery,
      removeDashboardMutation
    } = this.props;

    if (dashboardsQuery.loading) {
      return null;
    }

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

    const removeDashboard = dashboardId => {
      confirm().then(() => {
        removeDashboardMutation({
          variables: { _id: dashboardId }
        })
          .then(() => {
            Alert.success(
              'You successfully deleted a automation. The changes will take a few seconds',
              4500
            );
          })
          .catch(e => {
            Alert.error(e.message);
          });
      });
    };

    const updatedProps = {
      ...this.props,
      addDashboard,
      removeDashboard,
      dashboards: dashboardsQuery.dashboards
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
      name: 'addDashboardMutation',
      options: () => ({
        refetchQueries: ['dashboards']
      })
    }),
    graphql(gql(queries.dashboards), {
      name: 'dashboardsQuery'
    }),
    graphql(gql(mutations.dashboardsRemove), {
      name: 'removeDashboardMutation',
      options: () => ({
        refetchQueries: ['dashboards']
      })
    })
    // mutation dashboardRemove($_id: String!){
    //   dashboardRemove(_id:$_id)
  )(HomeContainer)
);
