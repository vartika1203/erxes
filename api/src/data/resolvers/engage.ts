import { EngageMessages, Integrations } from '../../db/models';
import { IEngageMessageDocument } from '../../db/models/definitions/engages';
import { IContext } from '../types';

export const deliveryReport = {
  engage(root) {
    return EngageMessages.findOne(
      { _id: root.engageMessageId },
      { title: 1 }
    ).lean();
  }
};

export const message = {
  async segments(
    engageMessage: IEngageMessageDocument,
    _,
    { dataLoaders }: IContext
  ) {
    const segments = await dataLoaders.segment.loadMany(
      engageMessage.segmentIds || []
    );
    return segments.filter(segment => segment);
  },

  async brands(
    engageMessage: IEngageMessageDocument,
    _,
    { dataLoaders }: IContext
  ) {
    const brands = await dataLoaders.brand.loadMany(
      engageMessage.brandIds || []
    );
    return brands.filter(b => b);
  },

  async customerTags(
    engageMessage: IEngageMessageDocument,
    _,
    { dataLoaders }: IContext
  ) {
    const tags = await dataLoaders.tag.loadMany(
      engageMessage.customerTagIds || []
    );
    return tags.filter(tag => tag);
  },

  fromUser(
    engageMessage: IEngageMessageDocument,
    _,
    { dataLoaders }: IContext
  ) {
    return (
      (engageMessage.fromUserId &&
        dataLoaders.user.load(engageMessage.fromUserId)) ||
      null
    );
  },

  // common tags
  async getTags(
    engageMessage: IEngageMessageDocument,
    _,
    { dataLoaders }: IContext
  ) {
    const tags = await dataLoaders.tag.loadMany(engageMessage.tagIds || []);
    return tags.filter(tag => tag);
  },

  brand(engageMessage: IEngageMessageDocument, _, { dataLoaders }: IContext) {
    const { messenger } = engageMessage;

    if (messenger && messenger.brandId) {
      return dataLoaders.brand.load(messenger.brandId);
    }
  },

  stats(
    engageMessage: IEngageMessageDocument,
    _args,
    { dataSources }: IContext
  ) {
    return dataSources.EngagesAPI.engagesStats(engageMessage._id);
  },

  logs(
    engageMessage: IEngageMessageDocument,
    _args,
    { dataSources }: IContext
  ) {
    return dataSources.EngagesAPI.engagesLogs(engageMessage._id);
  },

  smsStats(
    engageMessage: IEngageMessageDocument,
    _args,
    { dataSources }: IContext
  ) {
    return dataSources.EngagesAPI.engagesSmsStats(engageMessage._id);
  },

  fromIntegration(engageMessage: IEngageMessageDocument) {
    if (
      engageMessage.shortMessage &&
      engageMessage.shortMessage.fromIntegrationId
    ) {
      return Integrations.getIntegration({
        _id: engageMessage.shortMessage.fromIntegrationId
      });
    }

    return null;
  },

  async createdUser(
    engageMessage: IEngageMessageDocument,
    _,
    { dataLoaders }: IContext
  ): Promise<string> {
    const user = await dataLoaders.user.load(engageMessage.createdBy);

    if (!user) {
      return '';
    }

    return user.username || user.email || user._id;
  }
};
