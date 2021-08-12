import { CurrencyResponse } from "@models";
import { BaseBottomSheet } from "@shared";
import React, { FunctionComponent } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

interface Props {
  isShowModal: boolean;
  closeModal: () => void;
  onSelect: (value: CurrencyResponse) => void;
  currencies: Array<CurrencyResponse>;
}
export const CurrencyModal: FunctionComponent<Props> = props => {
  const { isShowModal, closeModal, onSelect, currencies } = props;
  const renderItem = ({ item }: { item: CurrencyResponse }) => {
    const select = () => {
      closeModal();
      onSelect(item);
    };
    return (
      <TouchableOpacity style={styles.serviceSelect} onPress={select}>
        <Text>{item.Name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <BaseBottomSheet isShowModal={isShowModal} onCloseModal={closeModal}>
      <FlatList
        data={currencies || []}
        keyExtractor={item => item.Id}
        renderItem={renderItem}
        style={styles.bottomModal}
      />
    </BaseBottomSheet>
  );
};
