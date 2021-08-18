/* eslint-disable react-native/no-inline-styles */
import { FastImageLoading, Icon } from "@shared";
import { Images, Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import FastImage from "react-native-fast-image";
import styles from "./styles";

interface Props {
  id: string;
  uri: string;
  isChecked: boolean;
  onSelect: (id: string) => void;
}
export const ImageItem: FunctionComponent<Props> = props => {
  const { id, uri, isChecked, onSelect } = props;
  const onCheck = () => {
    onSelect(id);
  };
  return (
    <TouchableWithoutFeedback onPress={onCheck}>
      <View style={styles.imageView}>
        <FastImageLoading
          sourceLoading={Images.productDefault}
          source={{ uri: uri || Images.productDefault }}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.imageLibrary}
        />
        {isChecked && (
          <Icon
            name="ic_check-circle"
            size={Metrics.icons.small}
            color={Themes.colors.success60}
            styles={styles.iconCheck}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
