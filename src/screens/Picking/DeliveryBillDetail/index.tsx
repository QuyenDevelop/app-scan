/* eslint-disable react-native/no-inline-styles */
import { Header } from "@components";
import { CONSTANT, SCREENS } from "@configs";
import { getAsyncItem, ScreenUtils } from "@helpers";
import { useShow } from "@hooks";
import { PostOfficeItemResponse } from "@models";
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
import { ShipmentItemTokyo } from "./components/ShipmentItemTokyo";
import styles from "./styles";

type NavigationRoute = RouteProp<
  PickingParamsList,
  SCREENS.DELIVERY_BILL_DETAIL_SCREEN
>;

export interface DeliveryBillDetailParams {
  id: string;
  tab: string;
}

const DeliveryBillDetail: any = {
  id: 1,
  customerName: "Nguyễn Hoàng",
  weight: 15,
  picked: 1,
  totalShipment: 3,
  reason: "không tìm thấy hàng",
  shipments: [
    {
      shipmentId: "IC220665780JP",
      tracking: "256245821524",
      location: "A1-01",
      quantity: 1,
      staff: "Cao Việt Hưng",
      isPicked: false,
    },
    {
      shipmentId: "IC220665765JP",
      tracking: "256245828564",
      location: "b1-01",
      quantity: 2,
      staff: "Nguyễn Khắc Phục",
      isPicked: false,
    },
    {
      shipmentId: "IC220665871JP",
      tracking: "256245828750",
      location: "B-01-01-02",
      quantity: 1,
      staff: "Lê Thị Hương",
      isPicked: false,
    },
  ],
};

export const DeliveryBillDetailScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const router = useRoute<NavigationRoute>();
  const params = router?.params;
  const postOfficesData = useSelector(
    (state: IRootState) => state.account.postOffices,
  );
  const [postOffices, setPostOffice] = useState<PostOfficeItemResponse>();
  const [loading, setShowLoading, setHideLoading] = useShow();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const getPostoffice = async () => {
      const postOfficeId = await getAsyncItem(
        CONSTANT.TOKEN_STORAGE_KEY.ICHIBA_POSTOFFICE_ID,
      );
      if (postOfficeId) {
        const postOffice = postOfficesData.find(
          item => item.Id === postOfficeId,
        );
        setPostOffice(postOffice);
      }
    };
    getPostoffice();
  }, []);

  useEffect(() => {
    setShowLoading();

    setTimeout(() => {
      setData(DeliveryBillDetail);
      setHideLoading();
    }, 1000);
  }, []);

  const keyExtractor = (item: any, index: number) => `${item.id}_${index}`;
  const renderItem = ({ item }: { item: any }) => {
    return postOffices?.Code !== "08" ? (
      <ShipmentItemNormal item={item} />
    ) : (
      <ShipmentItemTokyo item={item} />
    );
  };

  const gotoPicking = () => {
    navigation.navigate(SCREENS.PICKING_STACK, {
      screen: SCREENS.PICKING_SCREEN,
      params: {
        id: params?.id,
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
              <Text style={styles.shipmentCode}>{params?.id}</Text>
              <Text style={styles.shipmentCode}>{data.customerName}</Text>
            </View>
            <View style={styles.inline}>
              <Text style={styles.shipmentCode}>
                Shipment: {data.totalShipment}
              </Text>
              <Text style={styles.shipmentCode}>
                Đã nhặt: {data.picked}/{data.totalShipment}
              </Text>
              <Text style={styles.shipmentCode}>KL: {data.weight} kg</Text>
            </View>
            <View style={styles.inline}>
              <Text style={styles.shipmentCode}>Lý do: {data.reason}</Text>
            </View>
          </View>
          <View style={styles.flatListContainer}>
            <FlatList
              data={data.shipments}
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
            {params?.tab !== "" && (
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
