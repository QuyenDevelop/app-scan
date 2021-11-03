export interface ScanLocationRequest {
  LocationName: string;
  PostOfficeId: string;
  WarehouseInventoryId: string;
}

export interface ConfirmAllStillRequest {
  LocationName: string;
  PostOfficeId: string;
  WarehouseInventoryId: string;
}

export interface ConfirmProcessedLocationRequest {
  WarehouseInventoryId: string;
  LocationName: string;
  InventoryDetailTemps: InventoryDetailTemp[];
}

export interface InventoryDetailTemp {
  Id: string;
  ShipmentNumber: string;
  ReferenceNumber: string;
  DispatchBagName: string | null;
  DispatchBagNumber: string | null;
  PostOfficeToSendId: string;
  LocationName: string;
  LastLocationName: string;
  CustomerName: string;
  CustomerCode: string;
  ConsigneeCode: string;
  ConsigneeName: string;
  ShipperCode: string;
  ShipperName: string;
  TotalGrossWeight: number | null;
  TotalVolumetricWeight: number | null;
  TotalChargeableWeight: number | null;
  CargoSPServiceCode: string;
  AcceptedDate: string | null;
  AcceptBy: string;
  CreatedBy: string;
  CreatedByUserName: string;
  CreatedDateUtc: string | null;
  CodeInventory: string;
  WarehouseInventoryId: string;
  ExpectedPieces: number;
  Pieces: number;
  Status: number | null;
  StatusText: string;
  PositionTrue?: boolean;
}

export interface ScanInventoryRequest {
  numberCode: string;
  createdByUserName: string;
  createdBy: string;
  warehouseInventoryId: string;
  postOfficeId: string;
  locationName: string;
}

export interface WarehouseInventoryAddRequest {
  id: string;
  code: string;
  createdDateUtc: string | null;
  createdBy: string;
  createdByName: string;
  note: string;
  postOfficeId: string;
  status: number | null;
  statusText: string;
  name: string;
}

export interface WarehouseInventorySearchRequest {
  keyword?: string | null;
  postOfficeId: string;
  startDate?: string | null;
  endDate?: string | null;
  createdBy?: string | null;
  status: number | null;
  pageIndex: number;
  pageSize: number;
}
