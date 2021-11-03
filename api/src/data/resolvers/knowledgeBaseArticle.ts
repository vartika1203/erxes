import { IArticleDocument } from '../../db/models/definitions/knowledgebase';
import { IContext } from '../types';

export default {
  createdUser(article: IArticleDocument, _, { dataLoaders }: IContext) {
    return dataLoaders.user.load(article.createdBy);
  }
};
