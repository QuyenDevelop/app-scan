import { Icon } from "@shared";
import { Metrics, Themes } from "@themes";
import * as React from "react";
import { FunctionComponent } from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import styles from "./styles";

interface OwnProps {
  checked?: boolean;
  onChange?: () => void;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  style?: ViewStyle;
  containerStyles?: ViewStyle;
  numberLine?: number;
  isDisable?: boolean;
}

type Props = OwnProps;

export const Checkbox: FunctionComponent<Props> = props => {
  const {
    onChange,
    checked,
    style,
    title,
    titleStyle,
    containerStyles,
    numberLine,
    isDisable,
  } = props;

  return (
    <View style={[styles.container, containerStyles]}>
      <TouchableOpacity
        disabled={isDisable}
        onPress={() => (onChange ? onChange() : {})}
        style={[
          styles.childContainer,
          style,
          {
            backgroundColor: checked
              ? Themes.colors.primary
              : Themes.colors.white,
            borderWidth: checked ? 0 : 1,
          },
        ]}
      >
        {checked ? (
          <Icon
            name={"ic_check"}
            size={Metrics.icons.smallSmall}
            color={Themes.colors.white}
          />
        ) : null}
      </TouchableOpacity>
      {title ? (
        <Text
          numberOfLines={numberLine ? numberLine : 1}
          style={[styles.title, titleStyle]}
        >
          {title}
        </Text>
      ) : null}
    </View>
  );
};
