import { Header } from "@components";
import { useShipmentInfo } from "@hooks";
import { ShipmentStatusResponse } from "@models";
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
  status: ShipmentStatusResponse | undefined;
  selectStatus: (customer: ShipmentStatusResponse) => void;
}

export const ChooseStatusModal: FunctionComponent<Props> = props => {
  useShipmentInfo();
  const { isVisible, status, closeModal, selectStatus } = props;
  const allStatus = useSelector(
    (state: IRootState) => state.shipmentInfo.shipmentStatus,
  ) as Array<ShipmentStatusResponse>;

  const [searchValue, setSearchValue] = useState<string>("");
  const [itemFilter, setItemsFilter] = useState<Array<ShipmentStatusResponse>>(
    [],
  );

  useEffect(() => {
    setItemsFilter(
      allStatus.filter(item =>
        item.Name.trim()
          .toLowerCase()
          .includes(searchValue.trim().toLowerCase()),
      ),
    );
  }, [allStatus, searchValue]);

  const customerKeyExtractor = (item: ShipmentStatusResponse) =>
    item.Code.toString();
  const renderItem = ({ item }: { item: ShipmentStatusResponse }) => {
    const isSelected = item.Code === status?.Code;
    const onPress = (customerSelected: ShipmentStatusResponse) => {
      selectStatus(customerSelected);
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
          title={translate("label.status")}
          iconLeftName={["ic_arrow_left"]}
          iconLeftOnPress={[closeModal]}
          isCenterTitle
          style={{ backgroundColor: Themes.colors.white }}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{translate("label.findStatus")}</Text>
          <View style={styles.searchView}>
            <Icon
              name="ic_search"
              size={Metrics.icons.smallSmall}
              color={Themes.colors.coolGray60}
            />
            <TextInput
              placeholder={translate("placeholder.enterStatus")}
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
