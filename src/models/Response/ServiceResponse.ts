import { BaseResponseEntity, ImagesAddService } from "@models";

export interface ServiceShipmentResponse {
  Code: string;
  Name: string;
  Note: string;
  Active: boolean;
  DisplayOrder: number;
  IsDefault: boolean;
  VolumetricDivisor: number;
  Id: string;
  EntityCacheKey: string;
}

export interface AddServiceShipmentResponse {
  Code: string;
  Name: string;
  Note: string;
  IsRequiredImage: boolean;
  Active: boolean;
  DisplayOrder: number;
  PostOfficeMasterDatas: Array<PostOfficeMasterData>;
  Id: string;
  EntityCacheKey: string;
  IsProcessed?: boolean;
  imagesCargoAddServices: Array<ImagesAddService>;
}

export interface PostOfficeMasterData {
  EntityType: number;
  EntityId: string;
  PostOfficeId: string;
  AllowAccess: boolean;
  Id: string;
  EntityCacheKey: string;
}

export interface ListShipmentServiceResponse
  extends BaseResponseEntity<Array<ServiceShipmentResponse>> {}

export interface ListAddShipmentServiceResponse
  extends BaseResponseEntity<Array<AddServiceShipmentResponse>> {}

export interface ModeShipmentResponse {
  Code: number;
  Name: string;
}

export interface ListShipmentModeResponse
  extends BaseResponseEntity<Array<ModeShipmentResponse>> {}
