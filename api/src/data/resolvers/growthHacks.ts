import { Fields, FormSubmissions } from '../../db/models';
import { IGrowthHackDocument } from '../../db/models/definitions/growthHacks';
import { IUserDocument } from '../../db/models/definitions/users';
import { IContext } from '../types';
import { boardId } from './boardUtils';
import { IFieldsQuery } from './queries/fields';

export default {
  async formSubmissions(
    growthHack: IGrowthHackDocument,
    _,
    { dataLoaders }: IContext
  ) {
    const stage = await dataLoaders.stage.load(growthHack.stageId);

    const result = {};

    if (stage.formId) {
      const submissions = await FormSubmissions.find({
        contentTypeId: growthHack._id,
        contentType: 'growthHack',
        formId: stage.formId
      });

      for (const submission of submissions) {
        if (submission.formFieldId) {
          result[submission.formFieldId] = submission.value;
        }
      }
    }

    return result;
  },

  async formFields(
    growthHack: IGrowthHackDocument,
    _,
    { dataLoaders }: IContext
  ) {
    const stage = await dataLoaders.stage.load(growthHack.stageId);
    const query: IFieldsQuery = { contentType: 'form' };

    if (stage.formId) {
      query.contentTypeId = stage.formId;
    }

    return Fields.find(query).sort({ order: 1 });
  },

  async assignedUsers(
    growthHack: IGrowthHackDocument,
    _,
    { dataLoaders }: IContext
  ) {
    const users = await dataLoaders.user.loadMany(
      growthHack.assignedUserIds || []
    );
    return users.filter(u => u);
  },

  async votedUsers(
    growthHack: IGrowthHackDocument,
    _,
    { dataLoaders }: IContext
  ) {
    const users = await dataLoaders.user.loadMany(
      growthHack.votedUserIds || []
    );
    return users.filter(u => u);
  },

  isVoted(
    growthHack: IGrowthHackDocument,
    _args,
    { user }: { user: IUserDocument }
  ) {
    return growthHack.votedUserIds && growthHack.votedUserIds.length > 0
      ? growthHack.votedUserIds.indexOf(user._id) !== -1
      : false;
  },

  async pipeline(
    growthHack: IGrowthHackDocument,
    _,
    { dataLoaders }: IContext
  ) {
    const stage = await dataLoaders.stage.load(growthHack.stageId);
    return dataLoaders.pipeline.load(stage.pipelineId);
  },

  boardId(growthHack: IGrowthHackDocument) {
    return boardId(growthHack);
  },

  async formId(growthHack: IGrowthHackDocument, _, { dataLoaders }: IContext) {
    const stage = await dataLoaders.stage.load(growthHack.stageId);
    return stage.formId;
  },

  async scoringType(
    growthHack: IGrowthHackDocument,
    _,
    { dataLoaders }: IContext
  ) {
    const stage = await dataLoaders.stage.load(growthHack.stageId);
    const pipeline = await dataLoaders.pipeline.load(stage.pipelineId);
    return pipeline.hackScoringType;
  },

  async stage(growthHack: IGrowthHackDocument, _, { dataLoaders }: IContext) {
    const stage = await dataLoaders.stage.load(growthHack.stageId);

    return stage;
  },

  isWatched(
    growthHack: IGrowthHackDocument,
    _args,
    { user }: { user: IUserDocument }
  ) {
    const watchedUserIds = growthHack.watchedUserIds || [];

    if (watchedUserIds.includes(user._id)) {
      return true;
    }

    return false;
  },

  async labels(growthHack: IGrowthHackDocument, _, { dataLoaders }: IContext) {
    const labels = await dataLoaders.pipelineLabel.loadMany(
      growthHack.labelIds || []
    );
    return labels.filter(l => l);
  },

  createdUser(growthHack: IGrowthHackDocument, _, { dataLoaders }: IContext) {
    return (
      (growthHack.userId && dataLoaders.user.load(growthHack.userId)) || null
    );
  }
};
