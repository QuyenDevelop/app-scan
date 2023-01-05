import { ShipmentResponse, ShipmentStatusResponse } from "@models";
import { IRootState } from "@redux";
import { NoData } from "@shared";
import React, { FunctionComponent, useCallback } from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { Shipment } from "./Shipment";
import styles from "./styles";
interface Props {
  shipments: Array<ShipmentResponse>;
}
export const ListShipment: FunctionComponent<Props> = props => {
  const { shipments } = props;
  const keyExtractor = useCallback(item => item.ShipmentNumber, []);
  const shipmentStatus = useSelector(
    (state: IRootState) => state.shipmentInfo.shipmentStatus,
  ) as Array<ShipmentStatusResponse>;

  const renderItem = useCallback(
    ({ item }: { item: ShipmentResponse }) => {
      const status = shipmentStatus.find(s => s.Code === item.Status);
      return <Shipment item={item} statusName={status?.Name} />;
    },
    [shipmentStatus],
  );

  return (
    <FlatList
      data={shipments}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      keyboardShouldPersistTaps="handled"
      style={styles.listShipment}
      ListEmptyComponent={<NoData />}
    />
  );
};
