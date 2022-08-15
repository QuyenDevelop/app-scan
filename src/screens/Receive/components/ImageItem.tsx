import { Icon } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { Image, TouchableWithoutFeedback, View } from "react-native";
import styles from "./styles";

interface Props {
  uri: string;
  isChecked: boolean;
  onSelect: (url: string, index: number) => void;
  index: number;
}
export const ImageItem: FunctionComponent<Props> = props => {
  const { uri, isChecked, onSelect, index } = props;
  const onCheck = () => {
    onSelect(uri, index);
  };
  return (
    <TouchableWithoutFeedback onPress={onCheck}>
      <View style={styles.imageView}>
        <Image
          style={styles.imageLibrary}
          source={{ uri: uri }}
          resizeMode="cover"
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
