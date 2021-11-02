import { Fields, FieldsGroups } from '../../db/models';
import {
  IFieldDocument,
  IFieldGroupDocument
} from '../../db/models/definitions/fields';
import { IContext } from '../types';

export const field = {
  name(root: IFieldDocument) {
    return `erxes-form-field-${root._id}`;
  },

  lastUpdatedUser(
    { lastUpdatedUserId }: IFieldDocument,
    _,
    { dataLoaders }: IContext
  ) {
    // Returning user who updated the field last
    return (
      (lastUpdatedUserId && dataLoaders.user.load(lastUpdatedUserId)) || null
    );
  },

  associatedField(root: IFieldDocument) {
    const { associatedFieldId } = root;

    // Returning field that associated with form field
    return Fields.findOne({ _id: associatedFieldId });
  },

  async groupName(root: IFieldDocument) {
    const { groupId } = root;

    const group = await FieldsGroups.findOne({ _id: groupId });
    return group && group.name;
  }
};

export const fieldsGroup = {
  fields(root: IFieldGroupDocument) {
    // Returning all fields that are related to the group
    return Fields.find({ groupId: root._id }).sort({ order: 1 });
  },

  lastUpdatedUser(
    { lastUpdatedUserId }: IFieldGroupDocument,
    _,
    { dataLoaders }: IContext
  ) {
    // Returning user who updated the group last
    return (
      (lastUpdatedUserId && dataLoaders.user.load(lastUpdatedUserId)) || null
    );
  }
};
