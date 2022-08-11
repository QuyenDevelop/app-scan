import { deliveryBillApi } from "@api";
import { DATA_CONSTANT, SCREENS } from "@configs";
import { Alert, Utils } from "@helpers";
import { DeliveryBillItemResponse } from "@models";
import { useNavigation } from "@react-navigation/native";
import { IRootState } from "@redux";
import { translate } from "@shared";
import React, { FunctionComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import styles from "./styles";

interface Props {
  item: DeliveryBillItemResponse;
  tab?: string;
}

export const DeliveryBillItem: FunctionComponent<Props> = ({ item, tab }) => {
  const navigation = useNavigation();
  const profile = useSelector((state: IRootState) => state.account.profile);

  const gotoDeliveryDetail = () => {
    navigation.navigate(SCREENS.PICKING_STACK, {
      screen: SCREENS.DELIVERY_BILL_DETAIL_SCREEN,
      params: {
        item: item,
        tab: tab || "",
      },
    });
  };

  const gotoPicking = () => {
    if (item.ProcessStatus === DATA_CONSTANT.PXK_STATUS.PROGRESS) {
      navigation.navigate(SCREENS.PICKING_STACK, {
        screen: SCREENS.PICKING_SCREEN,
        params: {
          item: item,
          tab: tab || "",
        },
      });
      return;
    }
    deliveryBillApi
      .assignPickDeliveryBill({
        DeliveryBillIds: [item.Id],
        StartDatePick: new Date(),
        EndDatePick: null,
        pickedBy: profile?.sub,
        pickedByUserName: profile?.preferred_username,
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

  const getStatus = () => {
    switch (item.ProcessStatus) {
      case DATA_CONSTANT.PXK_STATUS.WAITING:
        return translate("screens.picking.waitingStatus");
      case DATA_CONSTANT.PXK_STATUS.PROGRESS:
        return translate("screens.picking.pickingStatus");
      case DATA_CONSTANT.PXK_STATUS.FINISHED:
        return translate("screens.picking.doneStatus");
      default:
    }
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.content}>
        <View>
          <TouchableOpacity onPress={gotoDeliveryDetail}>
            <Text style={styles.billCodeText}>{item.RefNo}</Text>
          </TouchableOpacity>
          <Text style={styles.createdDate}>
            {translate("label.createDate")}:{" "}
            {Utils.date.formatDateTime(item.CreatedOnUtc)}
          </Text>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.status}>{getStatus()}</Text>
          <Text style={styles.createdDate}>
            {item?.ShipmentPickedItems ? item?.ShipmentPickedItems.length : 0}/
            {item.ShipmentSourceItems.length ?? 0}
          </Text>
        </View>
      </View>
      <View style={[styles.content]}>
        <View style={styles.reasonContent}>
          {item.PickedByUserName && (
            <Text style={styles.picker}>Picker: {item.PickedByUserName}</Text>
          )}
          {!!item.Note && (
            <Text numberOfLines={1} style={styles.reason}>
              {translate("screens.picking.reason")}: {item.Note}
            </Text>
          )}
        </View>
        <View>
          {item.ProcessStatus !== DATA_CONSTANT.PXK_STATUS.FINISHED && (
            <TouchableOpacity style={styles.button} onPress={gotoPicking}>
              <Text style={styles.buttonText}>
                {item.ProcessStatus === DATA_CONSTANT.PXK_STATUS.WAITING
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
