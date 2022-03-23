import fs from "fs";
import chalk from "chalk";
import yaml from "yaml";

if (!fs.existsSync("./erxes.config.dev.yml")) {
  console.log(chalk.red.bold("./erxes.config.dev.yml file does not exist."));
  process.exit(1);
}

const yamlString = fs.readFileSync("./erxes.config.dev.yml").toString();
const erxesConfig = yaml.parse(yamlString);

console.log(chalk.green("Read erxes config from ./erxes.config.dev.yml"));

export default erxesConfig;
