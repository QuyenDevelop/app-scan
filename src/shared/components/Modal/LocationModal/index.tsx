import { ScreenUtils } from "@helpers";
import { LocationResponse } from "@models";
import { IRootState } from "@redux";
import { BaseBottomSheet, Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FlatList, TextInput, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import styles from "./styles";

interface Props {
  isShowModal: boolean;
  closeModal: () => void;
  onSelectLocation: (value: LocationResponse) => void;
}
export const LocationModal: FunctionComponent<Props> = props => {
  const { isShowModal, closeModal, onSelectLocation } = props;
  const locations = useSelector(
    (state: IRootState) => state.shipmentInfo.shipmentLocations,
  ) as Array<LocationResponse>;

  const [findLocations, setFindLocation] = useState<Array<LocationResponse>>(
    [],
  );

  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    setFindLocation(
      locations.filter(location =>
        location.Name.toLowerCase().includes(searchText.trim().toLowerCase()),
      ),
    );
  }, [locations, searchText]);

  const keyExtractor = useCallback(
    (item: LocationResponse, index: number) => `${item.Id}_${index}`,
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: LocationResponse }) => {
      const selectLocation = () => {
        closeModal();
        onSelectLocation(item);
      };
      return (
        <TouchableOpacity onPress={selectLocation}>
          <View style={styles.serviceSelect}>
            <Icon
              name="ic_location_1"
              size={Metrics.icons.small}
              color={Themes.colors.brand60}
            />
            <Text style={{ marginLeft: ScreenUtils.calculatorWidth(8) }}>
              {item.Name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [closeModal, onSelectLocation],
  );

  return (
    <BaseBottomSheet isShowModal={isShowModal} onCloseModal={closeModal}>
      <View style={styles.bottomModal}>
        <View style={styles.headerBottomSheet}>
          <Text style={styles.qrUserManual}>{translate("label.location")}</Text>
          <TouchableOpacity onPress={closeModal}>
            <Icon
              name="ic_close"
              size={Metrics.icons.large}
              color={Themes.colors.coolGray60}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder={translate("label.location")}
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
        <FlatList
          data={findLocations}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          style={styles.bottomModal}
          ListEmptyComponent={
            <Text style={styles.noData}>{translate("label.noData")}</Text>
          }
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </BaseBottomSheet>
  );
};
