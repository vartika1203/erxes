const neighborQueries = [
  {
    name: 'getNeighborItems',
    handler: async (_root, { type }, { models, chackPermission, user }) => {

      return await models.neighborItem.find({ type: type })

    }
  }
]

export default neighborQueries;