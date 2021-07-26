import { ScreenUtils } from "@helpers";
import { FontFamily, Metrics, Themes } from "@themes";
import React, { FunctionComponent, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  KeyboardTypeOptions,
  StyleProp,
  Text,
  TextInput as Input,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { Icon } from "../Icon";
import { styles } from "./styles";

interface OwnProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  countryCode?: CountryCode;
  onChangeText?: (value: string) => void;
  onSelectCountry?: (value: Country) => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  iconName?: string;
  iconColor?: string;
  iconNameSize?: number;
  iconRightName?: string;
  iconRightColor?: string;
  iconRightSize?: number;
  onPressIconRight?: () => void;
  isRequired?: boolean;
  loading?: boolean;
  phoneInput?: boolean;
  textRight?: string;
  keyboardType?: KeyboardTypeOptions;
}

type Props = OwnProps;

export const TextInput: FunctionComponent<Props> = props => {
  const inputRef = useRef(null);
  const {
    errorMessage,
    value,
    onChangeText,
    label,
    containerStyle,
    iconName,
    iconNameSize,
    iconColor,
    iconRightName,
    iconRightColor,
    keyboardType,
    secureTextEntry,
    onPressIconRight,
    iconRightSize,
    isRequired,
    inputStyle,
    loading,
    phoneInput,
    countryCode,
    onSelectCountry,
    textRight,
    ...rest
  } = props;

  const getInputStyle = () => {
    if (errorMessage) {
      return styles.inputErrorContainer;
    }
    return styles.inputDefaultContainer;
  };

  useEffect(() => {
    // @ts-ignore
    inputRef?.current?.setNativeProps({
      style: {
        fontFamily: FontFamily.regular,
        height: ScreenUtils.calculatorHeight(40),
      },
    });
  }, []);

  return (
    <View style={containerStyle}>
      {label && (
        <Text style={styles.label}>
          {label}
          <Text style={styles.required}>{isRequired ? " *" : ""}</Text>
        </Text>
      )}
      <View style={[getInputStyle(), inputStyle]}>
        {iconName && (
          <Icon
            name={iconName}
            size={iconNameSize ? iconNameSize : Metrics.icons.small}
            color={iconColor ? iconColor : Themes.colors.collGray40}
            styles={styles.leftIcon}
          />
        )}
        {phoneInput && (
          <View
            style={{
              marginTop: errorMessage
                ? ScreenUtils.calculatorHeight(-2)
                : ScreenUtils.calculatorHeight(-10),
            }}
          >
            <CountryPicker
              countryCode={countryCode!}
              theme={{
                fontSize: 16,
                ...Themes.font.regular,
                color: Themes.colors.textPrimary,
              }}
              withFilter
              withFlagButton
              withCountryNameButton={false}
              withCallingCodeButton
              withEmoji
              onSelect={onSelectCountry}
              translation="common"
              closeButtonImageStyle={{
                width: ScreenUtils.calculatorWidth(20),
              }}
              containerButtonStyle={{
                paddingTop: ScreenUtils.calculatorHeight(9),
              }}
            />
          </View>
        )}
        <Input
          ref={inputRef}
          allowFontScaling={false}
          editable={props.editable}
          {...rest}
          onChangeText={(value: string) => onChangeText && onChangeText(value)}
          value={value}
          keyboardType={keyboardType || "default"}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={Themes.colors.collGray40}
          style={[styles.input, rest.style]}
          multiline={false}
        />
        {iconRightName &&
          (loading ? (
            <ActivityIndicator size="small" color={Themes.colors.collGray40} />
          ) : (
            <TouchableOpacity
              onPress={onPressIconRight ? () => onPressIconRight() : () => {}}
              style={styles.rightIcon}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon
                name={iconRightName}
                size={iconRightSize ? iconRightSize : Metrics.icons.small}
                color={iconRightColor ? iconRightColor : Themes.colors.coolGray}
              />
            </TouchableOpacity>
          ))}

        {textRight &&
          (loading ? (
            <ActivityIndicator size="small" color={Themes.colors.collGray40} />
          ) : (
            <TouchableOpacity
              onPress={onPressIconRight ? () => onPressIconRight() : () => {}}
              style={styles.rightIcon}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {textRight ? (
                <Text style={{ color: Themes.colors.coolGray }}>
                  {textRight}
                </Text>
              ) : null}
            </TouchableOpacity>
          ))}
      </View>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};
