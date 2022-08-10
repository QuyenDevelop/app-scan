/* eslint-disable react-native/no-inline-styles */
import { deliveryBillApi } from "@api";
import { Header } from "@components";
import { SCREENS } from "@configs";
import { Alert, ScreenUtils } from "@helpers";
import { useShow } from "@hooks";
import { DeliveryBillItemResponse, ShipmentSourceItem } from "@models";
import { PickingParamsList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { translate } from "@shared";
import { Themes } from "@themes";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ShipmentItemNormal } from "./components/ShipmentItemNomal";
import styles from "./styles";

type NavigationRoute = RouteProp<
  PickingParamsList,
  SCREENS.DELIVERY_BILL_DETAIL_SCREEN
>;

export interface DeliveryBillDetailParams {
  item: DeliveryBillItemResponse;
  tab: string;
}

export const DeliveryBillDetailScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const router = useRoute<NavigationRoute>();
  const params = router?.params;
  const { item, tab } = params;
  const [data, setData] = useState<any>({});
  const [loading, setShowLoading, setHideLoading] = useShow();

  useEffect(() => {
    setShowLoading();
    deliveryBillApi
      .getDeliveryBillDetail({
        deliveryBillId: item?.Id,
      })
      ?.then(response => {
        if (response.data) {
          setData(response.data);
        }
      })
      .catch(err => {
        Alert.error(err);
      })
      .finally(() => {
        setHideLoading();
      });
    setTimeout(() => {
      setHideLoading();
    }, 1000);
  }, []);

  const keyExtractor = (items: ShipmentSourceItem, index: number) =>
    `${items.Id}_${index}`;
  const renderItem = ({ item }: { item: ShipmentSourceItem }) => {
    return <ShipmentItemNormal item={item} />;
  };

  const gotoPicking = () => {
    navigation.navigate(SCREENS.PICKING_STACK, {
      screen: SCREENS.PICKING_SCREEN,
      params: {
        item: item,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Header
        title={translate("screens.picking.deliveryBillDetail")}
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
        titleColor={Themes.colors.white}
      />
      {loading ? (
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
        <>
          <View style={styles.headerContainer}>
            <View style={styles.inline}>
              <Text style={styles.shipmentCode}>{item?.RefNo}</Text>
              {!!data?.PickedByUserName && (
                <Text style={styles.shipmentCode}>
                  {data?.PickedByUserName}
                </Text>
              )}
            </View>
            <View style={styles.inline}>
              <Text style={styles.shipmentCode}>
                Shipment:{" "}
                {data?.ShipmentSourceItems
                  ? data?.ShipmentSourceItems.length
                  : 0}
              </Text>
              <Text style={styles.shipmentCode}>
                {translate("screens.picking.finished")}:{" "}
                {data?.ShipmentPickedItems
                  ? data?.ShipmentPickedItems.length
                  : 0}
                /
                {data?.ShipmentSourceItems
                  ? data?.ShipmentSourceItems.length
                  : 0}
              </Text>
              <Text style={styles.shipmentCode}>
                {translate("label.weight")}:{" "}
                {data.TotalWeight > 0 ? data.TotalWeight.toFixed(2) : 0} kg
              </Text>
            </View>
            <View style={styles.inline}>
              {!!data?.Note && (
                <Text style={styles.shipmentCode}>
                  {translate("screens.picking.reason")}: {data?.Note}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.flatListContainer}>
            <FlatList
              data={data?.ShipmentSourceItems ?? []}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View
            style={[
              styles.footer,
              {
                paddingBottom: insets.bottom
                  ? insets.bottom
                  : ScreenUtils.scale(8),
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.touchableOpacity,
                {
                  backgroundColor: Themes.colors.white,
                },
              ]}
              onPress={() => navigation.goBack()}
            >
              <Text
                style={[styles.pickUpText, { color: Themes.colors.info60 }]}
              >
                {translate("button.back")}
              </Text>
            </TouchableOpacity>
            {tab !== "" && (
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={gotoPicking}
              >
                <Text style={styles.pickUpText}>
                  {translate("screens.picking.pickingNow")}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
};
