import { IRootState, IShipmentInfo, ShipmentInfoAction } from "@redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useShipmentInfo() {
  const dispatch = useDispatch();
  const shipmentInfo = useSelector(
    (state: IRootState) => state.shipmentInfo,
  ) as IShipmentInfo;

  useEffect(() => {
    if (shipmentInfo.shipmentServices.length === 0) {
      dispatch(ShipmentInfoAction.getAllShipmentService());
    }

    if (shipmentInfo.shippingMethods.length === 0) {
      dispatch(ShipmentInfoAction.getAllShippingMethod());
    }

    if (shipmentInfo.shipmentAddServices.length === 0) {
      dispatch(ShipmentInfoAction.getAllShipmentAddService());
    }
    if (shipmentInfo.shipmentCustomers.length === 0) {
      dispatch(ShipmentInfoAction.getAllCustomer());
    }

    if (shipmentInfo.shipmentCurrencies.length === 0) {
      dispatch(ShipmentInfoAction.getAllCurrency());
    }

    if (shipmentInfo.shipmentStatus.length === 0) {
      dispatch(ShipmentInfoAction.getAllShipmentStatus());
    }
  }, [
    dispatch,
    shipmentInfo.shipmentAddServices.length,
    shipmentInfo.shipmentCurrencies.length,
    shipmentInfo.shipmentCustomers.length,
    shipmentInfo.shipmentServices.length,
    shipmentInfo.shipmentStatus.length,
    shipmentInfo.shippingMethods.length,
  ]);
}
