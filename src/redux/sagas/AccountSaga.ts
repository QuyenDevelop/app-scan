import { authApi, axiosService, userPostOfficeApi } from "@api";
import { CONSTANT } from "@configs";
import { Utils } from "@helpers";
import { Account } from "@models";
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
        const [accessToken] = await Promise.all([
          AsyncStorage.getItem(CONSTANT.TOKEN_STORAGE_KEY.ACCESS_TOKEN),
          // AsyncStorage.getItem(CONSTANT.TOKEN_STORAGE_KEY.REFRESH_TOKEN),
        ]);
        await authApi.revokeToken(accessToken);

        await AsyncStorage.removeItem(CONSTANT.TOKEN_STORAGE_KEY.ACCESS_TOKEN);

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
      handler: async (): Promise<Account | undefined> => {
        const data = await authApi.getUserInfo();

        if (data) {
          const postOffice = await userPostOfficeApi.getPostOffice(data.sub);
          data.postOfficeId = postOffice?.IChiba_PostOffice_Id || "";
          data.currencyCode = postOffice?.IChiba_Currency_Code || "";
          axiosService.setAxiosInstance(
            postOffice?.IChiba_PostOffice_Id || "",
            postOffice?.IChiba_Currency_Code || "",
          );
        }

        return data;
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
}
