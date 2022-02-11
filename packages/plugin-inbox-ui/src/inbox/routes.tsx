import { IRouterProps } from '@erxes/ui/src/types';
import React from 'react';
import { Route } from 'react-router-dom';
import { AppConsumer } from 'core_ui/appContext';

const InboxComponent = () => {
  return (
    <AppConsumer>
      {({ currentUser }) => {
        return <div>Inbox {currentUser ? currentUser.username : "none"}</div>;
      }}
    </AppConsumer>
  )
};

const inbox = (props: IRouterProps) => {
  return (
    <InboxComponent />
  );
};

const routes = () => {
  return (
    <React.Fragment>
      <Route
        exact={true}
        path='/inbox/index'
        key='inbox/index'
        render={inbox}
      />
    </React.Fragment>
  );
};

export default routes;
