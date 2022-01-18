import { responseFields } from "./queries";

const posOrderSyncErkhet = `
  mutation posOrderSyncErkhet($_id: String!) {
    posOrderSyncErkhet(_id: $_id){
      ${responseFields}
    }
  }
`;

export default {
  posOrderSyncErkhet
};
