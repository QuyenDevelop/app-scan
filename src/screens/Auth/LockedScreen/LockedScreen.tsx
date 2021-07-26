import { Header } from "@components";
import { SCREENS } from "@configs";
import { useStatusBar } from "@hooks";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Icon, translate } from "@shared";
import { Images, Metrics, Themes } from "@themes";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";

export type LockedParams = {
  countDown: string;
};

interface OwnProps {
  route: { params: LockedParams };
}

type Props = OwnProps;

export const LockedScreen: FunctionComponent<Props> = props => {
  const { route } = props;
  const { params } = route;
  const { countDown } = params;

  const [countDownValue, setCountDownValue] = useState<string>();
  const [endTimer, setEndTimer] = useState<number>(
    isNaN(Number(countDown)) ? 0 : Number(countDown),
  );
  const navigation = useNavigation<StackNavigationProp<any>>();

  const calculateTime = () => {
    let minutes = Math.floor(endTimer / 60);
    let seconds = endTimer - minutes * 60;
    let minutesResult = minutes.toString();
    let secondsResult = seconds.toString();
    if (minutes < 10) {
      minutesResult = "0" + minutes;
    }
    if (seconds < 10) {
      secondsResult = "0" + seconds;
    }
    let result = `${minutesResult}:${secondsResult}`;
    setCountDownValue(result);
  };

  useEffect(() => {
    let countDown = setInterval(() => {
      if (endTimer >= 0) {
        setEndTimer(endTimer - 1);
        calculateTime();
      } else {
        navigation.navigate(SCREENS.LOCKED_SCREEN);
      }
    }, 1000);
    return () => {
      clearInterval(countDown);
    };
  });

  useStatusBar("dark-content");
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header isGoBack isEnableChangeLanguage />
      <View style={styles.contentContainer}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          source={Images.lockedAccount}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{translate("label.titleLocked")}</Text>
          <Text style={styles.description}>
            {translate("label.descriptionLocked")}
          </Text>
        </View>
        {countDownValue && (
          <View style={styles.countDown}>
            <Text style={styles.countDownText}>{countDownValue}</Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        style={[
          styles.footer,
          Platform.OS === "ios" && { paddingBottom: insets.bottom },
        ]}
        onPress={() => {}}
      >
        <Icon
          name={"ic_user_headset"}
          size={Metrics.icons.medium}
          color={Themes.colors.primary}
        />
        <View style={styles.right}>
          <Text style={styles.help}>{translate("label.needHelp")}</Text>
          <Text style={styles.contact}>{translate("label.contact")}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
