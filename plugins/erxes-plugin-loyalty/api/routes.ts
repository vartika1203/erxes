import { checkVouchersSale, confirmVoucherSale } from "./utils";

export default {
  routes: [
    {
      method: "GET",
      path: "/check-loyalties",
      handler: async ({ models, req }) => {
        const { ownerType, ownerId, products } = req.body;
        return checkVouchersSale(models, ownerType, ownerId, products);
      },
    },
    {
      method: "GET",
      path: "/confirm-loyalties",
      handler: async ({ models, req }) => {
        const { checkInfo } = req.body;
        return confirmVoucherSale(models, checkInfo);
      },
    }
  ]
}
