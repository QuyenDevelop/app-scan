/* eslint-disable react-native/no-inline-styles */
import { Utils } from "@helpers";
import { useShow } from "@hooks";
import {
  CustomerResponse,
  GetDashboardsRequest,
  ShipmentStatusResponse,
} from "@models";
import {
  ChooseCustomerModal,
  ChooseStatusModal,
  ChooseTimeModal,
  Icon,
  Text,
  translate,
} from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent, useCallback, useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";

interface Props {
  isVisible: boolean;
  closeModal: () => void;
  filterValue: GetDashboardsRequest;
  apply: (value: GetDashboardsRequest) => void;
}

export const FilterModal: FunctionComponent<Props> = props => {
  const { isVisible, closeModal, filterValue, apply } = props;
  const insets = useSafeAreaInsets();
  const [customer, setCustomer] = useState<CustomerResponse | undefined>();
  const [status, setStatus] = useState<ShipmentStatusResponse | undefined>();
  const [startTime, setStartTime] = useState<Date | undefined>(
    filterValue.startDate ? new Date(filterValue.startDate) : undefined,
  );
  const [endTime, setEndTime] = useState<Date | undefined>(
    filterValue.endDate ? new Date(filterValue.endDate) : undefined,
  );
  const [isShowCustomerModal, showCustomerModal, hideCustomerModal] = useShow();
  const [isShowStatusModal, showStatusModal, hideStatusModal] = useShow();
  const [isShowStartTimeModal, showStartTimeModal, hideStartTimeModal] =
    useShow();
  const [isShowEndTimeModal, showEndTimeModal, hideEndTimeModal] = useShow();

  const onReset = () => {
    setCustomer(undefined);
    setStatus(undefined);
    setStartTime(undefined);
    setEndTime(undefined);
  };

  const applyStartTime = useCallback(
    (time: Date): void => {
      setStartTime(time);
      if (!endTime || time > endTime) {
        setEndTime(time);
      }
    },
    [endTime],
  );

  const applyEndTime = useCallback(
    (time: Date): void => {
      setEndTime(time);
      if (!startTime || time < startTime) {
        setStartTime(time);
      }
    },
    [startTime],
  );

  const onApply = () => {
    apply({
      ...filterValue,
      customerId: customer?.Id || "",
      status: status?.Code || -1,
      startDate: startTime?.toISOString(),
      endDate: endTime?.toISOString(),
    });

    closeModal();
  };
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      statusBarTranslucent={true}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.headerFilter}>
          <TouchableOpacity onPress={closeModal} style={styles.edgeHeaderItem}>
            <Icon
              name={"ic_close"}
              size={Metrics.icons.small}
              color={Themes.colors.coolGray60}
            />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>{translate("label.filter")}</Text>
          <TouchableOpacity
            style={[styles.edgeHeaderItem, { justifyContent: "flex-end" }]}
            onPress={onReset}
          >
            <Text style={styles.resetBtn}>{translate("button.reset")}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentFilter}>
          <TouchableOpacity
            style={[
              styles.selectedBtn,
              { borderBottomWidth: customer ? 0 : 1 },
            ]}
            onPress={showCustomerModal}
          >
            <View style={styles.selectTitleBtn}>
              <Text style={styles.selectTitle}>
                {translate("label.customer")}
              </Text>
              <Icon
                name={"ic_arrow_right"}
                size={Metrics.icons.smallSmall}
                color={Themes.colors.coolGray60}
              />
            </View>
            {customer && (
              <View style={styles.selectedItem}>
                <Text>{customer.Name}</Text>
                <TouchableOpacity
                  style={styles.removeItemButton}
                  hitSlop={styles.hitSlop}
                  onPress={() => setCustomer(undefined)}
                >
                  <Icon
                    name={"ic_close"}
                    size={Metrics.icons.smallSmall}
                    color={Themes.colors.coolGray60}
                  />
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.selectedBtn, { borderBottomWidth: status ? 0 : 1 }]}
            onPress={showStatusModal}
          >
            <View style={styles.selectTitleBtn}>
              <Text style={styles.selectTitle}>
                {translate("label.status")}
              </Text>
              <Icon
                name={"ic_arrow_right"}
                size={Metrics.icons.smallSmall}
                color={Themes.colors.coolGray60}
              />
            </View>
            {status && (
              <View style={styles.selectedItem}>
                <Text>{status.Name}</Text>
                <TouchableOpacity
                  style={styles.removeItemButton}
                  hitSlop={styles.hitSlop}
                  onPress={() => setStatus(undefined)}
                >
                  <Icon
                    name={"ic_close"}
                    size={Metrics.icons.smallSmall}
                    color={Themes.colors.coolGray60}
                  />
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.selectTitle}>Date</Text>
          <View style={styles.selectTimeView}>
            <View style={styles.selectTime}>
              <Text style={styles.smallText}>{translate("label.from")}</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={showStartTimeModal}
              >
                <Text style={styles.timeText}>
                  {startTime
                    ? Utils.date.formatDate(startTime)
                    : translate("label.chooseDate")}
                </Text>
                <Icon
                  name={"ic_arrow_down"}
                  size={Metrics.icons.smallSmall}
                  color={Themes.colors.coolGray60}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.selectTime}>
              <Text style={styles.smallText}>{translate("label.to")}</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={showEndTimeModal}
              >
                <Text style={styles.timeText}>
                  {endTime
                    ? Utils.date.formatDate(endTime)
                    : translate("label.chooseDate")}
                </Text>
                <Icon
                  name={"ic_arrow_down"}
                  size={Metrics.icons.smallSmall}
                  color={Themes.colors.coolGray60}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.applyBtn, { marginBottom: insets.bottom + 10 }]}
          onPress={onApply}
        >
          <Text style={styles.applyTextBtn}>{translate("button.apply")}</Text>
        </TouchableOpacity>
        <ChooseCustomerModal
          isVisible={isShowCustomerModal}
          closeModal={hideCustomerModal}
          customer={customer}
          selectCustomer={setCustomer}
        />
        <ChooseStatusModal
          isVisible={isShowStatusModal}
          closeModal={hideStatusModal}
          status={status}
          selectStatus={setStatus}
        />
        <ChooseTimeModal
          isVisible={isShowStartTimeModal}
          closeModal={hideStartTimeModal}
          date={startTime || new Date()}
          apply={applyStartTime}
        />
        <ChooseTimeModal
          isVisible={isShowEndTimeModal}
          closeModal={hideEndTimeModal}
          date={endTime || new Date()}
          apply={applyEndTime}
        />
      </View>
    </Modal>
  );
};
