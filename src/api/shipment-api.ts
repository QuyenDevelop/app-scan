import {
  CompleteAddServiceRequest,
  DeleteSubShipmentRequest,
  ScanShipmentResponse,
  ShipmentInfoRequest,
  UpdateAddServiceRequest,
  UpdateDirectShipmentRequest,
} from "@models";
import { store } from "@redux";
import { IRootState } from "../redux/reducers";
import { BaseApi } from "./base-api";

class ShipmentApi extends BaseApi {
  state = store.getState() as IRootState;
  // region Amazo
  scanShipment(value: string) {
    return this.get<ScanShipmentResponse>("scan-shipment", { keyword: value });
  }

  uploadImage(data: FormData) {
    return this.post("upload-image-cargoraddservice", data, {});
  }

  updateShipmentInformation(request: ShipmentInfoRequest) {
    return this.post("update-shipment-by-service-on-mobile", request, {});
  }

  updateAddService(request: UpdateAddServiceRequest) {
    return this.post("upload-cargoraddservices", request, {});
  }

  deleteSubShipment(request: DeleteSubShipmentRequest) {
    return this.post("delete-subshipment-mobile", {}, request);
  }

  completeProcessAddService(request: CompleteAddServiceRequest) {
    return this.post("upload-item-cargoraddservice", request, {});
  }

  updateDirectShipment(request: UpdateDirectShipmentRequest) {
    return this.post("upload-isdirectshipment-mobile", {}, request);
  }
}

export default new ShipmentApi("shipment");
