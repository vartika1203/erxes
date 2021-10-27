export interface IDashboard {
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
