import { getConfig } from 'erxes-api-utils'
import { companyCheckCode } from '../utils/companyCheck';
import { getPostData } from '../utils/ebarimtData';
export default [
  /**
   * Cars list
   */
  {
    type: 'deal',
    action: 'update',
    handler: async (_root, params, { models, memoryStorage, user, graphqlPubsub }) => {
      const deal = params.updatedDocument
      const oldDeal = params.object;
      const destinationStageId = deal.stageId || '';

      if (!(destinationStageId && destinationStageId !== oldDeal.stageId)) {
        return;
      }

      const configs = await getConfig(models, memoryStorage, 'stageInEbarimt', {});
      const returnConfigs = await getConfig(models, memoryStorage, 'returnStageInEbarimt', {});

      if (Object.keys(returnConfigs).includes(destinationStageId)) {
        const returnConfig = {
          ...returnConfigs[destinationStageId],
          ...await getConfig(models, memoryStorage, 'EBARIMT', {})
        }

        const returnResponse = await models.PutResponses.returnBill(
          models,
          { ...deal, contentType: 'deal', contentId: deal._id },
          returnConfig
        )

        try {
          await graphqlPubsub.publish('automationResponded', {
            automationResponded: {
              userId: user._id,
              responseId: returnResponse._id,
              sessionCode: user.sessionCode || '',
              content: returnResponse
            },
          });
        } catch (e) {
          throw new Error(e.message);
        }
        return;
      }

      if (!Object.keys(configs).includes(destinationStageId)) {
        return;
      }

      const config = {
        ...configs[destinationStageId],
        ...await getConfig(models, memoryStorage, 'EBARIMT', {})
      };
      const ebarimtData = await getPostData(models, config, deal);

      const ebarimtResponse = await models.PutResponses.putData(models, ebarimtData, config);

      try {
        await graphqlPubsub.publish('automationResponded', {
          automationResponded: {
            userId: user._id,
            responseId: ebarimtResponse._id,
            sessionCode: user.sessionCode || '',
            content: { ...config, ...ebarimtResponse }
          },
        });
      } catch (e) {
        throw new Error(e.message);
      }

      return;
    }
  },
  {
    type: 'company',
    action: 'create',
    handler: async (_root, params, { user, models, memoryStorage, graphqlPubsub }) => {
      companyCheckCode(user, models, memoryStorage, graphqlPubsub, params)
    }
  },
  {
    type: 'company',
    action: 'update',
    handler: async (_root, params, { user, models, memoryStorage, graphqlPubsub }) => {
      companyCheckCode(user, models, memoryStorage, graphqlPubsub, params)
    }
  },
]
