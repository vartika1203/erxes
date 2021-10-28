export interface IDashboard extends IDashboardDoc {
  _id: string;
  name: string;
}

export type DashboardsQueryResponse = {
  dashboards: IDashboard[];
  loading: boolean;
  refetch: () => void;
};

export interface IDashboardItem {
  _id: string;
  dashboardId: string;
  layout: string;
  vizState: string;
  name: string;
}
export interface IDashboardDoc {
  name: string;
  status: string;
  updatedAt?: Date;
  createdAt?: Date;
  updatedBy?: string;
  createdBy?: string;
  // updatedUser?: IUser;
  // createdUser?: IUser;
}

export type DashboardDetailsQueryResponse = {
  dashboardDetails: IDashboard;
  loading: boolean;
};

export type DashboardRemoveMutationVariables = {
  _id: string;
};

export type RemoveDashboardMutationResponse = {
  removeDashboardMutation: (params: {
    variables: DashboardRemoveMutationVariables;
  }) => Promise<any>;
};

export type AddDashboardMutationVariables = {
  name: string;
};

export type AddDashboardMutationResponse = {
  addDashboardMutation: (params: {
    variables: AddDashboardMutationVariables;
  }) => Promise<any>;
};
