import { PostOfficeResponse } from "@models";
import { BaseApi } from "./base-api";

class UserPostOfficeApi extends BaseApi {
  getPostOffice(userId: string) {
    return this.get<PostOfficeResponse>("get", { UserId: userId });
  }
}

export default new UserPostOfficeApi("user-post-office");
