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
      const { ownerType, ownerId, score, destinationOwnerId } = param;
      const fee = await models.LoyaltyConfigs.getConfig(models, 'ShareScoreFee') || 0;

      await changeScoreOwner(models, { ownerType, ownerId, changeScore: -1 * score });
      await changeScoreOwner(models, { ownerType, ownerId: destinationOwnerId, changeScore: score / 100 * (100 - fee) });
      return 'success';
    }
  },
];