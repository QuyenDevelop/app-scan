import { Account } from "@models";
import { goToLogin } from "@navigation";
import { IRootState } from "@redux";
import { Text } from "@shared";
import React, { FunctionComponent } from "react";
import { TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";
import styles from "./styles";
interface Props {
  title: string;
  content?: string;
  icon: any;
  onPress: () => void;
}

const HomeItem: FunctionComponent<Props> = props => {
  const { title, icon, onPress } = props;
  const profile = useSelector(
    (state: IRootState) => state.account.profile,
  ) as Account | null;

  const onPressItem = () => {
    if (profile) {
      onPress();
      return;
    }

    goToLogin();
  };
  return (
    <TouchableOpacity onPress={onPressItem}>
      <View style={styles.homeItem}>
        <FastImage
          source={icon}
          style={styles.iconHomeItem}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.contentHomeItem}>
          <Text style={styles.titleHomeItem}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HomeItem;
