import { ScreenUtils } from "@helpers";
import { BaseBottomSheet, Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { TouchableOpacity, View } from "react-native";
import { ModeShipmentResponse } from "src/models/Response/ServiceResponse";
import styles from "./styles";

interface Props {
  isShowModal: boolean;
  closeModal: () => void;
  onSelectMode: (value: ModeShipmentResponse) => void;
  modes: Array<ModeShipmentResponse>;
}
export const ModeModal: FunctionComponent<Props> = props => {
  const { isShowModal, closeModal, onSelectMode, modes } = props;
  const Mode = ({ mode }: { mode: ModeShipmentResponse }) => {
    const selectMode = () => {
      closeModal();
      onSelectMode(mode);
    };

    const getIconName = () => {
      switch (mode.Code) {
        case 1:
          return "ic_plane";
        case 2:
          return "ic_ship";
        case 3:
          return "ic_truck";
        default:
          return "";
      }
    };

    const getIconColor = () => {
      switch (mode.Code) {
        case 1:
          return Themes.colors.info60;
        case 2:
          return Themes.colors.warningMain;
        case 3:
          return Themes.colors.success60;
        default:
          return Themes.colors.brand60;
      }
    };
    return (
      <TouchableOpacity onPress={selectMode}>
        <View style={styles.serviceSelect}>
          <Icon
            name={getIconName()}
            size={Metrics.icons.small}
            color={getIconColor()}
          />
          <Text style={{ marginLeft: ScreenUtils.scale(8) }}>{mode.Name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <BaseBottomSheet isShowModal={isShowModal} onCloseModal={closeModal}>
      <View style={styles.bottomModal}>
        <View style={styles.headerBottomSheet}>
          <Text style={styles.qrUserManual}>
            {translate("label.shippingMode")}
          </Text>
          <TouchableOpacity onPress={closeModal}>
            <Icon
              name="ic_close"
              size={Metrics.icons.large}
              color={Themes.colors.coolGray60}
            />
          </TouchableOpacity>
        </View>
        {modes.length &&
          modes.map(mode => <Mode mode={mode} key={mode.Code} />)}
      </View>
    </BaseBottomSheet>
  );
};
