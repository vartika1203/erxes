export default [
  {
    name: 'spinsAdd',
    handler: async (_root, doc, { models, user }) => {
      return models.Spins.createSpin(models, { ...doc, userId: user._id });
    }
  },
  {
    name: 'spinsEdit',
    handler: async (_root, doc, { models, user }) => {
      return models.Spins.updateSpin(models, doc._id, { ...doc, userId: user._id });
    }
  },
  {
    name: 'spinsRemove',
    handler: async (_root, doc, { models }) => {
      return models.Spins.removeSpins(models, doc._ids);
    }
  },
  {
    name: 'doSpin',
    handler: async (_root, _id, { models }) => {
      return models.Spins.doSpin(_id);
    }
  },
  {
    name: 'buySpin',
    handler: async (_root, param, { models }) => {
      const { compaignId, ownerType, ownerId, count } = param;
      return models.Spins.buySpin(models, { compaignId, ownerType, ownerId, count })
    }
  },
];