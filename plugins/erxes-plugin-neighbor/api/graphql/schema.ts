export const types = `
  type Info {
    type: JSON
    label: JSON
  }
  input InfoInput {
    type: JSON
    label: JSON
  }
  type Neighbor{
    productCategoryId: String
    info: Info
  }

  input NeighborInput {
    productCategoryId: String
    info: InfoInput
  }

  type Coordinate{
    type: [Int]
    required: Boolean
  }
  input CoordinateInput{
    type: [Int]
    required: Boolean
  }

  type Type{
    type: String
    required: Boolean
    optional: Boolean
  }
  input TypeInput{
    type: String
    required: Boolean
    optional: Boolean
  }

  type Location{
    type: Type
    coordinates: Coordinate
  }

  input LocationInput{
    type: TypeInput
    coordinates: CoordinateInput
  }
  type School {
    description: String
    district: String
    khoroo: String
    locationValue: Location
  }

  input SchoolInput {
    description: String
    district: String
    khoroo: String
    locationValue: LocationInput
  }

  type University{
    description: String
    locationValue: Location
  }

  input UniversityInput{
    description: String
    locationValue: LocationInput
  }

  type Soh{
    thermality: String
    electricity: String
    security: String
    cable: String
  }

  input SohInput{
    thermality: String
    electricity: String
    security: String
    cable: String
  }

  type Khoroo{
    distance: Int
    khorooNumber: Int
    address: String
    phoneNumber: Int
    hospital: String
  }

  input KhorooInput{
    distance: Int
    khorooNumber: Int
    address: String
    phoneNumber: Int
    hospital: String
  }

  type EnvInfo{
    camera: Int
    walkingEnv: Int
    basketball: Int
    playground: Int
    greenPlant: Int
    streetLighting: Int
  }

  input EnvInfoInput{
    camera: Int
    walkingEnv: Int
    basketball: Int
    playground: Int
    greenPlant: Int
    streetLighting: Int
  }

  type Common{
    district: String
    Khoroo: String
    locationValue: Location
  }

  input CommonInput{
    district: String
    Khoroo: String
    locationValue: LocationInput
  }

  type DistrictTown{
    averagePrice: String
    averageM2: Int
    population: Int
    averageAge: Int
    publicService: String
    featuredAds: String
    market: String
  }

  input DistrictTownInput{
    averagePrice: String
    averageM2: Int
    population: Int
    averageAge: Int
    publicService: String
    featuredAds: String
    market: String
  }

  type NeighborItem {
    _id: String
    name: String
    type: String
    schoolData: School
    kindergardenData: School
    universityData: University
    sohData: Soh
    khorooData: Khoroo
    envInfoData: EnvInfo
    commonData: Common
    districtTownData: DistrictTown
  }
`

const neighborItemParams = `
_id: String
name: String
type: String
schoolData: SchoolInput
kindergardenData: SchoolInput
universityData: UniversityInput
sohData: SohInput
khorooData: KhorooInput
envInfoData: EnvInfoInput
commonData: CommonInput
districtTownData: DistrictTownInput
`

export const queries = `
  getNeighborItems(type:String): [NeighborItem]
`
export const mutations = `
  neighborAdd(neighbor: NeighborInput): Neighbor
  neighborEdit(neighbor: NeighborInput): Neighbor
  neighborRemove(neighbor: NeighborInput): Neighbor
  neighborItemCreate(${neighborItemParams}): NeighborItem
  neighborItemEdit(${neighborItemParams}): NeighborItem
  neighborItemRemove(_id:String): NeighborItem
`