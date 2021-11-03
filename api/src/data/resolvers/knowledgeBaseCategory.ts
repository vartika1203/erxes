import {
  KnowledgeBaseArticles,
  KnowledgeBaseTopics,
  KnowledgeBaseCategories
} from '../../db/models';
import { PUBLISH_STATUSES } from '../../db/models/definitions/constants';
import { ICategoryDocument } from '../../db/models/definitions/knowledgebase';
import { IContext } from '../types';

export const KnowledgeBaseCategory = {
  articles(category: ICategoryDocument) {
    return KnowledgeBaseArticles.find({
      categoryId: category._id,
      status: PUBLISH_STATUSES.PUBLISH
    }).lean();
  },

  async authors(category: ICategoryDocument, _, { dataLoaders }: IContext) {
    const articles = await KnowledgeBaseArticles.find(
      {
        categoryId: category._id,
        status: PUBLISH_STATUSES.PUBLISH
      },
      { createdBy: 1 }
    ).lean();

    const authorIds = articles.map(article => article.createdBy);

    const users = await dataLoaders.user.loadMany(authorIds);

    return users.filter(u => u);
  },

  firstTopic(category: ICategoryDocument) {
    return KnowledgeBaseTopics.findOne({ _id: category.topicId }).lean();
  },

  numOfArticles(category: ICategoryDocument) {
    return KnowledgeBaseArticles.find({
      categoryId: category._id,
      status: PUBLISH_STATUSES.PUBLISH
    }).countDocuments();
  }
};

export const KnowledgeBaseParentCategory = {
  ...KnowledgeBaseCategory,

  childrens(category: ICategoryDocument) {
    return KnowledgeBaseCategories.find({
      parentCategoryId: category._id
    })
      .sort({ title: 1 })
      .lean();
  }
};
