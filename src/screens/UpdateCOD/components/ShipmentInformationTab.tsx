import { shipmentApi } from "@api";
import { ShipmentResponse } from "@models";
import { Text, translate } from "@shared";
import React, { FunctionComponent, useEffect, useState } from "react";
import { View } from "react-native";
import { ListShipment } from "./ListShipment";
import styles from "./styles";
interface Props {}

export const ShipmentInformationTab: FunctionComponent<Props> = props => {
  const {} = props;
  const [shipments, setShipments] = useState<Array<ShipmentResponse>>([]);
  const getShipment = () => {
    shipmentApi.scanShipment("1")?.then(shipment => {
      setShipments(shipment?.data || []);
    });
  };

  useEffect(() => {
    getShipment();
  }, []);
  return (
    <View style={styles.generalTab}>
      <View style={styles.generalInfoRow}>
        <Text style={styles.labelInfo}>{translate("label.refNumber")}</Text>
        <Text style={styles.contentInfo}>12345689</Text>
      </View>
      <ListShipment shipments={shipments} />
    </View>
  );
};
