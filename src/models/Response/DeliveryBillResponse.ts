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
  ConsigneeAddress: string;
  ConsigneeEmail: string;
  ConsigneeName: string;
  ConsigneePhone: any;
  CreatedOnUtc: string;
  Criteria: Criteria;
  CustomerCode: string;
  CustomerId: string;
  CustomerName: string;
  EndDatePacked: any;
  EndDatePick: any;
  Id: string;
  IsOrderDeliveryBill: boolean;
  IsTransferData: boolean;
  IssueType: number;
  Note: string;
  PackedBy: string;
  PackedByUserName: string;
  PickedBy: string;
  PickedByUserName: string;
  PostOfficeCode: string;
  PostOfficeId: string;
  ProcessStatus: string;
  ProcessStatusText: string;
  ProcessedByUsername: string;
  ProcessedOnUtc: string;
  RefNo: string;
  SPPartnerCode: any;
  SPPartnerId: any;
  ShipmentDestinationItems: any;
  ShipmentNumberSource: string[];
  ShipmentNumberSourceIds: string[];
  ShipmentPickedItems: any[];
  ShipmentSourceItems: ShipmentSourceItem[];
  StartDatePacked: string;
  StartDatePick: string;
  Type: number;
  TypeText: string;
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
  CargoShippingMethod: number;
  CargoShippingMethodText: string;
  CargoSpServiceId: string;
  CargoSpServiceName: string;
  CargoType: number;
  CargoTypeText: string;
  CommodityNames: any[];
  ConsigneeName: string;
  CustomerCode: string;
  CustomerName: string;
  Id: string;
  IsPicked: boolean | null;
  IsProcessedCargoService: boolean;
  LastLocation: string | null;
  LocationName: string | null;
  LocationNames: any[];
  ProductNames: any;
  ReferenceNumber: string;
  ShipmentNumber: string;
  Status: number;
  StatusText: string;
  TotalWeight: number;
}

export interface Errors {}
