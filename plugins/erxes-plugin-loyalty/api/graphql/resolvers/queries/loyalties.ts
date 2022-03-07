import { getOwner } from "../../../models/utils";

export default [
  /**
   * Loyalty value for customer
   */
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