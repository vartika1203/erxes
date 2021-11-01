import { IActivityLog } from '../../db/models/definitions/activityLogs';
import { ACTIVITY_ACTIONS } from '../../db/models/definitions/constants';
import { ITagDocument } from '../../db/models/definitions/tags';
import { IUserDocument } from '../../db/models/definitions/users';
import { IContext } from '../types';
import { getContentTypeDetail } from './activityLogByAction';

export default {
  async createdByDetail(
    activityLog: IActivityLog,
    _,
    { dataLoaders }: IContext
  ) {
    const user = await dataLoaders.user.load(activityLog.createdBy);

    if (user) {
      return { type: 'user', content: user };
    }

    const integration = await dataLoaders.integration.load(
      activityLog.createdBy
    );

    if (integration) {
      const brand = await dataLoaders.brand.load(integration.brandId);
      return { type: 'brand', content: brand };
    }

    return;
  },

  contentTypeDetail(activityLog: IActivityLog, _, { dataLoaders }: IContext) {
    return getContentTypeDetail(activityLog, dataLoaders);
  },

  async contentDetail(activityLog: IActivityLog, _, { dataLoaders }: IContext) {
    const { action, content, contentType, contentId } = activityLog;

    if (action === ACTIVITY_ACTIONS.MOVED) {
      let item = {};

      switch (contentType) {
        case 'deal':
          item = await dataLoaders.deal.load(contentId);
          break;
        case 'task':
          item = await dataLoaders.task.load(contentId);
          break;
        case 'growthHack':
          item = await dataLoaders.growthHack.load(contentId);
          break;
        case 'ticket':
          item = await dataLoaders.ticket.load(contentId);
          break;
      }

      const { oldStageId, destinationStageId } = content;

      const destinationStage = await dataLoaders.stage.load(destinationStageId);
      const oldStage = await dataLoaders.stage.load(oldStageId);

      if (destinationStage && oldStage) {
        return {
          destinationStage: destinationStage.name,
          oldStage: oldStage.name,
          item
        };
      }

      return {
        text: content.text
      };
    }

    if (action === ACTIVITY_ACTIONS.MERGE) {
      let result = {};

      switch (contentType) {
        case 'company':
          result = await dataLoaders.company.loadMany(activityLog.content);
          break;
        case 'customer':
          result = await dataLoaders.customer.loadMany(activityLog.content);
          break;
      }

      return result;
    }

    if (action === ACTIVITY_ACTIONS.ASSIGNEE) {
      let addedUsers: IUserDocument[] = [];
      let removedUsers: IUserDocument[] = [];

      if (content) {
        addedUsers = await dataLoaders.user.loadMany(
          content.addedUserIds || []
        );
        removedUsers = await dataLoaders.user.loadMany(
          content.removedUserIds || []
        );
      }

      return { addedUsers, removedUsers };
    }

    if (action === ACTIVITY_ACTIONS.TAGGED) {
      let tags: ITagDocument[] = [];
      if (content) {
        tags = await dataLoaders.tag.loadMany(content.tagIds || []);
      }

      return { tags };
    }
  }
};
