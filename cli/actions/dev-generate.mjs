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
  }

  fs.writeFileSync("./.dev/Dockerfile", dockerfile);
}

async function readConfig() {
  if (!fs.existsSync("./erxes.config.dev.yml")) {
    console.log(chalk.red.bold("./erxes.config.dev.yml file does not exist."));
    return;
  }
  const yamlString = fs.readFileSync("./erxes.config.dev.yml").toString();
  const erxesConfig = yaml.parse(yamlString);
  return erxesConfig;
}

const build = {
  context: "../",
  dockerfile: "./.dev/Dockerfile",
};

async function generateDockerCompose(erxesConfig) {
  console.log(chalk.green(erxesConfig));

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
        build,
        secrets: ["erxes.config.yml"],
        volumes: ["../:/app"],
        command: "yarn workspace core dev",
        networks: ['erxes-dev']
      },
    },
  };

  const yamlString = yaml.stringify(dockerComposeConfig);

  fs.writeFileSync("./.dev/docker-compose.yml", yamlString);
}
