import { NeighborSchema, NeighborItemSchema} from './definitions';

class Neighbor{
  public static async createNeighbor(models, user, doc){
    const cb = await models.Neighbor.create({
      ...doc
    });
    return cb
  }

  public static async updateNeighbor(models, user, doc){

    const { productCategoryId} = doc
    
    delete doc.productCategoryId
    
    return models.Neighbor.updateOne({ productCategoryId: productCategoryId}, { $set: doc });
  }

  public static async removeNeighbor(models, user, doc){
    
    await models.Neighbor.remove({ productCategoryId: doc.productCategoryId});
  
  }
}

class NeighborItem{

  public static async createNeighborItem(models, doc){

    console.log(doc,'lslalal')

    const cb = await models.NeighborItem.create({
    
      ...doc
    
    });
    
    return cb
  }

  public static async updateNeighborItem(models, doc) {
    
    const { _id } = doc

    delete doc._id

    return models.NeighborItem.updateOne({ _id: _id }, { $set: doc });
  
  }

  public static async deleteNeighborItem(models, doc) {
  
    const { _id } = doc

    return models.NeighborItem.deleteOne({ _id });
  
  }
}

export default [
  {
    name: 'Neighbor',
    schema: NeighborSchema,
    klass: Neighbor
  },
  {
    name: 'NeighborItem',
    schema: NeighborItemSchema,
    klass: NeighborItem
  }
];