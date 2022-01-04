import { Schema } from 'mongoose';
import { sendRequest } from './utils';

export const getPluginConfig = async (
  _pluginName: string,
  configName: string
) => {
  const domain = 'http://localhost:9000';

  try {
    const config = await sendRequest({
      url: `${domain}/config`,
      method: 'GET'
    });

    return config[configName] || '';
  } catch (e) {
    return '';
  }
};

export const getSchemaFromDefinition = (definition: any) => {
  for (const key in definition) {
    switch (definition[key].type) {
      case 'String': {
        definition[key].type = String;

        break;
      }

      case 'Date': {
        definition[key].type = Date;

        break;
      }

      case 'Number': {
        definition[key].type = Number;

        break;
      }

      case 'Boolean': {
        definition[key].type = Boolean;

        break;
      }
    }
  }

  return new Schema(definition);
};

export const getSchema = async contentType => {
  const schemaDefinition = await getPluginConfig(contentType, 'schema');

  return getSchemaFromDefinition(schemaDefinition);
};
