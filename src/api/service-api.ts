import { store } from "@redux";
import { ListShipmentServiceResponse } from "src/models/Response/ServiceResponse";
import { IRootState } from "../redux/reducers";
import { BaseApi } from "./base-api";

class ServiceApi extends BaseApi {
  state = store.getState() as IRootState;

  getAll() {
    return this.get<ListShipmentServiceResponse>("get-all", {});
  }
}

export default new ServiceApi("cargospservice");
