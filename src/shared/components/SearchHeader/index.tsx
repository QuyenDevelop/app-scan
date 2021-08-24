import { useNavigation } from "@react-navigation/native";
import { Icon, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";

interface Props {
  searchValue: string;
  onChange: (value: string) => void;
}

export const SearchHeader: FunctionComponent<Props> = props => {
  const { searchValue, onChange } = props;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TouchableOpacity
        hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
        onPress={() => navigation.goBack()}
      >
        <Icon
          color={Themes.colors.white}
          name="ic_arrow_left"
          size={Metrics.icons.small}
        />
      </TouchableOpacity>
      <View style={styles.searchView}>
        <Icon
          color={Themes.colors.coolGray60}
          name="ic_search"
          size={Metrics.icons.small}
        />
        <TextInput
          placeholder={translate("placeholder.searchShipmentManage")}
          placeholderTextColor={Themes.colors.collGray40}
          style={styles.searchInput}
          defaultValue={searchValue}
          onChangeText={onChange}
        />
        <Icon
          color={Themes.colors.coolGray80}
          name="ic_tracking_order"
          size={Metrics.icons.small}
        />
      </View>
    </View>
  );
};
