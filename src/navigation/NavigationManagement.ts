import { SCREENS } from "@configs";
import { NavigationUtils } from "@helpers";
import { LoginRouteParams } from "@screens";

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
