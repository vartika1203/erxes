import * as dotenv from "dotenv";
import Redis from "ioredis";
import erxesConfigs from "./erxes-configs";

dotenv.config();

const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
} = process.env;

const redis = new Redis({
  host: REDIS_HOST,
  port: parseInt(REDIS_PORT || "6379", 10),
  password: REDIS_PASSWORD,
});


const generateKey = name => `service:config:${name}`;

const getServices = () => {
  return ["core", ...Object.keys(erxesConfigs.plugins || {})];
};

const getService = async (name: string, config?: boolean) => {
  const result: any = { address: `http://${name}`, config: {} };

  if (config) {
    const value = await redis.get(generateKey(name));
    result.config = JSON.parse(value || '{}');
  }

  return result;
};

const isAvailable = async (name) => {
  return (name === "core") || (!!erxesConfigs.plugins[name])
}

const setAfterMutations = async () => {
  const services = await getServices();
  const result = {}

  for (const service of services) {
    const info = await getService(service, true);
    const meta = Object.keys(info.config).includes('meta') ? (info.config as any).meta : {};

    if (!Object.keys(meta).includes('afterMutations')) {
      continue
    }

    for (const type of Object.keys(meta.afterMutations)) {
      if (!Object.keys(result).includes(type)) {
        result[type] = {};
      }

      for (const action of meta.afterMutations[type]) {
        if (!Object.keys(result[type]).includes(action)) {
          result[type][action] = [];
        }

        result[type][action].push(service)
      }
    }
  }

  await redis.set(
    'afterMutations',
    JSON.stringify(result)
  );
}

export {
  isAvailable,
  getServices,
  getService,
  redis,
  setAfterMutations
};
