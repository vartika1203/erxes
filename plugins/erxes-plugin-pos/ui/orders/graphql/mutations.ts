import { responseFields } from "./queries";

const posOrderSyncErkhet = `
  mutation posOrderSyncErkhet($_id: String!) {
    posOrderSyncErkhet(_id: $_id){
      ${responseFields}
    }
  }
`;

const posOrderReturnBill = `
  mutation posOrderReturnBill($_id: String!) {
    posOrderReturnBill(_id: $_id){
      ${responseFields}
    }
  }
`;

export default {
  posOrderSyncErkhet,
  posOrderReturnBill
};
