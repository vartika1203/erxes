import { graphqlRequest } from '../db/connection';
import { Integrations, Scripts } from '../db/models';

import { integrationFactory, scriptFactory } from '../db/factories';
import './setup.ts';
import { KIND_CHOICES } from '../db/models/definitions/constants';

describe('responseTemplateQueries', () => {
  afterEach(async () => {
    // Clearing test data
    await Scripts.deleteMany({});
    await Integrations.deleteMany({});
  });

  test('Scripts', async () => {
    const qry = `
      query scripts($page: Int, $perPage: Int) {
        scripts(page: $page, perPage: $perPage) {
          _id
          messenger { _id }
          kbTopic { _id }
          leads { _id }
        }
      }
    `;

    const integration = await integrationFactory({ kind: KIND_CHOICES.LEAD });

    await scriptFactory({ leadIds: [integration._id] });
    await scriptFactory({});
    await scriptFactory({});

    const response = await graphqlRequest(qry, 'scripts', {
      page: 1,
      perPage: 2
    });

    expect(response.length).toBe(2);
  });

  test('Get total count of script', async () => {
    const qry = `
      query scriptsTotalCount {
        scriptsTotalCount
      }
    `;

    await scriptFactory({});
    await scriptFactory({});
    await scriptFactory({});

    const totalCount = await graphqlRequest(qry, 'scriptsTotalCount');

    expect(totalCount).toBe(3);
  });
});
