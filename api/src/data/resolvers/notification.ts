import { INotificationDocument } from '../../db/models/definitions/notifications';
import { IContext } from '../types';

export default {
  createdUser(notif: INotificationDocument, _, { dataLoaders }: IContext) {
    return (
      (notif.createdUser && dataLoaders.user.load(notif.createdUser)) || null
    );
  }
};
