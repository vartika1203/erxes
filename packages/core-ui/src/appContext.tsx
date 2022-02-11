import React from 'react';

interface IState {
  currentUser?: any;
}

interface IStore extends IState {
  currentUser?: any;
}

const AppContext = React.createContext({} as IStore);

export const AppConsumer = AppContext.Consumer;

export class AppProvider extends React.Component<
  { currentUser?: any },
  IState
> {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: props.currentUser,
    };
  }

  public render() {
    const {
      currentUser,
    } = this.state;

    return (
      <AppContext.Provider
        value={{
          currentUser,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}