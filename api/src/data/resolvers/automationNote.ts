import { IContext } from '../types';

export default {
  createdUser(note: any, _, { dataLoaders }: IContext) {
    return (note.createdBy && dataLoaders.user.load(note.createdBy)) || null;
  }
};
