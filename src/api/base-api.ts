import { currentLanguage, translate } from "@shared";
import Config from "react-native-config";
import AxiosService from "./axios.service";
const { API_HOST, IDENTITY_HOST } = Config;

export class BaseApi {
  baseUrl?: string;
  apiHostUrl = `${API_HOST}`;
  identityApiHostUrl = `${IDENTITY_HOST}`;
  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl;
  }
  createDefaultHeader() {
    return {
      "Accept-Language": currentLanguage ?? "vi-VN",
    };
  }

  get<T>(
    uri: string,
    params: any,
    noPrefix = false,
  ): Promise<T | undefined> | undefined {
    const url = this.createUrl(uri, noPrefix);
    return AxiosService.getAxiosInstance()
      ?.get(url, {
        params,
      })
      .then(response => {
        return this.onSuccess<T>(response);
      })
      .catch(error => {
        return this.onFailed(error);
      });
  }

  post(uri: string, data: any, params: any, noPrefix = false) {
    const url = this.createUrl(uri, noPrefix);
    return AxiosService.getAxiosInstance()
      ?.post(url, data, {
        params,
        headers: this.createDefaultHeader(),
      })
      .then(response => response && response.data)
      .catch(error => {
        return this.onFailed(error);
      });
  }

  postCdn(uri: string, data: any, params: any, noPrefix = false) {
    const url = this.createUrl(uri, noPrefix);
    return AxiosService.getAxiosInstance()
      ?.post(url, data, {
        params,
        headers: {
          ...{
            "content-type": "multipart/form-data",
          },
          ...this.createDefaultHeader(),
        },
      })
      .then(response => response && response.data)
      .catch(error => {
        return this.onFailed(error);
      });
  }

  postUrlEncoded(uri: string, data: any, noPrefix = false) {
    const url = this.createUrl(uri, noPrefix);
    var qs = require("qs");
    return AxiosService.getAxiosInstance()
      ?.post(url, qs.stringify(data), {
        headers: {
          ...{ "content-type": "application/x-www-form-urlencoded" },
          ...this.createDefaultHeader(),
        },
      })
      .then((response: any) => response && response.data)
      .catch(error => {
        return this.onFailed(error);
      });
  }

  put(uri: string, data: any, params: any, noPrefix = false) {
    const url = this.createUrl(uri, noPrefix);
    return AxiosService.getAxiosInstance()
      ?.put(url, data, {
        params,
        headers: this.createDefaultHeader(),
      })
      .then(response => response && response.data)
      .catch(error => {
        return this.onFailed(error);
      });
  }

  delete(uri: string, data: any, params: any, noPrefix = false) {
    const url = this.createUrl(uri, noPrefix);
    return AxiosService.getAxiosInstance()?.({
      method: "delete",
      headers: this.createDefaultHeader(),
      url,
      data,
      params,
    })
      .then(response => response && response.data)
      .catch(error => {
        return this.onFailed(error);
      });
  }

  createUrl(uri: string, noPrefix: boolean = false) {
    let url = noPrefix ? uri : `${this.apiHostUrl}/${this.baseUrl}/${uri}`;
    return url;
  }

  onSuccess = <T>(response: any): T => {
    let ret = null;
    if (response?.status === 200) {
      ret = response.data;
    }
    return <T>ret;
  };

  onFailed = (error: any) => {
    if (error.response) {
      let errorMessage: any;
      const response = error && error.response;
      const data = response?.data;
      if (response != null && response.status === 401) {
        // navigate ve trang home
        return;
      } else {
        // const errorDescription = data && data.error_description;
        const errorDescription = data;
        if (errorDescription) {
          errorMessage = errorDescription;
        } else {
          errorMessage = data?.detail || translate("error.generic");
        }
        return Promise.reject(errorMessage);
      }
    }
    return Promise.reject(translate("error.generic"));
  };
}
