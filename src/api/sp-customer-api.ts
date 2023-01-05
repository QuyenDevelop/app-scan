import { CustomersResponse } from "@models";
import { BaseApi } from "./base-api";

class SPCustomerApi extends BaseApi {
  getAll() {
    return this.get<CustomersResponse>("get-all", {});
  }
}

export default new SPCustomerApi("spcustomer");
