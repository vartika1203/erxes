import {
  formOrderFactory,
  productFactory,
  invoiceFactory,
  customerFactory,
  formFactory,
  integrationFactory
} from './../db/factories';
import './setup.ts';
import Invoices from '../db/models/Invoice';
import { ConversationMessages, Customers } from '../db/models';
import FormOrders from '../db/models/FormOrders';
import * as faker from 'faker';

// getOrder(doc: any): IFormOrderDocument;
// createOrder(doc: IFormOrder): IFormOrderDocument;
// updateOrder(_id: string, fields: IFormOrder): IFormOrderDocument;
// removeOrder(_id: string): IFormOrderDocument;
// updateOrderStatus(_id: string, status: string): void;

describe('FormOrders db', () => {
  let _invoice;
  let _order;
  let _customer;
  let _form;
  let _integration;

  beforeEach(async () => {
    // Creating test data
    _invoice = await invoiceFactory({});
    _order = await formOrderFactory({
      invoiceId: _invoice._id,
      messageId: _invoice.invoiceNo
    });
    _customer = await customerFactory({});
    _form = await formFactory({});
    _integration = await integrationFactory({
      formId: _form._id,
      kind: 'lead'
    });
  });

  afterEach(async () => {
    // Clearing test data
    await ConversationMessages.deleteMany({});
    await Invoices.deleteMany({});
    await FormOrders.deleteMany({});
    await Customers.deleteMany({});
  });

  test('Get formOrder', async () => {
    try {
      await FormOrders.getOrder({ _id: 'fakeId' });
    } catch (e) {
      expect(e.message).toBe('Order not found');
    }

    const orderObj = await FormOrders.getOrder({ _id: _order._id });

    expect(orderObj).toBeDefined();
  });

  test('Create order', async () => {
    const product = await productFactory({});
    const qty = faker.random.number();
    const price = product.unitPrice || 1;
    const items = [
      { productId: product._id, quantity: qty, price, total: price * qty }
    ];

    const orderObj = await FormOrders.createOrder({
      status: 'placed',
      items,
      invoiceId: _invoice._id,
      messageId: _invoice.invoiceNo,
      customerId: _customer._id,
      formId: _form._id,
      integrationId: _integration._id
    });

    expect(orderObj).toBeDefined();
    expect(orderObj.status).toBe('placed');
    expect(orderObj.items).toHaveLength(1);
    expect(orderObj.invoiceId).toBe(_invoice._id);
    expect(orderObj.messageId).toBe(_invoice.invoiceNo);
    expect(orderObj.customerId).toBe(_customer._id);
    expect(orderObj.formId).toBe(_form._id);
    expect(orderObj.integrationId).toBe(_integration._id);
  });

  test('Update order', async () => {
    const _orderUpdateObj = await formOrderFactory({});

    // update invoice object
    const orderObj = await FormOrders.updateOrder(_order._id, {
      status: _orderUpdateObj.status,
      invoiceId: _orderUpdateObj.invoiceId,
      messageId: _orderUpdateObj.messageId,
      customerId: _orderUpdateObj.customerId,
      formId: _orderUpdateObj.formId,
      integrationId: _orderUpdateObj.integrationId,
      items: _orderUpdateObj.items
    });

    expect(orderObj.status).toBe(_orderUpdateObj.status);
    expect(orderObj.invoiceId).toBe(_orderUpdateObj.invoiceId);
    expect(orderObj.messageId).toBe(_orderUpdateObj.messageId);
    expect(orderObj.customerId).toBe(_orderUpdateObj.customerId);
    expect(orderObj.formId).toBe(_orderUpdateObj.formId);
    expect(orderObj.integrationId).toBe(_orderUpdateObj.integrationId);
  });

  test('Delete order', async () => {
    await FormOrders.removeOrder(_order._id);

    expect(await FormOrders.findOne({ _id: _order._id }).countDocuments()).toBe(
      0
    );

    try {
      await FormOrders.removeOrder('test');
    } catch (e) {
      expect(e.message).toBe('Order not found with id test');
    }
  });

  test('Update order status', async () => {
    await FormOrders.updateOrderStatus(_order._id, 'cancelled');
    const orderObj = await FormOrders.getOrder({ _id: _order._id });

    expect(orderObj.status).toBe('cancelled');
  });
});
