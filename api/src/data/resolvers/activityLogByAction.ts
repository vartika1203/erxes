import { debugError } from '../../debuggers';
import { IDataLoaders } from '../dataLoaders';
import { IContext } from '../types';

export const getContentTypeDetail = async (
  activityLog: any,
  dataLoaders: IDataLoaders
) => {
  const { contentType, contentId, content } = activityLog;

  let item = {};

  try {
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
      case 'checklist':
        item = (await dataLoaders.checklist.load(content._id)) || {};
        break;
      case 'checklistitem':
        item = (await dataLoaders.checklistItem.load(content._id)) || {};
        break;
    }
  } catch (e) {
    debugError(e.message);
  }

  return item;
};

export default {
  createdUser(activityLog: any, _, { dataLoaders }: IContext) {
    return dataLoaders.user.load(activityLog.createdBy);
  },

  contentTypeDetail(activityLog: any, _, { dataLoaders }: IContext) {
    return getContentTypeDetail(activityLog, dataLoaders);
  }
};
