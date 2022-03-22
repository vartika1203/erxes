import fs from "fs";
import chalk from "chalk";
import yaml from "yaml";

export default async function devGenerate() {
  await createStatic();
  const erxesConfig = await readConfig();
  await generateDockerCompose(erxesConfig);
}

const dockerfile = `FROM node:14-slim
WORKDIR /app

`;

function createStatic() {
  if (!fs.existsSync("./.dev")) {
    fs.mkdirSync("./.dev");
    console.log(chalk.green("Created dir ./.dev"));
  }

  fs.writeFileSync("./.dev/Dockerfile", dockerfile);
  console.log(chalk.green("Created file ./.dev/Dockerfile"));
}

async function readConfig() {
  if (!fs.existsSync("./erxes.config.dev.yml")) {
    console.log(chalk.red.bold("./erxes.config.dev.yml file does not exist."));
    return;
  }
  const yamlString = fs.readFileSync("./erxes.config.dev.yml").toString();
  const erxesConfig = yaml.parse(yamlString);

  console.log(chalk.green("Read erxes config from ./erxes.config.dev.yml"));
  return erxesConfig;
}

const build = {
  context: "../",
  dockerfile: "./.dev/Dockerfile",
};

const JWT_TOKEN_SECRET = "token";
const NODE_ENV = "development";

async function generateDockerCompose(erxesConfig) {
  console.log(JSON.stringify(erxesConfig, null, 2));

  const {
    USE_BRAND_RESTRICTIONS,
    CORE_MONGO_URL,
    ELASTICSEARCH_URL,
    MAIN_APP_DOMAIN,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD,
    RABBITMQ_HOST,
    ELK_SYNCER
  } = erxesConfig;

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
        build: {
          context: "../",
          dockerfile: "./.dev/Dockerfile",
        },
        secrets: ["erxes.config.yml"],
        volumes: ["../:/app"],
        command: "yarn workspace core dev",
        networks: ["erxes-dev"],
        environment: {
          NODE_ENV,
          USE_BRAND_RESTRICTIONS: USE_BRAND_RESTRICTIONS,
          PORT: 80,
          JWT_TOKEN_SECRET,
          MONGO_URL: CORE_MONGO_URL,
          ELASTICSEARCH_URL,
          MAIN_APP_DOMAIN,
          REDIS_HOST,
          REDIS_PASSWORD,
          REDIS_PORT,
          RABBITMQ_HOST,
          ELK_SYNCER
        },
      },
      gateway: {
        container_name: "gateway",
        depends_on: ["core"],
        build: {
          context: "../",
          dockerfile: "./.dev/Dockerfile",
        },
        secrets: ["erxes.config.yml"],
        volumes: ["../:/app"],
        command: `bash -c "sleep 20 && yarn workspace gateway dev"`,
        networks: ["erxes-dev"],
        ports: ['4000:80'],
        environment: {
          PORT: 80,
          NODE_ENV: "development",
          JWT_TOKEN_SECRET,
          API_DOMAIN: "http://core",
          MAIN_APP_DOMAIN: "http://172.17.0.1:3000",
          MONGO_URL: CORE_MONGO_URL,
          REDIS_HOST,
          REDIS_PASSWORD,
          REDIS_PASSWORD,
          RABBITMQ_HOST
        }
      }
    },
  };

  const pluginNames = Object.keys(erxesConfig.plugins) || [];

  for(const pluginName of pluginNames) {
    const { MONGO_URL } = erxesConfig.plugins[pluginName];

    dockerComposeConfig.services[pluginName] = {
      container_name: pluginName,
      build: {
        context: "../",
        dockerfile: "./.dev/Dockerfile",
      },
      secrets: ["erxes.config.yml"],
      volumes: ["../:/app", `../packages/api-plugin-template.erxes:/app/packages/plugin-${pluginName}-api/.erxes`],
      networks: ["erxes-dev"],
      environment: {
        PORT : 80,
        NODE_ENV: "development",
        API_MONGO_URL: CORE_MONGO_URL,
        REDIS_HOST,
        REDIS_PASSWORD,
        REDIS_PORT,
        RABBITMQ_HOST,
        ELASTICSEARCH_URL,
        MONGO_URL
      },
      command: `yarn workspace @erxes/plugin-${pluginName}-api dev`
    }
  }

  dockerComposeConfig.services.gateway.depends_on = ["core", ...pluginNames];

  const yamlString = yaml.stringify(dockerComposeConfig);

  fs.writeFileSync("./.dev/docker-compose.yml", yamlString);

  console.log(
    chalk.green("Created a docker-compose file in ./.dev/docker-compose.yml")
  );
}
