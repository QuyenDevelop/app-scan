import { ScreenUtils } from "@helpers";
import { Icon } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./styles";

interface OwnProps {
  buttonStyle?: StyleProp<ViewStyle>;
  buttonChildStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title: string;
  onPress?: () => void;
  iconName?: string;
  isLoading?: boolean;
  loadingColor?: string;
  isDisable?: boolean;
  iconSize?: number;
  iconCorlor?: string;
  iconRightName?: string;
}

type Props = OwnProps;

export const Button: FunctionComponent<Props> = props => {
  const {
    onPress,
    title,
    iconName,
    isLoading,
    loadingColor,
    isDisable,
    titleStyle,
    buttonStyle,
    buttonChildStyle,
    iconSize,
    iconCorlor,
    iconRightName,
    ...rest
  } = props;

  return (
    <View style={buttonStyle}>
      <TouchableOpacity
        {...rest}
        onPress={() => onPress?.()}
        style={[styles.button, buttonChildStyle]}
        disabled={isDisable || isLoading}
      >
        {iconName && !isLoading && (
          <Icon
            name={iconName}
            size={iconSize ? iconSize : Metrics.icons.tiny}
            color={iconCorlor ? iconCorlor : Themes.colors.surface}
            styles={
              title
                ? {
                    marginRight: ScreenUtils.scale(6),
                  }
                : {}
            }
          />
        )}
        {!isLoading && title ? (
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        ) : null}
        {iconRightName && !isLoading && (
          <Icon
            name={iconRightName}
            size={iconSize ? iconSize : Metrics.icons.tiny}
            color={iconCorlor ? iconCorlor : Themes.colors.surface}
            styles={
              title
                ? {
                    marginLeft: ScreenUtils.scale(6),
                  }
                : {}
            }
          />
        )}
        {isLoading && (
          <ActivityIndicator
            size="small"
            color={loadingColor ? loadingColor : Themes.colors.collGray40}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};
