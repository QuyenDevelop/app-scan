import { ShipmentCODResponse } from "@models";
import { Text, translate } from "@shared";
import React, { FunctionComponent } from "react";
import { View } from "react-native";
import { ListShipment } from "./ListShipment";
import styles from "./styles";
interface Props {
  item: ShipmentCODResponse;
}

export const ShipmentInformationTab: FunctionComponent<Props> = props => {
  const { item } = props;

  return (
    <View style={styles.generalTab}>
      <View style={styles.generalInfoRow}>
        <Text style={styles.labelInfo}>{translate("label.refNumber")}</Text>
        <Text style={styles.contentInfo}>{item.Id}</Text>
      </View>
      <ListShipment shipments={item.shipments} />
    </View>
  );
};
