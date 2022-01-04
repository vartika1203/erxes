import { IOrdersSummary } from "../types";

export type IOrder = {
  _id: string,
  createdAt: Date,
  status: string,
  paidDate: Date,
  number: string,
  customerId: string,
  cardAmount: number,
  cashAmount: number,
  mobileAmount: number,
  totalAmount: number,
  finalAmount: number,
  shouldPrintEbarimt: boolean,
  printedEbarimt: boolean,
  billType: string,
  billId: string,
  registerNumber: string,
  oldBillId: string,
  type: string,
  userId: string,

  items: any,
  posToken: string,
  syncId: string,
}

export type OrdersQueryResponse = {
  posOrders: IOrder[];
  loading: boolean;
  refetch: () => void;
}

export type ListQueryVariables = {
  page?: number;
  perPage?: number;
  search?: string;
};

export type OrdersSummaryQueryResponse = {
  posOrdersSummary: IOrdersSummary;
  loading: boolean;
  refetch: () => void;
}
