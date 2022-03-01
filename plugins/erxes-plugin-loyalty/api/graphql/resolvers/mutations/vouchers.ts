import { confirmVoucherSale } from "../../../utils";

export default [
  {
    name: 'vouchersAdd',
    handler: async (_root, doc, { models, user }) => {
      return models.Vouchers.createVoucher(models, { ...doc, userId: user._id });
    }
  },
  {
    name: 'vouchersEdit',
    handler: async (_root, doc, { models, user }) => {
      return models.Vouchers.updateVoucher(models, doc._id, { ...doc, userId: user._id });
    }
  },
  {
    name: 'vouchersRemove',
    handler: async (_root, doc, { models }) => {
      return models.Vouchers.removeVouchers(models, doc._ids);
    }
  },
  {
    name: "confirmLoyalties",
    handler: async (_root, params, { models }) => {
      const { checkInfo } = params;
      return confirmVoucherSale(models, checkInfo);
    },
  }
];