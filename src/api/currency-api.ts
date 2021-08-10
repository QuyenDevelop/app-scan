import { CurrenciesResponse } from "@models";
import { BaseApi } from "./base-api";

class CurrencyApi extends BaseApi {
  getAll() {
    return this.get<CurrenciesResponse>("get-all", {});
  }
}

export default new CurrencyApi("currency");
