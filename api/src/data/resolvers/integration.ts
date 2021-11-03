import { Channels, MessengerApps } from '../../db/models';
import { KIND_CHOICES } from '../../db/models/definitions/constants';
import { IIntegrationDocument } from '../../db/models/definitions/integrations';
import { IContext } from '../types';

export default {
  brand(integration: IIntegrationDocument, _, { dataLoaders }: IContext) {
    return (
      (integration.brandId && dataLoaders.brand.load(integration.brandId)) ||
      null
    );
  },

  form(integration: IIntegrationDocument, _, { dataLoaders }: IContext) {
    return (
      (integration.formId && dataLoaders.form.load(integration.formId)) || null
    );
  },

  channels(integration: IIntegrationDocument) {
    return Channels.find({
      integrationIds: { $in: [integration._id] }
    }).lean();
  },

  async tags(integration: IIntegrationDocument, _, { dataLoaders }: IContext) {
    const tags = await dataLoaders.tag.loadMany(integration.tagIds || []);
    return tags.filter(tag => tag);
  },

  websiteMessengerApps(integration: IIntegrationDocument) {
    if (integration.kind === KIND_CHOICES.MESSENGER) {
      return MessengerApps.find({
        kind: 'website',
        'credentials.integrationId': integration._id
      });
    }
    return [];
  },

  knowledgeBaseMessengerApps(integration: IIntegrationDocument) {
    if (integration.kind === KIND_CHOICES.MESSENGER) {
      return MessengerApps.find({
        kind: 'knowledgebase',
        'credentials.integrationId': integration._id
      });
    }
    return [];
  },

  leadMessengerApps(integration: IIntegrationDocument) {
    if (integration.kind === KIND_CHOICES.MESSENGER) {
      return MessengerApps.find({
        kind: 'lead',
        'credentials.integrationId': integration._id
      });
    }
    return [];
  },

  async healthStatus(
    integration: IIntegrationDocument,
    _args,
    { dataSources }: IContext
  ) {
    if (integration.kind.includes('facebook')) {
      try {
        return dataSources.IntegrationsAPI.fetchApi('/facebook/get-status', {
          integrationId: integration._id
        });
      } catch (e) {
        return { status: 'healthy' };
      }
    }

    return { status: 'healthy' };
  }
};
