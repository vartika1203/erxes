import * as Redis from 'ioredis';
import * as dotenv from 'dotenv';
import erxesConfigs from './erxes-configs';

dotenv.config();

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

export const redis = new Redis({
  host: REDIS_HOST,
  port: parseInt(REDIS_PORT || '6379', 10),
  password: REDIS_PASSWORD
});

const generateKey = name => `service:config:${name}`;

export const getServices = () => {
  return ["core", ...Object.keys(erxesConfigs.plugins || {})]
};

export const getService = async (name: string, config?: boolean) => {
  const result = {
    address: `http://${name}`,
    config: {}
  };

  if (config) {
    const value = await redis.get(generateKey(name));
    result.config = JSON.parse(value || '{}');
  }

  return result;
};

export const join = async ({
  name,
  dbConnectionString,
  hasSubscriptions = false,
  importTypes,
  exportTypes,
  meta
}: {
  name: string;
  dbConnectionString: string;
  hasSubscriptions?: boolean;
  importTypes?: any;
  exportTypes?: any;
  meta?: any;
}) => {
  await redis.set(
    generateKey(name),

    JSON.stringify({
      dbConnectionString,
      hasSubscriptions,
      importTypes,
      exportTypes,
      meta
    })
  );
};