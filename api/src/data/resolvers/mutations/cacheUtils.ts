import { MessengerApps } from '../../../db/models';
import { get, set } from '../../../inmemoryStorage';

// doing this until sift dot path support
export const getMessengerApps = async (
  kind: string,
  integrationId: string,
  findOne = true
) => {
  const key = 'erxes_messenger_apps';
  const cacheValue = await get(key);

  let parsedValue;

  if (cacheValue) {
    parsedValue = JSON.parse(cacheValue);
  } else {
    parsedValue = await MessengerApps.find().lean();
    set(key, JSON.stringify(parsedValue));
  }

  const callback = v => {
    const credentials = v.credentials || {};
    return v.kind === kind && credentials.integrationId === integrationId;
  };

  if (findOne) {
    return parsedValue.find(callback);
  }

  return parsedValue.filter(callback);
};
