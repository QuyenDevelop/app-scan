// import { DataConstant, dataWebsiteShoppingDefault } from "@configs";
import {
  AddServiceShipmentResponse,
  CurrencyResponse,
  CustomerResponse,
  LocationResponse,
  ModeShipmentResponse,
  ServiceShipmentResponse,
  ShipmentStatusResponse,
} from "@models";
import produce from "immer";
import { Reducer } from "redux";
import {
  createActionTypeOnSuccess,
  UnfoldSagaActionType,
} from "redux-unfold-saga";
import { AccountActionType, ShipmentInfoActionType } from "../types";

export interface IShipmentInfo {
  shipmentServices: Array<ServiceShipmentResponse>;
  shippingMethods: Array<ModeShipmentResponse>;
  shipmentAddServices: Array<AddServiceShipmentResponse>;
  shipmentCustomers: Array<CustomerResponse>;
  shipmentCurrencies: Array<CurrencyResponse>;
  shipmentStatus: Array<ShipmentStatusResponse>;
  shipmentLocations: Array<LocationResponse>;
}

export const defaultStateShipmentInfo: IShipmentInfo = {
  shipmentServices: [],
  shippingMethods: [],
  shipmentAddServices: [],
  shipmentCustomers: [],
  shipmentCurrencies: [],
  shipmentStatus: [],
  shipmentLocations: [],
};
export const shipmentInfoReducer: Reducer<IShipmentInfo, UnfoldSagaActionType> =
  (
    state = defaultStateShipmentInfo,
    action: UnfoldSagaActionType,
  ): IShipmentInfo => {
    const { type, payload } = action;
    return produce(state, (draftState: IShipmentInfo): void => {
      switch (type) {
        case createActionTypeOnSuccess(
          ShipmentInfoActionType.GET_ALL_SHIPMENT_SERVICE,
        ):
          draftState.shipmentServices = payload;
          break;
        case createActionTypeOnSuccess(
          ShipmentInfoActionType.GET_ALL_SHIPPING_METHOD,
        ):
          draftState.shippingMethods = payload;
          break;
        case createActionTypeOnSuccess(
          ShipmentInfoActionType.GET_ALL_SHIPMENT_ADD_SERVICE,
        ):
          draftState.shipmentAddServices = payload;
          break;
        case createActionTypeOnSuccess(ShipmentInfoActionType.GET_ALL_CUSTOMER):
          draftState.shipmentCustomers = payload;
          break;
        case createActionTypeOnSuccess(ShipmentInfoActionType.GET_ALL_CURRENCY):
          draftState.shipmentCurrencies = payload;
          break;
        case createActionTypeOnSuccess(
          ShipmentInfoActionType.GET_ALL_SHIPMENT_STATUS,
        ):
          draftState.shipmentStatus = payload;
          break;
        case createActionTypeOnSuccess(ShipmentInfoActionType.GET_ALL_LOCATION):
          draftState.shipmentLocations = payload;
          break;
        case createActionTypeOnSuccess(AccountActionType.LOGOUT):
          draftState.shipmentLocations = [];
          break;
        default:
          break;
      }
    });
  };
