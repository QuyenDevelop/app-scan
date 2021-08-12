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

  const renderItem = ({
    item,
    index,
  }: {
    item: ShipmentItemCodResponse;
    index: number;
  }) => {
    const onChangeCodAmount = (value: string) => {
      const newArr = [...listShipment];
      newArr[index].CODAmount = Utils.convertMoneyTextToNumber(value);
      // setListShipment(newArr);
      const total = getTotalCOD(newArr);
      setTotalCod(total);
    };
    return (
      <ConfirmItem
        item={item}
        index={index}
        onChangeCodAmount={onChangeCodAmount}
      />
    );
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
            Tổng COD: {Utils.formatMoney(totalCod)} {currencyCode}
          </Text>
        }
        ListFooterComponent={
          <Button
            title={translate("button.confirmPayment")}
            buttonChildStyle={[
              styles.confirmPaymentBtn,
              {
                backgroundColor: false
                  ? Themes.colors.collGray40
                  : Themes.colors.primary,
              },
            ]}
            isLoading={isLoadingConfirm}
            isDisable={false}
            onPress={closeModal}
          />
        }
      />
    </BaseBottomSheet>
  );
};
