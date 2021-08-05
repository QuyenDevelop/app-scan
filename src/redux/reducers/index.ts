import { combineReducers } from "redux";
import {
  accountReducer,
  defaultState as accountDefaultState,
  IUserState,
} from "./AccountReducer";
import {
  defaultState as uploadImageDefaultState,
  IUploadImage,
  uploadImageReducer,
} from "./UploadImageReducer";

export interface IRootState {
  account: IUserState;
  uploadImage: IUploadImage;
}

export const RootStateDefault: IRootState = {
  account: accountDefaultState,
  uploadImage: uploadImageDefaultState,
};

const reducers = combineReducers<IRootState>({
  account: accountReducer,
  uploadImage: uploadImageReducer,
});

export default reducers;
export * from "./UploadImageReducer";
