import { paginate } from 'erxes-api-utils'

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
    name: 'donateCompaigns',
    handler: async (_root, params, { models }) => {
      const filter = await generateFilter(params)

      return paginate(
        models.DonateCompaigns.find(
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
    name: 'donateCompaignDetail',
    handler: async (_root, { _id }, { models }) => {
      return models.DonateCompaigns.getDonateCompaign(models, _id)
    }
  },
  {
    name: 'donateCompaignsCount',
    handler: async (_root, params, { models }) => {
      const filter = await generateFilter(params);

      return models.DonateCompaigns.find(
        filter
      ).countDocuments();
    }
  }
]