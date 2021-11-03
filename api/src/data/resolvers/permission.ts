import { UsersGroups } from '../../db/models';
import { IPermissionDocument } from '../../db/models/definitions/permissions';
import { IContext } from '../types';

export default {
  user(entry: IPermissionDocument, _, { dataLoaders }: IContext) {
    return (entry.userId && dataLoaders.user.load(entry.userId)) || null;
  },

  group(entry: IPermissionDocument) {
    return UsersGroups.findOne({ _id: entry.groupId });
  }
};
