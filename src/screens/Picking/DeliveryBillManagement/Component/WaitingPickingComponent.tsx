/* eslint-disable react-native/no-inline-styles */
import { useShow } from "@hooks";
import { Themes } from "@themes";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import { DeliveryBillItem } from "../../components/DeliveryBillItem";
import styles from "./styles";

const dataWaiting: any[] = [
  {
    id: 1,
    billId: "SPM0022070500085JP",
    createdDate: "16:30  2/7/2022",
    totalShipment: 8,
    picked: 0,
    status: "WAITING",
    reason: "",
  },
  {
    id: 2,
    billId: "SPM0022070500085JP",
    createdDate: "10:30  2/7/2022",
    totalShipment: 8,
    picked: 0,
    status: "WAITING",
    reason: "",
  },
];

interface Props {}

export const WaitingPickingComponent: FunctionComponent<Props> = props => {
  const {} = props;
  const [data, setData] = useState<any>();
  const [isLoading, setShowLoading, setHideLoading] = useShow();
  const [isFreshing, setShowFreshing, setHideFreshing] = useShow();
  const [isLoadingFooter, setShowLoadingFooter, setHideLoadingFooter] =
    useShow();
  const [disableLoadMore, setDisableLoadMore] = useState<boolean>(false);

  useEffect(() => {
    setShowLoading();
    setData(dataWaiting);

    setTimeout(() => {
      setHideLoading();
      setDisableLoadMore(true);
    }, 1000);
  }, []);

  const onRefresh = () => {
    setShowFreshing();

    setTimeout(() => {
      setHideFreshing();
    }, 1000);
  };

  const onEndReached = () => {
    setShowLoadingFooter();

    setTimeout(() => {
      setHideLoadingFooter();
    }, 1000);
  };

  const keyExtractor = (item: any, index: number) => `${item.id}_${index}`;
  const renderItem = ({ item }: { item: any }) => {
    return <DeliveryBillItem item={item} />;
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          color={Themes.colors.coolGray100}
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={disableLoadMore ? null : onEndReached}
          refreshControl={
            <RefreshControl refreshing={isFreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={
            isLoadingFooter ? (
              <ActivityIndicator
                size="small"
                color={Themes.colors.collGray40}
              />
            ) : (
              <></>
            )
          }
          contentContainerStyle={{ flex: 1 }}
        />
      )}
    </View>
  );
};
