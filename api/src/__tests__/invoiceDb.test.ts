import { conversationMessageFactory, invoiceFactory } from '../db/factories';
import './setup.ts';
import Invoices from '../db/models/Invoice';
import { ConversationMessages } from '../db/models';

describe('Invoices db', () => {
  let _conversationMessage;
  let _invoice;

  beforeEach(async () => {
    // Creating test data
    _conversationMessage = await conversationMessageFactory({});
    _invoice = await invoiceFactory({});
  });

  afterEach(async () => {
    // Clearing test data
    await ConversationMessages.deleteMany({});
    await Invoices.deleteMany({});
  });

  test('Get invoice', async () => {
    try {
      await Invoices.getInvoice({ _id: 'fakeId' });
    } catch (e) {
      expect(e.message).toBe('Invoice not found');
    }

    const invoiceObj = await Invoices.getInvoice({ _id: _invoice._id });

    expect(invoiceObj).toBeDefined();
  });

  test('Create invoice', async () => {
    const invoiceObj = await Invoices.createInvoice({
      status: _invoice.status,
      amount: _invoice.amount,
      invoiceNo: _conversationMessage._id,
      type: _invoice.type,
      invoiceType: _invoice.invoiceType
    });

    expect(invoiceObj).toBeDefined();
    expect(invoiceObj.status).toBeDefined();
    expect(invoiceObj.amount).toBe(_invoice.amount);
    expect(invoiceObj.type).toBe(_invoice.type);
    expect(invoiceObj.invoiceType).toBe(_invoice.invoiceType);
    expect(invoiceObj.invoiceNo).toBe(_conversationMessage._id);
  });

  test('Update invoice', async () => {
    const _invoiceUpdateObj = await invoiceFactory({});

    // update invoice object
    const invoiceObj = await Invoices.updateInvoice(_invoice._id, {
      status: _invoiceUpdateObj.status,
      amount: _invoiceUpdateObj.amount,
      type: _invoiceUpdateObj.type,
      invoiceType: _invoiceUpdateObj.invoiceType
    });

    expect(invoiceObj.status).toBe(_invoiceUpdateObj.status);
    expect(invoiceObj.amount).toBe(_invoiceUpdateObj.amount);
    expect(invoiceObj.type).toBe(_invoiceUpdateObj.type);
    expect(invoiceObj.invoiceType).toBe(_invoiceUpdateObj.invoiceType);
  });

  test('Delete invoice', async () => {
    await Invoices.removeInvoice(_invoice._id);

    expect(await Invoices.findOne({ _id: _invoice._id }).countDocuments()).toBe(
      0
    );

    try {
      await Invoices.removeInvoice('test');
    } catch (e) {
      expect(e.message).toBe('Invoice not found');
    }
  });

  test('Update invoice status', async () => {
    await Invoices.updateInvoiceStatus(_invoice._id, 'cancelled');
    const invoiceObj = await Invoices.getInvoice({ _id: _invoice._id });

    expect(invoiceObj.status).toBe('cancelled');
  });
});
