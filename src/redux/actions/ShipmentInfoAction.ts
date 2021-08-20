import { createAction } from "redux-unfold-saga";
import { ShipmentInfoActionType } from "../types";

export default {
  getAllShipmentService: createAction(
    ShipmentInfoActionType.GET_ALL_SHIPMENT_SERVICE,
  ),
  getAllShippingMethod: createAction(
    ShipmentInfoActionType.GET_ALL_SHIPPING_METHOD,
  ),
  getAllShipmentAddService: createAction(
    ShipmentInfoActionType.GET_ALL_SHIPMENT_ADD_SERVICE,
  ),
  getAllCustomer: createAction(ShipmentInfoActionType.GET_ALL_CUSTOMER),
  getAllCurrency: createAction(ShipmentInfoActionType.GET_ALL_CURRENCY),
  getAllShipmentStatus: createAction(
    ShipmentInfoActionType.GET_ALL_SHIPMENT_STATUS,
  ),
  getAllLocation: createAction(ShipmentInfoActionType.GET_ALL_LOCATION),
};
