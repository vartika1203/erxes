import { IImportHistoryDocument } from '../../db/models/definitions/importHistory';
import { IContext } from '../types';

export default {
  user(history: IImportHistoryDocument, _, { dataLoaders }: IContext) {
    return dataLoaders.user.load(history.userId);
  }
};
