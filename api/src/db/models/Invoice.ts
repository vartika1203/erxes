import { Model, model } from 'mongoose';
import * as _ from 'underscore';
import {
  IInvoice,
  IInvoiceDocument,
  invoiceSchema
} from './definitions/invoice';

export interface IInvoiceModel extends Model<IInvoiceDocument> {
  getInvoice(doc: any): Promise<IInvoiceDocument>;
  createInvoice(doc: IInvoice): Promise<IInvoiceDocument>;
  updateInvoice(_id: string, doc: IInvoice): Promise<IInvoiceDocument>;
  removeInvoice(_id: string): void;
  updateInvoiceStatus(_id: string, status: string): void;
}

export const loadClass = () => {
  class Invoice {
    public static async getInvoice(doc: any) {
      const invoice = await Invoices.findOne(doc);

      if (!invoice) {
        throw new Error(`Invoice not found`);
      }

      return invoice;
    }

    public static async createInvoice(doc: IInvoice) {
      const invoice = await Invoices.create({
        ...doc,
        createdAt: new Date()
      });

      return invoice;
    }

    public static async updateInvoice(_id: string, doc: IInvoice) {
      await Invoices.updateOne({ _id }, { $set: { ...doc } });

      return Invoices.findOne({ _id });
    }

    public static async removeInvoice(_id: string) {
      await Invoices.getInvoice({ _id });

      return Invoices.deleteOne({ _id });
    }

    public static async updateInvoiceStatus(_id: string, status: string) {
      return Invoices.updateOne({ _id }, { $set: { status } });
    }
  }

  invoiceSchema.loadClass(Invoice);

  return invoiceSchema;
};

loadClass();

// tslint:disable-next-line
const Invoices = model<IInvoiceDocument, IInvoiceModel>(
  'invoices',
  invoiceSchema
);

export default Invoices;
