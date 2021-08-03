export interface ShipmentInfoRequest {
  id: string;
  cargoSPServiceId: string;
  cargoSPServiceCode: string;
  volumetricWeight: number;
  subShipments: Array<SubShipmentsInfoRequest>;
}

export interface SubShipmentsInfoRequest {
  id: string;
  totalGrossWeight: number;
  height: number;
  width: number;
  length: number;
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
