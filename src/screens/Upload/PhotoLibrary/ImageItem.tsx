import { Icon } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { Image, TouchableWithoutFeedback, View } from "react-native";
import styles from "./styles";

interface Props {
  uri: string;
  isChecked: boolean;
  onSelect: (url: string) => void;
}
export const ImageItem: FunctionComponent<Props> = props => {
  const { uri, isChecked, onSelect } = props;
  const onCheck = () => {
    onSelect(uri);
  };
  return (
    <TouchableWithoutFeedback onPress={onCheck}>
      <View style={styles.imageView}>
        <Image
          style={[
            styles.imageLibrary,
            {
              borderWidth: isChecked ? 1 : 0,
              borderColor: Themes.colors.primary,
            },
          ]}
          source={{ uri: uri }}
        />
        {isChecked && (
          <Icon
            name="ic_check-circle"
            size={Metrics.icons.smallSmall}
            color={Themes.colors.primary}
            styles={styles.iconCheck}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
