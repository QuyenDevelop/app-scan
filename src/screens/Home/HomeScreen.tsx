import { DATA_CONSTANT } from "@configs";
import { useShipmentInfo, useStatusBar } from "@hooks";
import { goToMenuScreen } from "@navigation";
import { Icon, translate } from "@shared";
import { Images, Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeItem from "./components/HomeItem";
import styles from "./styles";

export const HomeScreen: FunctionComponent = () => {
  useShipmentInfo();
  const insets = useSafeAreaInsets();
  useStatusBar("light-content");
  return (
    <View style={styles.container}>
      <ImageBackground
        source={Images.headerImage}
        resizeMode="cover"
        style={[styles.headerImage, { paddingTop: insets.top }]}
      >
        <View style={styles.headerView}>
          <TouchableOpacity onPress={goToMenuScreen}>
            <Icon
              name="ic_menu"
              size={Metrics.icons.medium}
              color={Themes.colors.white}
              styles={styles.menu}
            />
          </TouchableOpacity>

          <Icon
            name="ic_efex"
            size={Metrics.icons.medium}
            color={Themes.colors.white}
          />
        </View>
      </ImageBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        {DATA_CONSTANT.HOME_ITEMS.map((item, index) => {
          return (
            <HomeItem
              key={index}
              title={translate(item.title)}
              content={translate(item.content)}
              icon={item.icon}
              onPress={item.onPress}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
