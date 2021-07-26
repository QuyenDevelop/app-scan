import { authApi } from "@api";
import { CONSTANT } from "@configs";
import { Utils } from "@helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AuthorizeResult } from "@types";
import Config from "react-native-config";
import { LoginManager } from "react-native-fbsdk-next";
import { SagaIterator } from "redux-saga";
import { takeLatest } from "redux-saga/effects";
import { unfoldSaga, UnfoldSagaActionType } from "redux-unfold-saga";
import { AccountActionType } from "../types";

const { GOOGLE_CLIENT_ID } = Config;

export function* takeLogin({
  callbacks,
  type,
  payload,
}: UnfoldSagaActionType): Iterable<SagaIterator> {
  yield unfoldSaga(
    {
      handler: async (): Promise<AuthorizeResult> => {
        console.log("takeLogin payload: ", JSON.stringify(payload));
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
        ]);
        GoogleSignin.configure({
          webClientId: GOOGLE_CLIENT_ID,
          offlineAccess: true,
        });
        await GoogleSignin.signOut();
        LoginManager.logOut();
        return true;
      },
      key: type,
    },
    callbacks,
  );
}

export default function* accountSaga(): SagaIterator {
  yield takeLatest(AccountActionType.LOGIN, takeLogin);
  yield takeLatest(AccountActionType.LOGOUT, takeLogout);
}
