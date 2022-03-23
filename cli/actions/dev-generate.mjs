import fs from "fs";
import chalk from "chalk";
import yaml from "yaml";

export default async function devGenerate() {
  const erxesConfig = await readConfig();
  await createStatic();
  await generateDockerCompose(erxesConfig);
}

function createStatic() {
  if (!fs.existsSync("./.dev")) {
    fs.mkdirSync("./.dev");
    console.log(chalk.green("Created dir ./.dev"));
  }

  const dockerfile = `FROM node:14-slim
WORKDIR /erxes

`;

  fs.writeFileSync("./.dev/Dockerfile", dockerfile);
  console.log(chalk.green("Created file ./.dev/Dockerfile"));
}

async function readConfig() {
  if (!fs.existsSync("./erxes.config.dev.yml")) {
    console.log(chalk.red.bold("./erxes.config.dev.yml file does not exist."));
    process.exit(1);
    return;
  }
  const yamlString = fs.readFileSync("./erxes.config.dev.yml").toString();
  const erxesConfig = yaml.parse(yamlString);

  console.log(chalk.green("Read erxes config from ./erxes.config.dev.yml"));
  return erxesConfig;
}

const commonConstConfig = {
  build: {
    context: "../",
    dockerfile: "./.dev/Dockerfile",
  },
  secrets: ["erxes.config.yml"],
  networks: ["erxes-dev"],
};

async function generateDockerCompose(erxesConfig) {
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
  } = erxesConfig;

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
        volumes: ["../:/erxes"],
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
        volumes: ["../:/erxes"],
        command: `bash -c "sleep 30 && yarn workspace gateway dev"`,
        ports: [`${GATEWAY_PORT || 4000}:80`],
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

  const pluginNames = Object.keys(erxesConfig.plugins || {});

  for (const pluginName of pluginNames) {
    const pluginEnvironment = erxesConfig.plugins[pluginName].environment || {};

    dockerComposeConfig.services[pluginName] = {
      container_name: pluginName,
      ...commonConstConfig,
      volumes: [
        "../:/erxes",
        `../packages/api-plugin-template.erxes:/app/packages/plugin-${pluginName}-api/.erxes`,
      ],
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
    chalk.green("Created a docker-compose file in ./.dev/docker-compose.yml")
  );
}
