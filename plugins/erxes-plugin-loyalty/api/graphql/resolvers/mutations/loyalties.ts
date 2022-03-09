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
      await changeScoreOwner(models, { ownerType, ownerId, changeScore: -1 * score });
      await changeScoreOwner(models, { ownerType, ownerId: destinationOwnerId, changeScore: score });
      return 'success';
    }
  },
];