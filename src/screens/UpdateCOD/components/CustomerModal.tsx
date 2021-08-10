import { CustomerResponse } from "@models";
import { BaseBottomSheet } from "@shared";
import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface Props {
  isShowModal: boolean;
  closeModal: () => void;
  onSelect: (value: CustomerResponse) => void;
  customers: Array<CustomerResponse>;
}
export const CustomerModal: FunctionComponent<Props> = props => {
  const { isShowModal, closeModal, onSelect, customers } = props;
  const Customer = ({ customer }: { customer: CustomerResponse }) => {
    const select = () => {
      closeModal();
      onSelect(customer);
    };
    return (
      <TouchableOpacity style={styles.serviceSelect} onPress={select}>
        <Text>{customer.Name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <BaseBottomSheet isShowModal={isShowModal} onCloseModal={closeModal}>
      <View style={styles.bottomModal}>
        {customers &&
          customers.map(customer => (
            <Customer customer={customer} key={customer.Code} />
          ))}
      </View>
    </BaseBottomSheet>
  );
};
