import { commonTypes, commonInputs, commonFilters } from './common';

export const types = `
  type Spin {
    ${commonTypes}
    status: String
    awardId: String
    voucherId: String
  }

  type SpinMain {
    list: [Spin]
    totalCount: Int
  }
`;

const SpinDoc = `
  ${commonInputs}
  status: String
`
export const queries = `
  spinsMain(${commonFilters} voucherCompaignId: String): SpinMain
  spins(${commonFilters} voucherCompaignId: String): [Spin]
  spinDetail(_id: String!): Spin
`;

export const mutations = `
  spinsAdd(${SpinDoc}): Spin
  spinsEdit(_id: String!, ${SpinDoc}): Spin
  spinsRemove(_ids: [String]): JSON
  doSpin(_id: String!): Spin
  buySpin(compaignId: String, ownerType: String, ownerId: String, count: Int): Spin
`;
