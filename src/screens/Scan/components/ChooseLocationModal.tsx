import { Header } from "@components";
import { ScreenUtils } from "@helpers";
import { useShipmentInfo } from "@hooks";
import { LocationResponse } from "@models";
import { selectorLocation } from "@redux";
import { Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent, useState } from "react";
import {
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import styles from "./styles";

interface Props {
  isVisible: boolean;
  closeModal: () => void;
  // customer: CustomerResponse | undefined;
  onSelectLocation: (location: LocationResponse) => void;
}

export const ChooseLocationModal: FunctionComponent<Props> = props => {
  useShipmentInfo();
  const { isVisible, closeModal, onSelectLocation } = props;
  const [searchValue, setSearchValue] = useState<string>("");
  const locations = useSelector(selectorLocation(searchValue));

  const customerKeyExtractor = (item: LocationResponse) => item.Id;
  const renderItem = ({ item }: { item: LocationResponse }) => {
    const selectLocation = () => {
      onSelectLocation(item);
      closeModal();
      setSearchValue("");
    };
    return (
      <TouchableOpacity onPress={selectLocation}>
        <View style={styles.serviceSelect}>
          <Icon
            name="ic_location_1"
            size={Metrics.icons.small}
            color={Themes.colors.brand60}
          />
          <Text style={{ marginLeft: ScreenUtils.scale(8) }}>{item.Name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      statusBarTranslucent={true}
    >
      <View style={styles.container}>
        <Header
          title={translate("label.location")}
          iconLeftName={["ic_arrow_left"]}
          iconLeftOnPress={[closeModal]}
          isCenterTitle
          iconLeftColor={[Themes.colors.coolGray100]}
          style={{ backgroundColor: Themes.colors.white }}
        />
        <View style={styles.content}>
          <View style={styles.searchView}>
            <Icon
              name="ic_search"
              size={Metrics.icons.smallSmall}
              color={Themes.colors.coolGray60}
            />
            <TextInput
              placeholder={translate("placeholder.searchForAnswer")}
              style={styles.searchInput}
              value={searchValue}
              onChangeText={setSearchValue}
            />
          </View>
          <FlatList
            data={locations.sort((a, b) => a.Name.localeCompare(b.Name))}
            keyExtractor={customerKeyExtractor}
            renderItem={renderItem}
            style={styles.bottomModal}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          />
        </View>
      </View>
    </Modal>
  );
};
