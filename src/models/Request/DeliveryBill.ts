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

export interface AssignPickedRequest {
  DeliveryBillIds: string[];
  StartDatePick: Date;
  EndDatePick: Date | null;
}
export interface GetDeliveryBillDetailRequest {
  deliveryBillId: string;
}
