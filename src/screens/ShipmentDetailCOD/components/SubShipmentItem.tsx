import { SubShipment } from "@models";
import { Icon, translate } from "@shared";
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
        <View style={[styles.spaceBetween, { paddingRight: 0 }]}>
          <Text style={styles.labelInfo}>
            {translate("label.subShipment", { index: index + 1 })}{" "}
          </Text>
          {totalSubShipments > 1 && (
            <TouchableOpacity onPress={onDelete}>
              <Icon
                name="ic_close_circle"
                size={Metrics.icons.small}
                color={Themes.colors.black}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>
            {translate("label.subShipmentWeight")}
          </Text>
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
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>{translate("label.dimension")}</Text>
          <TextInput
            placeholder={translate("placeholder.length")}
            style={styles.inputInfo}
            keyboardType="number-pad"
            contextMenuHidden={true}
            placeholderTextColor={Themes.colors.collGray40}
            value={subShipment.Length?.toString() || "0"}
            onChangeText={updateLength}
          />
          <Text style={styles.contentInfo}>x</Text>
          <TextInput
            placeholder={translate("placeholder.width")}
            style={styles.inputInfo}
            keyboardType="number-pad"
            contextMenuHidden={true}
            placeholderTextColor={Themes.colors.collGray40}
            value={subShipment.Width?.toString() || "0"}
            onChangeText={updateWidth}
          />
          <Text style={styles.contentInfo}>x</Text>
          <TextInput
            placeholder={translate("placeholder.height")}
            style={styles.inputInfo}
            keyboardType="number-pad"
            contextMenuHidden={true}
            placeholderTextColor={Themes.colors.collGray40}
            value={subShipment.Height?.toString() || "0"}
            onChangeText={updateHeight}
          />
          <Text style={styles.contentInfo}>{translate("label.cm")}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
