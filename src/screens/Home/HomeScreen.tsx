import { Text } from "@shared";
import { Images } from "@themes";
import React, { FunctionComponent } from "react";
import { ImageBackground, StatusBar, View } from "react-native";
import styles from "./styles";

export const HomeScreen: FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={Images.headerImage}
        resizeMode="cover"
        style={styles.headerImage}
      >
        <Text>EFEX</Text>
      </ImageBackground>
    </View>
  );
};
