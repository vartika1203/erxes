import { IChannelDocument } from '../../db/models/definitions/channels';
import { IContext } from '../types';

export default {
  async integrations(channel: IChannelDocument, _, { dataLoaders }: IContext) {
    const integrations = await dataLoaders.integration.loadMany(
      channel.integrationIds || []
    );
    return integrations.filter(i => i);
  },

  async members(channel: IChannelDocument, _, { dataLoaders }: IContext) {
    const users = await dataLoaders.userActive.loadMany(
      channel.memberIds || []
    );
    return users.filter(u => u);
  }
};
