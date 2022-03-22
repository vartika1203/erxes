import fs from 'fs';
import yaml from 'yaml';

const yamlString = fs.readFileSync('/run/secrets/erxes.config.yml').toString();
const erxesConfig = yaml.parse(yamlString);

export default erxesConfig;