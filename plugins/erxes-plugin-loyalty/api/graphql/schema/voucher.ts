import { commonTypes, commonInputs, commonFilters } from './common';

export const types = `
  type Voucher {
    ${commonTypes}
    status: String
    bonusInfo: JSON
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
`;

export const mutations = `
  vouchersAdd(${VoucherDoc}): Voucher
  vouchersEdit(_id: String!, ${VoucherDoc}): Voucher
  vouchersRemove(_ids: [String]): JSON
  buyVoucher(compaignId: String, ownerType: String, ownerId: String, count: Int): Voucher
`;
