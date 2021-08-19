import { CustomerResponse } from "@models";
import { BaseBottomSheet, Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
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
        <Icon
          name="ic_customer"
          size={Metrics.icons.small}
          color={Themes.colors.brand60}
        />
        <Text style={styles.optionName}>{item.Name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <BaseBottomSheet isShowModal={isShowModal} onCloseModal={closeModal}>
      <View style={styles.bottomModal}>
        <View style={styles.headerBottomSheet}>
          <Text style={styles.qrUserManual}>{translate("label.customer")}</Text>
          <TouchableOpacity onPress={closeModal}>
            <Icon
              name="ic_close"
              size={Metrics.icons.large}
              color={Themes.colors.coolGray60}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={customers || []}
          keyExtractor={item => item.Code}
          renderItem={renderItem}
        />
      </View>
    </BaseBottomSheet>
  );
};
