import { PutData, returnBill } from "./utils/putData";

export const putResponseSchema = {
  _id: { pkey: true },
  createdAt: { type: Date, label: 'Created at' },
  modifiedAt: { type: Date, label: 'Modified at' },

  // Холбогдох обьект
  contentType: { type: String, label: 'Content Type' },
  contentId: { type: String, label: 'Content' },

  // Баримтыг бүртгэх процесс амжилттай болсон тухай илтгэнэ
  success: { type: String, label: 'success status' },

  // Баримтын ДДТД
  // 33 оронтой тоон утга / НӨАТ - ийн тухай хуулинд зааснаар/
  billId: { type: String, label: 'Bill ID', index: true },

  // Баримт хэвлэсэн огноо
  // Формат: yyyy - MM - dd hh: mm: ss
  date: { type: String, label: 'Date' },

  // Баримтыг хэвлэсэн бүртгэлийн машиний MacAddress
  macAddress: { type: String, label: 'macAddress' },

  // Баримтын дотоод код
  internalCode: { type: String, label: 'internal Code' },

  // Баримтын төрөл
  billType: { type: String, label: 'Bill Type' },

  // Сугалаа дуусаж буй эсвэл сугалаа хэвлэх боломжгүй болсон
  // талаар мэдээлэл өгөх утга
  lotteryWarningMsg: { type: String, label: '' },

  // Хэрэв алдаа илэрсэн бол уг алдааны код
  errorCode: { type: String, label: '' },

  // Алдааны мэдээллийн текстэн утга
  message: { type: String, label: '' },

  // billType == 1 and lottery is null or '' then save
  getInformation: { type: String, label: '' },

  // Татварын төрөл
  taxType: { type: String, label: '' },

  // Баримтын баталгаажуулах Qr кодонд орох нууцлагдсан тоон утга түр санах
  qrData: { type: String, label: '' },

  // Сугалааны дугаар түр санах
  lottery: { type: String, label: '' },

  // Ебаримт руу илгээсэн мэдээлэл
  sendInfo: { type: Object, label: '' },

  stocks: { type: Object, label: '' },
  amount: { type: String, label: '' },
  cityTax: { type: String, label: '' },
  vat: { type: String, label: '' },
  returnBillId: { type: String },
  cashAmount: { type: String, label: '' },
  nonCashAmount: { type: String, label: '' },
  registerNo: { type: String, label: '' },
  customerNo: { type: String, label: '' },
  customerName: { type: String, label: '' },

  posToken: { type: String, optional: true },
  syncId: { type: String, optional: true }
};

const compoundIndexes = {
  contentType: 1,
  contentId: 1,
  success: 1
};

interface IPutResponseDoc {
  data: Date,
  orderId: string,
  hasVat: boolean,
  hasCitytax: boolean,
  billType: string,
  customerCode: string,
  customerName: string,
  productsById: any,
  details: any[],
  cashAmount: number,
  nonCashAmount: number,

  transaction,
  records,
  taxType: string,
  returnBillId: string,

  contentType: string,
  contentId: string,
}

interface IPutResponseConfig {
  ebarimtUrl: string,
  districtName: string,
  companyRD: string,
  vatPercent: string,
  cityTaxPercent: string,
  defaultGSCode: string,
}

class PutResponse {
  public static async putData(models, doc: IPutResponseDoc, config: IPutResponseConfig) {
    const putData = new PutData({ ...doc, config, models });
    return putData.run();
  }

  public static async returnBill(models, deal, config) {
    return returnBill(models, deal, config)
  }

  public static async putHistories(models, { contentType, contentId }) {
    const putResponse = await models.PutResponses.findOne({
      contentType, contentId, success: true
    }).sort({ createdAt: -1 });
    if (!putResponse) { return; }
    if (!putResponse.billId) { return; }
    return putResponse
  }

  /**
   * Create a putResponse
   */
  public static async createPutResponse(models, doc) {
    const response = await models.PutResponses.create({
      ...doc,
      createdAt: new Date(),
    });

    return response;
  }
  /**
   * Update a putResponse
   */
  public static async updatePutResponse(models, _id, doc) {
    const response = await models.PutResponses.update({ _id }, {
      $set: {
        ...doc,
        modifiedAt: new Date(),
      }
    });

    return response;
  }
}

export const unitedCodesSchema = {
  _id: { pkey: true },
  modifiedAt: { type: Date, label: 'Modified at' },
  categoryId: { type: String, label: 'Product Category' },
  unitedCode: { type: String, label: 'United Code' },

}

class UnitedCode {

}

export default [
  {
    name: 'PutResponses',
    schema: putResponseSchema,
    klass: PutResponse,
    compoundIndexes
  },
  {
    name: 'UnitedCodes',
    schema: unitedCodesSchema,
    klass: UnitedCode
  }
];
