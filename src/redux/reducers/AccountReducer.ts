// import { DataConstant, dataWebsiteShoppingDefault } from "@configs";
import { Account, PostOfficeItemResponse } from "@models";
import produce from "immer";
import { Reducer } from "redux";
import {
  createActionTypeOnSuccess,
  UnfoldSagaActionType,
} from "redux-unfold-saga";
import { AccountActionType } from "../types";

export interface IUserState {
  profile: Account | null;
  language: string | null;
  // currency: string | null;
  // websiteShopping: PickerItemsResponse | null;
  loading: boolean;
  anonymousId: string | null;
  orderIds: string[];
  productIds: string[];
  selectedAddressId: number | null;
  existCard: boolean;
  numberFavoriteProduct: number;
  numberBidProduct: number;
  deviceId: string | null;
  postOffices: Array<PostOfficeItemResponse>;
}

export const defaultState: IUserState = {
  profile: null,
  anonymousId: null,
  language: null,
  // currency: DataConstant.DEFAULT_DATA_CURRENCIES,
  // websiteShopping: dataWebsiteShoppingDefault,
  loading: false,
  orderIds: [],
  productIds: [],
  selectedAddressId: null,
  existCard: false,
  numberFavoriteProduct: 0,
  numberBidProduct: 0,
  deviceId: null,
  postOffices: [],
};

export const accountReducer: Reducer<IUserState, UnfoldSagaActionType> = (
  state = defaultState,
  action: UnfoldSagaActionType,
): IUserState => {
  const { type, payload } = action;
  return produce(state, (draftState: IUserState): void => {
    switch (type) {
      case createActionTypeOnSuccess(AccountActionType.GET_POST_OFFICE):
        draftState.profile = payload.account;
        draftState.postOffices = payload.postOffices;
        break;
      case createActionTypeOnSuccess(AccountActionType.GET_USER_INFO):
        draftState.profile = payload.account;
        break;
      case createActionTypeOnSuccess(AccountActionType.LOGOUT):
        draftState.profile = null;
        break;
      case createActionTypeOnSuccess(AccountActionType.CHANGE_LANGUAGE):
        draftState.language = payload;
        break;
      case createActionTypeOnSuccess(
        AccountActionType.CHANGE_LANGUAGE_WITH_LAUNCH,
      ):
        draftState.language = payload;
        break;
      case createActionTypeOnSuccess(AccountActionType.CHANGE_LOADING):
        draftState.loading = payload;
        break;
      case createActionTypeOnSuccess(AccountActionType.CHANGE_ANONYMOUS):
        draftState.anonymousId = payload;
        break;
      case createActionTypeOnSuccess(AccountActionType.CHANGE_ORDER_IDS):
        draftState.orderIds = [...draftState.orderIds, ...payload];
        break;
      case createActionTypeOnSuccess(AccountActionType.CHANGE_PRODUCT_IDS):
        draftState.productIds = payload;
        break;
      case createActionTypeOnSuccess(AccountActionType.SET_SELECTED_ADDRESS_ID):
        draftState.selectedAddressId = payload;
        break;
      case createActionTypeOnSuccess(AccountActionType.CHECK_EXIST_CARD):
        draftState.existCard = payload;
        break;
      case createActionTypeOnSuccess(AccountActionType.CHANGE_FAVORITE_PRODUCT):
        draftState.numberFavoriteProduct = payload;
        break;
      case createActionTypeOnSuccess(AccountActionType.CHANGE_BID_PRODUCT):
        draftState.numberBidProduct = payload;
        break;
      case createActionTypeOnSuccess(AccountActionType.CHANGE_DEVICE_ID):
        draftState.deviceId = payload;
        break;
    }
  });
};
