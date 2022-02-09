import { paginate } from 'erxes-api-utils'

const generateFilter = async (models, params, commonQuerySelector) => {
  const filter: any = commonQuerySelector;

  filter.status = { $ne: 'Deleted' };

  if (params.categoryId) {
    filter.categoryId = params.categoryId;
  }

  if (params.searchValue) {
    filter.searchText = { $in: [new RegExp(`.*${params.searchValue}.*`, 'i')] }
  }

  if (params.ids) {
    filter._id = { $in: params.ids };
  }

  if (params.conformityMainTypeId && params.conformityMainType && params.conformityIsSaved) {
    filter._id = { $in: await models.Conformities.savedConformity({ mainType: params.conformityMainType, mainTypeId: params.conformityMainTypeId, relTypes: ['car'] }) }
  }
  if (params.conformityMainTypeId && params.conformityMainType && params.conformityIsRelated) {
    filter._id = { $in: await models.Conformities.relatedConformity({ mainType: params.conformityMainType, mainTypeId: params.conformityMainTypeId, relType: 'car' }) }
  }

  return filter;
}

export const sortBuilder = (params) => {
  const sortField = params.sortField;
  const sortDirection = params.sortDirection || 0;

  if (sortField) {
    return { [sortField]: sortDirection };
  }

  return {};
};

const queries = [
  {
    name: 'putResponses',
    handler: async (_root, params, { commonQuerySelector, models }) => {
      return paginate(models.PutResponses.find(await generateFilter(models, params, commonQuerySelector)).sort(sortBuilder(params)), {
        page: params.page,
        perPage: params.perPage
      });
    }
  },
  {
    name: 'putResponsesCount',
    handler: async (_root, params, { commonQuerySelector, models }) => {
      return models.PutResponses.find(await generateFilter(models, params, commonQuerySelector)).countDocuments();
    }
  },
  {
    name: 'getDealLink',
    handler: async (_root, param, { models }) => {
      const deal = await models.Deals.getDeal(param._id);
      const stage = await models.Stages.getStage(deal.stageId);
      const pipeline = await models.Pipelines.getPipeline(stage.pipelineId);
      const board = await models.Boards.getBoard(pipeline.boardId);

      return `/${stage.type}/board?id=${board._id}&pipelineId=${pipeline._id}&itemId=${param._id}`;
    }
  }
]

export default queries;