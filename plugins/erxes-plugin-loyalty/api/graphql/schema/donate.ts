import { commonTypes, commonInputs, commonFilters } from './common';

export const types = `
  type Donate {
    ${commonTypes}
    donateScore: Float
  }

  type DonateMain {
    list: [Donate]
    totalCount: Int
  }
`;

const DonateDoc = `
  ${commonInputs}
  donateScore: Float
`
export const queries = `
  donatesMain(${commonFilters}): DonateMain
  donates(${commonFilters}): [Donate]
  donateDetail(_id: String!): Donate
`;

export const mutations = `
  donatesAdd(${DonateDoc}): Donate
  donatesRemove(_ids: [String]): JSON
  cpDonatesAdd(${DonateDoc}): Donate
  cpDonatesRemove(_ids: [String]): JSON
`;
