/* eslint-disable react-native/no-inline-styles */
import { CustomerResponse } from "@models";
import { Icon, Text } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { TouchableOpacity } from "react-native";
import styles from "./styles";
interface Props {
  item: CustomerResponse;
  isSelected: boolean;
  onPress: (customer: CustomerResponse) => void;
}

export const Item: FunctionComponent<Props> = props => {
  const { item, isSelected, onPress } = props;
  return (
    <TouchableOpacity
      style={[
        styles.item,
        {
          borderWidth: isSelected ? 1 : 0,
          backgroundColor: isSelected
            ? Themes.colors.white
            : Themes.colors.colGray10,
        },
      ]}
      onPress={() => onPress(item)}
    >
      <Text style={styles.itemText}>{item.Name}</Text>
      {isSelected && (
        <Icon
          name="ic_corner"
          size={Metrics.icons.small}
          color={Themes.colors.brand60}
          styles={styles.icon}
        />
      )}
    </TouchableOpacity>
  );
};
