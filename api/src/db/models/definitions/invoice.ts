import { Document, Schema } from 'mongoose';
import { field, schemaWrapper } from './utils';

export interface IInvoice {
  status: string;
  amount: number;
  invoiceNo?: string;
  phone?: string;
  type: string;
  invoiceType: string;
}

export interface IInvoiceDocument extends IInvoice, Document {
  _id: string;
  createdAt: Date;
}

export const invoiceSchema = schemaWrapper(
  new Schema({
    _id: field({ pkey: true }),
    type: field({ type: String, label: 'Type', required: true }),
    invoiceType: field({ type: String, label: 'Invoice Type', required: true }),
    amount: field({ type: Number, label: 'Amount' }),
    createdAt: field({ type: Date, label: 'Created at' }),
    status: field({ type: String, label: 'Status' }),
    invoiceNo: field({ type: String, label: 'Invoice no' }),
    phone: field({ type: String, label: 'Phone' })
  })
);
