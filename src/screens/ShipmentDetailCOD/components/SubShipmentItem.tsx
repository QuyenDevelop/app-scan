import { ScreenUtils } from "@helpers";
import { SubShipment } from "@models";
import { translate } from "@shared";
import { Themes } from "@themes";
import React, { FunctionComponent } from "react";
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
}
export const SubShipmentItem: FunctionComponent<Props> = props => {
  const { subShipment, index } = props;

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
              style={[styles.inputInfo, { color: Themes.colors.coolGray60 }]}
              keyboardType="number-pad"
              contextMenuHidden={true}
              placeholderTextColor={Themes.colors.collGray40}
              value={((subShipment.TotalGrossWeight || 0) * 1000).toString()}
              editable={false}
            />
            <Text style={styles.contentInfo}>{translate("label.gram")}</Text>
          </View>
        </View>
        <View style={{ marginTop: ScreenUtils.scale(12) }}>
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
              { borderBottomWidth: ScreenUtils.scale(0) },
            ]}
          >
            <TextInput
              placeholder={translate("placeholder.length")}
              style={[styles.inputInfo, { color: Themes.colors.coolGray60 }]}
              keyboardType="number-pad"
              contextMenuHidden={true}
              placeholderTextColor={Themes.colors.collGray40}
              value={subShipment.Length?.toString() || "0"}
              editable={false}
            />

            <TextInput
              placeholder={translate("placeholder.width")}
              style={[styles.inputInfo, { color: Themes.colors.coolGray60 }]}
              keyboardType="number-pad"
              contextMenuHidden={true}
              placeholderTextColor={Themes.colors.collGray40}
              value={subShipment.Width?.toString() || "0"}
              editable={false}
            />

            <TextInput
              placeholder={translate("placeholder.height")}
              style={[styles.inputInfo, { color: Themes.colors.coolGray60 }]}
              keyboardType="number-pad"
              contextMenuHidden={true}
              placeholderTextColor={Themes.colors.collGray40}
              value={subShipment.Height?.toString() || "0"}
              editable={false}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
