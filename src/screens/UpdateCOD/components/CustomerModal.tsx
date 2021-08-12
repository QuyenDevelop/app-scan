import { CustomerResponse } from "@models";
import { BaseBottomSheet } from "@shared";
import React, { FunctionComponent } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

interface Props {
  isShowModal: boolean;
  closeModal: () => void;
  onSelect: (value: CustomerResponse) => void;
  customers: Array<CustomerResponse>;
}
export const CustomerModal: FunctionComponent<Props> = props => {
  const { isShowModal, closeModal, onSelect, customers } = props;
  const renderItem = ({ item }: { item: CustomerResponse }) => {
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
        data={customers || []}
        keyExtractor={item => item.Code}
        renderItem={renderItem}
        style={styles.bottomModal}
      />
    </BaseBottomSheet>
  );
};
