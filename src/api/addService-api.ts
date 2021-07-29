import { store } from "@redux";
import { ListAddShipmentServiceResponse } from "src/models/Response/ServiceResponse";
import { IRootState } from "../redux/reducers";
import { BaseApi } from "./base-api";

class AddServiceApi extends BaseApi {
  state = store.getState() as IRootState;

  getAll() {
    return this.get<ListAddShipmentServiceResponse>("get-all", {});
  }
}

export default new AddServiceApi("cargoaddservice");
