import { UpdateAmountCodRequest } from "@models";
import { BaseApi } from "./base-api";

class PayCodApi extends BaseApi {
  updateAmountPay(request: UpdateAmountCodRequest) {
    return this.post("update-amountpay", request, {});
  }

  uploadImage(data: FormData) {
    return this.post("upload-image-cod", data, {});
  }
}

export default new PayCodApi("cod-payable");
