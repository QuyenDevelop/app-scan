/* eslint-disable react-native/no-inline-styles */
import { accountApi } from "@api";
import { Header } from "@components";
import { SCREENS } from "@configs";
import { Alert, Utils } from "@helpers";
import { useStatusBar } from "@hooks";
import { useNavigation } from "@react-navigation/native";
import { AccountAction } from "@redux";
import { Button, TextInput, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useDispatch } from "react-redux";
import styles from "./styles";
export const ChangePasswordScreen: FunctionComponent = () => {
  useStatusBar("light-content");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonClickSubmit, setIsButtonClickSubmit] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const [newPassword, setNewPassword] = useState("");
  const [isNewPasswordSecure, setIsNewPasswordSecure] = useState(true);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true);

  const changePassword = () => {
    setIsButtonClickSubmit(true);
    if (
      Utils.isValidPassword(oldPassword) &&
      Utils.isValidPassword(newPassword) &&
      Utils.isValidPassword(confirmPassword) &&
      Utils.isMatchPassword(newPassword, confirmPassword)
    ) {
      setIsLoading(true);
      accountApi
        .changePassword(oldPassword, newPassword)
        ?.then(response => {
          if (response.succeeded === true) {
            Alert.success("success.changePassword");
            dispatch(
              AccountAction.logout(
                {},
                {
                  onFailure: (err: any) => {
                    Alert.error(err, true);
                    setIsLoading(false);
                  },
                  onSuccess: () => {
                    navigation.navigate(SCREENS.AUTH_STACK, {
                      screen: SCREENS.LOGIN_SCREEN,
                    });
                  },
                },
              ),
            );
          } else {
            Alert.error(response.error, true);
          }
        })
        .catch(err => Alert.error(err.detail, true))
        .finally(() => setIsLoading(false));
    } else {
      Alert.error("Lỗi", true);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={translate("screens.changePassword")}
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
        titleColor={Themes.colors.white}
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
          <TextInput
            editable={!isLoading}
            label={translate("label.password")}
            placeholder={translate("placeholder.password")}
            returnKeyType="next"
            containerStyle={styles.input}
            value={oldPassword}
            onChangeText={(text: string) => setOldPassword(text)}
            isRequired
            secureTextEntry={isPasswordSecure}
            iconRightName={isPasswordSecure ? "ic_eye" : "ic_eye_slash"}
            iconRightSize={Metrics.icons.smallSmall}
            onPressIconRight={() => setIsPasswordSecure(!isPasswordSecure)}
            errorMessage={
              isButtonClickSubmit && !Utils.isValidPassword(oldPassword)
                ? translate("error.validation.password")
                : ""
            }
          />
          <TextInput
            editable={!isLoading}
            label={translate("label.newPassword")}
            placeholder={translate("placeholder.newPassword")}
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
            label={translate("label.confirmNewPassword")}
            placeholder={translate("placeholder.confirmNewPassword")}
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
            onPress={() => changePassword()}
            title={translate("button.confirm")}
            isLoading={isLoading}
            buttonChildStyle={{ width: "100%" }}
            buttonStyle={styles.button}
          />
          {/* <TouchableOpacity
            style={styles.forgotPasswordBtn}
            onPress={goToForgotPasswordScreen}
          >
            <Text style={styles.forgotPasswordTextBtn}>
              {translate("button.forgotPassword")}
            </Text>
          </TouchableOpacity> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
