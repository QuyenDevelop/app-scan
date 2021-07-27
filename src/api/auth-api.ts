import { Account } from "@models";
import Config from "react-native-config";
import { BaseApi } from "./base-api";

const {
  IDENTITY_HOST,
  GRANT_TYPE_EXTERNAL,
  GRANT_TYPE_REFRESH_TOKEN,
  SCOPES,
  CLIENT_ID,
  CLIENT_SECRET,
  GRANT_TYPE_PASSWORD,
  // REDIRECT_URI,
  // POST_LOGOUT_REDIRECT_URI,
  // LOAD_USER_INFO,
  // SILENT_REDIRECT_URI,
  // AUTOMATIC_SILENT_RENEW,
  // REVOKE_ACCESS_TOKEN_ON_SIGN_OUT,
  // RESPONSE_TYPE,
} = Config;

class AuthApi extends BaseApi {
  login(email?: string, password?: string) {
    let url = `${IDENTITY_HOST}`;
    console.log("🚀🚀🚀 => login => url", url);
    return this.postUrlEncoded(
      url,
      {
        username: email,
        password: password,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        scope: SCOPES,
      },
      true,
    );
  }

  loginExternal(token: string, provider: string) {
    let url = `${IDENTITY_HOST}/connect/token`;
    return this.postUrlEncoded(
      url,
      {
        token: token,
        provider: provider,
        grant_type: GRANT_TYPE_EXTERNAL,
        scope: SCOPES,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      },
      true,
    );
  }

  refreshToken(refreshToken: string) {
    let url = `${IDENTITY_HOST}/connect/token`;
    return this.postUrlEncoded(
      url,
      {
        refresh_token: refreshToken,
        grant_type: GRANT_TYPE_REFRESH_TOKEN,
        scope: SCOPES,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      },
      true,
    );
  }

  revokeToken(token?: string | null) {
    let url = `${IDENTITY_HOST}/connect/revocation`;
    return this.postUrlEncoded(
      url,
      {
        token,
      },
      true,
    );
  }

  getUserInfo() {
    let url = `${IDENTITY_HOST}/connect/userinfo`;
    return this.get<Account>(url, {}, true);
  }
}

export default new AuthApi();
