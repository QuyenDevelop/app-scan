import { CurrencyResponse } from "@models";
import { BaseBottomSheet, Icon, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
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
        <Icon
          name="ic_money"
          size={Metrics.icons.smallSmall}
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
          <Text style={styles.qrUserManual}>{translate("label.currency")}</Text>
          <TouchableOpacity onPress={closeModal}>
            <Icon
              name="ic_close"
              size={Metrics.icons.large}
              color={Themes.colors.coolGray60}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={currencies || []}
          keyExtractor={item => item.Id}
          renderItem={renderItem}
          style={styles.bottomModal}
        />
      </View>
    </BaseBottomSheet>
  );
};
