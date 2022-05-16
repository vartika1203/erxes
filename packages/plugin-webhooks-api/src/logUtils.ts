import {
  putCreateLog as commonPutCreateLog,
  putUpdateLog as commonPutUpdateLog,
  putDeleteLog as commonPutDeleteLog
} from '@erxes/api-utils/src/logUtils';

import messageBroker from './messageBroker';

export const putDeleteLog = async (subdomain: string, logDoc, user) => {
  await commonPutDeleteLog(
    subdomain,
    messageBroker(),
    { ...logDoc, type: `webhooks:${logDoc.type}` },
    user
  );
};

export const putUpdateLog = async (subdomain: string, logDoc, user) => {
  await commonPutUpdateLog(
    subdomain,
    messageBroker(),
    { ...logDoc, type: `webhooks:${logDoc.type}` },
    user
  );
};

export const putCreateLog = async (subdomain: string, logDoc, user) => {
  await commonPutCreateLog(
    subdomain,
    messageBroker(),
    { ...logDoc, type: `webhooks:${logDoc.type}` },
    user
  );
};
