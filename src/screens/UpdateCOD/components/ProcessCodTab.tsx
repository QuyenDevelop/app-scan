import { payCodApi } from "@api";
import { Alert, ScreenUtils, Utils } from "@helpers";
import { useShow } from "@hooks";
import {
  CurrencyResponse,
  CustomerResponse,
  ShipmentCODResponse,
} from "@models";
import { IRootState, ShipmentInfoAction } from "@redux";
import { Button, Icon, Text, translate } from "@shared";
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
import { useDispatch, useSelector } from "react-redux";
import { CurrencyModal } from "./CurrencyModal";
import { CustomerModal } from "./CustomerModal";
import styles from "./styles";

interface Props {
  item: ShipmentCODResponse;
}

export const ProcessCodTab: FunctionComponent<Props> = props => {
  const { item } = props;
  console.log("🚀🚀🚀 => item", item);
  const dispatch = useDispatch();
  const shipmentCustomers = useSelector(
    (state: IRootState) => state.shipmentInfo.shipmentCustomers,
  ) as Array<CustomerResponse>;
  const shipmentCurrencies = useSelector(
    (state: IRootState) => state.shipmentInfo.shipmentCurrencies,
  ) as Array<CurrencyResponse>;
  const [customer, setCustomer] = useState<CustomerResponse>();
  const [isShowCustomers, showCustomers, hideCustomers] = useShow();
  const [currency, setCurrency] = useState<CurrencyResponse>();
  const [isShowCurrencies, showCurrencies, hideCurrencies] = useShow();
  const [codAmount, setCodAmount] = useState<number>(item.CODAmount);
  const [codAmountPay, setCodAmountPay] = useState<number>(item.CODAmountPay);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(item.COD);
  const [isLoadingConfirm, showLoadingConfirm, hideLoadingConfirm] = useShow();
  useEffect(() => {
    if (shipmentCustomers.length === 0) {
      dispatch(ShipmentInfoAction.getAllCustomer());
    }

    if (shipmentCurrencies.length === 0) {
      dispatch(ShipmentInfoAction.getAllCurrency());
    }
  }, [dispatch, shipmentCurrencies.length, shipmentCustomers.length]);

  useEffect(() => {
    const defaultCustomer = shipmentCustomers.find(
      c => (c.Id = item.CustomerId),
    );

    setCustomer(defaultCustomer);
  }, [item.CustomerId, shipmentCustomers]);

  useEffect(() => {
    const defaultCurrency = shipmentCurrencies.find(
      c => (c.CurrencyCode = item.CurrencyCode),
    );

    setCurrency(defaultCurrency);
  }, [item.CurrencyCode, shipmentCurrencies]);

  const onChangeCodAmount = (value: string) => {
    setCodAmount(Utils.convertMoneyTextToNumber(value));
  };

  const onConfirmPayment = () => {
    if (!customer) {
      Alert.warning("warning.noCustomer");
      return;
    }

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
          payCodApi
            .updateAmountPay({
              customerId: customer.Id,
              customerCode: customer.Code,
              trackingNumber: item.Id,
              currencyCode: currency.CurrencyCode,
              amountLocal: item.CODAmount,
              rate: currency?.Rate || 0,
              amountPay: codAmount,
            })
            ?.then(response => {
              console.log("🚀🚀🚀 => onConfirmPayment => response", response);
              if (response.success) {
                setCodAmountPay(codAmount);
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
          <Text style={styles.labelInfo}>{translate("label.customer")}</Text>
          <TouchableOpacity
            style={[styles.serviceButton, styles.flex1]}
            onPress={showCustomers}
            disabled={!!item.CustomerCode}
          >
            <Text
              style={[
                styles.labelInfo,
                {
                  marginRight: ScreenUtils.calculatorWidth(5),
                  color: item.CustomerCode
                    ? Themes.colors.collGray40
                    : Themes.colors.textPrimary,
                },
              ]}
            >
              {customer?.Name || translate("label.selectCustomer")}
            </Text>
            <Icon
              name="ic_arrow_down"
              size={Metrics.icons.smallSmall}
              color={
                item.CustomerCode
                  ? Themes.colors.collGray40
                  : Themes.colors.textPrimary
              }
            />
          </TouchableOpacity>
        </View>
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
            keyboardType="numeric"
            contextMenuHidden={true}
            placeholderTextColor={Themes.colors.collGray40}
            editable={!isConfirmed}
            defaultValue={Utils.formatMoney(codAmount)}
            onChangeText={onChangeCodAmount}
          />
          <TouchableOpacity
            style={styles.serviceButton}
            onPress={showCurrencies}
            disabled={!!item.CustomerCode}
          >
            <Text
              style={[
                styles.labelInfo,
                {
                  marginRight: ScreenUtils.calculatorWidth(5),
                  color: item.CustomerCode
                    ? Themes.colors.collGray40
                    : Themes.colors.textPrimary,
                },
              ]}
            >
              {currency?.CurrencyCode || translate("label.selectCurrency")}
            </Text>
            <Icon
              name="ic_arrow_down"
              size={Metrics.icons.smallSmall}
              color={
                item.CustomerCode
                  ? Themes.colors.collGray40
                  : Themes.colors.textPrimary
              }
            />
          </TouchableOpacity>
        </View>
        {!!codAmountPay && (
          <View style={styles.generalInfoRow}>
            <Text style={styles.labelInfo}>{translate("label.newCOD")}</Text>
            <TextInput
              placeholder={translate("placeholder.enterCodAmount")}
              style={[styles.inputInfo, { color: Themes.colors.collGray40 }]}
              keyboardType="numeric"
              contextMenuHidden={true}
              placeholderTextColor={Themes.colors.collGray40}
              editable={false}
              defaultValue={Utils.formatMoney(codAmountPay)}
            />
            <TouchableOpacity
              style={styles.serviceButton}
              onPress={showCurrencies}
              disabled={true}
            >
              <Text
                style={[
                  styles.labelInfo,
                  {
                    marginRight: ScreenUtils.calculatorWidth(5),
                    color: Themes.colors.collGray40,
                  },
                ]}
              >
                {item?.CurrencyCode || translate("label.selectCurrency")}
              </Text>
              <Icon
                name="ic_arrow_down"
                size={Metrics.icons.smallSmall}
                color={Themes.colors.collGray40}
              />
            </TouchableOpacity>
          </View>
        )}
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
        <CustomerModal
          isShowModal={isShowCustomers}
          closeModal={hideCustomers}
          customers={shipmentCustomers}
          onSelect={setCustomer}
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
