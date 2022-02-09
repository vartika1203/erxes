import { IPOS } from '../types';
import { sendMessage } from '../messageBrokers';
import { orderDeleteToErkhet, orderToErkhet } from '../utils';

const mutations = [
  /**
   * add pos
   */
  {
    name: 'posAdd',
    handler: async (_root, params: IPOS, { models, checkPermission, user }) => {
      await checkPermission('managePos', user);

      return await models.Pos.posAdd(models, user, params);
    },
  },
  {
    name: 'posEdit',
    handler: async (
      _root,
      { _id, ...params },
      { models, checkPermission, user, messageBroker }
    ) => {
      await checkPermission('managePos', user);

      const object = await models.Pos.getPos(models, { _id });
      const updatedDocument = await models.Pos.posEdit(models, _id, params);

      const adminUsers = await models.Users.find({ _id: { $in: updatedDocument.adminIds } });
      const cashierUsers = await models.Users.find({ _id: { $in: updatedDocument.cashierIds } });

      if (messageBroker) {
        await sendMessage(models, messageBroker, 'pos:crudData', {
          type: 'pos',
          action: 'update',
          object,
          updatedDocument,
          adminUsers,
          cashierUsers
        }, object)
      }

      return updatedDocument;
    },
  },

  /**
   *  remove pos
   */
  {
    name: 'posRemove',
    handler: async (
      _root,
      { _id }: { _id: string },
      { models, checkPermission, user }
    ) => {
      await checkPermission('managePos', user);

      return await models.Pos.posRemove(models, _id);
    },
  },

  {
    name: 'productGroupsBulkInsert',
    handler: async (
      _root,
      { posId, groups }: { posId: string; groups: any[] },
      { models }
    ) => {
      const dbGroups = await models.ProductGroups.groups(models, posId);

      const groupsToAdd = [];
      const groupsToUpdate = [];

      for (const group of groups) {
        if (group._id.includes('temporaryId')) {
          delete group._id;
          groupsToAdd.push({ ...group, posId });
        } else {
          groupsToUpdate.push(group);
          await models.ProductGroups.groupsEdit(models, group._id, group);
        }
      }

      const groupsToRemove = dbGroups.filter((el) => {
        const index = groupsToUpdate.findIndex((g) => g._id === el._id);

        if (index === -1) {
          return el._id;
        }
      });

      if (groupsToRemove.length > 0) {
        await models.ProductGroups.deleteMany({ _id: { $in: groupsToRemove } });
      }

      await models.ProductGroups.insertMany(groupsToAdd);

      return models.ProductGroups.groups(models, posId);
    },
  },

  {
    name: 'posOrderSyncErkhet',
    handler: async (_root, { _id }: { _id: string }, { models, messageBroker, memoryStorage }) => {
      const order = await models.PosOrders.findOne({ _id }).lean();
      if (!order) {
        throw new Error('not found order');
      }

      const pos = await models.Pos.findOne({ token: order.posToken }).lean();
      const putRes = await models.PutResponses.putHistories(models, { contentType: 'pos', contentId: _id });

      if (!pos) {
        throw new Error('not found pos');
      }

      if (!putRes) {
        throw new Error('not found put response');
      }

      await orderToErkhet(models, messageBroker, memoryStorage, pos, _id, putRes._id);
      return await models.PosOrders.findOne({ _id }).lean()
    }
  },
  {
    name: 'posOrderReturnBill',
    handler: async (_root, { _id }: { _id: string }, { models, messageBroker, memoryStorage }) => {
      const order = await models.PosOrders.findOne({ _id }).lean();
      if (!order) {
        throw new Error('not found order');
      }

      const pos = await models.Pos.findOne({ token: order.posToken }).lean();

      if (!pos) {
        throw new Error('not found pos');
      }

      await models.PutResponses.returnBill(models, { contentType: 'pos', contentId: _id }, pos.ebarimtConfig);
      if (order.syncedErkhet) {
        await orderDeleteToErkhet(models, messageBroker, memoryStorage, pos, _id)
      }
      return await models.PosOrders.deleteOne({ _id });
    }
  }
];

export default mutations;
