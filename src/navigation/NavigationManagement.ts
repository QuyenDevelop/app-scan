import { SCREENS } from "@configs";
import { NavigationUtils } from "@helpers";
import { LoginRouteParams, ShipmentDetailScreenParams } from "@screens";

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

export const goToUpload = () => {
  NavigationUtils.navigate(SCREENS.UPLOAD_SCREEN);
};

export const goToShipmentDetail = (routeParams: ShipmentDetailScreenParams) => {
  NavigationUtils.navigate(SCREENS.SHIPMENT_STACK, {
    name: SCREENS.SHIPMENT_DETAIL_SCREEN,
    params: routeParams,
  });
};
