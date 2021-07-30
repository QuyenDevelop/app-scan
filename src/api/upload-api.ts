import { BaseApi } from "./base-api";

class UploadApi extends BaseApi {
  uploadImage(data: FormData) {
    return this.post("upload", data, {});
  }
}

export default new UploadApi("upload-file");
