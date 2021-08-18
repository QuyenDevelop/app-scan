import { accountApi } from "@api";
import { Footer, Header } from "@components";
import { SCREENS } from "@configs";
import { Alert, Utils } from "@helpers";
import { useStatusBar } from "@hooks";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, TextInput, translate } from "@shared";
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

export const ForgotPasswordScreen: FunctionComponent = () => {
  useStatusBar("dark-content");
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonClickSubmit, setIsButtonClickSubmit] = useState(false);

  const sendResetPasswordEmail = () => {
    setIsLoading(true);
    setIsButtonClickSubmit(true);
    accountApi
      .forgotPassword(email)
      ?.then(() => {
        navigation.navigate(SCREENS.FORGOT_PASSWORD_NOTIFICATION_SCREEN, {
          email: email,
        });
      })
      .catch(err => {
        setIsLoading(false);
        Alert.error(err.detail, true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.title}>{translate("label.forgotPassword")}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {translate("text.forgotPassword.firstContent")}
            </Text>
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
            onPress={sendResetPasswordEmail}
            title={translate("button.confirm")}
            isLoading={isLoading}
            buttonChildStyle={{ width: "100%" }}
            buttonStyle={styles.button}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <Footer />
    </View>
  );
};
