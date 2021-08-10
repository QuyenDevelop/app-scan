import { BaseResponseEntity } from "@models";

export interface CustomerResponse {
  Id: string;
  Name: string;
  Selected: boolean;
  Disabled: boolean;
  Code: string;
}

export interface CustomersResponse
  extends BaseResponseEntity<Array<CustomerResponse>> {}
