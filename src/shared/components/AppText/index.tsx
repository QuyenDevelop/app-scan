import { Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { StyleSheet, Text as RNText, TextProps } from "react-native";

export const Text: FunctionComponent<TextProps> = props => {
  const { children, style, ...prop } = props;

  return (
    <RNText
      allowFontScaling={false}
      style={[styles.defaultStyle, style]}
      {...prop}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    ...Themes.font.medium,
    fontSize: 14,
    color: Themes.colors.coolGray100,
    fontWeight: "400",
  },
});
