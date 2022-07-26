import { SCREENS } from "@configs";
import { useNavigation } from "@react-navigation/native";
import { translate } from "@shared";
import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface Props {
  item: any;
  tab?: string;
}

export const DeliveryBillItem: FunctionComponent<Props> = ({ item, tab }) => {
  const navigation = useNavigation();

  const gotoDeliveryDetail = () => {
    navigation.navigate(SCREENS.PICKING_STACK, {
      screen: SCREENS.DELIVERY_BILL_DETAIL_SCREEN,
      params: {
        id: item.billId,
        tab: tab || "",
      },
    });
  };

  const gotoPicking = () => {
    navigation.navigate(SCREENS.PICKING_STACK, {
      screen: SCREENS.PICKING_SCREEN,
      params: {
        id: item.billId,
        tab: tab || "",
      },
    });
  };

  const getStatus = () => {
    switch (item.status) {
      case "WAITING":
        return translate("screens.picking.waitingStatus");
      case "PROCESS":
        return translate("screens.picking.pickingStatus");
      default:
        return translate("screens.picking.doneStatus");
    }
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.content}>
        <View>
          <TouchableOpacity onPress={gotoDeliveryDetail}>
            <Text style={styles.billCodeText}>{item.billId}</Text>
          </TouchableOpacity>
          <Text style={styles.createdDate}>
            {translate("label.createDate")}: {item.createdDate}
          </Text>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.status}>{getStatus()}</Text>
          {item.picked !== 0 && (
            <Text
              style={styles.createdDate}
            >{`${item.picked}/${item.totalShipment}`}</Text>
          )}
        </View>
      </View>
      <View style={[styles.content]}>
        <View style={styles.reasonContent}>
          {item.reason !== "" && (
            <Text numberOfLines={1} style={styles.reason}>
              {translate("screens.picking.reason")}: {item.reason}
            </Text>
          )}
        </View>
        <View>
          {item.status !== "FINISHED" && (
            <TouchableOpacity style={styles.button} onPress={gotoPicking}>
              <Text style={styles.buttonText}>
                {item.status === "WAITING"
                  ? translate("screens.picking.pickingNow")
                  : translate("screens.picking.continue")}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};
