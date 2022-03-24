import { getOwner } from "../../models/utils";

export default [
  {
    type: 'Donate',
    field: 'owner',
    handler: (donate, { }, { models }) => {
      return getOwner(models, donate.ownerType, donate.ownerId)
    }
  },
  {
    type: 'Donate',
    field: 'compaign',
    handler: async (donate, { }, { models }) => {
      return models.DonateCompaigns.findOne({ _id: donate.compaignId }).lean();
    }
  },
]