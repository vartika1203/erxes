import { IProductDocument } from './../db/models/definitions/deals';
import {
  Brands,
  Companies,
  Conformities,
  Conversations,
  Customers,
  EngageMessages,
  Fields,
  FieldsGroups,
  Integrations,
  Products
} from '../db/models';
import Messages from '../db/models/ConversationMessages';
import { IBrowserInfo } from '../db/models/Customers';
import { ICustomField, ILink } from '../db/models/definitions/common';
import { KIND_CHOICES } from '../db/models/definitions/constants';
import { ICustomerDocument } from '../db/models/definitions/customers';
import { ISubmission } from '../db/models/definitions/fields';
import { debugBase, debugError } from '../debuggers';
import { client, fetchElk, getIndexPrefix } from '../elasticsearch';
import { getDbSchemaLabels, sendToLog } from './logUtils';
import { getDocument } from './resolvers/mutations/cacheUtils';
import { findCompany, findCustomer, sendRequest } from './utils';
import { IFormOrderInfo } from './types';
import Invoices from '../db/models/Invoice';
import FormOrders from '../db/models/FormOrders';
import * as crypto from 'crypto';
import { ISocialPayConfig } from '../db/models/definitions/integrations';
import { graphqlPubsub } from '../pubsub';
import { ECOMMERCE_API_URLS, SOCIAL_PAY_API_URLS } from './constants';

export const getOrCreateEngageMessage = async (
  integrationId: string,
  browserInfo: IBrowserInfo,
  visitorId?: string,
  customerId?: string
) => {
  let customer;

  if (customerId) {
    customer = await Customers.getCustomer(customerId);
  }

  if (!customer && !visitorId) {
    return null;
  }

  const integration = await Integrations.getIntegration({
    _id: integrationId,
    kind: KIND_CHOICES.MESSENGER
  });

  const brand = await Brands.getBrand({ _id: integration.brandId || '' });

  // try to create engage chat auto messages
  await EngageMessages.createVisitorOrCustomerMessages({
    brandId: brand._id,
    integrationId: integration._id,
    customer,
    visitorId,
    browserInfo
  });

  // find conversations
  const query = customerId
    ? { integrationId, customerId }
    : { integrationId, visitorId };

  const convs = await Conversations.find(query);

  return Messages.findOne(Conversations.widgetsUnreadMessagesQuery(convs));
};

export const receiveVisitorDetail = async visitor => {
  const { visitorId } = visitor;

  delete visitor.visitorId;
  delete visitor._id;

  const customer = await Customers.update({ visitorId }, { $set: visitor });

  const index = `${getIndexPrefix()}events`;

  try {
    const response = await client.updateByQuery({
      index,
      body: {
        script: {
          lang: 'painless',
          source:
            'ctx._source.visitorId = null; ctx._source.customerId = params.customerId',
          params: {
            customerId: customer._id
          }
        },
        query: {
          term: {
            visitorId
          }
        }
      }
    });

    debugBase(`Response ${JSON.stringify(response)}`);
  } catch (e) {
    debugError(`Update event error ${e.message}`);
  }

  sendToLog('visitor:removeEntry', { visitorId });

  return customer;
};

const fetchHelper = async (index: string, query, errorMessage?: string) => {
  const response = await fetchElk({
    action: 'search',
    index,
    body: { query },
    defaultValue: {
      hits: { hits: [] }
    }
  });

  const hits = response.hits.hits.map(hit => {
    return {
      _id: hit._id,
      ...hit._source
    };
  });

  if (errorMessage) {
    if (hits.length === 0) {
      throw new Error(errorMessage);
    }

    return hits[0];
  }

  return hits;
};

export const getOrCreateEngageMessageElk = async (
  integrationId: string,
  browserInfo: IBrowserInfo,
  visitorId?: string,
  customerId?: string
) => {
  let customer;

  if (customerId) {
    const customers = await fetchHelper('customers', {
      match: {
        _id: customerId
      }
    });

    if (customers.length > 0) {
      customer = customers[0];
    }
  }

  if (!customer && !visitorId) {
    return null;
  }

  const integration = await fetchHelper(
    'integrations',
    {
      bool: {
        must: [
          { match: { _id: integrationId } },
          { match: { kind: KIND_CHOICES.MESSENGER } }
        ]
      }
    },
    'Integration not found'
  );

  const brand = await fetchHelper(
    'brands',
    {
      match: {
        _id: integration.brandId
      }
    },
    'Brand not found'
  );

  // try to create engage chat auto messages
  await EngageMessages.createVisitorOrCustomerMessages({
    brandId: brand._id,
    integrationId: integration._id,
    customer,
    visitorId,
    browserInfo
  });

  // find conversations
  const customerSelector = {
    term: customer
      ? { 'customerId.keyword': customerId }
      : { 'visitorId.keyword': visitorId }
  };

  const convs = await fetchHelper('conversations', {
    bool: {
      must: [
        { term: { 'integrationId.keyword': integrationId } },
        customerSelector
      ]
    }
  });

  const conversationIds = convs.map(c => c._id);

  const messages = await fetchHelper('conversation_messages', {
    bool: {
      must: [
        { exists: { field: 'userId' } },
        { term: { internal: false } },
        { terms: { 'conversationId.keyword': conversationIds } }
      ],
      must_not: [{ term: { isCustomerRead: true } }]
    }
  });

  return messages.pop();
};

const getSocialLinkKey = (type: string) => {
  return type.substring(type.indexOf('_') + 1);
};

const createCustomer = async (
  integrationId: string,
  customerDoc: any,
  brandId?: string
) => {
  return Customers.createCustomer({
    integrationId,
    primaryEmail: customerDoc.email || '',
    emails: [customerDoc.email || ''],
    firstName: customerDoc.firstName || '',
    lastName: customerDoc.lastName || '',
    middleName: customerDoc.middleName || '',
    primaryPhone: customerDoc.phone || '',
    scopeBrandIds: [brandId || '']
  });
};

const prepareCustomFieldsData = (
  customerData: ICustomField[],
  submissionData: ICustomField[]
) => {
  const customFieldsData: ICustomField[] = [];

  if (customerData.length === 0) {
    return submissionData;
  }

  for (const data of submissionData) {
    const existingData = customerData.find(e => e.field === data.field);

    if (existingData && Array.isArray(existingData.value)) {
      data.value = existingData.value.concat(data.value);
    }

    customFieldsData.push(data);
  }

  return customFieldsData;
};

export const updateCustomerFromForm = async (
  browserInfo: any,
  doc: any,
  customer: ICustomerDocument
) => {
  const customerDoc: any = {
    ...doc,
    location: browserInfo,
    firstName: customer.firstName || doc.firstName,
    lastName: customer.lastName || doc.lastName,
    middleName: customer.middleName || doc.middleName,
    sex: doc.pronoun,
    birthDate: doc.birthDate,
    scopeBrandIds: [...doc.scopeBrandIds, ...(customer.scopeBrandIds || [])],
    ...(customer.primaryEmail
      ? {}
      : {
          emails: [doc.email],
          primaryEmail: doc.email
        }),
    ...(customer.primaryPhone
      ? {}
      : {
          phones: [doc.phone],
          primaryPhone: doc.phone
        })
  };

  if (!customer.customFieldsData) {
    customerDoc.customFieldsData = doc.customFieldsData;
  }

  if (customer.customFieldsData && doc.customFieldsData.length > 0) {
    customerDoc.customFieldsData = prepareCustomFieldsData(
      customer.customFieldsData,
      doc.customFieldsData
    );
  }

  if (Object.keys(doc.links).length > 0) {
    const links = customer.links || {};

    for (const key of Object.keys(doc.links)) {
      const value = doc.links[key];
      if (!value || value.length === 0) {
        continue;
      }

      links[key] = value;
    }
    customerDoc.links = links;
  }

  await Customers.updateCustomer(customer._id, customerDoc);
};

const groupSubmissions = (submissions: ISubmission[]) => {
  const submissionsGrouped: { [key: string]: ISubmission[] } = {};

  submissions.forEach(submission => {
    if (submission.groupId) {
      if (submissionsGrouped[submission.groupId]) {
        submissionsGrouped[submission.groupId].push(submission);
      } else {
        submissionsGrouped[submission.groupId] = [submission];
      }
    } else {
      if (submissionsGrouped.default) {
        submissionsGrouped.default.push(submission);
      } else {
        submissionsGrouped.default = [submission];
      }
    }
  });
  return submissionsGrouped;
};

export const solveSubmissions = async (args: {
  integrationId: string;
  formId: string;
  submissions: ISubmission[];
  browserInfo: any;
  cachedCustomerId?: string;
}) => {
  let { cachedCustomerId } = args;
  const { integrationId, browserInfo } = args;
  const integration = await getDocument('integrations', { _id: integrationId });

  const submissionsGrouped = groupSubmissions(args.submissions);

  const conformityIds: {
    [key: string]: { customerId: string; companyId: string };
  } = {};

  let cachedCustomer;

  const customerSchemaLabels = await getDbSchemaLabels('customer');
  const companySchemaLabels = await getDbSchemaLabels('company');

  for (const groupId of Object.keys(submissionsGrouped)) {
    const customerLinks: ILink = {};
    const companyLinks: ILink = {};
    const customerDoc: any = {};
    const companyDoc: any = {};

    const customFieldsData: ICustomField[] = [];
    const companyCustomData: ICustomField[] = [];

    for (const submission of submissionsGrouped[groupId]) {
      const submissionType = submission.type || '';

      if (submissionType.includes('customerLinks')) {
        customerLinks[getSocialLinkKey(submissionType)] = submission.value;
        continue;
      }

      if (submissionType.includes('companyLinks')) {
        companyLinks[getSocialLinkKey(submissionType)] = submission.value;
        continue;
      }

      if (submissionType === 'pronoun') {
        switch (submission.value) {
          case 'Male':
            customerDoc.pronoun = 1;
            break;
          case 'Female':
            customerDoc.pronoun = 2;
            break;
          case 'Not applicable':
            customerDoc.pronoun = 9;
            break;
          default:
            customerDoc.pronoun = 0;
            break;
        }
        continue;
      }

      if (
        customerSchemaLabels.findIndex(e => e.name === submissionType) !== -1
      ) {
        if (
          submissionType === 'avatar' &&
          submission.value &&
          submission.value.length > 0
        ) {
          customerDoc.avatar = submission.value[0].url;
          continue;
        }

        customerDoc[submissionType] = submission.value;
        continue;
      }

      if (submissionType.includes('company_')) {
        if (
          submissionType === 'company_avatar' &&
          submission.value &&
          submission.value.length > 0
        ) {
          companyDoc.avatar = submission.value[0].url;
          continue;
        }

        const key = submissionType.split('_')[1];
        companyDoc[key] = submission.value;
        continue;
      }

      if (
        companySchemaLabels.findIndex(e => e.name === submissionType) !== -1
      ) {
        companyDoc[submissionType] = submission.value;
        continue;
      }

      if (
        submission.associatedFieldId &&
        [
          'input',
          'select',
          'multiSelect',
          'file',
          'textarea',
          'radio',
          'check',
          'map'
        ].includes(submissionType)
      ) {
        const field = await Fields.findById(submission.associatedFieldId);
        if (!field) {
          continue;
        }

        const fieldGroup = await FieldsGroups.findById(field.groupId);

        if (fieldGroup && fieldGroup.contentType === 'company') {
          companyCustomData.push({
            field: submission.associatedFieldId,
            value: submission.value
          });
        }

        if (fieldGroup && fieldGroup.contentType === 'customer') {
          customFieldsData.push({
            field: submission.associatedFieldId,
            value: submission.value
          });
        }
      }
    }

    if (groupId === 'default') {
      cachedCustomer = await Customers.getWidgetCustomer({
        integrationId,
        cachedCustomerId,
        email: customerDoc.email || '',
        phone: customerDoc.phone || ''
      });

      if (!cachedCustomer) {
        cachedCustomer = await createCustomer(
          integrationId,
          customerDoc,
          integration.brandId || ''
        );
      }

      await updateCustomerFromForm(
        browserInfo,
        {
          ...customerDoc,
          customFieldsData,
          links: customerLinks,
          scopeBrandIds: [integration.brandId || '']
        },
        cachedCustomer
      );

      cachedCustomerId = cachedCustomer._id;

      conformityIds[groupId] = {
        customerId: cachedCustomer._id,
        companyId: ''
      };
    } else {
      let customer = await findCustomer({
        customerPrimaryEmail: customerDoc.email || '',
        customerPrimaryPhone: customerDoc.phone || ''
      });

      if (!customer) {
        customer = await createCustomer(
          integrationId,
          customerDoc,
          integration.brandId || ''
        );
      }

      await updateCustomerFromForm(
        browserInfo,
        {
          ...customerDoc,
          customFieldsData,
          links: customerLinks,
          scopeBrandIds: [integration.brandId || '']
        },
        customer
      );

      conformityIds[groupId] = { customerId: customer._id, companyId: '' };
    }

    if (
      !(
        companyDoc.primaryEmail ||
        companyDoc.primaryPhone ||
        companyDoc.primaryName
      )
    ) {
      continue;
    }

    let company = await findCompany({
      companyPrimaryName: companyDoc.primaryName || '',
      companyPrimaryEmail: companyDoc.primaryEmail || '',
      companyPrimaryPhone: companyDoc.primaryPhone || ''
    });

    companyDoc.scopeBrandIds = [integration.brandId || ''];

    if (!company) {
      company = await Companies.createCompany(companyDoc);
    }

    if (Object.keys(companyLinks).length > 0) {
      const links = company.links || {};

      for (const key of Object.keys(companyLinks)) {
        const value = companyLinks[key];
        if (!value || value.length === 0) {
          continue;
        }

        links[key] = value;
      }
      companyDoc.links = links;
    }

    if (!company.customFieldsData) {
      companyDoc.customFieldsData = companyCustomData;
    }

    if (company.customFieldsData && companyCustomData.length > 0) {
      companyDoc.customFieldsData = prepareCustomFieldsData(
        company.customFieldsData,
        companyCustomData
      );
    }

    company = await Companies.updateCompany(company._id, companyDoc);

    // if company scopeBrandIds does not contain brandId
    if (
      company.scopeBrandIds.findIndex(e => e === integration.brandId) === -1
    ) {
      await Companies.update(
        { _id: company._id },
        { $push: { scopeBrandIds: integration.brandId } }
      );
    }

    conformityIds[groupId] = {
      companyId: company._id,
      customerId: conformityIds[groupId].customerId
    };
  }

  let mainCompanyId = '';
  const relTypeIds: string[] = [];

  for (const key of Object.keys(conformityIds)) {
    const { companyId, customerId } = conformityIds[key];

    if (key === 'default' && companyId && customerId) {
      mainCompanyId = companyId;
      relTypeIds.push(customerId);
    }

    if (key !== 'default' && companyId && customerId) {
      await Conformities.addConformity({
        mainType: 'company',
        mainTypeId: companyId,
        relType: 'customer',
        relTypeId: customerId
      });
    }

    if (key !== 'default' && !companyId && customerId) {
      relTypeIds.push(customerId);
    }
  }

  if (mainCompanyId !== '' && relTypeIds.length > 0) {
    for (const relTypeId of relTypeIds) {
      await Conformities.addConformity({
        mainType: 'company',
        mainTypeId: mainCompanyId,
        relType: 'customer',
        relTypeId
      });
    }
  }

  return cachedCustomer;
};

export const getOrderInfo = async (
  integrationId,
  formId,
  customerId,
  submissions: ISubmission[],
  messageId: string,
  product?: IProductDocument
) => {
  const orderInfo: IFormOrderInfo = {
    paymentConfig: { type: 'none' },
    amount: 0,
    items: []
  };

  submissions = submissions.filter(
    e => e.type === 'productCategory' && e.value.length > 0
  );

  if (submissions.length === 0 && !product) {
    return orderInfo;
  }

  const integration = await getDocument('integrations', { _id: integrationId });
  const { paymentConfig } = integration;

  if (!paymentConfig || paymentConfig.type === 'none') {
    return orderInfo;
  }

  orderInfo.paymentConfig = paymentConfig;

  for (const submission of submissions) {
    const productObj = await Products.getProduct({ _id: submission.value });
    const price = productObj.unitPrice || 0;
    orderInfo.amount += price;
    orderInfo.items.push({
      productId: productObj._id,
      quantity: 1,
      price,
      total: price * 1
    });
  }

  if (product) {
    const price = product.unitPrice || 0;
    orderInfo.amount = price;
    orderInfo.items.push({
      productId: product._id,
      quantity: 1,
      price,
      total: price
    });
  }

  try {
    return await settleOrder(
      formId,
      integrationId,
      integration.kind,
      customerId,
      orderInfo,
      messageId
    );
  } catch (e) {
    throw new Error(e.message);
  }
};

export const makeInvoiceNo = length => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const hmac256 = (key, message) => {
  const hash = crypto.createHmac('sha256', key).update(message);
  return hash.digest('hex');
};

const settleOrder = async (
  formId: string,
  integrationId: string,
  integrationKind: string,
  customerId: string,
  orderInfo: IFormOrderInfo,
  messageId: string
) => {
  let invoice: any = {};
  const { amount, phone, items } = orderInfo;

  const {
    terminal,
    key,
    checksumKey,
    redirectUrl,
    token,
    type
  } = orderInfo.paymentConfig as ISocialPayConfig;

  const handleSocialPay = async () => {
    invoice = await Invoices.createInvoice({
      status: 'open',
      amount,
      invoiceNo: messageId,
      phone,
      type: integrationKind,
      invoiceType: type
    });

    const requestBody: any = {
      amount,
      checksum: await hmac256(key, terminal + messageId + amount),
      invoice: messageId,
      terminal
    };

    const requestUrl = SOCIAL_PAY_API_URLS.QR_INVOICE;

    try {
      const { body } = await sendRequest({
        url: requestUrl,
        method: 'POST',
        body: requestBody,
        redirect: 'follow'
      });

      const { response } = body;
      if (response.status !== 'SUCCESS') {
        throw new Error(response.desc);
      }

      await FormOrders.createOrder({
        formId,
        integrationId,
        customerId,
        items,
        status: 'placed',
        invoiceId: invoice._id,
        messageId
      });

      return { invoiceResponse: response.desc, invoiceType: 'socialPay' };
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const handleGolomtECommerce = async () => {
    invoice = await Invoices.createInvoice({
      status: 'open',
      amount,
      invoiceNo: messageId,
      type: integrationKind,
      invoiceType: type
    });

    const returnType = 'POST';

    const requestBody: any = {
      amount,
      checksum: await hmac256(
        checksumKey,
        messageId + amount + returnType + redirectUrl
      ),
      callback: redirectUrl,
      genToken: 'N',
      returnType,
      transactionId: messageId
    };

    try {
      const response = await sendRequest({
        url: ECOMMERCE_API_URLS.CREATE_INVOICE,
        method: 'POST',
        body: requestBody,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        redirect: 'follow'
      });

      if (response.invoice) {
        await FormOrders.createOrder({
          formId,
          integrationId,
          customerId,
          items,
          status: 'placed',
          invoiceId: invoice._id,
          messageId
        });

        return {
          invoiceResponse: `https://ecommerce.golomtbank.com/payment/mn/${response.invoice}`,
          invoiceType: 'golomtEcommerce'
        };
      }
    } catch (e) {
      throw new Error(e.message);
    }
  };

  switch (type) {
    case 'socialPay':
      return handleSocialPay();

    case 'golomtEcommerce':
      return handleGolomtECommerce();

    default:
      break;
  }
};

const cancelInvoice = async (type, config, invoiceNo, amount) => {
  if (type === 'socialPay') {
    const { key, terminal } = config;

    const requestBody: any = {
      amount,
      checksum: await hmac256(key, terminal + invoiceNo + amount),
      invoice: invoiceNo,
      terminal
    };

    try {
      const { body } = await sendRequest({
        url: SOCIAL_PAY_API_URLS.CANCEL_INVOICE,
        method: 'POST',
        body: requestBody,
        redirect: 'follow'
      });

      if (body.response.status !== 'SUCCESS') {
        throw new Error(body.response.desc);
      }

      return 'cancelled';
    } catch (e) {
      throw new Error(e.message);
    }
  }
};

export const cancelOrder = async ({
  messageId,
  customerId
}: {
  messageId: string;
  customerId: string;
}) => {
  const order = await FormOrders.getOrder({
    messageId,
    customerId
  });

  const invoice = await Invoices.getInvoice(order.invoiceId);

  if (order.status !== 'placed' || invoice.status !== 'open') {
    throw new Error('Order is already settled');
  }

  const integration = await getDocument('integrations', {
    _id: order.integrationId
  });

  const { paymentConfig } = integration;

  try {
    const res = await cancelInvoice(
      paymentConfig.type,
      paymentConfig.paymentConfig,
      invoice.invoiceNo,
      invoice.amount
    );

    await Invoices.updateInvoiceStatus(invoice._id, 'cancelled');

    await FormOrders.updateOrderStatus(order._id, 'cancelled');

    return res;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const handleSocialPayNotification = async (req, res, next) => {
  const {
    resp_code,
    resp_desc,
    amount,
    checksum,
    invoice,
    terminal
  } = req.body;

  let status = 'success';
  let description = resp_desc;

  if (resp_code !== '00') {
    status = 'failed';
  }

  try {
    const response = await sendRequest({
      url: SOCIAL_PAY_API_URLS.CHECK_INVOICE,
      method: 'POST',
      body: { amount, checksum, invoice, terminal },
      redirect: 'follow'
    });

    const { body } = response;

    if (body.response.resp_code !== '00') {
      status = 'failed';
      description = body.response.resp_desc;

      graphqlPubsub.publish('formInvoiceUpdated', {
        formInvoiceUpdated: { messageId: invoice, status, description }
      });

      return;
    }

    const invoiceObj = await Invoices.getInvoice({
      invoiceNo: invoice
    });
    const order = await FormOrders.getOrder({ invoiceId: invoiceObj._id });

    await Invoices.updateInvoiceStatus(invoiceObj._id, 'paid');

    await FormOrders.updateOrderStatus(order._id, 'paid');

    graphqlPubsub.publish('formInvoiceUpdated', {
      formInvoiceUpdated: { messageId: invoice, status, description }
    });
  } catch (e) {
    next(e);
  }

  res.send('OK');
};

export const handleGolomtNotification = async (req, res, next) => {
  const invoice = req.body.invoice || '';
  const invoiceObj = await Invoices.getInvoice({
    invoiceNo: invoice
  });
  const order = await FormOrders.getOrder({ invoiceId: invoiceObj._id });
  const integration = await getDocument('integrations', {
    _id: order.integrationId
  });
  const { paymentConfig } = integration;
  const { checksumKey = '', token } = paymentConfig;

  const requestBody: any = {
    transactionId: invoice,
    checksum: await hmac256(checksumKey, invoice + invoice)
  };

  try {
    const response = await sendRequest({
      url: ECOMMERCE_API_URLS.CHECK_INVOICE,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: requestBody,
      redirect: 'follow'
    });

    if (response.errorCode !== '000') {
      graphqlPubsub.publish('formInvoiceUpdated', {
        formInvoiceUpdated: {
          messageId: invoice,
          status: 'failed',
          description: response.errorDesc
        }
      });

      return;
    }

    await Invoices.updateInvoiceStatus(invoiceObj._id, 'paid');

    await FormOrders.updateOrderStatus(order._id, 'paid');

    graphqlPubsub.publish('formInvoiceUpdated', {
      formInvoiceUpdated: {
        messageId: invoice,
        status: 'success',
        description: response.errorDesc
      }
    });
  } catch (e) {
    next(e);
  }

  res.send('OK');
};
