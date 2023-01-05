/* eslint-disable react-native/no-inline-styles */
import { deliveryBillApi } from "@api";
import { Header } from "@components";
import { SCREENS } from "@configs";
import { Alert, ScreenUtils } from "@helpers";
import { useShow } from "@hooks";
import { DeliveryBillItemResponse, ShipmentSourceItem } from "@models";
import { PickingParamsList } from "@navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { IRootState } from "@redux";
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
import { useSelector } from "react-redux";
import { ShipmentItemNormal } from "./components/ShipmentItemNomal";
import styles from "./styles";

type NavigationRoute = RouteProp<
  PickingParamsList,
  SCREENS.DELIVERY_BILL_DETAIL_SCREEN
>;

export interface DeliveryBillDetailParams {
  item: DeliveryBillItemResponse;
  tab: string;
  disableHandler: boolean;
}

export const DeliveryBillDetailScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const router = useRoute<NavigationRoute>();
  const params = router?.params;
  const { item, tab } = params;
  const profile = useSelector((state: IRootState) => state.account.profile);
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
    deliveryBillApi
      .assignPickDeliveryBill({
        startDatePick: new Date(),
        pickedBy: profile?.sub || "",
        pickedByUserName: profile?.preferred_username || "",
        deliveryBillIds: [item.Id],
        endDatePick: null,
        note: "",
        hasComplain: false,
      })
      ?.then(response => {
        if (response && response.success) {
          navigation.navigate(SCREENS.PICKING_STACK, {
            screen: SCREENS.PICKING_SCREEN,
            params: {
              item: item,
              tab: tab || "",
            },
          });
        }
      })
      .catch(error => {
        Alert.error(error);
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
              {!!data?.ConsigneeName && (
                <Text style={styles.shipmentCode}>{data?.ConsigneeName}</Text>
              )}
            </View>
            <View style={styles.inline}>
              <Text style={styles.title}>
                Shipment:{" "}
                <Text style={styles.shipmentCode}>
                  {data?.ShipmentSourceItems?.length ?? 0}
                </Text>
              </Text>
              <Text style={styles.title}>
                {translate("screens.picking.finished")}:{" "}
                <Text style={styles.shipmentCode}>
                  {data?.ShipmentPickedItems?.length ?? 0}/
                  {data?.ShipmentSourceItems?.length ?? 0}
                </Text>
              </Text>
              <Text style={styles.title}>
                {translate("label.weight")}:{" "}
                <Text style={styles.shipmentCode}>
                  {data.TotalWeight > 0 ? data.TotalWeight.toFixed(2) : 0}
                </Text>{" "}
                kg
              </Text>
            </View>
            <View style={styles.inline}>
              {!!data?.Note && (
                <Text style={styles.title}>
                  {translate("screens.picking.reason")}:{" "}
                  <Text style={styles.shipmentReason}>{data?.Note}</Text>
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
            <TouchableOpacity
              style={[
                styles.touchableOpacity,
                // {
                //   backgroundColor: disableHandler
                //     ? Themes.colors.coolGray60
                //     : Themes.colors.info60,
                // },
              ]}
              onPress={gotoPicking}
              // disabled={disableHandler}
            >
              <Text style={styles.pickUpText}>
                {translate("screens.picking.pickingNow")}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};
