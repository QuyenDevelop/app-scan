import { DeliveryBillResponse, GetAllDeliveryBillRequest } from "@models";
import { BaseApi } from "./base-api";

class DeliveryBillApi extends BaseApi {
  getDeliveryBill(request: GetAllDeliveryBillRequest) {
    return this.get<DeliveryBillResponse>("search", {
      RequireTotalCount: request.RequireTotalCount,
      Skip: request.Skip,
      Take: request.Take,
      PageSize: request.PageSize,
      PageIndex: request.PageIndex,
      PostOfficeId: request.PostOfficeId,
    });
  }
}

export default new DeliveryBillApi("delivery-bill");
