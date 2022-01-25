import { paginate } from 'erxes-api-utils'

export default [
  {
    name: 'vouchers',
    handler: async (_root, params, { models }) => {
      return models.Vouchers.getVouchers(models, { ...params, statuses: ['new'] })
    }
  },
  {
    name: 'vouchersMain',
    handler: async (_root, params, { models }) => {
      const filter: any = {};

      if (params.status) {
        filter.status = params.status
      }

      if (params.ownerType) {
        filter.ownerType = params.ownerType
      }

      if (params.ownerId) {
        filter.ownerId = params.ownerId
      }

      // const compaignFilter: any = {}
      // const voucherFilter: any = { voucherCompaignId: { $ne: '' } };

      if (params.compaignId) {
        // compaignFilter.compaignId = params.compaignId
        // voucherFilter.voucherCompaignId = params.compaignId

        const compaign = await models.VoucherCompaigns.getVoucherCompaign(models, params.compaignId);

        if (compaign.voucherType === 'spin') {
          return {
            list: await paginate(models.Spins.find({ ...filter, voucherCompaignId: params.compaignId }), params),
            totalCount: await models.Spins.find(filter).countDocuments()
          }
        }

        if (compaign.voucherType === 'lottery') {
          return {
            list: await paginate(models.Lotteries.find({ ...filter, voucherCompaignId: params.compaignId }), params),
            totalCount: await models.Lotteries.find(filter).countDocuments()
          }
        }

        return {
          list: await paginate(models.Vouchers.find({ ...filter, compaignId: params.compaignId }), params),
          totalCount: await models.Vouchers.find(filter).countDocuments()
        }
      }

      return {
        list: await paginate(models.Vouchers.find(filter), params),
        totalCount: await models.Vouchers.find(filter).countDocuments()
      }

      // TODO: mongo 4.4 after
      // const { page = 0, perPage = 0 } = params;
      // const _page = Number(page || "1");
      // const _limit = Number(perPage || "20");
      // const _skip = (_page - 1) * _limit;

      // const aggregate = [
      //   { $match: { ...filter, ...compaignFilter } },
      //   { $unionWith: { coll: 'spins', pipeline: [{ $match: { ...filter, ...voucherFilter } }] } },
      //   { $unionWith: { coll: 'lotteries', pipeline: [{ $match: { ...filter, ...voucherFilter } }] } },
      // ]
      // const list = await models.Vouchers.aggregate([
      //   ...aggregate,
      //   { $sort: { createdAt: 1 } },
      //   { $skip: _skip },
      //   { $limit: _limit },
      // ])

      // const aggCount = await models.Vouchers.aggregate([
      //   ...aggregate,
      //   { $group: { _id: null, count: { $sum: 1 } } },
      //   { $project: { _id: 0 } }
      // ]);

      // const totalCount = aggCount.length && (aggCount[0] || {}).count || 0;

      // return {
      //   list,
      //   totalCount
      // }
    }
  }
]