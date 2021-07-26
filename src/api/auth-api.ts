import { Account } from "@models";
import Config from "react-native-config";
import { BaseApi } from "./base-api";

const {
  IDENTITY_HOST,
  GRANT_TYPE_PASSWORD,
  GRANT_TYPE_EXTERNAL,
  GRANT_TYPE_REFRESH_TOKEN,
  SCOPES,
  CLIENT_ID,
  CLIENT_SECRET,
} = Config;

class AuthApi extends BaseApi {
  login(email?: string, password?: string) {
    let url = `${IDENTITY_HOST}/connect/token`;
    return this.postUrlEncoded(
      url,
      {
        username: email,
        password: password,
        grant_type: GRANT_TYPE_PASSWORD,
        client_secret: CLIENT_SECRET,
        scope: SCOPES,
        client_id: CLIENT_ID,
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
