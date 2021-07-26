import { createAction } from "redux-unfold-saga";
import { AccountActionType } from "../types";

export default {
  commonConfig: createAction(AccountActionType.CHANGE_COMMON_CONFIG),
  login: createAction(AccountActionType.LOGIN),
  logout: createAction(AccountActionType.LOGOUT),
  changeLoading: createAction(AccountActionType.CHANGE_LOADING),
  userInfo: createAction(AccountActionType.GET_USER_INFO),
  externalLogin: createAction(AccountActionType.EXTERNAL_LOGIN),
};
