import { SCREENS } from "@configs";
import { NavigationUtils } from "@helpers";
import {
  LoginRouteParams,
  PhotoLibraryScreenParams,
  ShipmentDetailScreenParams,
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
