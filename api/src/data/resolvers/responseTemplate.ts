import { IResponseTemplateDocument } from '../../db/models/definitions/responseTemplates';
import { IContext } from '../types';

export default {
  brand(
    responseTemplate: IResponseTemplateDocument,
    _,
    { dataLoaders }: IContext
  ) {
    return (
      (responseTemplate.brandId &&
        dataLoaders.brand.load(responseTemplate.brandId)) ||
      null
    );
  }
};
