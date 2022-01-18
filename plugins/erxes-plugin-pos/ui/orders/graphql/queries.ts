import { queries as productQueries } from 'erxes-ui/lib/products/graphql';

const listParamsDef = `
  $page: Int
  $perPage: Int
  $sortField: String
  $sortDirection: Int
  $search: String
  $paidStartDate: Date
  $paidEndDate: Date
  $createdStartDate: Date
  $createdEndDate: Date
  $paidDate: String
  $userId: String
  $customerId: String
`;

const listParamsValue = `
  page: $page
  perPage: $perPage
  sortField: $sortField
  sortDirection: $sortDirection
  search: $search
  paidStartDate: $paidStartDate
  paidEndDate: $paidEndDate
  createdStartDate: $createdStartDate
  createdEndDate: $createdEndDate
  paidDate: $paidDate
  userId: $userId
  customerId: $customerId
`;

export const responseFields = `
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

  syncedErkhet

  posName
  user {
    _id
    email
  }
  customer {
    _id
    firstName
    lastName
    middleName
    primaryEmail
    primaryPhone
  }
`;

const posOrders = `
  query posOrders(${listParamsDef}) {
    posOrders(${listParamsValue}) {
      ${responseFields}
    }
  }
`;

const posOrdersSummary = `
  query posOrdersSummary(${listParamsDef}) {
    posOrdersSummary(${listParamsValue})
  }
`;

const orderDetail = `
  query orderDetail($_id: String) {
    orderDetail(_id: $_id)
  }
`

const posProducts = `
  query posProducts(
    $categoryId: String,
    $searchValue: String,
    ${listParamsDef}
  ) {
    posProducts(
      categoryId: $categoryId,
      searchValue: $searchValue,
      ${listParamsValue}
    ) {
      _id
      name
      type
      code
      categoryId
      unitPrice
      category {
        _id
        code
        name
      }
      count
    }
  }
`;

const productCategories = productQueries.productCategories;

export default {
  posOrders,
  posOrdersSummary,
  orderDetail,
  posProducts,
  productCategories,
};
