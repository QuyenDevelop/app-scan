export interface GetAllDeliveryBillRequest {
  RequireTotalCount: boolean;
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

export interface AssignPickedRequest {
  startDatePick: Date | null;
  endDatePick: Date | null;
  pickedBy: string;
  pickedByUserName: string;
  deliveryBillIds: string[];
  hasComplain: boolean;
  note: string;
}
