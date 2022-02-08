const neighborMutations = [
  {
    name: 'neighborAdd',
    handler: async (_root, doc, { user, docModifier, models }) => {
      const create = await models.Neighbor.createNeighbor(models, docModifier(doc), user)
      
      return create
    }
  },
  {
    name: 'neighborEdit',
    
    handler: async (_root, doc, { user, docModifier, models, checkPermission}) => {
      
      const updated = await models.Neighbor.updateNeighbor(models, docModifier(doc), user)
      
      return updated
    }
  },
  {
    name: 'neighborRemove',
    
    handler: async (_root, doc, { user, docModifier, models, checkPermission}) => {

      const remove = await models.Neighbor.removeNeighbor(models, docModifier(doc), user)
      
      return remove
    }
  },
  {
    name: 'neighborItemCreate',
    
    handler: async (_root, doc, { user, docModifier, models, checkPermission}) => {


      const create = await models.NeighborItem.createNeighborItem(models, docModifier(doc), user)
      
      return create
    }
  },
  {
    name: 'neighborItemEdit',
    
    handler: async (_root, doc, { user, docModifier, models, checkPermission}) => {

      const create = await models.NeighborItem.updateNeighborItem(models, docModifier(doc), user)
      
      return create
    }
  },
  {
    name: 'neighborItemRemove',
    
    handler: async (_root, doc, { user, docModifier, models, checkPermission}) => {

      const remove = await models.NeighborItem.removeNeighborItem(models, docModifier(doc), user)
    
      return remove
    }
  },
]

export default neighborMutations;
