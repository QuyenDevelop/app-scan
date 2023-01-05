import { SCREENS } from "@configs";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ChangePasswordScreen,
  ForgotPasswordNotificationRouteParams,
  ForgotPasswordNotificationScreen,
  ForgotPasswordScreen,
  LockedParams,
  LockedScreen,
  LoginRouteParams,
  LoginScreen,
  RegisterScreen,
  ResetPasswordRouteParams,
  ResetPasswordScreen,
  VerificationRouteParams,
  VerificationScreen,
} from "@screens";
import React from "react";

export type AuthStackParamList = {
  [SCREENS.LOGIN_SCREEN]: LoginRouteParams;
  [SCREENS.LOCKED_SCREEN]: LockedParams;
  [SCREENS.REGISTER_SCREEN]: undefined;
  [SCREENS.FORGOT_PASSWORD_SCREEN]: undefined;
  [SCREENS.VERIFICATION_SCREEN]: VerificationRouteParams;
  [SCREENS.FORGOT_PASSWORD_NOTIFICATION_SCREEN]: ForgotPasswordNotificationRouteParams;
  [SCREENS.RESET_PASSWORD_SCREEN]: ResetPasswordRouteParams;
  [SCREENS.CHANGE_PASSWORD_SCREEN]: undefined;
};
const AuthStack = createStackNavigator<AuthStackParamList>();

export function AuthStackNavigation() {
  return (
    <AuthStack.Navigator
      initialRouteName={SCREENS.LOGIN_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name={SCREENS.LOGIN_SCREEN} component={LoginScreen} />
      <AuthStack.Screen
        name={SCREENS.REGISTER_SCREEN}
        component={RegisterScreen}
      />
      <AuthStack.Screen name={SCREENS.LOCKED_SCREEN} component={LockedScreen} />
      <AuthStack.Screen
        name={SCREENS.FORGOT_PASSWORD_SCREEN}
        component={ForgotPasswordScreen}
      />
      <AuthStack.Screen
        name={SCREENS.VERIFICATION_SCREEN}
        component={VerificationScreen}
      />
      <AuthStack.Screen
        name={SCREENS.FORGOT_PASSWORD_NOTIFICATION_SCREEN}
        component={ForgotPasswordNotificationScreen}
      />
      <AuthStack.Screen
        name={SCREENS.RESET_PASSWORD_SCREEN}
        component={ResetPasswordScreen}
      />
      <AuthStack.Screen
        name={SCREENS.CHANGE_PASSWORD_SCREEN}
        component={ChangePasswordScreen}
      />
    </AuthStack.Navigator>
  );
}
