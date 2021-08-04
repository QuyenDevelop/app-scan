import { store } from "@redux";
import {
  ListShipmentModeResponse,
  ListShipmentServiceResponse,
} from "src/models/Response/ServiceResponse";
import { IRootState } from "../redux/reducers";
import { BaseApi } from "./base-api";

class ServiceApi extends BaseApi {
  state = store.getState() as IRootState;

  getAll() {
    return this.get<ListShipmentServiceResponse>("get-all", {});
  }

  getModes() {
    return this.get<ListShipmentModeResponse>("get-modes", {});
  }
}

export default new ServiceApi("cargospservice");
