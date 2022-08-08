import {
  AssignPickedRequest,
  DeliveryBillResponse,
  GetAllDeliveryBillRequest,
  GetDeliveryBillDetailRequest,
  PickShipment,
} from "@models";
import { BaseApi } from "./base-api";

class DeliveryBillApi extends BaseApi {
  getDeliveryBill(request: GetAllDeliveryBillRequest) {
    // console.log("🚀🚀🚀 => getDeliveryBill => request", request);
    return this.get<DeliveryBillResponse>("search", {
      RequireTotalCount: request.RequireTotalCount,
      Skip: request.Skip,
      Take: request.Take,
      PageSize: request.PageSize,
      PageIndex: request.PageIndex,
      PostOfficeId: request.PostOfficeId,
      Status: request.Status,
      PickedBy: request.PickedBy,
    });
  }
  assignPickDeliveryBill(request: AssignPickedRequest) {
    return this.post("assign-pick-delivery-bill", request, {});
  }
  getDeliveryBillDetail(request: GetDeliveryBillDetailRequest) {
    // console.log("🚀🚀🚀 => getDeliveryBillDetail => ", request);
    return this.post(
      `get-delivery-bill-byId?deliveryBillId=${request.deliveryBillId}`,
      {},
      {},
    );
  }
  pickShipment(request: PickShipment) {
    // console.log("🚀🚀🚀 => pickShipment => request", request);
    return this.post("scan-pick-shipment", request, {});
  }
}

export default new DeliveryBillApi("delivery-bill");
