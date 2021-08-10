import { combineReducers } from "redux";
import {
  accountReducer,
  defaultState as accountDefaultState,
  IUserState,
} from "./AccountReducer";
import {
  defaultState as shipmentInfoDefaultState,
  IShipmentInfo,
  shipmentInfoReducer,
} from "./ShipmentInfoReducer";
import {
  defaultState as uploadImageDefaultState,
  IUploadImage,
  uploadImageReducer,
} from "./UploadImageReducer";

export interface IRootState {
  account: IUserState;
  uploadImage: IUploadImage;
  shipmentInfo: IShipmentInfo;
}

export const RootStateDefault: IRootState = {
  account: accountDefaultState,
  uploadImage: uploadImageDefaultState,
  shipmentInfo: shipmentInfoDefaultState,
};

const reducers = combineReducers<IRootState>({
  account: accountReducer,
  uploadImage: uploadImageReducer,
  shipmentInfo: shipmentInfoReducer,
});

export default reducers;
export * from "./UploadImageReducer";
