export default [
  {
    method: 'queue',
    channel: 'vrpc_queue:erxes-pos-to-api',
    handler: async (msg, { models, messageBroker }) => {
      const { posToken, syncId, response, order, items } = msg;

      const pos = await models.Pos.findOne({ token: posToken }).lean();
      const syncInfos = { ...pos.syncInfos, ...{ [syncId]: new Date() } }

      await models.Pos.updateOne({ _id: pos._id }, { $set: { syncInfos } });

      await models.PutResponses.updateOne({ _id: response._id }, { $set: { ...response, posToken, syncId } }, { upsert: true });
      await models.PosOrders.updateOne({ _id: order._id }, { $set: { ...order, posToken, syncId, items, branchId: pos.branchId } }, { upsert: true });

      messageBroker().sendMessage(`vrpc_queue:erxes-pos-from-api_${syncId}`, { status: 'ok', posToken, syncId, responseId: response._id, orderId: order._id })
    }
  },
  {
    method: 'RPCQueue',
    channel: 'erxes-pos-to-api',
    handler: async (msg, { models, messageBroker }) => {
      const { action, data, posToken } = msg;

      try {
        if (action === 'newCustomer') {
          const customer = await models.Customers.createCustomer(data);

          await sendMessage(
            models,
            messageBroker,
            'pos:crudData',
            { action: 'create', type: 'customer', object: customer },
            undefined,
            [posToken]
          );

          return { status: 'success', data: customer }
        }
      } catch (e) {
        return { status: 'error', errorMessage: e.message };
      }
    }
  }
];

export const sendMessage = async (models, messageBroker, channel, params, pos = undefined, excludeTokens = []) => {
  const allPos = pos ? [pos] : await models.Pos.find().lean();

  for (const p of allPos) {
    if (excludeTokens.includes(p.token)) {
      continue;
    }

    const syncIds = Object.keys(p.syncInfos || {}) || [];

    if (!syncIds.length) {
      continue;
    }

    for (const syncId of syncIds) {
      const syncDate = p.syncInfos[syncId];

      // expired sync 72 hour
      if ((new Date().getTime() - syncDate.getTime()) / (60 * 60 * 1000) > 72) {
        continue;
      }

      messageBroker().sendMessage(`${channel}_${syncId}`, params);
    }
  }
}