import * as dotenv from "dotenv";
import Redis from "ioredis";
import erxesConfigs from "./erxes-configs";

dotenv.config();

const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
} = process.env;

export const redis = new Redis({
  host: REDIS_HOST,
  port: parseInt(REDIS_PORT || "6379", 10),
  password: REDIS_PASSWORD,
});

export const getServices = () => {
  return ["core", ...Object.keys(erxesConfigs.plugins || {})];
};

export const getService = async (name: string, meta?: boolean) => {
  const result: any = { address: `http://${name}`, meta: {} };

  if (meta) {
    const value = await redis.get(`service:config:${name}`);
    result.meta = JSON.parse(value || "{}");
  }

  return result;
};

export const isAvailable = async (name) => {
  return (name === "core") || (!!erxesConfigs.plugins[name])
};

export default redis;
