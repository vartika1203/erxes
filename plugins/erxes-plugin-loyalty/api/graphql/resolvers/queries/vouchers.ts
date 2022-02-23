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

      if (params.compaignId) {
        await models.VoucherCompaigns.getVoucherCompaign(models, params.compaignId);
        filter.compaignId = params.compaignId
      }

      return {
        list: await paginate(models.Vouchers.find(filter), params),
        totalCount: await models.Vouchers.find(filter).countDocuments()
      }
    }
  }
]