import { getOwner } from "../../models/utils";

export default [
  {
    type: 'Lottery',
    field: 'owner',
    handler: (lottery, { }, { models }) => {
      return getOwner(models, lottery.ownerType, lottery.ownerId)
    }
  },
  {
    type: 'Lottery',
    field: 'compaign',
    handler: async (lottery, { }, { models }) => {
      return models.LotteryCompaigns.findOne({ _id: lottery.compaignId }).lean();
    }
  },
]