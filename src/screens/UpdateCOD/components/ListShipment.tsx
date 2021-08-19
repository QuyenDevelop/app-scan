import { ShipmentItemCodResponse } from "@models";
import React, { FunctionComponent, useCallback } from "react";
import { FlatList } from "react-native";
import { Shipment } from "./Shipment";
import styles from "./styles";
interface Props {
  shipments: Array<ShipmentItemCodResponse>;
  refId: string;
}
export const ListShipment: FunctionComponent<Props> = props => {
  const { shipments, refId } = props;
  const keyExtractor = useCallback(item => item.ShipmentNumber, []);
  const renderItem = useCallback(
    ({ item }: { item: any }) => <Shipment item={item} refId={refId} />,
    [refId],
  );
  return (
    <FlatList
      data={shipments}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      style={styles.shipments}
    />
  );
};
