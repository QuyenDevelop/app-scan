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
  }, [dispatch, shipmentInfo.shipmentServices.length]);

  useEffect(() => {
    if (shipmentInfo.shippingMethods.length === 0) {
      dispatch(ShipmentInfoAction.getAllShippingMethod());
    }
  }, [dispatch, shipmentInfo.shippingMethods.length]);

  useEffect(() => {
    if (shipmentInfo.shipmentAddServices.length === 0) {
      dispatch(ShipmentInfoAction.getAllShipmentAddService());
    }
  }, [dispatch, shipmentInfo.shipmentAddServices.length]);

  useEffect(() => {
    if (shipmentInfo.shipmentCustomers.length === 0) {
      dispatch(ShipmentInfoAction.getAllCustomer());
    }
  }, [dispatch, shipmentInfo.shipmentCustomers.length]);

  useEffect(() => {
    if (shipmentInfo.shipmentCurrencies.length === 0) {
      dispatch(ShipmentInfoAction.getAllCurrency());
    }
  }, [dispatch, shipmentInfo.shipmentCurrencies.length]);

  useEffect(() => {
    if (shipmentInfo.shipmentStatus.length === 0) {
      dispatch(ShipmentInfoAction.getAllShipmentStatus());
    }
  }, [dispatch, shipmentInfo.shipmentStatus.length]);

  useEffect(() => {
    if (shipmentInfo.shipmentLocations.length === 0) {
      dispatch(ShipmentInfoAction.getAllLocation());
    }
  }, [dispatch, shipmentInfo.shipmentLocations.length]);
}
