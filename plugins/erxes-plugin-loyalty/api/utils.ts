export const checkVouchersSale = async (models, ownerType: string, ownerId: string, products: { productId: string, quantity: number }[]) => {
  const result = {};

  const now = new Date();
  const productsIds = products.map(p => p.productId);

  for (const productId of productsIds) {
    if (!Object.keys(result).includes(productId)) {
      result[productId] = {
        voucherCompaignId: '',
        voucherId: '',
        potentialBonus: 0,
        discount: 0,
        sumDiscount: 0,
      }
    }
  }

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
  const voucherFilter = { ownerType, ownerId, status: { $in: ['new'] } };

  const activeVouchers = await models.Vouchers.find(voucherFilter).lean();
  const activeCompaignIds = activeVouchers.map(v => v.compaignId);

  const compaignFilter = {
    _id: { $in: activeCompaignIds },
    finishDateOfUse: { $gte: now }
  }

  // bonus
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
        result[productId].voucherCompaignId = bonusVoucher.compaignId;
        result[productId].voucherId = bonusVoucher._id;
        result[productId].potentialBonus += (bonusVoucher.compaign.bonusCount - (bonusVoucher.bonusInfo || []).reduce((sum, i) => sum + i.usedCount, 0));
      }
    }
  }

  // discount
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

  const productCatIds = discountCompaign.reduce((catIds, c) => catIds.concat(c.productCategoryIds), []);
  const catProducts = await models.Products.find({ categoryId: { $in: [...new Set(productCatIds)] } }, { _id: 1, categoryId: 1 }).lean();
  const productIdByCatId = {}
  for (const pr of catProducts) {
    if (!Object.keys(productCatIds).includes(pr.categoryId)) {
      productIdByCatId[pr.categoryId] = []
    }

    productIdByCatId[pr.categoryId].push(pr._id)
  }

  for (const discountVoucher of discountVouchers) {
    const catIds = discountVoucher.compaign.productCategoryIds;
    let productIds = discountVoucher.compaign.productIds || [];

    for (const catId of catIds) {
      productIds = productIds.concat(productCatIds[catId])
    }

    for (const productId of productsIds) {
      if (productIds.includes(productId)) {
        if (result[productId].discount < discountVoucher.discountPercent) {
          result[productId].voucherCompaignId = discountVoucher.compaignId;
          result[productId].voucherId = discountVoucher._id;
          result[productId].discount = discountVoucher.discountPercent;
        }
        result[productId].sumDiscount += discountVoucher.compaign.discountPercent;
      }
    }
  }

  return result;
}

export const confirmVoucherSale = async (models, checkInfo) => {
  for (const productId of Object.keys(checkInfo)) {
    const rule = checkInfo[productId];

    if (!rule.voucherId) {
      continue;
    }

    if (rule.count) {
      await models.updateOne({ _id: rule.voucherId }, { $push: { bonusInfo: {usedCount: rule.count, } } });
    }
  }
}