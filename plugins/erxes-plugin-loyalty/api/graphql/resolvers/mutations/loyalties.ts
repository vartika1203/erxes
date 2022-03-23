import { changeScoreOwner } from "../../../models/CompaignUtils";
import { confirmVoucherSale } from "../../../utils";

export default [
  {
    name: "confirmLoyalties",
    handler: async (_root, params, { models }) => {
      const { checkInfo } = params;
      return confirmVoucherSale(models, checkInfo);
    },
  },
  {
    name: 'shareScore',
    handler: async (_root, param, { models }) => {
      const { ownerType, ownerId, score, destinationOwnerId, destinationPhone, destinationEmail, destinationCode } = param;
      let destOwnerId = destinationOwnerId;

      if (ownerType === 'customer') {
        const customer = await models.Customers.getWidgetCustomer({ email: destinationEmail, phone: destinationPhone, code: destinationCode })
        if (!customer) {
          throw new Error('Destination customer not found')
        }

        destOwnerId = customer._id
      }

      if (ownerType === 'user') {
        let user;
        if (destinationOwnerId) {
          user = await models.Users.findOne({ _id: destinationOwnerId });
        }

        if (!user && destinationEmail) {
          user = await models.Users.findOne({ email: destinationEmail });
        }

        if (!user && destinationCode) {
          user = await models.Users.findOne({ email: destinationCode });
        }

        if (!user && destinationPhone) {
          user = await models.Users.findOne({ 'details.operatorPhone': destinationPhone });
        }

        if (!user) {
          throw new Error('Destination team member not found')
        }

        destOwnerId = user._id;
      }

      const fee = await models.LoyaltyConfigs.getConfig(models, 'ShareScoreFee') || 0;

      await changeScoreOwner(models, { ownerType, ownerId, changeScore: -1 * score });
      await changeScoreOwner(models, { ownerType, ownerId: destOwnerId, changeScore: score / 100 * (100 - fee) });
      return 'success';
    }
  },
];