import { accountApi } from "@api";
import { Header } from "@components";
import { SCREENS } from "@configs";
import { Alert, Utils } from "@helpers";
import { useStatusBar } from "@hooks";
import { AuthStackParamList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, TextInput, translate } from "@shared";
import { Metrics } from "@themes";
import React, { FunctionComponent, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";

export interface ResetPasswordRouteParams {
  code?: string;
  email?: string;
}

interface OwnProps {}

type Props = OwnProps;

type NavigationRoute = RouteProp<
  AuthStackParamList,
  SCREENS.RESET_PASSWORD_SCREEN
>;

export const ResetPasswordScreen: FunctionComponent<Props> = () => {
  useStatusBar("dark-content");
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute<NavigationRoute>();

  const [isLoading, setIsLoading] = useState(false);
  const [isButtonClickSubmit, setIsButtonClickSubmit] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [isNewPasswordSecure, setIsNewPasswordSecure] = useState(true);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true);

  const { email, code } = route?.params;

  const resetPassword = () => {
    setIsButtonClickSubmit(true);
    setIsLoading(true);
    if (
      Utils.isValidPassword(newPassword) &&
      Utils.isValidPassword(confirmPassword) &&
      Utils.isMatchPassword(newPassword, confirmPassword)
    ) {
      email &&
        code &&
        accountApi
          .resetPassword(confirmPassword, email, code)
          ?.then(() => {
            Alert.success("success.changePassword");
            navigation.navigate(SCREENS.LOGIN_SCREEN);
          })
          .catch(err => Alert.error(err.detail, true))
          .finally(() => setIsLoading(false));
    }
  };

  return (
    <View style={styles.container}>
      <Header
        onGoBack={() => navigation.navigate(SCREENS.BOTTOM_TAB_NAVIGATION)}
        isGoBack
        isEnableChangeLanguage
      />
      <KeyboardAvoidingView
        enabled={Platform.OS === "ios"}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.childContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>{translate("label.resetPassword")}</Text>
          <TextInput
            editable={!isLoading}
            label={translate("label.password")}
            placeholder={translate("placeholder.password")}
            returnKeyType="next"
            containerStyle={styles.input}
            value={newPassword}
            onChangeText={(text: string) => setNewPassword(text)}
            isRequired
            secureTextEntry={isNewPasswordSecure}
            iconRightName={isNewPasswordSecure ? "ic_eye" : "ic_eye_slash"}
            iconRightSize={Metrics.icons.smallSmall}
            onPressIconRight={() =>
              setIsNewPasswordSecure(!isNewPasswordSecure)
            }
            errorMessage={
              isButtonClickSubmit && !Utils.isValidPassword(newPassword)
                ? translate("error.validation.password")
                : ""
            }
          />
          <TextInput
            editable={!isLoading}
            label={translate("label.confirmPassword")}
            placeholder={translate("placeholder.confirmPassword")}
            returnKeyType="next"
            containerStyle={styles.input}
            value={confirmPassword}
            onChangeText={(text: string) => setConfirmPassword(text)}
            isRequired
            secureTextEntry={isConfirmPasswordSecure}
            iconRightName={isConfirmPasswordSecure ? "ic_eye" : "ic_eye_slash"}
            iconRightSize={Metrics.icons.smallSmall}
            onPressIconRight={() =>
              setIsConfirmPasswordSecure(!isConfirmPasswordSecure)
            }
            errorMessage={
              isButtonClickSubmit && !Utils.isValidPassword(confirmPassword)
                ? translate("error.validation.password")
                : ""
            }
          />
          <Button
            // onPress={signUp}
            onPress={() => resetPassword()}
            title={translate("button.confirm")}
            isLoading={isLoading}
            buttonChildStyle={{ width: "100%" }}
            buttonStyle={styles.button}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
