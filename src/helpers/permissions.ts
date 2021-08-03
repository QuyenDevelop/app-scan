import { PermissionsAndroid } from "react-native";
import { PERMISSIONS, request } from "react-native-permissions";

export const requestPermissions = () => {
  requestPhotoLibrary();
};

export const requestPhotoLibrary = () => {
  request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(status => {
    console.log("PHOTO_LIBRARY", status);
  });
};

export const hasAndroidPermission = async () => {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === "granted";
};
