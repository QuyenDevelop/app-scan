export interface GetAllDeliveryBillRequest {
  RequireTotalCount: boolean;
  Skip: number;
  Take: number;
  PageIndex: number;
  PageSize: number;
  PostOfficeId: string;
}
