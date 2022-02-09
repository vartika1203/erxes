// Settings

const configs = `
  query configs {
    configs {
      _id
      code
      value
    }
  }
`;

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
  modifiedAt
  contentType
  contentId
  success
  billId
  date
  macAddress
  internalCode
  billType
  lotteryWarningMsg
  errorCode
  message
  getInformation
  taxType
  qrData
  lottery
  amount
  cityTax
  vat
  cashAmount
  nonCashAmount
  returnBillId
  sendInfo
  stocks
  registerNo
  customerNo
  customerName
`;

const putResponses = `
  query putResponses(${listParamsDef}) {
    putResponses(${listParamsValue}) {
      ${responseFields}
    }
  }
`;

const putResponsesCount = `
  query putResponsesCount(${listParamsDef}) {
    putResponsesCount(${listParamsValue})
  }
`;

const getDealLink = `
  query getDealLink($_id: String) {
    getDealLink(_id: $_id)
  }
`
export default {
  configs,
  putResponses,
  putResponsesCount,
  getDealLink
};
