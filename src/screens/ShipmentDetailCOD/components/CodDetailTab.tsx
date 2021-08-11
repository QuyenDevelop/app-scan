import { shipmentApi } from "@api";
import { Alert, ScreenUtils, Utils } from "@helpers";
import { useShow } from "@hooks";
import { CurrencyResponse, ShipmentResponse } from "@models";
import { IRootState } from "@redux";
import { Button, CurrencyModal, Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Alert as RNAlert,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import styles from "./styles";

interface Props {
  shipment: ShipmentResponse;
}

export const CodDetailTab: FunctionComponent<Props> = props => {
  const { shipment } = props;
  const shipmentCurrencies = useSelector(
    (state: IRootState) => state.shipmentInfo.shipmentCurrencies,
  ) as Array<CurrencyResponse>;
  const [isConfirmed, setIsConfirmed] = useState<boolean>(shipment.COD);
  const [codAmount, setCodAmount] = useState<number>(shipment.CODAmount);
  const [currency, setCurrency] = useState<CurrencyResponse>();
  const [isLoadingConfirm, showLoadingConfirm, hideLoadingConfirm] = useShow();
  const [isShowCurrencies, showCurrencies, hideCurrencies] = useShow();

  useEffect(() => {
    const defaultCurrency = shipmentCurrencies.find(
      c => (c.CurrencyCode = shipment.CurrencyCode),
    );

    setCurrency(defaultCurrency);
  }, [shipment.CurrencyCode, shipmentCurrencies]);

  const onChangeCodAmount = (value: string) => {
    setCodAmount(Utils.convertMoneyTextToNumber(value));
  };

  const onConfirmPayment = () => {
    if (!currency) {
      Alert.warning("warning.noCurrency");
      return;
    }

    RNAlert.alert("", translate("alert.confirmPayment"), [
      {
        text: translate("button.cancel"),
        onPress: () => {},
        style: "cancel",
      },
      {
        text: translate("button.confirm"),
        onPress: () => {
          showLoadingConfirm();
          shipmentApi
            .updateCodShipment({
              ShipmentId: shipment.ShipmentId,
              CODAmountPay: codAmount,
            })
            ?.then(response => {
              console.log("🚀🚀🚀 => onConfirmPayment => response", response);
              if (response.success) {
                setIsConfirmed(true);
                Alert.success("success.confirmPaymentSuccess");
              } else {
                if (response.message) {
                  Alert.error(response.message, true);
                } else {
                  Alert.error("error.errorServer");
                }
              }
            })
            .catch(() => {
              Alert.error("error.errorServer");
            })
            .finally(() => {
              hideLoadingConfirm();
            });
        },
      },
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.generalTab}>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>{translate("label.codAmount")}</Text>
          <TextInput
            placeholder={translate("placeholder.enterCodAmount")}
            style={[
              styles.inputInfo,
              {
                color: isConfirmed
                  ? Themes.colors.collGray40
                  : Themes.colors.textPrimary,
              },
            ]}
            keyboardType="number-pad"
            contextMenuHidden={true}
            placeholderTextColor={Themes.colors.collGray40}
            editable={!isConfirmed}
            defaultValue={Utils.formatMoney(codAmount)}
            onChangeText={onChangeCodAmount}
          />
          <TouchableOpacity
            style={styles.serviceButton}
            onPress={showCurrencies}
            disabled={!!shipment.CustomerCode}
          >
            <Text
              style={[
                styles.labelInfo,
                {
                  marginRight: ScreenUtils.calculatorWidth(5),
                  color: shipment.CustomerCode
                    ? Themes.colors.collGray40
                    : Themes.colors.textPrimary,
                },
              ]}
            >
              {shipment.CurrencyCode}
            </Text>
            <Icon
              name="ic_arrow_down"
              size={Metrics.icons.smallSmall}
              color={
                shipment.CustomerCode
                  ? Themes.colors.collGray40
                  : Themes.colors.textPrimary
              }
            />
          </TouchableOpacity>
        </View>
        <Button
          title={translate("button.confirmPayment")}
          buttonChildStyle={[
            styles.confirmPaymentBtn,
            {
              backgroundColor: isConfirmed
                ? Themes.colors.collGray40
                : Themes.colors.primary,
            },
          ]}
          isLoading={isLoadingConfirm}
          onPress={onConfirmPayment}
          isDisable={isConfirmed}
        />
        <CurrencyModal
          isShowModal={isShowCurrencies}
          closeModal={hideCurrencies}
          currencies={shipmentCurrencies}
          onSelect={setCurrency}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
