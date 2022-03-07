import { getOwner } from "../../models/utils";

export default [
  {
    type: 'Spin',
    field: 'owner',
    handler: (spin, { }, { models }) => {
      return getOwner(models, spin.ownerType, spin.OwnerId)
    }
  },
  {
    type: 'Spin',
    field: 'compaign',
    handler: async (spin, { }, { models }) => {
      return models.SpinCompaigns.findOne({ _id: spin.compaignId }).lean();
    }
  },
]