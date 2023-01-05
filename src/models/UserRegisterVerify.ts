import { PlatformConstants } from "react-native";

export interface UserRegisterVerify {
  email: string;
  dateNow: Date;
  isExpires: boolean;
}

export interface PlatformAndroidStatic extends PlatformConstants {
  Brand: string;
}
