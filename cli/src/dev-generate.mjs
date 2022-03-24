import fs from "fs";
import chalk from "chalk";
import yaml from "yaml";
import erxesConfigDev from "./erxes-config-dev.mjs";

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
  GATEWAY_PORT,
} = erxesConfigDev;

const commonEnv = {
  PORT: 80,
  NODE_ENV: "development",
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  RABBITMQ_HOST,
  ELASTICSEARCH_URL,
  JWT_TOKEN_SECRET: "token",
};

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
      core: {
        container_name: "core",
        ...commonConstConfig,
        command: "yarn workspace core dev",
        environment: {
          ...commonEnv,
          USE_BRAND_RESTRICTIONS: USE_BRAND_RESTRICTIONS,
          MONGO_URL: CORE_MONGO_URL,
          MAIN_APP_DOMAIN,
          ELK_SYNCER,
          WIDGETS_DOMAIN,
          CLIENT_PORTAL_DOMAINS,
          DASHBOARD_DOMAIN,
        },
      },
      gateway: {
        container_name: "gateway",
        depends_on: ["core"],
        ...commonConstConfig,
        command: "yarn workspace gateway dev",
        ports: [`${GATEWAY_PORT || 4000}:80`],
        restart: "on-failure",
        environment: {
          ...commonEnv,
          MONGO_URL: CORE_MONGO_URL,
          API_DOMAIN: "http://core",
          MAIN_APP_DOMAIN,
          WIDGETS_DOMAIN,
          CLIENT_PORTAL_DOMAINS,
          DASHBOARD_DOMAIN,
        },
      },
    },
  };

  const pluginNames = Object.keys(erxesConfigDev.plugins || {});

  for (const pluginName of pluginNames) {
    const pluginEnvironment = erxesConfigDev.plugins[pluginName].environment || {};

    dockerComposeConfig.services[pluginName] = {
      container_name: pluginName,
      ...commonConstConfig,
      environment: {
        ...commonEnv,
        API_MONGO_URL: CORE_MONGO_URL,
        ...pluginEnvironment,
      },
      command: `yarn workspace @erxes/plugin-${pluginName}-api dev`,
    };
  }

  dockerComposeConfig.services.gateway.depends_on = ["core", ...pluginNames];

  const yamlString = yaml.stringify(dockerComposeConfig);

  fs.writeFileSync("./.dev/docker-compose.yml", yamlString);

  console.log(
    chalk.green("Created a docker-compose file ./.dev/docker-compose.yml")
  );
}
