const handler = (_root, params: any, { messageBroker }) => {
  if (messageBroker) {
    messageBroker().sendMessage('pos:crudData', params);
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
