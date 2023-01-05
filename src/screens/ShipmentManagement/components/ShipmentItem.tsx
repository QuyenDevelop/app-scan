/* eslint-disable react-native/no-inline-styles */
import { ScreenUtils, Utils } from "@helpers";
import { ShipmentItemDashboardResponse } from "@models";
import { goToShipmentDetail } from "@navigation";
import { Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import styles from "./styles";

interface Props {
  item: ShipmentItemDashboardResponse;
  statusName?: string;
}

export const ShipmentItem: FunctionComponent<Props> = props => {
  const { item, statusName } = props;

  const onPress = () => {
    goToShipmentDetail({ item: item });
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.shipmentContainer}>
        <View style={[styles.shipment, { marginBottom: ScreenUtils.scale(6) }]}>
          <Text style={styles.shipmentNumber}>{item.ShipmentNumber}</Text>
          <View
            style={[
              styles.shipmentStatus,
              {
                borderColor: item.PendingShipment
                  ? Themes.colors.warningMain
                  : Themes.colors.success60,
              },
            ]}
          >
            <Text
              style={{
                fontWeight: "600",
                color: item.PendingShipment
                  ? Themes.colors.warningMain
                  : Themes.colors.success60,
              }}
            >
              {item.PendingShipment
                ? translate("label.waitingProcess")
                : translate("label.processed")}
            </Text>
          </View>
        </View>
        <View style={styles.shipmentInfo}>
          <View style={styles.iconShipment}>
            <Icon
              name="ic_status"
              size={Metrics.icons.smallSmall}
              color={Themes.colors.coolGray60}
            />
          </View>
          <Text style={styles.infoText}>
            {translate("label.refNumber")}: {item.ReferenceNumber}
          </Text>
        </View>
        {!!item.CreatedOnUtc && (
          <View style={styles.shipmentInfo}>
            <View style={styles.iconShipment}>
              <Icon
                name="ic_calendar"
                size={Metrics.icons.smallSmall}
                color={Themes.colors.coolGray60}
              />
            </View>
            <Text style={styles.infoText}>
              {translate("label.createDate")}:{" "}
              {Utils.date.formatDate(item.CreatedOnUtc)}
            </Text>
          </View>
        )}
        {!!item.AcceptedDate && (
          <View style={styles.shipmentInfo}>
            <View style={styles.iconShipment}>
              <Icon
                name="ic_calendar"
                size={Metrics.icons.smallSmall}
                color={Themes.colors.coolGray60}
              />
            </View>
            <Text style={styles.infoText}>
              {translate("label.acceptedDate")}:{" "}
              {Utils.date.formatDate(item.AcceptedDate)}
            </Text>
          </View>
        )}
        {!!item.ProcessedDate && (
          <View style={styles.shipmentInfo}>
            <View style={styles.iconShipment}>
              <Icon
                name="ic_calendar"
                size={Metrics.icons.smallSmall}
                color={Themes.colors.coolGray60}
              />
            </View>
            <Text style={styles.infoText}>
              {translate("label.processDate")}:{" "}
              {Utils.date.formatDate(item.ProcessedDate)}
            </Text>
          </View>
        )}

        <View style={styles.shipmentInfo}>
          <View style={styles.iconShipment}>
            <Icon
              name="ic_weight"
              size={Metrics.icons.smallSmall}
              color={Themes.colors.coolGray60}
            />
          </View>
          <Text style={styles.infoText}>
            {translate("label.shipmentWeight")}{" "}
            {Utils.formatMoney(item.TotalGrossWeight)} {translate("label.gram")}
          </Text>
        </View>
        <View style={styles.shipmentInfo}>
          <View style={styles.iconShipment}>
            <Icon
              name="ic_customer"
              size={Metrics.icons.smallSmall}
              color={Themes.colors.coolGray60}
            />
          </View>
          <Text style={styles.infoText}>
            {translate("label.customer")}: {item.CustomerName}
          </Text>
        </View>
        <View style={styles.shipmentInfo}>
          <View style={styles.iconShipment}>
            <Icon
              name="ic_location_1"
              size={Metrics.icons.smallSmall}
              color={Themes.colors.coolGray60}
            />
          </View>
          <Text style={styles.infoText}>
            {translate("label.location")}: {item.LocationName}
          </Text>
        </View>
        <View style={styles.shipmentInfo}>
          <View style={styles.iconShipment}>
            <Icon
              name="ic_status"
              size={Metrics.icons.smallSmall}
              color={Themes.colors.coolGray60}
            />
          </View>
          <Text style={styles.infoText}>
            {translate("label.status")}: {statusName || item.Status}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
