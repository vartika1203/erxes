const resolvers = [
  {
    type: 'Pos',
    field: 'integration',
    handler: (pos, { }, { models }) => {
      if (!pos.integrationId) {
        return null;
      }

      return models.Integrations.findOne({ _id: pos.integrationId });
    }
  },
  {
    type: 'Pos',
    field: 'user',
    handler: (pos, { }, { models }) => {
      if (!pos.userId) {
        return null;
      }

      return models.Users.findOne({ _id: pos.userId });
    }
  },
  {
    type: 'PosOrder',
    field: 'posName',
    handler: async (order, { }, { models }) => {
      const pos = await models.Pos.findOne({ token: order.posToken }).lean();
      return pos ? pos.name : '';
    }
  },
  {
    type: 'PosOrder',
    field: 'user',
    handler: async (order, { }, { models }) => {
      if (!order.userId) {
        return null;
      }

      return models.Users.findOne({ _id: order.userId }).lean();
    }
  }
];

export default resolvers;
