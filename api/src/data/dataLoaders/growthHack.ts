import * as DataLoader from 'dataloader';
import * as _ from 'underscore';
import { GrowthHacks } from '../../db/models';

export default function generateDataLoader() {
  return new DataLoader<string, any>(async (ids: readonly string[]) => {
    const result = await GrowthHacks.find({
      _id: { $in: ids }
    }).lean();
    const resultById = _.indexBy(result, '_id');
    return ids.map(id => resultById[id]);
  });
}
