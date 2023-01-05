import { authApi, userPostOfficeApi } from "@api";
import { CONSTANT } from "@configs";
import { setAsyncItem, Utils } from "@helpers";
import { Account, PostOfficeItemResponse } from "@models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onChangeLanguage } from "@shared";
import { AuthorizeResult } from "@types";
import CodePush from "react-native-code-push";
import { SagaIterator } from "redux-saga";
import { takeLatest } from "redux-saga/effects";
import { unfoldSaga, UnfoldSagaActionType } from "redux-unfold-saga";
import { AccountActionType } from "../types";

// const { GOOGLE_CLIENT_ID } = Config;

export function* takeLogin({
  callbacks,
  type,
  payload,
}: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<AuthorizeResult> => {
        const data = (await authApi.login(
          payload.email,
          payload.password,
        )) as AuthorizeResult;
        data && (await Utils.storeTokenResponse(data));
        return data;
      },
      key: type,
    },
    callbacks,
  );
}

export function* takeLogout({
  callbacks,
  type,
}: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<boolean> => {
        const [accessToken, refreshToken] = await Promise.all([
          AsyncStorage.getItem(CONSTANT.TOKEN_STORAGE_KEY.ACCESS_TOKEN),
          AsyncStorage.getItem(CONSTANT.TOKEN_STORAGE_KEY.REFRESH_TOKEN),
        ]);

        await Promise.all([
          authApi.revokeToken(accessToken),
          authApi.revokeToken(refreshToken),
        ]);

        await Promise.all([
          AsyncStorage.removeItem(CONSTANT.TOKEN_STORAGE_KEY.ACCESS_TOKEN),
          AsyncStorage.removeItem(CONSTANT.TOKEN_STORAGE_KEY.REFRESH_TOKEN),
          AsyncStorage.removeItem(
            CONSTANT.TOKEN_STORAGE_KEY.ICHIBA_POSTOFFICE_ID,
          ),
          AsyncStorage.removeItem(
            CONSTANT.TOKEN_STORAGE_KEY.ICHIBA_CURRENCY_CODE,
          ),
        ]);

        // GoogleSignin.configure({
        //   webClientId: GOOGLE_CLIENT_ID,
        //   offlineAccess: true,
        // });
        // await GoogleSignin.signOut();
        // LoginManager.logOut();
        return true;
      },
      key: type,
    },
    callbacks,
  );
}

export function* takeGetUserInfo({
  callbacks,
  type,
}: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<{
        account: Account | undefined;
      }> => {
        const data = await authApi.getUserInfo();
        return { account: data };
      },
      key: type,
    },
    callbacks,
  );
}

export function* takeGetPostOffices({
  callbacks,
  type,
  payload,
}: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<{
        account: Account | undefined;
        postOffices: Array<PostOfficeItemResponse>;
      }> => {
        const data = { ...payload.account };
        let postOffices: Array<PostOfficeItemResponse> = [];

        if (data) {
          const postOffice = await userPostOfficeApi.getPostOffice(data.sub);
          data.postOfficeId = postOffice?.IChiba_PostOffice_Id || "";
          data.currencyCode = postOffice?.IChiba_Currency_Code || "";
          postOffices = postOffice?.data || [];
          await setAsyncItem(
            CONSTANT.TOKEN_STORAGE_KEY.ICHIBA_POSTOFFICE_ID,
            postOffice?.IChiba_PostOffice_Id || "",
          );
          await setAsyncItem(
            CONSTANT.TOKEN_STORAGE_KEY.ICHIBA_CURRENCY_CODE,
            postOffice?.IChiba_Currency_Code || "",
          );
        }
        return { account: data, postOffices: postOffices };
      },
      key: type,
    },
    callbacks,
  );
}

export function* takeChangeLanguageWithLaunch({
  callbacks,
  type,
  payload,
}: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<boolean> => {
        await onChangeLanguage(payload?.language);
        return payload?.language;
      },
      key: type,
    },
    callbacks,
  );
}

export function* takeChangeLanguage({
  callbacks,
  type,
  payload,
}: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<boolean> => {
        await onChangeLanguage(payload?.language);
        CodePush.restartApp();
        return payload?.language;
      },
      key: type,
    },
    callbacks,
  );
}

export default function* accountSaga(): SagaIterator {
  yield takeLatest(AccountActionType.LOGIN, takeLogin);
  yield takeLatest(AccountActionType.LOGOUT, takeLogout);
  yield takeLatest(AccountActionType.GET_USER_INFO, takeGetUserInfo);
  yield takeLatest(
    AccountActionType.CHANGE_LANGUAGE_WITH_LAUNCH,
    takeChangeLanguageWithLaunch,
  );
  yield takeLatest(AccountActionType.CHANGE_LANGUAGE, takeChangeLanguage);
  yield takeLatest(AccountActionType.GET_POST_OFFICE, takeGetPostOffices);
}
