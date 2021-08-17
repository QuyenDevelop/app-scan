import { ScreenUtils } from "@helpers";
import { useShow } from "@hooks";
import { SubShipment } from "@models";
import { DeleteModal, Icon, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "./styles";
interface Props {
  subShipment: SubShipment;
  index: number;
  updateSubShipment: (shipment: SubShipment, index: number) => void;
  deleteSubShipment: (index: number) => void;
  totalSubShipments: number;
}
export const SubShipmentItem: FunctionComponent<Props> = props => {
  const {
    subShipment,
    index,
    updateSubShipment,
    deleteSubShipment,
    totalSubShipments,
  } = props;

  const [isShowDelete, showDelete, hideDelete] = useShow();
  const updateWeight = (value: string) => {
    const newWeight = (parseFloat(value) || 0) / 1000;
    updateSubShipment({ ...subShipment, TotalGrossWeight: newWeight }, index);
  };
  const updateLength = (value: string) => {
    const newLength = parseFloat(value) || 0;
    updateSubShipment({ ...subShipment, Length: newLength }, index);
  };
  const updateWidth = (value: string) => {
    const newWidth = parseFloat(value) || 0;
    updateSubShipment({ ...subShipment, Width: newWidth }, index);
  };
  const updateHeight = (value: string) => {
    const newHeight = parseFloat(value) || 0;
    updateSubShipment({ ...subShipment, Height: newHeight }, index);
  };

  const onDelete = () => {
    deleteSubShipment(index);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.subShipmentContainer}>
        <Text style={styles.subShipmentPiece}>
          {translate("label.subShipment", { index: index + 1 })}{" "}
        </Text>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>{translate("label.location")}</Text>
          <Text style={styles.contentInfo}>{subShipment.LocationName}</Text>
        </View>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>
            {translate("label.subShipmentWeight")}
          </Text>
          <View style={styles.rowEnd}>
            <TextInput
              placeholder={translate("placeholder.enterWeight")}
              style={styles.inputInfo}
              keyboardType="number-pad"
              contextMenuHidden={true}
              placeholderTextColor={Themes.colors.collGray40}
              value={((subShipment.TotalGrossWeight || 0) * 1000).toString()}
              onChangeText={updateWeight}
            />
            <Text style={styles.contentInfo}>{translate("label.gram")}</Text>
          </View>
        </View>
        <View style={{ marginTop: ScreenUtils.calculatorHeight(12) }}>
          <View style={styles.spaceBetween}>
            <Text style={styles.labelInfo}>
              {translate("label.dimension")} ({translate("placeholder.length")}{" "}
              x {translate("placeholder.width")} x{" "}
              {translate("placeholder.height")})
            </Text>
            <Text style={styles.contentInfo}>{translate("label.cm")}</Text>
          </View>
          <View
            style={[
              styles.generalInfoRow,
              { borderBottomWidth: ScreenUtils.calculatorHeight(0) },
            ]}
          >
            <TextInput
              placeholder={translate("placeholder.length")}
              style={styles.inputInfo}
              keyboardType="number-pad"
              contextMenuHidden={true}
              placeholderTextColor={Themes.colors.collGray40}
              value={subShipment.Length?.toString() || "0"}
              onChangeText={updateLength}
            />

            <TextInput
              placeholder={translate("placeholder.width")}
              style={styles.inputInfo}
              keyboardType="number-pad"
              contextMenuHidden={true}
              placeholderTextColor={Themes.colors.collGray40}
              value={subShipment.Width?.toString() || "0"}
              onChangeText={updateWidth}
            />

            <TextInput
              placeholder={translate("placeholder.height")}
              style={styles.inputInfo}
              keyboardType="number-pad"
              contextMenuHidden={true}
              placeholderTextColor={Themes.colors.collGray40}
              value={subShipment.Height?.toString() || "0"}
              onChangeText={updateHeight}
            />
          </View>
        </View>

        {totalSubShipments > 1 && (
          <TouchableOpacity onPress={showDelete} style={styles.deletePiece}>
            <Icon
              name="ic_close_fill"
              size={Metrics.icons.medium}
              color={Themes.colors.brand60}
            />
          </TouchableOpacity>
        )}
        <DeleteModal
          isVisible={isShowDelete}
          closeModal={hideDelete}
          message={translate("alert.deleteConfirmation", { index: index + 1 })}
          confirmDelete={onDelete}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
