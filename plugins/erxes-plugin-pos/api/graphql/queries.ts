export const paginate = (
  collection,
  params: {
    ids?: string[];
    page?: number;
    perPage?: number;
    excludeIds?: boolean;
  }
) => {
  const { page = 0, perPage = 0, ids, excludeIds } = params || { ids: null };

  const _page = Number(page || "1");
  const _limit = Number(perPage || "100");

  if (ids && ids.length > 0) {
    return excludeIds ? collection.limit(_limit) : collection;
  }

  return collection.limit(_limit).skip((_page - 1) * _limit);
};

export const escapeRegExp = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const generateFilterQuery = async (
  models,
  { brandId, tag, status, isOnline },
  commonQuerySelector
) => {
  const query: any = commonQuerySelector;
  const integrationQuery: any = { kind: 'pos' };

  if (brandId) {
    integrationQuery.brandId = brandId;
  }

  if (tag) {
    const object = await models.Tags.findOne({ _id: tag });
    integrationQuery.tagIds = { $in: [tag, ...(object?.relatedIds || [])] };
  }

  if (status) {
    query.isActive = status === 'active' ? true : false;
  }

  if (isOnline) {
    query.isOnline = isOnline === 'online'
  }

  const posIntegrations = await models.Integrations.find(integrationQuery, {
    _id: 1
  });

  query.integrationId = { $in: posIntegrations.map(e => e._id) };

  return query;
};

export const getPureDate = (date: Date) => {
  const ndate = new Date(date);
  const diffTimeZone = ndate.getTimezoneOffset() * 1000 * 60;
  return new Date(ndate.getTime() - diffTimeZone)
}

export const getFullDate = (date: Date) => {
  const ndate = getPureDate(date)
  const year = ndate.getFullYear();
  const month = ndate.getMonth();
  const day = ndate.getDate();

  const today = new Date(year, month, day);
  today.setHours(0, 0, 0, 0)
  return today;
}

export const getTomorrow = (date: Date) => {
  return getFullDate(new Date(date.getTime() + 24 * 60 * 60 * 1000))
}

const generateFilterPosQuery = async (
  _models, params, commonQuerySelector, currentUserId
) => {
  const query: any = commonQuerySelector;
  const {
    search,
    paidStartDate,
    paidEndDate,
    createdStartDate,
    createdEndDate,
    paidDate,
    userId,
    customerId
  } = params;

  if (search) {
    query.number = { $regex: new RegExp(search) }
  }

  if (customerId) {
    query.customerId = customerId
  }

  if (userId) {
    let lastUserId = userId
    if (userId === 'me') {
      lastUserId = currentUserId;
    }
    if (userId === 'nothing') {
      lastUserId = ''
    }
    query.userId = lastUserId
  }

  if (paidDate === 'today') {
    const now = new Date()

    const startDate = getFullDate(now)
    const endDate = getTomorrow(now)
    query.paidDate = { $gte: startDate, $lte: endDate }
  }

  const paidQry: any = {}
  if (paidStartDate) {
    paidQry.$gte = new Date(paidStartDate)
  }
  if (paidEndDate) {
    paidQry.$lte = new Date(paidEndDate)
  }
  if (Object.keys(paidQry).length) {
    query.paidDate = paidQry
  }

  const createdQry: any = {}
  if (createdStartDate) {
    createdQry.$gte = new Date(createdStartDate)
  }
  if (createdEndDate) {
    createdQry.$lte = new Date(createdEndDate)
  }
  if (Object.keys(createdQry).length) {
    query.createdAt = createdQry
  }

  return query
}

const queries = [
  /**
   * all pos list
   */
  {
    name: 'posList',
    handler: async (
      _root,
      params,
      { commonQuerySelector, models, checkPermission, user }
    ) => {
      await checkPermission('showPos', user);

      const query = await generateFilterQuery(
        models,
        params,
        commonQuerySelector
      );

      const posList = paginate(models.Pos.find(query), params);

      return posList;
    }
  },
  {
    name: 'posDetail',
    handler: async (_root, { _id }, { models, checkPermission, user }) => {
      await checkPermission('showPos', user);
      return await models.Pos.getPos(models, { _id });
    }
  },

  {
    name: 'productGroups',
    handler: async (
      _root,
      { posId }: { posId: string },
      { models, checkPermission, user }
    ) => {
      await checkPermission('managePos', user);
      return await models.ProductGroups.groups(models, posId);
    }
  },

  {
    name: 'posOrders',
    handler: async (_root, params, { models, commonQuerySelector, user }) => {
      const query = await generateFilterPosQuery(models, params, commonQuerySelector, user._id)

      return paginate(models.PosOrders.find(query), {
        page: params.page,
        perPage: params.perPage
      });
    }
  },
  {
    name: 'posOrdersSummary',
    handler: async (_root, params, { models, commonQuerySelector, user }) => {
      const query = await generateFilterPosQuery(models, params, commonQuerySelector, user._id)

      const res = await models.PosOrders.aggregate([
        { $match: { ...query } },
        {
          $project: {
            cardAmount: '$cardAmount',
            cashAmount: '$cashAmount',
            mobileAmount: '$mobileAmount',
            totalAmount: '$totalAmount',
            finalAmount: '$finalAmount ',
          }
        },
        {
          $group: {
            _id: '',
            cardAmount: { $sum: '$cardAmount' },
            cashAmount: { $sum: '$cashAmount' },
            mobileAmount: { $sum: '$mobileAmount' },
            totalAmount: { $sum: '$totalAmount' },
            finalAmount: { $sum: '$finalAmount ' },
          }
        }
      ]);

      if (!res.length) {
        return {}
      }

      return {
        ...res[0],
        count: await models.PosOrders.find(query).countDocuments()
      }

    }
  },
  {
    name: 'posProducts',
    handler: async (_root, params, { models, commonQuerySelector, user }) => {
      const orderQuery = await generateFilterPosQuery(models, params, commonQuerySelector, user._id);
      const query: any = { status: { $ne: 'deleted' } };

      if (params.categoryId) {
        const category = await models.ProductCategories.getProductCatogery({
          _id: params.categoryId,
          status: { $in: [null, 'active'] }
        });

        const product_category_ids = await models.ProductCategories.find(
          { order: { $regex: new RegExp(category.order) } },
          { _id: 1 }
        ).lean();

        query.categoryId = { $in: product_category_ids }
      }

      if (params.searchValue) {
        const fields = [
          {
            name: { $in: [new RegExp(`.*${escapeRegExp(params.searchValue)}.*`, 'i')] }
          },
          { code: { $in: [new RegExp(`.*${escapeRegExp(params.searchValue)}.*`, 'i')] } }
        ];

        query.$or = fields;
      }
      const limit = params.perPage || 20;
      const skip = params.page ? (params.page - 1) * limit : 0;

      const products = await models.Products.find(query)
        .skip(skip).limit(limit).lean();

      const productIds = products.map(p => p._id)

      query['items.productId'] = { $in: productIds }

      const items = await models.PosOrders.aggregate([
        { $match: orderQuery },
        { $unwind: '$items' },
        { $match: { 'items.productId': { $in: productIds } } },
        {
          $project: {
            productId: '$items.productId',
            count: '$items.count',
          }
        },
        {
          $group: {
            _id: '$productId',
            count: { $sum: '$count' },
          }
        }
      ]);

      for (const product of products) {
        product.count = (items.find(i => i._id === product._id) || {}).count || 0;
      }

      return products;
    }
  },
];

export default queries;
