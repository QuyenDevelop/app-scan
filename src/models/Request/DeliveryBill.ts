export interface GetAllDeliveryBillRequest {
  RequireTotalCount: boolean;
  Skip: number;
  Take: number;
  PageIndex: number;
  PageSize: number;
  PostOfficeId: string;
  Status?: number | null;
  PickedBy: string;
}

export interface Root {
  startDatePick: string;
  endDatePick: string;
  pickedBy: string;
  pickedByUserName: string;
  deliveryBillIds: string[];
}
export interface GetDeliveryBillDetailRequest {
  deliveryBillId: string;
}

export interface PickShipment {
  subShipmentNumber: string;
  locationName: string;
  deliveryBillId: string;
}
