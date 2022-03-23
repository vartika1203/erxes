import * as fs from "fs";
import * as yaml from "yaml";

const yamlString = fs.readFileSync("/run/secrets/erxes.config.yml").toString();
const erxesConfigs = yaml.parse(yamlString);

export default erxesConfigs;
