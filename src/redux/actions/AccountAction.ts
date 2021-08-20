import { createAction } from "redux-unfold-saga";
import { AccountActionType } from "../types";

export default {
  commonConfig: createAction(AccountActionType.CHANGE_COMMON_CONFIG),
  login: createAction(AccountActionType.LOGIN),
  logout: createAction(AccountActionType.LOGOUT),
  changeLoading: createAction(AccountActionType.CHANGE_LOADING),
  userInfo: createAction(AccountActionType.GET_USER_INFO),
  externalLogin: createAction(AccountActionType.EXTERNAL_LOGIN),
  changeLanguageWithLaunch: createAction(
    AccountActionType.CHANGE_LANGUAGE_WITH_LAUNCH,
  ),
  changeCurrencyWithLaunch: createAction(
    AccountActionType.CHANGE_CURRENCY_WITH_LAUNCH,
  ),
  changeLanguage: createAction(AccountActionType.CHANGE_LANGUAGE),
};
