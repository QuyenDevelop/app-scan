import { Header } from "@components";
import { useShipmentInfo } from "@hooks";
import { CustomerResponse } from "@models";
import { IRootState } from "@redux";
import { Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent, useEffect, useState } from "react";
import { FlatList, Modal, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { Item } from "./Item";
import styles from "./styles";

interface Props {
  isVisible: boolean;
  closeModal: () => void;
  customer: CustomerResponse | undefined;
  selectCustomer: (customer: CustomerResponse) => void;
}

export const ChooseCustomerModal: FunctionComponent<Props> = props => {
  useShipmentInfo();
  const { isVisible, customer, closeModal, selectCustomer } = props;
  const customers = useSelector(
    (state: IRootState) => state.shipmentInfo.shipmentCustomers,
  ) as Array<CustomerResponse>;

  const [searchValue, setSearchValue] = useState<string>("");
  const [itemFilter, setItemsFilter] = useState<Array<CustomerResponse>>([]);

  useEffect(() => {
    setItemsFilter(
      customers.filter(item =>
        item.Name.trim()
          .toLowerCase()
          .includes(searchValue.trim().toLowerCase()),
      ),
    );
  }, [customers, searchValue]);

  const customerKeyExtractor = (item: CustomerResponse) => item.Id;
  const renderItem = ({ item }: { item: CustomerResponse }) => {
    const isSelected = item.Id === customer?.Id;
    const onPress = (customerSelected: CustomerResponse) => {
      selectCustomer(customerSelected);
      closeModal();
    };
    return <Item item={item} isSelected={isSelected} onPress={onPress} />;
  };
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      statusBarTranslucent={true}
    >
      <View style={styles.container}>
        <Header
          title={translate("label.customer")}
          iconLeftName={["ic_arrow_left"]}
          iconLeftOnPress={[closeModal]}
          isCenterTitle
          iconLeftColor={[Themes.colors.coolGray100]}
          style={{ backgroundColor: Themes.colors.white }}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{translate("label.findCustomer")}</Text>
          <View style={styles.searchView}>
            <Icon
              name="ic_search"
              size={Metrics.icons.smallSmall}
              color={Themes.colors.coolGray60}
            />
            <TextInput
              placeholder={translate("placeholder.enterCustomer")}
              style={styles.searchInput}
              value={searchValue}
              onChangeText={setSearchValue}
            />
          </View>
          <FlatList
            data={itemFilter}
            keyExtractor={customerKeyExtractor}
            renderItem={renderItem}
            style={styles.customers}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          />
        </View>
      </View>
    </Modal>
  );
};
