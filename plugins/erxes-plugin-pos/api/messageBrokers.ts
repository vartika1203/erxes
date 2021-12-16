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
      await models.PosOrders.updateOne({ _id: order._id }, { $set: { ...order, posToken, syncId, items } }, { upsert: true });

      messageBroker().sendMessage(`vrpc_queue:erxes-pos-from-api_${syncId}`, { status: 'ok', posToken, syncId, responseId: response._id, orderId: order._id })
    }
  },
  {
    method: 'RPCQueue',
    channel: 'erxes-pos-to-api',
    handler: async (msg, { models }) => {
      const { action, data } = msg;

      try {
        if (action === 'newCustomer') {
          const customer = await models.Customers.createCustomer(data);

          return { status: 'success', data: customer }
        }
      } catch (e) {
        return { status: 'error', errorMessage: e.message };
      }
    }
  }
];

export const sendMessage = async (models, messageBroker, channel, params, pos = undefined) => {
  const allPos = pos ? [pos] : await models.Pos.find().lean();

  for (const p of allPos) {
    const syncIds = Object.keys(p.syncInfos || {}) || [];

    if (!syncIds.length) {
      continue;
    }

    for (const syncId of syncIds) {
      const syncDate = p.syncInfos[syncId];

      // expired sync 7day
      if ((new Date().getTime() - syncDate.getTime()) / (24 * 60 * 60 * 1000) > 7) {
        continue;
      }

      messageBroker().sendMessage(`${channel}_${syncId}`, params);
    }
  }
}