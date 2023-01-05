import {
  CustomerResponse,
  LocationResponse,
  ShipmentStatusResponse,
} from "@models";
import { IRootState } from "@redux";
import { createSelector } from "reselect";

export const getCustomersReducer = (state: IRootState) =>
  state.shipmentInfo.shipmentCustomers;
export const selectorCustomer = (filterValue: string) => {
  return createSelector(
    [getCustomersReducer],
    (customers: Array<CustomerResponse>) => {
      return customers.filter(c =>
        c.Name.trim().toLowerCase().includes(filterValue.trim().toLowerCase()),
      );
    },
  );
};

export const getAllStatusReducer = (state: IRootState) =>
  state.shipmentInfo.shipmentStatus;
export const selectorAllStatus = (filterValue: string) => {
  return createSelector(
    [getAllStatusReducer],
    (allStatus: Array<ShipmentStatusResponse>) => {
      return allStatus.filter(item =>
        item.Name.trim()
          .toLowerCase()
          .includes(filterValue.trim().toLowerCase()),
      );
    },
  );
};

export const getLocationReducer = (state: IRootState) =>
  state.shipmentInfo.shipmentLocations;
export const selectorLocation = (filterValue: string) => {
  return createSelector(
    [getLocationReducer],
    (Location: Array<LocationResponse>) => {
      return Location.filter(c =>
        c.Name.trim().toLowerCase().includes(filterValue.trim().toLowerCase()),
      );
    },
  );
};
