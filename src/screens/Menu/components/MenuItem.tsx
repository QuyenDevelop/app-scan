import { Icon, Text } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
interface Props {
  title: string;
  icon: any;
  onPress: () => void;
}

const MenuItem: FunctionComponent<Props> = props => {
  const { title, icon, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.menuItem}>
        <View style={styles.leftMenuItem}>
          {/* <FastImage
            source={icon}
            style={styles.iconMenuItem}
            resizeMode={FastImage.resizeMode.cover}
          /> */}
          <Text style={styles.titleMenuItem}>{title}</Text>
        </View>

        <Icon
          name="ic_long_arrow_right"
          size={Metrics.icons.small}
          color={Themes.colors.coolGray60}
        />
      </View>
    </TouchableOpacity>
  );
};

export default MenuItem;
