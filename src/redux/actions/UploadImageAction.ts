import { createAction } from "redux-unfold-saga";
import { UploadImageType } from "../types";

export default {
  updateImages: createAction(UploadImageType.UPDATE_IMAGES),
};
