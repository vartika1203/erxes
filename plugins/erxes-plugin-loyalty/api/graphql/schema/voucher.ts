import { commonTypes, commonInputs, commonFilters } from './common';

export const types = `
  type Voucher {
    ${commonTypes}
    status: String
    compaignType: String
  }

  type VoucherMain {
    list: [Voucher]
    totalCount: Int
  }
`;

const VoucherDoc = `
  ${commonInputs}
  status: String
`
export const queries = `
  vouchersMain(${commonFilters}): VoucherMain
  vouchers(${commonFilters}): [Voucher]
  voucherDetail(_id: String!): Voucher
  checkLoyalties(ownerType: String, ownerId: String, products: JSON): JSON
`;

export const mutations = `
  vouchersAdd(${VoucherDoc}): Voucher
  vouchersEdit(_id: String!, ${VoucherDoc}): Voucher
  vouchersRemove(_ids: [String]): JSON
  confirmLoyalties(checkInfo: JSON): JSON
`;
