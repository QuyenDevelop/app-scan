import { CONSTANT } from "@configs";

export const AddServicePhotos = {
  name: CONSTANT.REALM_DB.ADD_SERVICE_PHOTO,
  properties: {
    _id: "int",
    shipment: "string",
    service: "string",
    photos: "data[]",
  },
  primaryKey: "_id",
};
