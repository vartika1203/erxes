import { commonFields } from './queries';

const commonFormParamsDef = `
  $name: String!,
  $brandId: String!,
  $channelIds: [String],
  $visibility: String,
  $departmentIds: [String],
  $formId: String!,
  $languageCode: String,
  $leadData: IntegrationLeadData!
  $paymentConfig: JSON
`;

const commonFormParams = `
  name: $name,
  brandId: $brandId,
  channelIds: $channelIds,
  visibility: $visibility,
  departmentIds: $departmentIds,
  formId: $formId,
  languageCode: $languageCode,
  leadData: $leadData,
  paymentConfig: $paymentConfig
`;

const integrationRemove = `
  mutation integrationsRemove($_id: String!) {
    integrationsRemove(_id: $_id)
  }
`;

const integrationsCreateLeadIntegration = `
  mutation integrationsCreateLeadIntegration(${commonFormParamsDef}) {
    integrationsCreateLeadIntegration(${commonFormParams}) {
      _id
    }
  }
`;

const integrationsEditLeadIntegration = `
  mutation integrationsEditLeadIntegration($_id: String!, ${commonFormParamsDef}) {
    integrationsEditLeadIntegration(_id: $_id, ${commonFormParams}) {
      _id
      ${commonFields}
    }
  }
`;

const formCopy = `
  mutation integrationsCopyLeadIntegration($_id: String!) {
    integrationsCopyLeadIntegration(_id: $_id) {
      _id
    }
  }
`;

export default {
  integrationRemove,
  integrationsEditLeadIntegration,
  integrationsCreateLeadIntegration,
  formCopy
};
