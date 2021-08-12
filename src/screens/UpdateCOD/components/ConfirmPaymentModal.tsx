import { Utils } from "@helpers";
import { useShow } from "@hooks";
import { ShipmentItemCodResponse } from "@models";
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
  currencyCode: string;
}

export const ConfirmPaymentModal: FunctionComponent<Props> = props => {
  const { closeModal, shipments, totalCOD, currencyCode } = props;

  const [totalCod, setTotalCod] = useState<number>(totalCOD);
  const [listShipment, setListShipment] =
    useState<Array<ShipmentItemCodResponse>>(shipments);
  const [isLoadingConfirm] = useShow();

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

  const confirmPayment = () => {};

  return (
    <BaseBottomSheet isShowModal={true} onCloseModal={closeModal}>
      <FlatList
        data={listShipment}
        keyExtractor={item => `${item.ShipmentId}`}
        renderItem={renderItem}
        style={styles.bottomModal}
        ListHeaderComponent={
          <Text style={styles.totalCOD}>
            Tổng COD: {Utils.formatMoney(totalCod)} {currencyCode}
          </Text>
        }
        ListFooterComponent={
          <Button
            title={translate("button.confirmPayment")}
            buttonChildStyle={[
              styles.confirmPaymentBtn,
              {
                backgroundColor:
                  totalCOD !== getTotalCOD(listShipment)
                    ? Themes.colors.collGray40
                    : Themes.colors.primary,
              },
            ]}
            isLoading={isLoadingConfirm}
            isDisable={totalCOD !== getTotalCOD(listShipment)}
            onPress={confirmPayment}
          />
        }
      />
    </BaseBottomSheet>
  );
};
