import { IContext } from '../types';

export default {
  createdUser(automation: any, _, { dataLoaders }: IContext) {
    return (
      (automation.createdBy && dataLoaders.user.load(automation.createdBy)) ||
      null
    );
  },

  updatedUser(automation: any, _, { dataLoaders }: IContext) {
    return (
      (automation.updatedBy && dataLoaders.user.load(automation.updatedBy)) ||
      null
    );
  }
};
