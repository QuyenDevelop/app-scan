import { BaseResponseEntity } from "@models";

export interface ShipmentResponse {
  ShipmentId: string;
  ShipmentNumber: string;
  ReferenceNumber: string;
  CustomerId: string;
  CustomerCode: string;
  CustomerName: string;
  ShipperName: string;
  ConsigneeName: string;
  ConsigneeAddress1: string;
  ConsigneeAddress2: string;
  ConsigneeCountryText: string;
  ConsigneeDistrictText: string;
  ConsigneePhoneNumber: string;
  ConsigneeWardText: string;
  CargoSPServiceId: string;
  CargoSPServiceCode: string;
  CargoShippingMethod: number;
  CargoShippingMethodText: string;
  Status: number;
  IsDirectShipment: boolean;
  WaitingProcessed: boolean;
  COD: boolean;
  TotalGrossWeight: number;
  TotalVolumetricWeight: number;
  TotalChargeableWeight: number;
  CurrencyId: string;
  CurrencyCode: string;
  CODAmount: number;
  CODAmoutPay: number;
}

export interface SubShipment {
  ShipmentId?: string;
  WarehouseLocationId?: null;
  Length: number;
  Width: number;
  Height: number;
  TotalGrossWeight: number;
  Status?: number;
  CreatedDate?: string;
  CreatedBy?: string;
  SubShipmentNumber?: string;
  ReferenceNumber?: string;
  OrderNumber?: string;
  LocationName?: string;
  TotalChargeableWeight?: number;
  TotalChargeableWeightRound?: number;
  Id?: string;
}

export interface ShipmentItemResponse {
  ShipmentId: string;
  CommodityGroupId: string;
  CommodityGroupCode: string;
  CommodityId: string;
  CommodityCode: string;
  CommodityText: string;
  ProductCode: string;
  ProductName: string;
  HSCode: null;
  SKU: null;
  CountryOfOriginId: string;
  CountryOfOriginCode: string;
  CountryOfOriginText: string;
  TotalGrossWeight: number;
  Length: null;
  Width: null;
  Height: null;
  MeasureDimensionId: string;
  MeasureDimensionCode: string;
  VolumetricDivisor: null;
  VolumetricWeight: null;
  MeasureWeightId: string;
  MeasureWeightCode: string;
  Quantity: number;
  QuantityUnitId: string;
  QuantityUnitCode: string;
  Price: number;
  TotalAmount: number;
  DeclaredCustomsValue: number;
  TotalDeclaredCustomsValue: number;
  ExchangeRate: number;
  PriceUsd: null;
  TotalAmountUsd: null;
  DeclaredCustomsValueUsd: null;
  TotalDeclaredCustomsValueUsd: null;
  CurrencyId: string;
  CurrencyCode: string;
  Note: null;
  Description: null;
  OriginDescription: null;
  OriginCommodityText: null;
  OriginProductName: null;
  Shipment: null;
  Commodity: null;
  CommodityGroup: null;
  CountryOfOrigin: null;
  MeasureDimension: null;
  MeasureWeight: null;
  Currency: null;
  QuantityUnit: null;
  Images: [];
  Id: string;
  CustomProperties: {};
}

export interface ShipmentAddServiceResponse {
  ShipmentId: string;
  ShipmentNumber: string;
  CargoAddServiceId: string;
  CargoAddServiceCode: string;
  CargoAddServiceName: null;
  IsProcessed: boolean;
  IsSendEmail: boolean;
  ProcessedBy: null;
  SendEmailBy: null;
  ProcessedOnUtc: null;
  SendEmailOnUtc: null;
  CreatedOnUtc: null;
  UpdatedOnUtc: null;
  Images: [];
  CargoAddService: null;
  Id: string;
  CustomProperties: {};
}

export interface ScanShipmentResponse
  extends BaseResponseEntity<Array<ShipmentResponse>> {}

export interface ShipmentDetail {
  ShipmentCargoAddServices: Array<ShipmentAddServiceResponse>;
  SubShipments: Array<SubShipment>;
  ShipmentItems: Array<ShipmentItemResponse>;
}

export interface ShipmentDetailResponse
  extends BaseResponseEntity<ShipmentDetail> {}

export interface ShipmentCODResponse {
  Id: string;
  CustomerId: string;
  CustomerCode: string;
  CustomerName: string;
  CurrencyId: string;
  CurrencyCode: string;
  COD: false;
  CODAmount: number;
  CODAmountPay: number;
  shipments: Array<ShipmentItemCodResponse>;
}

export interface ShipmentItemCodResponse {
  ShipmentId: string;
  ShipmentNumber: string;
  ReferenceNumber: string;
  CustomerId: string;
  CustomerCode: string;
  CustomerName: string;
  CurrencyId: string;
  CurrencyCode: string;
  ShipperName: string;
  ConsigneeName: string;
  ConsigneeAddress1: string;
  ConsigneeAddress2: string;
  ConsigneeCountryText: string;
  ConsigneeDistrictText: string;
  ConsigneePhoneNumber: string;
  ConsigneeWardText: string;
  CargoSPServiceId: string;
  CargoSPServiceCode: string;
  CargoShippingMethod: number;
  CargoShippingMethodText: string;
  Status: number;
  IsDirectShipment: boolean;
  WaitingProcessed: boolean;
  TotalGrossWeight: number;
  TotalVolumetricWeight: number;
  TotalChargeableWeight: number;
  COD: boolean;
  CODAmount: number;
  CODAmoutPay: number;
}
export interface ScanShipmentCODResponse
  extends BaseResponseEntity<ShipmentCODResponse> {}
