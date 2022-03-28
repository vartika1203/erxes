import fs from "fs";
import chalk from "chalk";
import yaml from "yaml";
import erxesConfigDev from "./erxes-config-dev.mjs";
import _ from "lodash";

export default async function devGenerate() {
  await createStatic();
  await generateDockerCompose();
}

function createStatic() {
  if (!fs.existsSync("./.dev")) {
    fs.mkdirSync("./.dev");
    console.log(chalk.green("Created dir ./.dev"));
  }

  const dockerfile = `FROM node:14-slim
USER node
WORKDIR /erxes
`;

  fs.writeFileSync("./.dev/Dockerfile", dockerfile);
  console.log(chalk.green("Created file ./.dev/Dockerfile"));
}

const commonConstConfig = {
  build: {
    context: "../",
    dockerfile: "./.dev/Dockerfile",
  },
  secrets: ["erxes.config.yml"],
  networks: ["erxes-dev"],
  volumes: ["../:/erxes"],
};

const {
  USE_BRAND_RESTRICTIONS,
  CORE_MONGO_URL,
  ELASTICSEARCH_URL,
  MAIN_APP_DOMAIN,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  RABBITMQ_HOST,
  ELK_SYNCER,
  WIDGETS_DOMAIN,
  CLIENT_PORTAL_DOMAINS,
  DASHBOARD_DOMAIN,
} = erxesConfigDev;

const commonEnv = {
  PORT: 80,
  NODE_ENV: "development",
  JWT_TOKEN_SECRET: "token",
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  RABBITMQ_HOST,
  ELASTICSEARCH_URL,
  USE_BRAND_RESTRICTIONS,
  CORE_MONGO_URL,
  MAIN_APP_DOMAIN,
  ELK_SYNCER,
  WIDGETS_DOMAIN,
  CLIENT_PORTAL_DOMAINS,
  DASHBOARD_DOMAIN
};

const pluginConfigCommon = {
  ...commonConstConfig,
  environment: {
    ...commonEnv,
    API_MONGO_URL: CORE_MONGO_URL,
  },
};

const coreBaseConfig = {
  container_name: "core",
  ...commonConstConfig,
  command: "yarn workspace core dev",
  environment: {
    ...commonEnv,
    MONGO_URL: CORE_MONGO_URL,
  },
};

const gatewayBaseConfig = {
  container_name: "gateway",
  depends_on: ["core"],
  ...commonConstConfig,
  command: "yarn workspace gateway dev",
  ports: ["4000:80"],
  restart: "on-failure",
  environment: {
    ...commonEnv,
    MONGO_URL: CORE_MONGO_URL,
    API_DOMAIN: "http://core",
  },
}

async function generateDockerCompose() {
  const dockerComposeConfig = {
    version: "3.8",
    secrets: {
      "erxes.config.yml": {
        file: "../erxes.config.dev.yml",
      },
    },
    networks: {
      "erxes-dev": {
        driver: "bridge",
      },
    },
    services: {
      core: _.merge({}, coreBaseConfig, erxesConfigDev.core || {}),
      gateway: _.merge({}, gatewayBaseConfig, erxesConfigDev.core || {}),
    },
  };

  const pluginNames = Object.keys(erxesConfigDev.plugins || {});

  for (const pluginName of pluginNames) {
    const pluginConfig = erxesConfigDev.plugins[pluginName] || {};

    const pluginConfigBase = {
      container_name: pluginName,
      command: `yarn workspace @erxes/plugin-${pluginName}-api dev`,
      ...pluginConfigCommon,
    };

    dockerComposeConfig.services[pluginName] = _.merge(
      {},
      pluginConfigBase,
      pluginConfig
    );
  }

  dockerComposeConfig.services.gateway.depends_on = ["core", ...pluginNames];

  const yamlString = yaml.stringify(dockerComposeConfig);

  fs.writeFileSync("./.dev/docker-compose.yml", yamlString);

  console.log(
    chalk.green("Created a docker-compose file ./.dev/docker-compose.yml")
  );
}
