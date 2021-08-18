import { Footer, Header } from "@components";
import { SCREENS } from "@configs";
import { useStatusBar } from "@hooks";
import { AuthStackParamList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, translate } from "@shared";
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

export interface ForgotPasswordNotificationRouteParams {
  email?: string;
}

type NavigationRoute = RouteProp<
  AuthStackParamList,
  SCREENS.FORGOT_PASSWORD_NOTIFICATION_SCREEN
>;

interface OwnProps {}

type Props = OwnProps;

export const ForgotPasswordNotificationScreen: FunctionComponent<Props> =
  () => {
    //#region State
    useStatusBar("dark-content");
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<StackNavigationProp<any>>();
    const route = useRoute<NavigationRoute>();
    const [isLoading, setIsLoading] = useState(false);
    //#endRegion

    const { email } = route?.params;

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
            <Text style={styles.title}>
              {translate("label.forgotPassword")}
            </Text>
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                {translate("text.forgotPasswordNotification.firstContent")}
              </Text>
            </View>
            <View style={styles.emailContainer}>
              <Text style={styles.textEmail}>{email}</Text>
            </View>

            <View style={styles.contentContainer}>
              <View style={styles.firstContentContainer}>
                <Text style={styles.firstContent}>
                  {translate("text.forgotPasswordNotification.secondContent")}
                </Text>
              </View>

              <View>
                <Text style={styles.secondContent}>
                  {translate("text.forgotPasswordNotification.thirdContent")}
                </Text>
              </View>
            </View>
            <Button
              onPress={() => navigation.navigate(SCREENS.BOTTOM_TAB_NAVIGATION)}
              title={translate("button.homePage")}
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
