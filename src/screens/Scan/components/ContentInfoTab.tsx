import { shipmentApi } from "@api";
import { ShipmentItemResponse } from "@models";
import { NoData } from "@shared";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FlatList } from "react-native";
import { ItemInfo } from "./ItemInfo";
import styles from "./styles";
interface Props {
  shipmentId: string;
}
export const ContentInfoTab: FunctionComponent<Props> = props => {
  const { shipmentId } = props;
  const [shipmentItems, setShipmentItems] = useState<
    Array<ShipmentItemResponse>
  >([]);

  const getShipmentItems = useCallback(() => {
    shipmentApi
      .getDetailShipment({
        shipmentId: shipmentId,
        option: 3,
      })
      ?.then(response => {
        if (response && response.success) {
          setShipmentItems(response.data.ShipmentItems || []);
        }
      });
  }, [shipmentId]);

  useEffect(() => {
    getShipmentItems();
  }, [getShipmentItems]);

  const renderItem = ({
    item,
    index,
  }: {
    item: ShipmentItemResponse;
    index: number;
  }) => {
    return <ItemInfo item={item} index={index} />;
  };

  return (
    <FlatList
      data={shipmentItems}
      keyExtractor={(item, index) => `$${item.ShipmentId}_${index}`}
      renderItem={renderItem}
      style={styles.contentTab}
      ListEmptyComponent={<NoData />}
    />
  );
};
