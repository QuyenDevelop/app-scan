import { ScreenUtils } from "@helpers";
import { PostOfficeItemResponse } from "@models";
import { IRootState } from "@redux";
import { BaseBottomSheet, Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import styles from "./styles";

interface Props {
  isShowModal: boolean;
  closeModal: () => void;
  onSelectPostOffice: (value: PostOfficeItemResponse) => void;
}
export const ChoosePostOfficeModal: FunctionComponent<Props> = props => {
  const { isShowModal, closeModal, onSelectPostOffice } = props;
  const postOffices = useSelector(
    (state: IRootState) => state.account.postOffices,
  );

  const renderItem = ({ item }: { item: PostOfficeItemResponse }) => {
    const selectLocation = () => {
      closeModal();
      onSelectPostOffice(item);
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
        <FlatList
          data={postOffices}
          keyExtractor={(item: PostOfficeItemResponse, index: number) =>
            `${item.Id}_${index}`
          }
          renderItem={renderItem}
          style={styles.bottomModal}
        />
      </View>
    </BaseBottomSheet>
  );
};
