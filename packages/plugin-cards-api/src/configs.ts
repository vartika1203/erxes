import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

import { initBroker, sendSegmentMessage } from './messageBroker';
import { IFetchElkArgs } from '@erxes/api-utils/src/types';
import { initMemoryStorage } from './inmemoryStorage';
import { EXPORT_TYPES, IMPORT_TYPES } from './constants';
import permissions from './permissions';
import { routeErrorHandling } from '@erxes/api-utils/src/requests';
import { buildFile } from './exporter';
import segments from './segments';
import { coreModels, generateModels, models } from './connectionResolver';

export let mainDb;
export let graphqlPubsub;
export let serviceDiscovery;

export let es: {
  client;
  fetchElk(args: IFetchElkArgs): Promise<any>;
  getMappings(index: string): Promise<any>;
  getIndexPrefix(): string;
};

export let debug;

export default {
  name: 'cards',
  permissions,
  graphql: async sd => {
    serviceDiscovery = sd;

    return {
      typeDefs: await typeDefs(sd),
      resolvers
    };
  },
  hasSubscriptions: true,
  importTypes: IMPORT_TYPES,
  exportTypes: EXPORT_TYPES,
  meta: {
    logs: { providesActivityLog: true },
    segments
  },
  apolloServerContext: context => {
    context.models = models;
    context.coreModels = coreModels;
    return context;
  },
  onServerInit: async options => {
    mainDb = options.db;
    const app = options.app;

    await generateModels('os');

    app.get(
      '/file-export',
      routeErrorHandling(async (req: any, res) => {
        const { query, user } = req;
        const { segment } = query;

        const result = await buildFile(query, user);

        res.attachment(`${result.name}.xlsx`);

        if (segment) {
          try {
            sendSegmentMessage('removeSegment', { segmentId: segment });
          } catch (e) {
            console.log((e as Error).message);
          }
        }

        return res.send(result.response);
      })
    );

    initBroker(options.messageBrokerClient);

    initMemoryStorage();

    debug = options.debug;
    graphqlPubsub = options.pubsubClient;
    es = options.elasticsearch;
  }
};
