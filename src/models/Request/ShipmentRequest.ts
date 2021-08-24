export interface ShipmentInfoRequest {
  id: string;
  shipmentNumber: string;
  referenceNumber: string;
  cargoSPServiceId: string;
  cargoSPServiceCode: string;
  volumetricWeight: number;
  cargoShippingMethod: number;
  cargoShippingMethodText: string;
  subShipments: Array<SubShipmentsInfoRequest>;
}

export interface SubShipmentsInfoRequest {
  id?: string;
  totalGrossWeight: number;
  height: number;
  width: number;
  length: number;
  locationName?: string;
}

export interface UpdateAddServiceRequest {
  shipmentId: string;
  shipmentNumber: string;
  shipmentCargoAddServiceViewModels: Array<AddServiceInfo>;
}

export interface AddServiceInfo {
  shipmentCargorAddServiceId: string;
  shipmentCargorAddServiceCode: string;
}

export interface DeleteSubShipmentRequest {
  SubShipmentId: string;
  ShipmentId: string;
}

export interface CompleteAddServiceRequest {
  shipmentId: string;
  shipmentNumber: string;
  cargorAddServiceId: string;
  cargorAddServiceCode: string;
}

export interface UpdateDirectShipmentRequest {
  ShipmentId: string;
  IsDirectShipment: boolean;
}

export interface UpdateCodShipmentRequest {
  ShipmentId: string;
  CODAmountPay: number;
  RefId: string;
}

export interface GetDashboardsRequest {
  startDate?: string;
  endDate?: string;
  pendingShipment: boolean;
  status: number;
  keywords: string;
  pageIndex: number;
  pageSize: number;
  postOfficeToSendId: string;
  customerId: string;
}
