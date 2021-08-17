/* eslint-disable react-native/no-inline-styles */
import { ScreenUtils, Utils } from "@helpers";
import { ShipmentResponse } from "@models";
import { goToShipmentDetail } from "@navigation";
import { Icon, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import styles from "./styles";
interface Props {
  item: ShipmentResponse;
}
export const Shipment: FunctionComponent<Props> = props => {
  const { item } = props;
  const goToDetails = () => {
    goToShipmentDetail({ item });
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetails}>
      <View style={styles.shipmentContainer}>
        <View
          style={[
            styles.shipment,
            { marginBottom: ScreenUtils.calculatorHeight(6) },
          ]}
        >
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
        <View style={styles.shipmentInfo}>
          <View style={styles.iconShipment}>
            <Icon
              name="ic_location_1"
              size={Metrics.icons.smallSmall}
              color={Themes.colors.black}
            />
          </View>

          <Text style={styles.infoText}>
            {translate("label.location")}: {item.LocationName}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
