import { Footer } from "@components";
import { SCREENS } from "@configs";
import { Alert, Utils } from "@helpers";
import { useNavigation } from "@react-navigation/native";
import { AccountAction } from "@redux";
import { Button, Checkbox, TextInput, translate } from "@shared";
import { Metrics } from "@themes";
import React, { FunctionComponent, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useDispatch } from "react-redux";
import Header from "./components/Header";
import styles from "./styles";

export interface LoginRouteParams {
  returnStack?: string;
  returnScreen?: string;
}

export const LoginScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const [isRemember, setIsRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonClickSubmit, setIsButtonClickSubmit] = useState(false);
  // const deviceId = useSelector(
  //   (state: IRootState) => state.account.deviceId,
  // ) as string;
  const getUserInformation = () => {
    dispatch(
      AccountAction.userInfo(
        {},
        {
          onFailure: () => {
            setIsLoading(false);
          },
          onSuccess: () => {
            setEmail("");
            setPassword("");
            setIsButtonClickSubmit(false);
            // navigation.goBack();
            navigation.reset({
              index: 0,
              routes: [{ name: SCREENS.HOME_STACK }],
            });
          },
        },
      ),
    );
    // hideLoading();
  };
  const loginWithEmail = () => {
    setIsButtonClickSubmit(true);
    if (Utils.isValidPassword(password)) {
      setIsLoading(true);
      dispatch(
        AccountAction.login(
          { email: email, password: password },
          {
            onFailure: (err: any) => {
              if (err && err.locked) {
                navigation.navigate(SCREENS.LOCKED_SCREEN, {
                  countDown: err.error_description || "0",
                });
              } else {
                Alert.error(
                  err.error_description || translate("error.generic"),
                  true,
                );
              }
              setIsLoading(false);
            },
            onSuccess: () => {
              setIsLoading(false);
              getUserInformation();
            },
          },
        ),
      );
    }
  };
  // const loginWithGoogle = () => {};
  // const loginWithFacebook = () => {};
  // const loginWithApple = () => {};
  return (
    <View style={styles.container}>
      {/* <Header isGoBack isEnableChangeLanguage /> */}
      <Header />
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
          {/* <Text style={styles.title}>{translate("label.login")}</Text> */}
          {/* <View style={styles.noAccountContainer}>
            <Text style={styles.noAccount}>{translate("label.noAccount")}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(SCREENS.REGISTER_SCREEN)}
            >
              <Text style={styles.buttonCreate}>
                {translate("button.createAccount")}
              </Text>
            </TouchableOpacity>
          </View> */}
          <TextInput
            editable={!isLoading}
            label="ID"
            placeholder={translate("placeholder.email")}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize={"none"}
            returnKeyType="next"
            containerStyle={styles.input}
            value={email}
            onChangeText={(text: string) => setEmail(text)}
            isRequired
            // errorMessage={
            //   isButtonClickSubmit && !Utils.isValidEmail(email)
            //     ? translate("error.validation.email")
            //     : ""
            // }
          />
          <TextInput
            editable={!isLoading}
            label={translate("label.password")}
            placeholder={translate("placeholder.password")}
            returnKeyType="done"
            containerStyle={styles.input}
            value={password}
            onChangeText={(text: string) => setPassword(text)}
            isRequired
            secureTextEntry={isSecure}
            iconRightName={isSecure ? "ic_eye" : "ic_eye_slash"}
            iconRightSize={Metrics.icons.smallSmall}
            onPressIconRight={() => setIsSecure(!isSecure)}
            errorMessage={
              isButtonClickSubmit && !Utils.isValidPassword(password)
                ? translate("error.validation.password")
                : ""
            }
          />
          <View style={styles.space}>
            <Checkbox
              checked={isRemember}
              onChange={() => {
                setIsRemember(!isRemember);
              }}
              title={translate("button.remember")}
            />
            {/* <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={() =>
                navigation.navigate(SCREENS.FORGOT_PASSWORD_SCREEN)
              }
            >
              <Text style={styles.forgotPassword}>
                {translate("button.forgotPassword")}
              </Text>
            </TouchableOpacity> */}
          </View>
          <Button
            onPress={loginWithEmail}
            title={translate("button.login")}
            isLoading={isLoading}
            buttonChildStyle={styles.loginBtn}
            buttonStyle={styles.button}
          />
          {/* <View style={styles.loginSocialContainer}>
            <View style={styles.line} />
            <Text style={styles.orLogin}>{translate("label.orLogin")}</Text>
            <View style={styles.line} />
          </View> */}
          {/* <View style={styles.loginSocialContainer}>
            <TouchableOpacity
              style={[
                styles.buttonSocial,
                {
                  borderColor: Themes.colors.google,
                },
              ]}
              onPress={loginWithGoogle}
            >
              <Icon
                name={"ic_google"}
                size={Metrics.icons.small}
                color={Themes.colors.google}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonSocial,
                {
                  borderColor: Themes.colors.facebook,
                  marginLeft: ScreenUtils.calculatorWidth(13),
                },
              ]}
              onPress={loginWithFacebook}
            >
              <Icon
                name={"ic_facebook"}
                size={Metrics.icons.small}
                color={Themes.colors.facebook}
              />
            </TouchableOpacity>
            {Platform.OS === "ios" &&
            Number(Platform.Version.toString().split(".")[0]) >= 13 ? (
              <TouchableOpacity
                style={[
                  styles.buttonSocial,
                  {
                    borderColor: Themes.colors.black,
                    marginLeft: ScreenUtils.calculatorWidth(13),
                  },
                ]}
                onPress={loginWithApple}
              >
                <Icon
                  name={"ic_apple"}
                  size={Metrics.icons.small}
                  color={Themes.colors.black}
                />
              </TouchableOpacity>
            ) : null}
          </View> */}
        </ScrollView>
      </KeyboardAvoidingView>
      <Footer />
    </View>
  );
};
