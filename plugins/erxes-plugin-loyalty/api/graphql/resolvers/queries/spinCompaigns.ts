import { paginate } from 'erxes-api-utils'
import { COMPAIGN_STATUS } from '../../../models/Constants';

const generateFilter = async (params) => {
  const filter: any = {};

  if (params.searchValue) {
    filter.title = new RegExp(params.searchValue);
  }

  if (params.filterStatus) {
    filter.status = params.filterStatus;
  }

  return filter;
}

export default [
  {
    name: 'spinCompaigns',
    handler: async (_root, params, { models }) => {
      const filter = await generateFilter(params)

      return paginate(
        models.SpinCompaigns.find(
          filter
        ).sort({ modifiedAt: -1 }),
        {
          page: params.page,
          perPage: params.perPage
        }
      )
    }
  },
  {
    name: 'cpSpinCompaigns',
    handler: async (_root, _params, { models }) => {
      const now = new Date();

      return models.SpinCompaigns.find({
        status: COMPAIGN_STATUS.ACTIVE,
        startDate: { $lte: now },
        endDate: { $gte: now }
      }).sort({ modifiedAt: -1 })
    }
  },
  {
    name: 'spinCompaignDetail',
    handler: async (_root, { _id }, { models }) => {
      return models.SpinCompaigns.getSpinCompaign(models, _id)
    }
  },
  {
    name: 'spinCompaignsCount',
    handler: async (_root, params, { models }) => {
      const filter = await generateFilter(params);

      return models.SpinCompaigns.find(
        filter
      ).countDocuments();
    }
  }
]