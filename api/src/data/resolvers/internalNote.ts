import { IInternalNoteDocument } from '../../db/models/definitions/internalNotes';
import { IContext } from '../types';

export default {
  createdUser(note: IInternalNoteDocument, _, { dataLoaders }: IContext) {
    return (
      (note.createdUserId && dataLoaders.user.load(note.createdUserId)) || null
    );
  }
};
