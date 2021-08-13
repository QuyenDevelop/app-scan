import { payCodApi } from "@api";
import { Alert, Utils } from "@helpers";
import { useShow } from "@hooks";
import {
  CurrencyResponse,
  CustomerResponse,
  ShipmentItemCodResponse,
} from "@models";
import { BaseBottomSheet, Button, Text, translate } from "@shared";
import { Themes } from "@themes";
import React, { FunctionComponent, useState } from "react";
import { FlatList } from "react-native";
import { ConfirmItem } from "./ConfirmItem";
import styles from "./styles";

interface Props {
  isShowModal?: boolean;
  closeModal: () => void;
  shipments: Array<ShipmentItemCodResponse>;
  totalCOD: number;
  currency: CurrencyResponse;
  customer: CustomerResponse;
  updateStatus: (value: number) => void;
  trackingNumber: string;
  amountLocal: number;
}

export const ConfirmPaymentModal: FunctionComponent<Props> = props => {
  const {
    closeModal,
    shipments,
    totalCOD,
    currency,
    customer,
    updateStatus,
    trackingNumber,
    amountLocal,
  } = props;

  const [totalCod, setTotalCod] = useState<number>(totalCOD);
  const [listShipment, setListShipment] =
    useState<Array<ShipmentItemCodResponse>>(shipments);
  const [isLoadingConfirm, showLoadingConfirm, hideLoadingConfirm] = useShow();

  const getTotalCOD = (
    arrayShipment: Array<ShipmentItemCodResponse>,
  ): number => {
    return (
      arrayShipment.reduce((accumulator, currentValue) => {
        if (currentValue.CODAmoutPay) {
          return accumulator + currentValue.CODAmoutPay;
        } else {
          return accumulator + currentValue.CODAmount;
        }
      }, 0) || 0
    );
  };

  const renderItem = ({ item }: { item: ShipmentItemCodResponse }) => {
    const onChangeCodAmount = (value: number) => {
      const newArr = listShipment.map(shipment => {
        if (shipment.ShipmentId === item.ShipmentId) {
          return { ...shipment, CODAmount: value };
        }
        return shipment;
      });
      setListShipment(newArr);
      const total = getTotalCOD(newArr);
      setTotalCod(total);
    };
    return <ConfirmItem item={item} onChangeCodAmount={onChangeCodAmount} />;
  };

  const confirmPayment = () => {
    const shipmentsCod = listShipment.map(shipment => ({
      shipmentId: shipment.ShipmentId,
      codAmountPay: shipment.CODAmoutPay
        ? shipment.CODAmoutPay
        : shipment.CODAmount,
    }));
    showLoadingConfirm();
    payCodApi
      .updateAmountPay({
        customerId: customer.Id,
        customerCode: customer.Code,
        trackingNumber: trackingNumber,
        currencyCode: currency.CurrencyCode,
        amountLocal: amountLocal,
        rate: currency?.Rate || 0,
        amountPay: totalCod,
        shipments: shipmentsCod,
      })
      ?.then(response => {
        if (response.success) {
          closeModal();
          updateStatus(totalCod);
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
  };

  return (
    <BaseBottomSheet isShowModal={true} onCloseModal={closeModal}>
      <FlatList
        data={listShipment}
        keyExtractor={item => `${item.ShipmentId}`}
        renderItem={renderItem}
        style={styles.bottomModal}
        ListHeaderComponent={
          <Text style={styles.totalCOD}>
            {translate("label.totalCod")} {Utils.formatMoney(totalCod)}{" "}
            {currency.CurrencyCode}
          </Text>
        }
        ListFooterComponent={
          <Button
            title={translate("button.confirmPayment")}
            buttonChildStyle={[
              styles.confirmPaymentBtn,
              {
                backgroundColor:
                  totalCod !== getTotalCOD(listShipment)
                    ? Themes.colors.collGray40
                    : Themes.colors.primary,
              },
            ]}
            isLoading={isLoadingConfirm}
            isDisable={totalCod !== getTotalCOD(listShipment)}
            onPress={confirmPayment}
          />
        }
      />
    </BaseBottomSheet>
  );
};
