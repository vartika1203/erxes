import { Fields } from '../../db/models';
import { IFormDocument } from '../../db/models/definitions/forms';
import { IContext } from '../types';

export default {
  createdUser(form: IFormDocument, _, { dataLoaders }: IContext) {
    return dataLoaders.user.load(form.createdUserId);
  },

  fields(form: IFormDocument) {
    return Fields.find({ contentType: 'form', contentTypeId: form._id }).sort({
      order: 1
    });
  }
};
