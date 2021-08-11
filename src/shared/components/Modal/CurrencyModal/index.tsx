import { CurrencyResponse } from "@models";
import { BaseBottomSheet } from "@shared";
import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface Props {
  isShowModal: boolean;
  closeModal: () => void;
  onSelect: (value: CurrencyResponse) => void;
  currencies: Array<CurrencyResponse>;
}
export const CurrencyModal: FunctionComponent<Props> = props => {
  const { isShowModal, closeModal, onSelect, currencies } = props;
  const Currency = ({ currency }: { currency: CurrencyResponse }) => {
    const select = () => {
      closeModal();
      onSelect(currency);
    };
    return (
      <TouchableOpacity style={styles.serviceSelect} onPress={select}>
        <Text>{currency.Name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <BaseBottomSheet isShowModal={isShowModal} onCloseModal={closeModal}>
      <View style={styles.bottomModal}>
        {currencies &&
          currencies.map(currency => (
            <Currency
              currency={currency}
              key={`${currency.Id}_${currency.Name}`}
            />
          ))}
      </View>
    </BaseBottomSheet>
  );
};
