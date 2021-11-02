import { IEmailDeliveriesDocument } from '../../db/models/definitions/emailDeliveries';
import { IContext } from '../types';

export default {
  async fromUser(
    emailDelivery: IEmailDeliveriesDocument,
    _,
    { dataLoaders }: IContext
  ) {
    return (
      (emailDelivery.userId && dataLoaders.user.load(emailDelivery.userId)) ||
      {}
    );
  },

  async fromEmail(
    emailDelivery: IEmailDeliveriesDocument,
    _,
    { dataLoaders }: IContext
  ) {
    const integration = await dataLoaders.integration.load(emailDelivery.from);
    return integration ? integration.name : '';
  }
};
