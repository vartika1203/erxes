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
        item = (contentId && (await dataLoaders.deal.load(contentId))) || {};
        break;
      case 'task':
        item = (contentId && (await dataLoaders.task.load(contentId))) || {};
        break;
      case 'growthHack':
        item =
          (contentId && (await dataLoaders.growthHack.load(contentId))) || {};
        break;
      case 'ticket':
        item = (contentId && (await dataLoaders.ticket.load(contentId))) || {};
        break;
      case 'checklist':
        item =
          (content._id && (await dataLoaders.checklist.load(content._id))) ||
          {};
        break;
      case 'checklistitem':
        item =
          (content._id &&
            (await dataLoaders.checklistItem.load(content._id))) ||
          {};
        break;
    }
  } catch (e) {
    debugError(e.message);
  }

  return item;
};

export default {
  createdUser(activityLog: any, _, { dataLoaders }: IContext) {
    return (
      (activityLog.createdBy && dataLoaders.user.load(activityLog.createdBy)) ||
      null
    );
  },

  contentTypeDetail(activityLog: any, _, { dataLoaders }: IContext) {
    return getContentTypeDetail(activityLog, dataLoaders);
  }
};
