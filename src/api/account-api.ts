import {
  RegisterUserRequest,
  UpdateProfileRequest,
  UserRegisterVerify,
} from "@models";
import Config from "react-native-config";
import { BaseApi } from "./base-api";

const { IDENTITY_HOST } = Config;

class AccountApi extends BaseApi {
  getUserInfoByToken(token: string, provider: string) {
    let url = `${IDENTITY_HOST}/api/Account/GetUserInfoByToken/info/token`;
    return this.post(
      url,
      {
        token,
        provider,
      },
      {},
      true,
    );
  }

  externalRegister(data: any) {
    let url = `${IDENTITY_HOST}/api/Account/ExternalRegister`;
    return this.post(url, data, {}, true);
  }

  getLinkUserRegister(email: string) {
    let url = `${IDENTITY_HOST}/api/Account/GetLinkUserRegister`;
    return this.post(url, {}, { email }, true);
  }

  changePassword(oldPassword: string, newPassword: string) {
    let url = `${IDENTITY_HOST}/api/Profile/ChangePassword`;
    return this.post(
      url,
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
      {},
      true,
    );
  }

  register(registerUser: RegisterUserRequest) {
    let url = `${IDENTITY_HOST}/api/Account/Register`;
    return this.post(
      url,
      {
        email: registerUser.email,
        firstName: registerUser.firstName,
        lastName: registerUser.lastName,
        password: registerUser.password,
        confirmPassword: registerUser.confirmPassword,
        countryCode: registerUser.countryCode,
      },
      {},
      true,
    );
  }

  verifyOtp(phone: string) {
    let url = `${IDENTITY_HOST}/api/Account/VerifyOtp`;
    return this.post(
      url,
      {
        phone: phone,
      },
      {},
      true,
    );
  }

  updateProfile(updateProfileRequest: UpdateProfileRequest) {
    let url = `${IDENTITY_HOST}/api/Account/UpdateProfile`;
    return this.post(url, updateProfileRequest, {}, true);
  }

  verifyUserRegister(hash?: string) {
    let url = `${IDENTITY_HOST}/api/Account/UserRegisterVerify`;
    return this.get<UserRegisterVerify>(
      url,
      {
        hash,
      },
      true,
    );
  }

  forgotPassword(email: string) {
    let url = `${IDENTITY_HOST}/Account/ForgotPassword`;
    return this.post(url, { email: email }, {}, true);
  }

  resetPassword(newPassword: string, email: string, code: string) {
    let url = `${IDENTITY_HOST}/Account/ResetPassword`;
    return this.post(
      url,
      { email: email, code: code, password: newPassword },
      {},
      true,
    );
  }
}

export default new AccountApi();
