export interface DeliveryBillResponse {
  success: boolean;
  code: any;
  httpStatusCode: number;
  title: any;
  message: any;
  data: Data;
  errors: Errors;
}

export interface Data {
  data: DeliveryBillItemResponse[];
  totalCount: number;
}

export interface DeliveryBillItemResponse {
  ShipmentDestinationItems: any;
  Criteria: Criteria;
  ProcessedOnUtc: any;
  ProcessedByUsername: any;
  IsOrderDeliveryBill: boolean;
  SPPartnerCode: any;
  SPPartnerId: any;
  ConsigneeAddress: any;
  ConsigneePhone: any;
  ConsigneeEmail: any;
  ConsigneeName?: string;
  PickedBy?: string;
  PickedByUserName?: string;
  StartDatePick?: string;
  EndDatePick?: string;
  PackedBy?: string;
  PackedByUserName?: string;
  StartDatePacked?: string;
  EndDatePacked?: string;
  Id: string;
  PostOfficeId: string;
  PostOfficeCode: string;
  CustomerId: string;
  CustomerCode: string;
  CustomerName: string;
  Type: number;
  TypeText: string;
  RefNo: string;
  Note: any;
  ProcessStatus?: string;
  ProcessStatusText?: string;
  IsTransferData: boolean;
  CreatedOnUtc: string;
  ShipmentNumberSource: string[];
  ShipmentNumberSourceIds: string[];
  IssueType: number;
  ShipmentSourceItems: ShipmentSourceItem[];
}

export interface Criteria {
  From: number;
  ReferenceNumber: any;
  Method: number;
  ShipmentProcessType: any;
  SplitCondition: any;
  MergeCondition: any;
}

export interface ShipmentSourceItem {
  Id: string;
  ShipmentNumber: string;
  ReferenceNumber: string;
  LocationNames: string | undefined[];
  CargoSpServiceId: string;
  CargoSpServiceName: string;
  CustomerCode: string;
  CustomerName: string;
  CargoShippingMethod: number;
  CargoShippingMethodText: string;
  CargoType: number;
  CargoTypeText: string;
  Status: number;
  StatusText: string;
  IsProcessedCargoService: boolean;
  ConsigneeName: string;
  CommodityNames: string[];
  ProductNames: any;
}

export interface Errors {}
