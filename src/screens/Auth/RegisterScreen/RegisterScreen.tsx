import { accountApi } from "@api";
import { Footer, Header } from "@components";
import { SCREENS } from "@configs";
import { Alert, ScreenUtils, Utils } from "@helpers";
import { useStatusBar } from "@hooks";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Icon, TextInput, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";

export const RegisterScreen: FunctionComponent = () => {
  useStatusBar("dark-content");
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonClickSubmit, setIsButtonClickSubmit] = useState(false);

  const signUp = () => {
    setIsButtonClickSubmit(true);
    if (Utils.isValidEmail(email)) {
      setIsLoading(true);
      accountApi
        .getLinkUserRegister(email)
        ?.then(() => {
          navigation.navigate(SCREENS.VERIFICATION_SCREEN, {
            email: email,
          });
        })
        .catch(err => Alert.error(err.detail, true))
        .finally(() => setIsLoading(false));
    }
  };

  const loginWithFacebook = () => {
    // ExternalAuthenticationUtils.signInByFacebook()
    //   .then(user => {
    //     showLoading();
    //     externalLogin(user);
    //   })
    //   .catch(err => Alert.warning(err));
  };

  const loginWithGoogle = () => {
    // ExternalAuthenticationUtils.signInByGoogle()
    //   .then(user => {
    //     showLoading();
    //     externalLogin(user);
    //   })
    //   .catch(err => Alert.warning(err));
  };

  const loginWithApple = () => {
    // ExternalAuthenticationUtils.signInByApple().then(user => {
    //   showLoading();
    //   externalLogin(user);
    // });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header isGoBack isEnableChangeLanguage />
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
          <Text style={styles.title}>{translate("label.signup")}</Text>
          <View style={styles.noAccountContainer}>
            <Text style={styles.noAccount}>
              {translate("label.alreadyAccount")}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(SCREENS.LOGIN_SCREEN, {})}
            >
              <Text style={styles.buttonCreate}>
                {translate("button.login")}
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            editable={!isLoading}
            label={translate("label.email")}
            placeholder={translate("placeholder.email")}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize={"none"}
            returnKeyType="next"
            containerStyle={styles.input}
            value={email}
            onChangeText={(text: string) => setEmail(text)}
            isRequired
            errorMessage={
              isButtonClickSubmit && !Utils.isValidEmail(email)
                ? translate("error.validation.email")
                : ""
            }
          />
          <Button
            onPress={signUp}
            title={translate("button.signup")}
            isLoading={isLoading}
            buttonChildStyle={{ width: "100%" }}
            buttonStyle={styles.button}
          />
          <View style={styles.loginSocialContainer}>
            <View style={styles.line} />
            <Text style={styles.orLogin}>{translate("label.orLogin")}</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.loginSocialContainer}>
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Footer />
    </View>
  );
};
