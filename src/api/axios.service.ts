import { authApi } from "@api";
import { CONSTANT } from "@configs";
import { Utils } from "@helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";
import i18n from "i18n-js";
import Base64 from "js-base64";
import { Platform } from "react-native";
import Config from "react-native-config";

const { CLIENT_ID, CLIENT_SECRET } = Config;

type PromiseQueueType = {
  resolve: Function;
  reject: Function;
};

class AxiosService {
  isRefreshing = false;
  failedQueue: PromiseQueueType[] = [];
  axiosInstance: AxiosInstance | undefined;

  constructor() {
    this.init();
    this.failedQueue = [];
  }

  init() {
    this.axiosInstance = axios.create();
    this.axiosInstance.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        const originalRequest = error.config;
        const self = this;
        if (error?.response?.status === 401 && !originalRequest?._retry) {
          if (self.isRefreshing) {
            return new Promise(function (resolve, reject) {
              self.failedQueue.push({ resolve, reject });
            })
              .then((res: any) => {
                originalRequest.headers.Authorization = `Bearer ${res?.access_token}`;
                return axios(originalRequest);
              })
              .catch(err => {
                return Promise.reject(err);
              });
          }

          originalRequest._retry = true;
          self.isRefreshing = true;
          const refresh_token = await AsyncStorage.getItem(
            CONSTANT.TOKEN_STORAGE_KEY.REFRESH_TOKEN,
          );
          if (refresh_token) {
            return new Promise((resolve, reject) => {
              authApi
                .refreshToken(refresh_token)
                ?.then(response => {
                  Utils.storeTokenResponse(response);
                  originalRequest.headers.Authorization = `${
                    response.token_type || "Bearer"
                  } ${response?.access_token}`;
                  this.processQueue(
                    null,
                    response.token_type,
                    response.access_token,
                  );
                  resolve(self.axiosInstance?.(originalRequest));
                })
                .catch(err => {
                  this.processQueue(err);
                  reject(err);
                })
                .finally(() => {
                  self.isRefreshing = false;
                });
            });
          }
          return Promise.reject(error);
        }
        return Promise.reject(error);
      },
    );
    this.axiosInstance.interceptors.request.use(
      async request => {
        request.headers["Accept-Language"] =
          i18n.defaultLocale || CONSTANT.LANGUAGES.VI;
        request.headers["User-Agent"] = Platform.OS;
        const [access_token, token_type] = await Promise.all([
          AsyncStorage.getItem(CONSTANT.TOKEN_STORAGE_KEY.ACCESS_TOKEN),
          AsyncStorage.getItem(CONSTANT.TOKEN_STORAGE_KEY.TOKEN_TYPE),
        ]);
        if (access_token) {
          if (String(request.url).includes(CONSTANT.REVOKE_TOKEN_ENDPOINT)) {
            request.headers.Authorization = `Basic ${Base64.encode(
              CLIENT_ID + ":" + CLIENT_SECRET,
            )}`;
          } else {
            request.headers.Authorization = `${
              token_type || "Bearer"
            } ${access_token}`;
          }
        }
        return request;
      },
      error => Promise.reject(error),
    );
  }

  processQueue = (error: any, token_type?: string, access_token?: string) => {
    this.failedQueue.forEach(promise => {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve({
          token_type,
          access_token,
        });
      }
    });
    this.failedQueue = [];
  };

  setAxiosInstance(ichibaPostOfficeId: string, ichibaCurrencyCode: string) {
    this.axiosInstance?.interceptors.request.use(
      async request => {
        request.headers["IChiba-PostOffice-id"] = ichibaPostOfficeId;
        request.headers["IChiba-Currency-Code"] = ichibaCurrencyCode;

        return request;
      },
      error => Promise.reject(error),
    );
  }

  getAxiosInstance(): AxiosInstance | undefined {
    return this.axiosInstance;
  }
}

export default new AxiosService();
