// import { DataConstant, dataWebsiteShoppingDefault } from "@configs";
import produce from "immer";
import { Reducer } from "redux";
import { UnfoldSagaActionType } from "redux-unfold-saga";
import { UploadImageType } from "../types";

export interface SavePhoto {
  name: string;
  uri: string;
}

export interface IUploadImage {
  images: Array<SavePhoto>;
}

export const defaultState: IUploadImage = {
  images: [],
};
export const uploadImageReducer: Reducer<IUploadImage, UnfoldSagaActionType> = (
  state = defaultState,
  action: UnfoldSagaActionType,
): IUploadImage => {
  const { type, payload } = action;
  return produce(state, (draftState: IUploadImage): void => {
    switch (type) {
      case UploadImageType.UPDATE_IMAGES:
        draftState.images = payload;
        break;
    }
  });
};
