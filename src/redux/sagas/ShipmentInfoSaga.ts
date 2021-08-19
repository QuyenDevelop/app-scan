import {
  addServiceApi,
  currencyApi,
  serviceApi,
  shipmentApi,
  spCustomerApi,
} from "@api";
import {
  AddServiceShipmentResponse,
  CurrencyResponse,
  CustomerResponse,
  ModeShipmentResponse,
  ServiceShipmentResponse,
  ShipmentStatusResponse,
} from "@models";
import { SagaIterator } from "redux-saga";
import { takeLatest } from "redux-saga/effects";
import { unfoldSaga, UnfoldSagaActionType } from "redux-unfold-saga";
import { ShipmentInfoActionType } from "../types";

// const { GOOGLE_CLIENT_ID } = Config;

export function* takeGetAllShipmentServices({
  callbacks,
  type,
}: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<Array<ServiceShipmentResponse> | []> => {
        const data = await serviceApi.getAll();
        return data?.data || [];
      },
      key: type,
    },
    callbacks,
  );
}

export function* takeGetAllShippingMethod({
  callbacks,
  type,
}: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<Array<ModeShipmentResponse> | []> => {
        const data = await serviceApi.getModes();
        return data?.data || [];
      },
      key: type,
    },
    callbacks,
  );
}

export function* takeGetAllShipmentAddServices({
  callbacks,
  type,
}: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<Array<AddServiceShipmentResponse> | []> => {
        const data = await addServiceApi.getAll();
        return data?.data || [];
      },
      key: type,
    },
    callbacks,
  );
}

export function* takeGetAllCustomer({
  callbacks,
  type,
}: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<Array<CustomerResponse> | []> => {
        const data = await spCustomerApi.getAll();
        return data?.data || [];
      },
      key: type,
    },
    callbacks,
  );
}

export function* takeGetAllCurrency({
  callbacks,
  type,
}: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<Array<CurrencyResponse> | []> => {
        const data = await currencyApi.getAll();
        return data?.data || [];
      },
      key: type,
    },
    callbacks,
  );
}

export function* takeGetAllShipmentStatus({
  callbacks,
  type,
}: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<Array<ShipmentStatusResponse> | []> => {
        const data = await shipmentApi.getAllShipmentStatus();
        return data?.data || [];
      },
      key: type,
    },
    callbacks,
  );
}

export default function* shipmentInfoSaga(): SagaIterator {
  yield takeLatest(
    ShipmentInfoActionType.GET_ALL_SHIPMENT_SERVICE,
    takeGetAllShipmentServices,
  );
  yield takeLatest(
    ShipmentInfoActionType.GET_ALL_SHIPPING_METHOD,
    takeGetAllShippingMethod,
  );
  yield takeLatest(
    ShipmentInfoActionType.GET_ALL_SHIPMENT_ADD_SERVICE,
    takeGetAllShipmentAddServices,
  );
  yield takeLatest(ShipmentInfoActionType.GET_ALL_CUSTOMER, takeGetAllCustomer);
  yield takeLatest(ShipmentInfoActionType.GET_ALL_CURRENCY, takeGetAllCurrency);
  yield takeLatest(
    ShipmentInfoActionType.GET_ALL_SHIPMENT_STATUS,
    takeGetAllShipmentStatus,
  );
}
