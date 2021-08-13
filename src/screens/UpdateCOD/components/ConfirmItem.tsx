import { ScreenUtils, Utils } from "@helpers";
import { ShipmentItemCodResponse } from "@models";
import { Text, translate } from "@shared";
import { Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { TextInput, View } from "react-native";
import styles from "./styles";

interface Props {
  item: ShipmentItemCodResponse;
  onChangeCodAmount: (value: number) => void;
}
export const ConfirmItem: FunctionComponent<Props> = props => {
  const { item, onChangeCodAmount } = props;
  const onChangeText = (value: string) => {
    onChangeCodAmount(Utils.convertMoneyTextToNumber(value));
  };
  return (
    <View style={styles.shipmentConfirm}>
      <Text>
        {translate("label.shipmentNumber")} {item.ShipmentNumber}
      </Text>
      <View style={styles.codView}>
        <Text
          style={[
            styles.labelInfo,
            {
              marginRight: ScreenUtils.calculatorWidth(5),
            },
          ]}
        >
          {translate("label.codAmount")}
        </Text>
        <TextInput
          placeholder={translate("placeholder.enterCodAmount")}
          style={[
            styles.inputInfo,
            {
              color:
                item.COD || !!item.CODAmoutPay
                  ? Themes.colors.collGray40
                  : Themes.colors.textPrimary,
            },
          ]}
          value={Utils.formatMoney(
            item.CODAmoutPay ? item.CODAmoutPay : item.CODAmount,
          )}
          onChangeText={onChangeText}
          maxLength={20}
          keyboardType="number-pad"
          contextMenuHidden={true}
          placeholderTextColor={Themes.colors.collGray40}
          editable={!item.COD && !item.CODAmoutPay}
        />
        <Text
          style={[
            styles.labelInfo,
            {
              marginRight: ScreenUtils.calculatorWidth(5),
            },
          ]}
        >
          {item.CurrencyCode}
        </Text>
      </View>
    </View>
  );
};
