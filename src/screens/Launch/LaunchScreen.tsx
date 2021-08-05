import { CONSTANT, DATA_CONSTANT, SCREENS } from "@configs";
import { useStatusBar } from "@hooks";
import { RootParamList } from "@navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AccountAction } from "@redux";
import { Loader } from "@themes";
import LottieView from "lottie-react-native";
import React, { FunctionComponent, useCallback, useState } from "react";
import { Alert, View } from "react-native";
import * as RNLocalize from "react-native-localize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import styles from "./styles";

type NavigationRoute = RouteProp<RootParamList, SCREENS.LAUNCH_SCREEN>;

export interface LaunchScreenRouteParams {}

interface Props {}

export const LaunchScreen: FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();
  useStatusBar("dark-content");
  const insets = useSafeAreaInsets();

  const [currencyCodes] = useState({
    currencyCode: RNLocalize.getCurrencies(),
  });

  const [locates] = useState({
    locates: RNLocalize.getLocales(),
  });

  const checkIsFirstLaunch = async (): Promise<boolean> => {
    return false;
  };
  const authenticate = async (): Promise<void> => {
    const [accessToken, currency, language] = await Promise.all([
      AsyncStorage.getItem(CONSTANT.TOKEN_STORAGE_KEY.ACCESS_TOKEN),
      AsyncStorage.getItem(CONSTANT.TOKEN_STORAGE_KEY.CURRENCY),
      AsyncStorage.getItem(CONSTANT.TOKEN_STORAGE_KEY.LANGUAGE),
    ]);

    dispatch(AccountAction.commonConfig());

    if (language != null) {
      dispatch(
        AccountAction.changeLanguageWithLaunch({
          language: language ? language : CONSTANT.LANGUAGES.EN,
        }),
      );
    } else if (locates && locates.locates.length > 0) {
      let location = DATA_CONSTANT.LANGUAGE_CODE.find(
        x => x.code === locates.locates[0].languageCode,
      );
      dispatch(
        AccountAction.changeLanguageWithLaunch({
          language: location ? location.tag : CONSTANT.LANGUAGES.EN,
        }),
      );
    }

    if (currency) {
      dispatch(AccountAction.changeCurrencyWithLaunch({ currency: currency }));
    } else if (currencyCodes && currencyCodes.currencyCode.length > 0) {
      dispatch(
        AccountAction.changeCurrencyWithLaunch({
          currency: currencyCodes.currencyCode[0],
        }),
      );
    }

    if (accessToken) {
      console.log("🚀🚀🚀 => authenticate => accessToken", accessToken);
      dispatch(
        AccountAction.userInfo(
          {},
          {
            onSuccess: () => {
              onContinueFlow();
            },
            onFinish: () => {
              onContinueFlow();
            },
            onFailure: () => {
              onContinueFlow();
            },
          },
        ),
      );
      return;
    } else {
      if (await checkIsFirstLaunch()) {
        // navigation.navigate(SCREENS.ON_BOARDING);
      } else {
        onContinueFlow();
      }
    }
  };

  const onContinueFlow = () => {
    navigation.navigate(SCREENS.BOTTOM_TAB_NAVIGATION);
  };

  const checkConnectivity = (): void => {
    NetInfo.fetch()
      .then((state: NetInfoState): void => {
        if (state.isConnected) {
          authenticate();
        } else {
          Alert.alert("You are offline!");
        }
      })
      .catch((): void => {
        Alert.alert("Error");
      });
  };

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        checkConnectivity();
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }, []),
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* <FastImage
        source={Images.splash}
        style={styles.backgroundImg}
        resizeMode={FastImage.resizeMode.cover}
      /> */}
      <LottieView
        style={styles.loadingView}
        autoPlay={true}
        loop={true}
        source={Loader.launchLoader}
      />
    </View>
  );
};
