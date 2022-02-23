import { changeScoreOwner, commonSchema } from './CompaignUtils';
import { LOTTERY_STATUS } from './Constants';
import { getRandomNumber } from './utils';

export const lotterySchema = {
  ...commonSchema,

  status: { type: String, enum: LOTTERY_STATUS.ALL, default: 'new' },
  number: { type: String, optional: true, label: 'Lottery number' },

  voucherCompaignId: { type: String, label: 'Source Voucher Compaign', optional: true },

  // won
  awardId: { type: String, label: 'Won award' },
  voucherId: { type: String, label: 'Won Voucher', optional: true }
};

export class Lottery {
  public static async getLottery(models, _id: string) {
    const lottery = await models.Lotteries.findOne({ _id });

    if (!lottery) {
      throw new Error('not found lottery rule')
    }

    return lottery;
  }

  public static async getLotteries(models, { ownerType, ownerId, statuses }: { ownerType: string, ownerId: string, statuses: string[] }) {
    return models.Lotteries.find({ ownerType, ownerId, status: { $in: statuses || [] } }).lean();
  }

  public static async createLottery(models, { compaignId, ownerType, ownerId, voucherCompaignId = '', userId = '' }) {
    if (!ownerId || !ownerType) {
      throw new Error('Not create lottery, owner is undefined');
    }

    const lotteryCompaign = await models.LotteryCompaigns.getLotteryCompaign(models, compaignId);

    const now = new Date();

    if (lotteryCompaign.startDate > now || lotteryCompaign.endDate < now) {
      throw new Error('Not create lottery, expired');
    }

    const number = getRandomNumber(lotteryCompaign.numberFormat);
    return await models.Lotteries.create({ compaignId, ownerType, ownerId, createdAt: now, number, status: LOTTERY_STATUS.NEW, voucherCompaignId, userId })
  }


  public static async updateLottery(models, _id, { ownerType, ownerId, status, userId = '' }) {
    if (!ownerId || !ownerType) {
      throw new Error('Not create spin, owner is undefined');
    }

    const spin = await models.Lotteries.findOne({ _id }).lean();
    const compaignId = spin.compaignId;

    await models.LotteryCompaigns.getLotteryCompaign(models, compaignId);

    const now = new Date();

    return await models.Lotteries.updateOne({ _id, }, {
      $set: {
        compaignId, ownerType, ownerId, modifiedAt: now, status, userId
      }
    })
  }

  public static async buyLottery(models, { compaignId, ownerType, ownerId, count = 1 }) {
    if (!ownerId || !ownerType) {
      throw new Error('can not buy lottery, owner is undefined');
    }

    const lotteryCompaign = await models.LotteryCompaigns.getLotteryCompaign(models, compaignId);

    if (!lotteryCompaign.buyScore) {
      throw new Error('can not buy this lottery')
    }
    await changeScoreOwner(models, { ownerType, ownerId, changeScore: -1 * lotteryCompaign.buyScore * count });

    return models.createLottery(models, { compaignId, ownerType, ownerId });
  }

  public static async removeLotteries(models, _ids: string[]) {
    return models.Lotteries.deleteMany({ _id: { $in: _ids } })
  }
}
