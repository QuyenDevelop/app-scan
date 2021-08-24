import {
  AllShipmentStatusResponse,
  CompleteAddServiceRequest,
  DashboardsResponse,
  DeleteSubShipmentRequest,
  GetDashboardsRequest,
  LocationsResponse,
  ScanShipmentCODResponse,
  ScanShipmentResponse,
  ShipmentDetailResponse,
  ShipmentInfoRequest,
  UpdateAddServiceRequest,
  UpdateCodShipmentRequest,
  UpdateDirectShipmentRequest,
} from "@models";
import { BaseApi } from "./base-api";

class ShipmentApi extends BaseApi {
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

  getDetailShipment({
    shipmentId,
    option,
  }: {
    shipmentId: string;
    option: number;
  }) {
    return this.get<ShipmentDetailResponse>("get-detail-part-of-shipment", {
      ShipmentId: shipmentId,
      Option: option, // option: 1.  ShipmentCargoAddServices, 2. SubShipments, 3. ShipmentItems
    });
  }

  scanShipmentCOD(value: string) {
    return this.get<ScanShipmentCODResponse>("scan-shipment-by-cod", {
      keyword: value,
    });
  }

  updateCodShipment(request: UpdateCodShipmentRequest) {
    return this.post("update-cod-by-shipmentid", {}, request);
  }

  deleteImagesAddService(ImagesIds: Array<string>) {
    return this.post("delete-images-by-cargoraddservice", ImagesIds, {});
  }

  getAllShipmentStatus() {
    return this.get<AllShipmentStatusResponse>("get-status-shipment", {});
  }

  getLocations() {
    return this.get<LocationsResponse>("get-locations", {});
  }

  getDashboards(request: GetDashboardsRequest) {
    return this.get<DashboardsResponse>("gets-dashboard-mobile", request);
  }
}

export default new ShipmentApi("shipment");
