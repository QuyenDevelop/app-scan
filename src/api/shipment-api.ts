import {
  ScanShipmentResponse,
  ShipmentInfoRequest,
  UpdateAddServiceRequest,
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
}

export default new ShipmentApi("shipment");
