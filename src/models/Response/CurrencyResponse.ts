import { BaseResponseEntity } from "@models";

export interface CurrencyResponse {
  Name: string;
  CurrencyCode: string;
  Rate: number;
  DisplayLocale: string;
  CustomFormatting: null;
  Published: true;
  DisplayOrder: number;
  CreatedOnUtc: string;
  UpdatedOnUtc: string;
  BankAccounts: null;
  PayChargesTypes: null;
  RecvChargesTypes: null;
  SPBillings: null;
  Warehouses: null;
  Id: string;
  EntityCacheKey: string;
}

export interface CurrenciesResponse
  extends BaseResponseEntity<Array<CurrencyResponse>> {}
