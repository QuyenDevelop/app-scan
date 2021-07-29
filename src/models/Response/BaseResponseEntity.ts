export interface BaseResponseEntity<T> {
  success: boolean;
  code: number | null;
  httpStatusCode: number;
  title: null;
  message: string | null;
  data: T;
  errors: any;
}
export interface BasePagingResponseEntity<T> extends BaseResponseEntity<T> {
  total: number;
  pageSize: number;
  pageIndex: number;
}
export interface Paging {
  pageSize: number;
  pageIndex: number;
}

export interface FilterConditions {
  queryParams: string;
  name: string;
  id: string;
  types: string;
}
export interface Dictionary<T> {
  [Key: string]: T;
}
