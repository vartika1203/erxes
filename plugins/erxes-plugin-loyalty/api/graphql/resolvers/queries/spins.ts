import { paginate } from 'erxes-api-utils'

export default [
  {
    name: 'spins',
    handler: async (_root, params, { models }) => {
      return models.Spins.getSpins(models, { ...params, statuses: ['new'] })
    }
  },
  {
    name: 'spinsMain',
    handler: async (_root, params, { models }) => {
      const filter: any = {};

      if (params.compaignId) {
        filter.compaignId = params.compaignId
      }

      if (params.status) {
        filter.status = params.status
      }

      if (params.ownerType) {
        filter.ownerType = params.ownerType
      }

      if (params.ownerId) {
        filter.ownerId = params.ownerId
      }

      const list = paginate(models.Spins.find(filter), params);

      const totalCount = await models.Spins.find(filter).countDocuments();

      return {
        list,
        totalCount
      }
    }
  }
]