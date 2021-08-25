import { SCREENS } from "@configs";
import { NavigationUtils } from "@helpers";
import {
  AddServicePhotosScreenParams,
  LoginRouteParams,
  PhotoLibraryScreenParams,
  ShipmentDetailCODScreenParams,
  ShipmentDetailScreenParams,
  ShipmentsScreenParams,
  UpdateCODScreenParams,
  UploadScreenParams,
} from "@screens";

export const goToLogin = (params?: LoginRouteParams) => {
  NavigationUtils.navigate(SCREENS.AUTH_STACK, {
    name: SCREENS.LOGIN_SCREEN,
    params: params,
  });
};

export const goToRegister = () => {
  NavigationUtils.navigate(SCREENS.AUTH_STACK, {
    name: SCREENS.REGISTER_SCREEN,
  });
};

export const goToUpload = (routeParams: UploadScreenParams) => {
  NavigationUtils.navigate(SCREENS.SHIPMENT_STACK, {
    screen: SCREENS.UPLOAD_SCREEN,
    params: routeParams,
  });
};

export const goToShipmentDetail = (routeParams: ShipmentDetailScreenParams) => {
  NavigationUtils.navigate(SCREENS.SHIPMENT_STACK, {
    screen: SCREENS.SHIPMENT_DETAIL_SCREEN,
    params: routeParams,
  });
};

export const goToPhotoLibrary = (routeParams: PhotoLibraryScreenParams) => {
  NavigationUtils.navigate(SCREENS.SHIPMENT_STACK, {
    screen: SCREENS.PHOTO_LIBRARY_SCREEN,
    params: routeParams,
  });
};

export const goToUpdateCodScreen = (routeParams: UpdateCODScreenParams) => {
  NavigationUtils.navigate(SCREENS.SHIPMENT_STACK, {
    screen: SCREENS.UPDATE_COD_SCREEN,
    params: routeParams,
  });
};

export const goToShipmentDetailCODScreen = (
  routeParams: ShipmentDetailCODScreenParams,
) => {
  NavigationUtils.navigate(SCREENS.SHIPMENT_STACK, {
    screen: SCREENS.SHIPMENT_DETAIL_COD_SCREEN,
    params: routeParams,
  });
};

export const goToCheckAndScanScreen = () => {
  NavigationUtils.navigate(SCREENS.CHECK_AND_SCAN_STACK, {
    screen: SCREENS.SCAN_SCREEN,
  });
};

export const goToScanCodScreen = () => {
  NavigationUtils.navigate(SCREENS.SCAN_COD_STACK, {
    screen: SCREENS.COD_SCAN_SCREEN,
  });
};

export const goToMenuScreen = () => {
  NavigationUtils.navigate(SCREENS.HOME_STACK, {
    screen: SCREENS.MENU_SCREEN,
  });
};

export const goToHomeScreen = () => {
  NavigationUtils.navigate(SCREENS.HOME_STACK, {
    screen: SCREENS.HOME_SCREEN,
  });
};

export const goToShipmentsScreen = (routeParams: ShipmentsScreenParams) => {
  NavigationUtils.navigate(SCREENS.CHECK_AND_SCAN_STACK, {
    screen: SCREENS.SHIPMENTS_SCREEN,
    params: routeParams,
  });
};

export const goToAddServicePhotosScreen = (
  routeParams: AddServicePhotosScreenParams,
) => {
  NavigationUtils.navigate(SCREENS.SHIPMENT_STACK, {
    screen: SCREENS.ADD_SERVICE_PHOTOS_SCREEN,
    params: routeParams,
  });
};

export const goToShipmentManagementScreen = () => {
  NavigationUtils.navigate(SCREENS.SHIPMENT_MANAGEMENT_STACK, {
    screen: SCREENS.SHIPMENT_MANAGEMENT_SCREEN,
  });
};

export const goToUserInformationScreen = () => {
  NavigationUtils.navigate(SCREENS.HOME_STACK, {
    screen: SCREENS.USER_INFORMATION_SCREEN,
  });
};

export const goToChangePasswordScreen = () => {
  NavigationUtils.navigate(SCREENS.AUTH_STACK, {
    screen: SCREENS.CHANGE_PASSWORD_SCREEN,
  });
};

export const goToForgotPasswordScreen = () => {
  NavigationUtils.navigate(SCREENS.AUTH_STACK, {
    screen: SCREENS.FORGOT_PASSWORD_SCREEN,
  });
};
