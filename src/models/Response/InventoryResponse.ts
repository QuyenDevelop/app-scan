export interface InventoryDetailTempPoco {}

export interface RequestInventoryResponse {
  Code: string;
  CreatedBy: string;
  CreatedByName: string;
  CreatedDateUtc: string;
  EntityCacheKey: string;
  FK_InventoryDetail_WarehouseInventory_BackReferences: string | null;
  Id: string;
  Name: string;
  Note: string;
  PostOfficeCode: null;
  PostOfficeId: string;
  Status: 0;
  StatusText: string;
}
