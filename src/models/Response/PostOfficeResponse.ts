export interface PostOfficeResponse {
  success: boolean;
  message: string;
  IChiba_PostOffice_Id: string;
  IChiba_Currency_Code: string;
  data: Array<PostOfficeItemResponse>;
}

export interface PostOfficeItemResponse {
  Code: string;
  Id: string;
  IsPrimary: boolean;
  LocalName: string;
  Name: string;
}
