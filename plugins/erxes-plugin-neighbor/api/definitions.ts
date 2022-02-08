import { Label } from "../ui/node_modules/erxes-ui/lib"

const location = {
  type: {
    type: String,
    enum: ['Point'],
    required: false,
    optional: true
  },
  coordinates: { type: [Number], reguired: false }
}
const infoObject = {
  
}
const type = {
  _id: { pkey: true },
  name: { type: String },
  parientId: { pkey: true }
}
export const NeighborSchema = {
  productCategoryId: { type: String },
  info: { type: Object, label: "{ typeId: [itemId1, itemId2] }" }
}


const schoolSchema = {
  description: { type: String, label: 'description' },
  district: { type: String, label: 'district' },
  Khoroo: { type: String, label: 'Khoroo' },
  locationValue: { type: location }
}

const universitySchema = {
  description: { type: String, label: 'description' },
  locationValue: { type: location }
}

const sohSxhema = {
  thermality: { type: String, label: 'thermality' },
  electricity: { type: String, label: 'electricity' },
  security: { type: String, label: 'security' },
  cable: { type: String, label: 'cable' },
}

const khorooSchema = {
  distance: { type: Number, label: 'distance' },
  khorooNumber: { type: Number, label: 'khoroo number' },
  address: { type: String, label: 'address' },
  phoneNumber: { type: Number, label: 'phonenumber' },
  hospital: { type: String, label: 'hospital' }

}

const envInfoSchema = {
  camera: { type: Number, label: 'camera' },
  walkingEnv: { type: Number, label: 'walking enviroment' },
  basketball: { type: Number, label: 'basketball' },
  playground: { type: Number, label: 'playground' },
  greenPlant: { type: Number, label: 'greenPlant' },
  streetLighting: { type: Number, label: 'streetLighting' },
}

const commonSchema = {
  district: { type: String, label: 'district' },
  Khoroo: { type: String, label: 'Khoroo' },
  locationValue: { type: location }
}

const districtTownSchema = {
  averagePrice: { type: String, label: 'Average price' },
  averageM2: { type: Number, label: 'Average m2' },
  population: { type: Number, label: 'Population' },
  averageAge: { type: Number, label: 'Average age' },
  publicService: { type: String, label: 'Public service' },
  featuredAds: { type: String, label: 'Featured Ads' },
  market: { type: String, label: 'Market' }

}

export const NeighborItemSchema = {
  _id: { pkey: true },
  name: { type: String, label: 'name' },
  type: { type: String },
  schoolData: { type: schoolSchema },
  kindergardenData: { type: schoolSchema },
  universityData: { type: universitySchema },
  sohGData: { type: sohSxhema },
  khorooData: { type: khorooSchema },
  envInfoData: { type: envInfoSchema },
  commonData: { type: commonSchema },
  districtTownData: { type: districtTownSchema }
}
/*
    locationValue: {
      type: {
        type: String,
        enum: ['Point'],
        required: false,
        optional: true
      },
      coordinates: {
        type: [Number],
        required: false,
        optional: true
      }
    }
  },
  { _id: false }
);
*/