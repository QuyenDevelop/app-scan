import { Footer } from "@components";
import { CONSTANT, SCREENS } from "@configs";
import {
  Alert,
  getAsyncItem,
  removeAsyncItem,
  setAsyncItem,
  Utils,
} from "@helpers";
import { useStatusBar } from "@hooks";
import { Account } from "@models";
import { useNavigation } from "@react-navigation/native";
import { AccountAction } from "@redux";
import { Button, Checkbox, TextInput, translate } from "@shared";
import { Metrics } from "@themes";
import React, { FunctionComponent, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import * as Keychain from "react-native-keychain";
import { useDispatch } from "react-redux";
import Header from "./components/Header";
import styles from "./styles";
export interface LoginRouteParams {
  returnStack?: string;
  returnScreen?: string;
}

export const LoginScreen: FunctionComponent = () => {
  useStatusBar("dark-content");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const [isRemember, setIsRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonClickSubmit, setIsButtonClickSubmit] = useState(false);

  const getRememberUser = async () => {
    const userRemember = await getAsyncItem(
      CONSTANT.TOKEN_STORAGE_KEY.REMEMBER_USER,
    );

    if (!userRemember) {
      return;
    }

    setIsRemember(true);
    setEmail(userRemember);
  };

  useEffect(() => {
    getRememberUser();
  }, []);

  const getUserInformation = () => {
    dispatch(
      AccountAction.userInfo(
        {},
        {
          onFailure: (err: any) => {
            console.log("fail: ", err);
            setIsLoading(false);
          },
          onSuccess: (response: { account: Account }) => {
            dispatch(
              AccountAction.getPostOffice({ account: response.account }),
            );
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
  const loginWithEmail = (username: string, pass: string) => {
    if (isRemember) {
      setAsyncItem(CONSTANT.TOKEN_STORAGE_KEY.REMEMBER_USER, email);
    } else {
      removeAsyncItem(CONSTANT.TOKEN_STORAGE_KEY.REMEMBER_USER);
    }
    setIsButtonClickSubmit(true);
    if (Utils.isValidPassword(pass)) {
      setIsLoading(true);
      dispatch(
        AccountAction.login(
          { email: username, password: pass },
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

  const loginWithTouchID = async () => {
    try {
      // Retrieve the credentials
      const credentials = await Keychain.getInternetCredentials(
        "Efex_Warehouse",
      );
      console.log("🚀🚀🚀 => loginWithTouchID => credentials", credentials);
      if (credentials) {
        loginWithEmail(credentials.username, credentials.password);
      } else {
        Alert.error("error.noLoginBiometric");
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  };

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
          </View>
          <Button
            onPress={() => {
              loginWithEmail(email, password);
            }}
            title={translate("button.login")}
            isLoading={isLoading}
            buttonChildStyle={styles.loginBtn}
            buttonStyle={styles.button}
          />

          <Button
            onPress={loginWithTouchID}
            title={translate("button.loginWithBiometric")}
            buttonChildStyle={styles.loginBtn}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <Footer />
    </View>
  );
};
