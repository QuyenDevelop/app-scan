import { DATA_CONSTANT } from "@configs";
import { useShipmentInfo, useStatusBar } from "@hooks";
import { goToMenuScreen } from "@navigation";
import { Icon, translate } from "@shared";
import { Images, Metrics, Themes } from "@themes";
import React, { FunctionComponent, useEffect } from "react";
import {
  BackHandler,
  FlatList,
  ImageBackground,
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

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }, []);

  const renderHomeItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <HomeItem
        key={index}
        title={translate(item.title)}
        icon={item.icon}
        onPress={item.onPress}
      />
    );
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={Images.headerImage}
        resizeMode="cover"
        style={[styles.headerImage, { paddingTop: insets.top }]}
      >
        <TouchableOpacity style={styles.headerView} onPress={goToMenuScreen}>
          <Icon
            name="ic_menu"
            size={Metrics.icons.medium}
            color={Themes.colors.white}
            styles={styles.menu}
          />
          <Icon
            name="ic_efex"
            size={Metrics.icons.medium}
            color={Themes.colors.white}
          />
        </TouchableOpacity>
      </ImageBackground>
      <FlatList
        data={DATA_CONSTANT.HOME_ITEMS}
        keyExtractor={(item: any) => item.id}
        renderItem={renderHomeItem}
        numColumns={3}
      />
    </View>
  );
};
