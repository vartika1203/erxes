import { Schema } from 'mongoose';

export default {
  schema: new Schema({
    name: { type: String, label: 'Name' }
  })
};
