import { getOwner } from "../../../models/utils";
import { checkVouchersSale } from "../../../utils";

export default [
  {
    name: "checkLoyalties",
    handler: async (_root, params, { models }) => {
      const { ownerType, ownerId, products } = params;
      return checkVouchersSale(models, ownerType, ownerId, products);
    },
  },
  {
    name: 'loyalties',
    handler: async (_root, params, { models }) => {
      const score = (await getOwner(models, params.ownerType, params.ownerType) || {}).score || 0;
      const filter = { ...params, statuses: ['new'] }

      return {
        ownerId: params.ownerId,
        ownerType: params.ownerType,
        score,
        vouchers: await models.Vouchers.getVouchers(models, filter),
        lotteries: await models.Lotteries.getLotteries(models, filter),
        spins: await models.Spins.getSpins(models, filter),
        donates: await models.Donates.getDonates(models, filter)
      };
    }
  }
]