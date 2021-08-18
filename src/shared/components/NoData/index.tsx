import { Text, translate } from "@shared";
import { Images } from "@themes";
import React, { FunctionComponent } from "react";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import styles from "./styles";

interface Props {
  content?: string;
}

export const NoData: FunctionComponent<Props> = props => {
  const { content } = props;
  return (
    <View style={styles.container}>
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        source={Images.noData}
        style={styles.image}
      />
      <Text>{content || translate("label.noData")}</Text>
    </View>
  );
};
