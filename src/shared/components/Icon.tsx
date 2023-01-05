import { Icons } from "@themes";
import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

export interface IconProps {
  name: string;
  size: number;
  color: string;
  styles?: StyleProp<ViewStyle>;
}

export function Icon(props: IconProps) {
  const { name, size, color, styles } = props;
  return (
    <View style={styles}>
      <Icons.EzbileIcon name={name} size={size} color={color} style={styles} />
    </View>
  );
}
