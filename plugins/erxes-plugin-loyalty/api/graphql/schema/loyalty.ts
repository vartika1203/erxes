// import { commonTypes } from './common';

export const types = `
  type Loyalty {
    ownerId: String
    ownerType: String
    score: Float

    vouchers: [Voucher]
    lotteries: [Lottery]
    spins: [Spin]
    donates: [Donate]
  }
`;

export const queries = `
  loyalties(
    ownerType: String
    ownerId: String
  ): Loyalty
`;
