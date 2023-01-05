/* eslint-disable react-native/no-inline-styles */
import { ScreenUtils, Utils } from "@helpers";
import { ShipmentResponse } from "@models";
import { goToShipmentDetailCODScreen } from "@navigation";
import { Icon, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import styles from "./styles";
interface Props {
  item: ShipmentResponse;
  refId: string;
}
export const Shipment: FunctionComponent<Props> = props => {
  const { item, refId } = props;
  const goToDetails = () => {
    goToShipmentDetailCODScreen({ item, refId });
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetails}>
      <View style={styles.shipmentContainer}>
        <View style={[styles.shipment, { marginBottom: ScreenUtils.scale(6) }]}>
          <Text style={styles.shipmentNumber}>{item.ShipmentNumber}</Text>
          <View
            style={[
              styles.shipmentStatus,
              {
                borderColor: item.WaitingProcessed
                  ? Themes.colors.warningMain
                  : Themes.colors.success60,
              },
            ]}
          >
            <Text
              style={{
                fontWeight: "600",
                color: item.WaitingProcessed
                  ? Themes.colors.warningMain
                  : Themes.colors.success60,
              }}
            >
              {item.WaitingProcessed
                ? translate("label.waitingProcess")
                : translate("label.processed")}
            </Text>
          </View>
        </View>
        <View style={styles.shipmentInfo}>
          <View style={styles.iconShipment}>
            <Icon
              name="ic_weight"
              size={Metrics.icons.smallSmall}
              color={Themes.colors.black}
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
              color={Themes.colors.black}
            />
          </View>
          <Text style={styles.infoText}>
            {translate("label.customer")}: {item.CustomerName}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
