import { Fields } from '../../db/models';
import {
  IFieldDocument,
  IFieldGroupDocument
} from '../../db/models/definitions/fields';
import { IContext } from '../types';

export const field = {
  name(root: IFieldDocument) {
    return `erxes-form-field-${root._id}`;
  },

  lastUpdatedUser(root: IFieldDocument, _, { dataLoaders }: IContext) {
    const { lastUpdatedUserId } = root;
    // Returning user who updated the field last
    return (
      (lastUpdatedUserId && dataLoaders.user.load(lastUpdatedUserId)) || null
    );
  },

  associatedField(root: IFieldDocument, _, { dataLoaders }: IContext) {
    const { associatedFieldId } = root;
    // Returning field that associated with form field
    return (
      (associatedFieldId && dataLoaders.field.load(associatedFieldId)) || null
    );
  },

  async groupName(root: IFieldDocument, _, { dataLoaders }: IContext) {
    const { groupId } = root;
    const group =
      (groupId && (await dataLoaders.fieldsGroup.load(groupId))) || null;
    return group && group.name;
  }
};

export const fieldsGroup = {
  fields(root: IFieldGroupDocument) {
    // Returning all fields that are related to the group
    return Fields.find({ groupId: root._id }).sort({ order: 1 });
  },

  lastUpdatedUser(
    fieldGroup: IFieldGroupDocument,
    _,
    { dataLoaders }: IContext
  ) {
    const { lastUpdatedUserId } = fieldGroup;
    // Returning user who updated the group last
    return (
      (lastUpdatedUserId && dataLoaders.user.load(lastUpdatedUserId)) || null
    );
  }
};
