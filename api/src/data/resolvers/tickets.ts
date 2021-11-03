import {
  Companies,
  Conformities,
  Customers,
  Notifications,
  Stages
} from '../../db/models';
import { ITicketDocument } from '../../db/models/definitions/tickets';
import { IContext } from '../types';
import { boardId } from './boardUtils';

export default {
  async companies(ticket: ITicketDocument) {
    const companyIds = await Conformities.savedConformity({
      mainType: 'ticket',
      mainTypeId: ticket._id,
      relTypes: ['company']
    });

    return Companies.findActiveCompanies({ _id: { $in: companyIds || [] } });
  },

  async customers(ticket: ITicketDocument) {
    const customerIds = await Conformities.savedConformity({
      mainType: 'ticket',
      mainTypeId: ticket._id,
      relTypes: ['customer']
    });

    return Customers.findActiveCustomers({ _id: { $in: customerIds || [] } });
  },

  async assignedUsers(ticket: ITicketDocument, _, { dataLoaders }: IContext) {
    const users = await dataLoaders.user.loadMany(ticket.assignedUserIds || []);
    return users.filter(u => u);
  },

  async pipeline(ticket: ITicketDocument, _, { dataLoaders }: IContext) {
    const stage = await Stages.getStage(ticket.stageId);
    return dataLoaders.pipeline.load(stage.pipelineId);
  },

  boardId(ticket: ITicketDocument) {
    return boardId(ticket);
  },

  stage(ticket: ITicketDocument) {
    return Stages.getStage(ticket.stageId);
  },

  isWatched(ticket: ITicketDocument, _args, { user }: IContext) {
    const watchedUserIds = ticket.watchedUserIds || [];

    if (watchedUserIds.includes(user._id)) {
      return true;
    }

    return false;
  },

  hasNotified(ticket: ITicketDocument, _args, { user }: IContext) {
    return Notifications.checkIfRead(user._id, ticket._id);
  },

  async labels(ticket: ITicketDocument, _, { dataLoaders }: IContext) {
    const labels = await dataLoaders.pipelineLabel.loadMany(
      ticket.labelIds || []
    );
    return labels.filter(l => l);
  },

  createdUser(ticket: ITicketDocument, _, { dataLoaders }: IContext) {
    return (ticket.userId && dataLoaders.user.load(ticket.userId)) || null;
  }
};
