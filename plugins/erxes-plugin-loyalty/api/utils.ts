export const checkVouchers = async (models, ownerType: string, ownerId: string) => {
  const activeVouchers = await models.Vouchers.getVouchers(models, { ownerType, ownerId, statuses: ['new'] });
}

export const checkVouchersSale = async (models, ownerType: string, ownerId: string, products: { productId: string, quantity: number }[]) => {
  const result = {};

  const now = new Date();
  const productsIds = products.map(p => p.productId);

  const voucherProject = {
    compaignId: 1,
    createdAt: 1,
    modifiedAt: 1,
    usedAt: 1,
    userId: 1,

    ownerType: 1,
    ownerId: 1,
    compaign: { $arrayElemAt: ['$compaign_doc', 0] },
  }
  const lookup = {
    $lookup: {
      from: 'voucher_compaigns',
      localField: 'compaignId',
      foreignField: '_id',
      as: 'compaign_doc'
    }
  }
  const voucherFilter = { ownerType, ownerId, status: { $in: ['new'] } }
  const activeVouchers = await models.Vouchers.find(voucherFilter).lean();

  const needCompaignIds = activeVouchers.map(v => v.compaignId);
  const compaignFilter = {
    _id: { $in: needCompaignIds },
    useFinishDate: { $gte: now }
  }

  const bonusCompaign = await models.VoucherCompaigns.find({
    ...compaignFilter,
    voucherType: { $in: ['bonus'] },
  }).lean();

  const bonusVouchers = await models.Vouchers.aggregate([
    {
      $match: {
        ...voucherFilter,
        compaignId: { $in: bonusCompaign.map(c => c._id) }
      }
    }, {
      $lookup: lookup
    }, {
      $project: {
        ...voucherProject,
        bonusInfo: 1,
      }
    }
  ])

  for (const bonusVoucher of bonusVouchers) {
    for (const productId of productsIds) {
      if (bonusVoucher.compaign.bonusProductId === productId) {
        if (!Object.keys(result).includes(productId)) {
          result[productId] = {
            potentialBonus: 0
          }
        }

        result[productId].potentialBonus += (bonusVoucher.compaign.bonusCount - (bonusVoucher.bonusInfo || []).reduce((sum, i) => sum + i.usedCount, 0));

      }
    }
  }

  const discountCompaign = await models.VoucherCompaigns.find({
    ...compaignFilter,
    voucherType: { $in: ['discount'] },
  }).lean();

  const discountVouchers = await models.Vouchers.aggregate([
    {
      $match: {
        ...voucherFilter,
        compaignId: { $in: discountCompaign.map(c => c._id) }
      }
    }, {
      $lookup: lookup
    }, {
      $project: {
        ...voucherProject,
      }
    }
  ])

  const relatedDiscountCompaigns = await models.VoucherCompaigns.find({ _id: { $in: discountVouchers.map(v => v.compaignId) } }).lean();
  const productCatIds = relatedDiscountCompaigns.map(c => c.productCategoryIds);
  const catProductsIds = await models.Products.find({ categoryId: { $in: [...new Set(productCatIds)] } }, { _id: 1 });
  const productIds = [...new Set(relatedDiscountCompaigns.map(c => c.productIds).concat(catProductsIds))];


  const productIdsOfCompaign = {};

  for (const discountVoucher of discountVouchers) {

    for (const productId of productsIds) {
      if (discountVoucher.compaign.bonusProductId === productId) {
        if (!Object.keys(result).includes(productId)) {
          result[productId] = {
            discount: 0,
            sumDiscount: 0,
          }
        }

        result[productId].sumDiscount += discountVoucher.compaign.discountPercent;

      }
    }
  }


}