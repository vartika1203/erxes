import { commonTypes, commonInputs, commonFilters } from './common';

export const types = `
  type Lottery {
    ${commonTypes}
    status: String
    number: String
  }

  type LotteryMain {
    list: [Lottery]
    totalCount: Int
  }
`;

const LotteryDoc = `
  ${commonInputs}
  status: String
`
export const queries = `
  lotteriesMain(${commonFilters} voucherCompaignId: String): LotteryMain
  lotteries(${commonFilters} voucherCompaignId: String): [Lottery]
  lotteryDetail(_id: String!): Lottery
`;

export const mutations = `
  lotteriesAdd(${LotteryDoc}): Lottery
  lotteriesEdit(_id: String!, ${LotteryDoc}): Lottery
  lotteriesRemove(_ids: [String]): JSON
  buyLottery(compaignId: String, ownerType: String, ownerId: String, count: Int): Lottery
`;
