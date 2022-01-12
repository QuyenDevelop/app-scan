import { BaseApi } from "./base-api";

class UploadApi extends BaseApi {
  uploadImage(data: FormData) {
    return this.postCdn("upload-images", data, {});
  }
}
export default new UploadApi("upload-file");
