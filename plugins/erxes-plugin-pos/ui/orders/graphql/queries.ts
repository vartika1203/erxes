const listParamsDef = `
  $page: Int
  $perPage: Int
  $sortField: String
  $sortDirection: Int
`;

const listParamsValue = `
  page: $page
  perPage: $perPage
  sortField: $sortField
  sortDirection: $sortDirection
`;

const responseFields = `
  _id
  createdAt
  status
  paidDate
  number
  customerId
  cardAmount
  cashAmount
  mobileAmount
  totalAmount
  finalAmount
  shouldPrintEbarimt
  printedEbarimt
  billType
  billId
  registerNumber
  oldBillId
  type
  userId
  items
  posToken
  syncId
`;

const posOrders = `
  query posOrders(${listParamsDef}) {
    posOrders(${listParamsValue}) {
      ${responseFields}
    }
  }
`;

const orderDetail = `
  query orderDetail($_id: String) {
    orderDetail(_id: $_id)
  }
`
export default {
  posOrders,
  orderDetail
};
