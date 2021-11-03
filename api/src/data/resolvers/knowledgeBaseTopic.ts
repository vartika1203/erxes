import { KnowledgeBaseCategories } from '../../db/models';
import { ITopicDocument } from '../../db/models/definitions/knowledgebase';
import { IContext } from '../types';

export default {
  brand(topic: ITopicDocument, _, { dataLoaders }: IContext) {
    return (topic.brandId && dataLoaders.brand.load(topic.brandId)) || null;
  },

  categories(topic: ITopicDocument) {
    return KnowledgeBaseCategories.find({ topicId: topic._id }).sort({
      title: 1
    });
  },

  async parentCategories(topic: ITopicDocument) {
    return KnowledgeBaseCategories.find({
      topicId: topic._id,
      $or: [
        { parentCategoryId: null },
        { parentCategoryId: { $exists: false } },
        { parentCategoryId: '' }
      ]
    }).sort({
      title: 1
    });
  },

  color(topic: ITopicDocument) {
    return topic.color || '';
  }
};
