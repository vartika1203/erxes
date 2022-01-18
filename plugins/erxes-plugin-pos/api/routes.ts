import { getConfig } from 'erxes-api-utils'

const getChildCategories = async (models, categories) => {
  let catIds = []
  for (const category of categories) {
    const childs = await models.ProductCategories.find({
      order: { $regex: `^${category.order}.*`, $options: 'i' }
    }).sort({ order: 1 });

    catIds = catIds.concat(childs.map(ch => ch._id));
  }

  return models.ProductCategories.find({ _id: { $in: catIds } })
}

const getConfigData = async (models, pos) => {
  const data: any = { pos };


  const userFields = {
    email: 1,
    username: 1,
    password: 1,
    isOwner: 1,
    isActive: 1,
    details: 1
  };

  // qpay configs
  const qpayUrl = await models.Configs.findOne({ code: 'qpayUrl' });
  const qpayCallbackUrl = await models.Configs.findOne({ code: 'callbackUrl' });
  const qpayMerchantUser = await models.Configs.findOne({ code: 'qpayMerchantUser' });
  const qpayMerchantPassword = await models.Configs.findOne({ code: 'qpayMerchantPassword' });
  const qpayInvoiceCode = await models.Configs.findOne({ code: 'qpayInvoiceCode' });

  if (pos) {
    data.qpayConfig = {
      url: qpayUrl && qpayUrl.value,
      callbackUrl: qpayCallbackUrl && qpayCallbackUrl.value,
      username: qpayMerchantUser && qpayMerchantUser.value,
      password: qpayMerchantPassword && qpayMerchantPassword.value,
      invoiceCode: qpayInvoiceCode && qpayInvoiceCode.value
    };
  }

  // collect admin users
  if (pos.adminIds) {
    data.adminUsers = await models.Users.find({
      _id: { $in: pos.adminIds },
      isActive: true
    }, userFields).lean();
  }

  // collect cashiers
  if (pos.cashierIds) {
    data.cashiers = await models.Users.find({
      _id: { $in: pos.cashierIds },
      isActive: true
    }, userFields).lean();
  }

  if (pos.formIntegrationIds) {
    const leadIntegrations = await models.Integrations.find({
      _id: { $in: pos.formIntegrationIds },
      kind: 'lead'
    });

    const WIDGETS_DOMAIN = process.env.WIDGETS_DOMAIN;

    const forms = [];

    for (const integration of leadIntegrations) {
      const form = await models.Forms.getForm(integration.formId);
      const brand = await models.Brands.getBrand({
        _id: integration.brandId
      });

      const installScript = `<script>
      window.erxesSettings = {
        forms: [{
          brand_id: "${brand.code}",
          form_id: "${form.code}"
        }],
      };

    (function() {
      var script = document.createElement('script');
      script.src = "${WIDGETS_DOMAIN}/build/formWidget.bundle.js";
      script.async = true;

      var entry = document.getElementsByTagName('script')[0];
      entry.parentNode.insertBefore(script, entry);
    })();

    </script>`;
      forms.push({ installScript, name: integration.name });
    }

    data.forms = forms;
  }
  return data
}

const getProductsData = async (models, pos) => {
  const groups = await models.ProductGroups.groups(models, pos._id);

  const productGroups = [];

  const commonFilter = [
    { status: { $ne: 'disabled' } },
    { status: { $ne: 'archived' } }
  ]

  for (const group of groups) {
    const chosenCategories = await models.ProductCategories.find({
      $and: [
        { _id: { $in: group.categoryIds || [] } },
        ...commonFilter
      ]
    }).sort({ order: 1 }).lean();

    const chosenExcludeCategories = await models.ProductCategories.find({
      $and: [
        { _id: { $in: group.excludedCategoryIds } },
        ...commonFilter
      ]
    }).lean();

    const includeCategories = await getChildCategories(models, chosenCategories);
    const excludeCategories = await getChildCategories(models, chosenExcludeCategories);
    const excludeCatIds = excludeCategories.map(c => (c._id));

    const productCategories = includeCategories.filter(c => (!excludeCatIds.includes(c._id)));

    const categories = [];

    for (const category of productCategories) {
      const products = await models.Products.find({
        status: { $ne: 'deleted' },
        categoryId: category._id,
        _id: { $nin: group.excludedProductIds }
      }).lean();

      category.products = products;

      categories.push({
        _id: category._id,
        name: category.name,
        description: category.description,
        code: category.code,
        parentId: category.parentId,
        order: category.order,
        attachment: category.attachment,
        products
      });
    }

    group.categories = categories;
    productGroups.push(group);
  } // end product group for loop

  return productGroups;
}

const getCustomersData = async (models) => {
  // consider 'customer' state as valid customers
  return await models.Customers.find({
    status: { $ne: 'deleted' }
  }).sort({ state: 1 }).lean();
}

export default {
  routes: [
    {
      method: 'GET',
      path: '/pos-init',
      handler: async ({ req, models }) => {
        const token = req.headers['pos-token'];
        const pos = await models.Pos.findOne({ token }).lean();

        const syncId = Math.random().toString();
        const syncInfo = { [syncId]: new Date() };

        await models.Pos.updateOne({ _id: pos._id }, { $set: { syncInfos: { ...pos.syncInfos, ...syncInfo } } });

        const data: any = await getConfigData(models, { ...pos, syncInfo: { id: syncId, date: syncInfo[syncId] } });
        data.productGroups = await getProductsData(models, pos);
        data.customers = await getCustomersData(models);

        return data;
      }
    }, // end /pos route

    {
      method: 'GET',
      path: '/pos-sync-config',
      handler: async ({ req, models }) => {
        const token = req.headers['pos-token'];
        const { syncId, type } = req.body;

        const pos = await models.Pos.findOne({ token });

        if (!pos) {
          return { error: 'not found pos' }
        }
        pos.syncInfos[syncId] = new Date();

        await pos.save();

        switch (type) {
          case 'config':
            return await getConfigData(models, pos)
          case 'products':
            return { productGroups: await getProductsData(models, pos) }
          case 'customers':
            return { customers: await getCustomersData(models) }
        }

        return { error: 'wrong type' }
      }
    },
    {
      method: 'POST',
      path: '/pos-sync-orders',
      handler: async ({ req, models }) => {
        const token = req.headers['pos-token'];
        const { syncId, orders, putResponses } = req.body;

        const pos = await models.Pos.findOne({ token }).lean();

        if (!pos) {
          return { error: 'not found pos' }
        }

        await models.Pos.updateOne({ token }, { $set: { syncInfo: { ...pos.syncInfos, [syncId]: new Date() } } })

        const resOrderIds = [];
        const putResponseIds = [];

        try {
          let orderBulkOps: Array<{
            updateOne: {
              filter: { _id: string };
              update: any;
              upsert: true;
            };
          }> = [];

          for (const order of orders) {
            resOrderIds.push(order._id);
            orderBulkOps.push({
              updateOne: {
                filter: { _id: order._id },
                update: { $set: { ...order, posToken: token, syncId, branchId: pos.branchId } },
                upsert: true
              }
            });
          }

          if (orderBulkOps.length) {
            await models.PosOrders.bulkWrite(orderBulkOps);
          }

          let bulkOps: Array<{
            updateOne: {
              filter: { _id: string };
              update: any;
              upsert: true;
            };
          }> = [];

          for (const putResponse of putResponses) {
            putResponseIds.push(putResponse._id);
            bulkOps.push({
              updateOne: {
                filter: { _id: putResponse._id },
                update: { $set: { ...putResponse, posToken: token, syncId } },
                upsert: true
              }
            });
          }

          if (bulkOps.length) {
            await models.PutResponses.bulkWrite(bulkOps)
          }

          return { resOrderIds, putResponseIds }
        } catch (e) {
          return { error: e.message }
        }
      }
    },

    // from erkhet, unSync order
    {
      method: 'POST',
      path: '/api/unfetch-order-info',
      handler: async ({ req, models, memoryStorage }) => {
        const { orderId, token } = req.body;
        let erkhetConfig = await getConfig(models, memoryStorage, 'ERKHET', {});

        if (!erkhetConfig || !erkhetConfig.apiToken || erkhetConfig.apiToken !== token) {
          return { error: 'not found token' }
        }

        const order = await models.PosOrders.findOne({ _id: orderId }).lean();
        if (!order) {
          return { error: 'not found order' }
        }

        await models.PosOrders.updateOne({ _id: orderId }, { $set: { syncedErkhet: false } });
        return { status: 'done' }
      }
    }
  ]
};
