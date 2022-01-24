import { IRouterProps } from '@erxes/ui/src/types';
import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { AppContext } from 'core_ui/appContext';

const InboxComponent = () => {
  const context: any = useContext(AppContext);

  console.log('mmmmmmmmmmmm', context)

  const { currentUser } = context;

  return <div>Inbox {currentUser ? currentUser.username : "none"}</div>;
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
