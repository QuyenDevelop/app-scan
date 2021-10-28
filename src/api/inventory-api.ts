import {
  ConfirmAllStillRequest,
  ConfirmProcessedLocationRequest,
  ScanInventoryRequest,
  ScanLocationRequest,
} from "@models";
import { BaseApi } from "./base-api";

class InventoryApi extends BaseApi {
  scanLocation(request: ScanLocationRequest) {
    return this.post("scan-location", request, {});
  }

  confirmAllStill(request: ConfirmAllStillRequest) {
    return this.post("confirm-all-still", request, {});
  }

  confirmProcessedLocation(request: ConfirmProcessedLocationRequest) {
    return this.post("confirm-processed-location", request, {});
  }

  scanInventory(request: ScanInventoryRequest) {
    return this.post("scan-inventory", request, {});
  }
}

export default new InventoryApi("inventory-detail");
