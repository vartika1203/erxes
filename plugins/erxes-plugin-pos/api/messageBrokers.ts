export default [
  {
    method: 'queue',
    channel: 'vrpc_queue:erxes-pos-to-api',
    handler: async (msg, { models, messageBroker }) => {
      const { posToken, syncId, response, order, items } = msg;

      const pos = await models.Pos.findOne({ token: posToken }).lean();
      const syncInfo = { ...pos.syncInfo, ...{ [syncId]: new Date() } }

      await models.Pos.updateOne({ _id: pos._id }, { $set: { syncInfo } });

      await models.PutResponses.updateOne({ _id: response._id }, { $set: { ...response, posToken, syncId } }, { upsert: true });
      await models.PosOrders.updateOne({ _id: order._id }, { $set: { ...order, posToken, syncId, items } }, { upsert: true });

      messageBroker().sendMessage(`vrpc_queue:erxes-pos-from-api_${syncId}`, { status: 'ok', posToken, syncId, responseId: response._id, orderId: order._id })
    }
  }
];
