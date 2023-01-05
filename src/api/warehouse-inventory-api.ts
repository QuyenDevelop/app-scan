import {
  WarehouseInventoryAddRequest,
  WarehouseInventorySearchRequest,
} from "@models";
import { BaseApi } from "./base-api";

class WarehouseInventoryApi extends BaseApi {
  createWarehouseInventory(request: WarehouseInventoryAddRequest) {
    return this.post("create-warehouse-inventory", request, {});
  }

  getRequestInventory(request: WarehouseInventorySearchRequest) {
    return this.post("search", request, {});
  }
}

export default new WarehouseInventoryApi("warehouse-inventory");
