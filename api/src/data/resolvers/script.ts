import { KnowledgeBaseTopics } from '../../db/models';
import { IScriptDocument } from '../../db/models/definitions/scripts';
import { IContext } from '../types';

export default {
  messenger(script: IScriptDocument, _, { dataLoaders }: IContext) {
    return (
      (script.messengerId &&
        dataLoaders.integration.load(script.messengerId)) ||
      null
    );
  },

  kbTopic(script: IScriptDocument) {
    return KnowledgeBaseTopics.findOne({ _id: script.kbTopicId }).lean();
  },

  async leads(script: IScriptDocument, _, { dataLoaders }: IContext) {
    const integrations = await dataLoaders.integrationActive.loadMany(
      script.leadIds || []
    );
    return integrations.filter(i => i);
  }
};
