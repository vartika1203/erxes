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
    name: 'lotteryCompaigns',
    handler: async (_root, params, { models }) => {
      const filter = await generateFilter(params)

      return paginate(
        models.LotteryCompaigns.find(
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
    name: 'cpLotteryCompaigns',
    handler: async (_root, _params, { models }) => {
      const now = new Date();

      return models.LotteryCompaigns.find({
        status: COMPAIGN_STATUS.ACTIVE,
        startDate: { $lte: now },
        endDate: { $gte: now }
      }).sort({ modifiedAt: -1 })
    }
  },
  {
    name: 'lotteryCompaignDetail',
    handler: async (_root, { _id }, { models }) => {
      return models.LotteryCompaigns.getLotteryCompaign(models, _id)
    }
  },
  {
    name: 'lotteryCompaignsCount',
    handler: async (_root, params, { models }) => {
      const filter = await generateFilter(params);

      return models.LotteryCompaigns.find(
        filter
      ).countDocuments();
    }
  }
]