import { orderToErkhet } from "./utils";

export default [
  {
    method: 'queue',
    channel: 'vrpc_queue:erxes-pos-to-api',
    handler: async (msg, { models, messageBroker, memoryStorage, graphqlPubsub }) => {
      const { action, posToken, syncId, response, order, items } = msg;
      const pos = await models.Pos.findOne({ token: posToken }).lean();
      const syncInfos = { ...pos.syncInfos, ...{ [syncId]: new Date() } };

      await models.Pos.updateOne({ _id: pos._id }, { $set: { syncInfos } });

      // ====== if (action === 'statusToDone')
      if (action === 'statusToDone') {
        // must have
        const doneOrder = await models.PosOrders.findOne({ _id: order._id }).lean();

        const { deliveryConfig = {} } = pos;
        const deliveryInfo = doneOrder.deliveryInfo || {};
        const { marker = {} } = deliveryInfo;

        const deal = await models.Deals.createDeal({
          name: `Delivery: ${doneOrder.number}`,
          startDate: doneOrder.createdAt,
          description: deliveryInfo.address,
          // {
          //   "locationValue": {
          //     "type": "Point",
          //     "coordinates": [
          //       106.936283111572,
          //       47.920138551642
          //     ]
          //   },
          //   "field": "dznoBhE3XCkCaHuBX",
          //   "value": {
          //     "lat": 47.920138551642,
          //     "lng": 106.936283111572
          //   },
          //   "stringValue": "106.93628311157227,47.920138551642026"
          // }
          customFieldsData: [
            {
              field: (deliveryConfig.mapCustomField).replace('customFieldsData.', ''),
              locationValue: {
                type: "Point",
                coordinates: [
                  marker.longitude, marker.latitude
                ]
              },
              value: {
                lat: marker.latitude,
                lng: marker.longitude,
                description: "location"
              },
              stringValue: `${marker.longitude},${marker.latitude}`
            }
          ],
          stageId: deliveryConfig.stageId,
          assignedUserIds: deliveryConfig.assignedUserIds,
          watchedUserIds: deliveryConfig.watchedUserIds,
          productsData: doneOrder.items.map(i => ({
            productId: i.productId,
            uom: 'PC',
            currency: 'MNT',
            quantity: i.count,
            unitPrice: i.unitPrice,
            amount: i.count * i.unitPrice,
            tickUsed: true
          }))
        });

        if (doneOrder.customerId && deal._id) {
          await models.Conformities.addConformity({
            mainType: 'deal',
            mainTypeId: deal._id,
            relType: 'customer',
            relTypeId: doneOrder.customerId
          })
        }

        graphqlPubsub.publish('pipelinesChanged', {
          pipelinesChanged: {
            _id: deliveryConfig.pipelineId,
            proccessId: Math.random(),
            action: 'itemAdd',
            data: {
              item: deal,
              destinationStageId: deliveryConfig.stageId
            }
          }
        });

        await models.PosOrders.updateOne(
          { _id: doneOrder },
          {
            $set: {
              deliveryInfo: {
                ...deliveryInfo, dealId: deal._id
              }
            }
          }
        )

        return;
      }

      // ====== if (action === 'makePayment')
      await models.PutResponses.updateOne(
        { _id: response._id },
        { $set: { ...response, posToken, syncId } },
        { upsert: true }
      );

      await models.PosOrders.updateOne(
        { _id: order._id },
        {
          $set: {
            ...order, posToken, syncId, items,
            branchId: order.branchId || pos.branchId
          }
        },
        { upsert: true }
      );

      const newOrder = await models.PosOrders.findOne({ _id: order._id }).lean();

      // return info saved
      messageBroker().sendMessage(`vrpc_queue:erxes-pos-from-api_${syncId}`, { status: 'ok', posToken, syncId, responseId: response._id, orderId: order._id })

      if (newOrder.type === 'delivery' && newOrder.branchId) {
        const toPos = await models.Pos.findOne({ branchId: newOrder.branchId });

        // paid order info to offline pos
        // TODO: this message RPC, offline pos has seen by this message check
        await sendMessage(models, messageBroker, 'vrpc_queue:erxes-pos-to-pos', { order: { ...newOrder, posToken } }, toPos);
      }

      await orderToErkhet(models, messageBroker, memoryStorage, pos, order._id, response._id);
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

const getChannels = async (models, channel, pos, excludeTokens) => {
  const channels = [];
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

      channels.push(`${channel}_${syncId}`);
    }
  }
  return channels;
}

export const sendMessage = async (models, messageBroker, channel, params, pos = undefined, excludeTokens = []) => {
  const channels = await getChannels(models, channel, pos, excludeTokens);
  for (const ch of channels) {
    messageBroker().sendMessage(ch, params);
  }
}

export const sendRPCMessage = async (models, messageBroker, channel, params, pos = undefined, excludeTokens = []) => {
  const channels = await getChannels(models, channel, pos, excludeTokens);
  let ch = (channels && channels.length) && channels[0] || '';
  if (!ch) {
    return {}
  }

  return await messageBroker().sendRPCMessage(ch, params);
}


