import { ScreenUtils } from "@helpers";
import { useShow } from "@hooks";
import {
  CurrencyResponse,
  CustomerResponse,
  ShipmentCODResponse,
} from "@models";
import { IRootState, ShipmentInfoAction } from "@redux";
import { Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
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
      c => (c.Id = item.CurrencyId),
    );

    setCurrency(defaultCurrency);
  }, [item.CurrencyId, shipmentCurrencies]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.generalTab}>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>{translate("label.customer")}</Text>
          <TouchableOpacity
            style={[styles.serviceButton, styles.flex1]}
            onPress={showCustomers}
          >
            <Text
              style={[
                styles.labelInfo,
                { marginRight: ScreenUtils.calculatorWidth(5) },
              ]}
            >
              {customer?.Name || translate("label.selectCustomer")}
            </Text>
            <Icon
              name="ic_arrow_down"
              size={Metrics.icons.smallSmall}
              color={Themes.colors.black}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>{translate("label.codAmount")}</Text>
          <TextInput
            placeholder={translate("placeholder.enterCodAmount")}
            style={styles.inputInfo}
            keyboardType="number-pad"
            contextMenuHidden={true}
            placeholderTextColor={Themes.colors.collGray40}
          />
          <TouchableOpacity
            style={styles.serviceButton}
            onPress={showCurrencies}
          >
            <Text
              style={[
                styles.labelInfo,
                { marginRight: ScreenUtils.calculatorWidth(5) },
              ]}
            >
              {currency?.CurrencyCode || translate("label.selectCurrency")}
            </Text>
            <Icon
              name="ic_arrow_down"
              size={Metrics.icons.smallSmall}
              color={Themes.colors.black}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.confirmPaymentBtn}>
          <Text style={styles.confirmPaymentText}>
            {translate("button.confirmPayment")}
          </Text>
        </TouchableOpacity>
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
