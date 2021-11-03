import {
  Companies,
  Conformities,
  Customers,
  Notifications,
  Stages
} from '../../db/models';
import { ITaskDocument } from '../../db/models/definitions/tasks';
import { IContext } from '../types';
import { boardId } from './boardUtils';

export default {
  async companies(task: ITaskDocument) {
    const companyIds = await Conformities.savedConformity({
      mainType: 'task',
      mainTypeId: task._id,
      relTypes: ['company']
    });

    return Companies.findActiveCompanies({ _id: { $in: companyIds || [] } });
  },

  async createdUser(task: ITaskDocument, _, { dataLoaders }: IContext) {
    return (task.userId && dataLoaders.user.load(task.userId)) || null;
  },

  async customers(task: ITaskDocument) {
    const customerIds = await Conformities.savedConformity({
      mainType: 'task',
      mainTypeId: task._id,
      relTypes: ['customer']
    });

    return Customers.findActiveCustomers({ _id: { $in: customerIds || [] } });
  },

  async assignedUsers(task: ITaskDocument, _, { dataLoaders }: IContext) {
    const users = await dataLoaders.user.loadMany(task.assignedUserIds || []);
    return users.filter(u => u);
  },

  async pipeline(task: ITaskDocument, _, { dataLoaders }: IContext) {
    const stage = await Stages.getStage(task.stageId);
    return dataLoaders.pipeline.load(stage.pipelineId);
  },

  boardId(task: ITaskDocument) {
    return boardId(task);
  },

  stage(task: ITaskDocument) {
    return Stages.getStage(task.stageId);
  },

  isWatched(task: ITaskDocument, _args, { user }: IContext) {
    const watchedUserIds = task.watchedUserIds || [];

    if (watchedUserIds.includes(user._id)) {
      return true;
    }

    return false;
  },

  hasNotified(deal: ITaskDocument, _args, { user }: IContext) {
    return Notifications.checkIfRead(user._id, deal._id);
  },

  async labels(task: ITaskDocument, _, { dataLoaders }: IContext) {
    const labels = await dataLoaders.pipelineLabel.loadMany(
      task.labelIds || []
    );
    return labels.filter(l => l);
  }
};
