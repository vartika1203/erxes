export default [
  {
    type: 'VoucherCompaign',
    field: 'vouchersCount',
    handler: async (voucherCompaign, { }, { models }) => {
      if (voucherCompaign.voucherType === 'spin'){
        return models.Spins.find({ voucherCompaignId: voucherCompaign._id }).countDocuments();
      }

      if (voucherCompaign.voucherType === 'lottery'){
        return models.Lotteries.find({ voucherCompaignId: voucherCompaign._id }).countDocuments();

      }
      return models.Vouchers.find({ compaignId: voucherCompaign._id }).countDocuments();
    }
  },
]