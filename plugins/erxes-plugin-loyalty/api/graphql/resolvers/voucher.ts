import { getOwner } from "../../models/utils";

export default [
  {
    type: 'Voucher',
    field: 'owner',
    handler: (voucher, { }, { models }) => {
      return getOwner(models, voucher.ownerType, voucher.OwnerId)
    }
  },
  {
    type: 'Voucher',
    field: 'compaign',
    handler: async (voucher, { }, { models }) => {
      return models.VoucherCompaigns.findOne({ _id: voucher.compaignId }).lean();
    }
  },
]