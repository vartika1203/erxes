const handler = async (_root, params: any, { models, messageBroker }) => {
  if (!messageBroker) {
    return;
  }

  const allPos = await models.Pos.find().lean();
  for (const pos of allPos) {
    const syncIds = Object.keys(pos.syncInfo || {}) || [];

    if (!syncIds.length) {
      continue;
    }

    for (const syncId of syncIds) {
      const syncDate = pos.syncInfo[syncId];

      // expired sync 7day
      if ((new Date().getTime() - syncDate.getTime()) / (24 * 60 * 60 * 1000) > 7) {
        continue;
      }

      messageBroker().sendMessage(`pos:crudData_${syncId}`, params);
    }
  }
};

const customerActions = { type: 'customer', handler };
const userActions = { type: 'user', handler };
const productActions = { type: 'product', handler };
const productCategoryActions = { type: 'productCategory', handler };

export default [
  // customer
  { ...customerActions, action: 'create', },
  { ...customerActions, action: 'update', },
  { ...customerActions, action: 'delete', },
  // user
  { ...userActions, action: 'create' },
  { ...userActions, action: 'update' },
  { ...userActions, action: 'delete' },
  // product
  { ...productActions, action: 'create' },
  { ...productActions, action: 'update' },
  { ...productActions, action: 'delete' },
  // product category
  { ...productCategoryActions, action: 'create' },
  { ...productCategoryActions, action: 'update' },
  { ...productCategoryActions, action: 'delete' },
];
