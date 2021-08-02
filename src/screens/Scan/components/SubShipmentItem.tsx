import { SubShipment } from "@models";
import { Themes } from "@themes";
import React, { FunctionComponent, useRef } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "./styles";
interface Props {
  subShipment: SubShipment;
  index: number;
  updateSubShipment: (shipment: SubShipment) => void;
}
export const SubShipmentItem: FunctionComponent<Props> = props => {
  const { subShipment, index, updateSubShipment } = props;
  const weightRef = useRef<number>(subShipment.TotalGrossWeight * 1000 || 0);
  const lengthRef = useRef<number>(subShipment.Length || 0);
  const widthRef = useRef<number>(subShipment.Width || 0);
  const heightRef = useRef<number>(subShipment.Height || 0);

  const updateWeight = (value: string) => {
    const newWeight = parseFloat(value) || 0;
    weightRef.current = newWeight;
    updateSubShipment({ ...subShipment, TotalGrossWeight: newWeight });
  };
  const updateLength = (value: string) => {
    const newLength = parseFloat(value) || 0;
    lengthRef.current = newLength;
    updateSubShipment({ ...subShipment, Length: newLength });
  };
  const updateWidth = (value: string) => {
    const newWidth = parseFloat(value) || 0;
    widthRef.current = newWidth;
    updateSubShipment({ ...subShipment, Width: newWidth });
  };
  const updateHeight = (value: string) => {
    const newHeight = parseFloat(value) || 0;
    heightRef.current = newHeight;
    updateSubShipment({ ...subShipment, Height: newHeight });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.subShipmentContainer}>
        <Text style={styles.labelInfo}>Piece: {index}</Text>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>GW:</Text>
          <TextInput
            placeholder="Nhập trọng lượng"
            style={styles.inputInfo}
            keyboardType="number-pad"
            contextMenuHidden={true}
            placeholderTextColor={Themes.colors.collGray40}
            defaultValue={weightRef.current.toString()}
            onChangeText={updateWeight}
          />
          <Text style={styles.contentInfo}>gram</Text>
        </View>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>Dimensions:</Text>
          <TextInput
            placeholder="length"
            style={styles.inputInfo}
            keyboardType="number-pad"
            contextMenuHidden={true}
            placeholderTextColor={Themes.colors.collGray40}
            defaultValue={lengthRef.current.toString()}
            onChangeText={updateLength}
          />
          <Text style={styles.contentInfo}>x</Text>
          <TextInput
            placeholder="width"
            style={styles.inputInfo}
            keyboardType="number-pad"
            contextMenuHidden={true}
            placeholderTextColor={Themes.colors.collGray40}
            defaultValue={widthRef.current.toString()}
            onChangeText={updateWidth}
          />
          <Text style={styles.contentInfo}>x</Text>
          <TextInput
            placeholder="height"
            style={styles.inputInfo}
            keyboardType="number-pad"
            contextMenuHidden={true}
            placeholderTextColor={Themes.colors.collGray40}
            defaultValue={heightRef.current.toString()}
            onChangeText={updateHeight}
          />
          <Text style={styles.contentInfo}>cm</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
