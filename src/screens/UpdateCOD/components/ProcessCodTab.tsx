import { payCodApi, shipmentApi } from "@api";
import { DATA_CONSTANT } from "@configs";
import { Alert, ScreenUtils, Utils } from "@helpers";
import { useShow } from "@hooks";
import {
  CurrencyResponse,
  CustomerResponse,
  ShipmentCODResponse,
} from "@models";
import { useNavigation } from "@react-navigation/native";
import { IRootState, ShipmentInfoAction } from "@redux";
import {
  Button,
  ChoosePhotoModal,
  ConfirmModal,
  Icon,
  ImageViewModal,
  Text,
  translate,
} from "@shared";
import { Metrics, Themes } from "@themes";
import React, { FunctionComponent, useEffect, useState } from "react";
import {
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyModal } from "./CurrencyModal";
import { CustomerModal } from "./CustomerModal";
import styles from "./styles";

interface Props {
  item: ShipmentCODResponse;
}

export const ProcessCodTab: FunctionComponent<Props> = props => {
  const { item } = props;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const shipmentCustomers = useSelector(
    (state: IRootState) => state.shipmentInfo.shipmentCustomers,
  ) as Array<CustomerResponse>;
  const shipmentCurrencies = useSelector(
    (state: IRootState) => state.shipmentInfo.shipmentCurrencies,
  ) as Array<CurrencyResponse>;
  const [customer, setCustomer] = useState<CustomerResponse>();
  const [isShowCustomers, showCustomers, hideCustomers] = useShow();
  const [currency, setCurrency] = useState<CurrencyResponse>();
  const [isShowCurrencies, showCurrencies, hideCurrencies] = useShow();
  const [codAmount, setCodAmount] = useState<number>(item.CODAmount);
  const [codAmountPay, setCodAmountPay] = useState<number>(item.CODAmountPay);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(item.COD);
  const [isLoadingConfirm, showLoadingConfirm, hideLoadingConfirm] = useShow();
  const [isShowConfirmModal, showConfirmModal, hideConfirmModal] = useShow();
  const [isShowImages, showImages, hideImages] = useShow();
  const [isChoosePhotoModal, showChoosePhotoModal, hideChoosePhotoModal] =
    useShow();

  useEffect(() => {
    setCodAmount(item.CODAmount);
    setCodAmountPay(item.CODAmountPay);
    setIsConfirmed(item.COD);
  }, [item.COD, item.CODAmount, item.CODAmountPay]);

  useEffect(() => {
    // Get list customer
    if (shipmentCustomers.length === 0) {
      dispatch(ShipmentInfoAction.getAllCustomer());
    }

    if (shipmentCurrencies.length === 0) {
      dispatch(ShipmentInfoAction.getAllCurrency());
    }
  }, [dispatch, shipmentCurrencies.length, shipmentCustomers.length]);

  useEffect(() => {
    // Get info customer
    const defaultCustomer = shipmentCustomers.find(
      c => c.Id === item.CustomerId,
    );

    setCustomer(defaultCustomer);
  }, [item.CustomerId, shipmentCustomers]);

  useEffect(() => {
    // Get list currency
    const defaultCurrency = shipmentCurrencies.find(
      c => c.CurrencyCode === item.CurrencyCode,
    );

    setCurrency(defaultCurrency);
  }, [item.CurrencyCode, shipmentCurrencies]);

  const onChangeCodAmount = (value: string) => {
    setCodAmount(Utils.convertMoneyTextToNumber(value));
  };

  const updateStatus = (value: number) => {
    setCodAmountPay(value);
    setIsConfirmed(true);
    shipmentApi.scanShipmentCOD(item.Id)?.then(shipment => {
      if (shipment?.success) {
        navigation.setParams({ item: shipment.data });
      }
    });
  };

  const onConfirmPayment = () => {
    if (!customer) {
      Alert.warning("warning.noCustomer");
      return;
    }

    if (!currency) {
      Alert.warning("warning.noCurrency");
      return;
    }
    showConfirmModal();
  };

  const onConfirm = () => {
    showLoadingConfirm();
    payCodApi
      .updateAmountPay({
        customerId: customer?.Id!,
        customerCode: customer?.Code!,
        trackingNumber: item.Id,
        currencyCode: currency?.CurrencyCode!,
        amountLocal: item.CODAmount,
        rate: currency?.Rate || 0,
        amountPay: codAmount,
      })
      ?.then(response => {
        if (response.success) {
          updateStatus(codAmount);
          Alert.success("success.confirmPaymentSuccess");
        } else {
          if (response.message) {
            Alert.error(response.message, true);
          } else {
            Alert.error("error.errorServer");
          }
        }
      })
      .catch(() => {
        Alert.error("error.errorServer");
      })
      .finally(() => {
        hideLoadingConfirm();
      });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.generalTab}>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>{translate("label.customer")}</Text>
          <TouchableOpacity
            style={styles.customerButton}
            onPress={showCustomers}
            disabled={!!item.CustomerCode}
          >
            <Text
              style={[
                styles.labelInfo,
                {
                  marginRight: ScreenUtils.calculatorWidth(5),
                  color: item.CustomerCode
                    ? Themes.colors.collGray40
                    : Themes.colors.textPrimary,
                },
              ]}
            >
              {customer?.Name || translate("label.selectCustomer")}
            </Text>
            <Icon
              name="ic_arrow_down"
              size={Metrics.icons.smallSmall}
              color={
                item.CustomerCode
                  ? Themes.colors.collGray40
                  : Themes.colors.textPrimary
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.generalInfoRow}>
          <Text style={styles.labelInfo}>{translate("label.codAmount")}</Text>
          <View style={styles.hView}>
            <View style={styles.moneyIcon}>
              <Icon
                name="ic_money"
                size={Metrics.icons.smallSmall}
                color={
                  isConfirmed || !!codAmountPay
                    ? Themes.colors.collGray40
                    : Themes.colors.brand60
                }
              />
            </View>
            <TextInput
              placeholder={translate("placeholder.enterCodAmount")}
              style={[
                styles.inputInfo,
                {
                  color:
                    isConfirmed || !!codAmountPay
                      ? Themes.colors.collGray40
                      : Themes.colors.textPrimary,
                },
              ]}
              keyboardType="numeric"
              contextMenuHidden={true}
              placeholderTextColor={Themes.colors.collGray40}
              editable={!isConfirmed && !codAmountPay}
              defaultValue={Utils.formatMoney(codAmount)}
              onChangeText={onChangeCodAmount}
            />
            <TouchableOpacity
              style={styles.currencyButton}
              onPress={showCurrencies}
              disabled={!!item.CustomerCode}
            >
              <Text
                style={[
                  styles.labelInfo,
                  {
                    marginRight: ScreenUtils.calculatorWidth(5),
                    color: item.CustomerCode
                      ? Themes.colors.collGray40
                      : Themes.colors.textPrimary,
                  },
                ]}
              >
                {currency?.CurrencyCode || translate("label.selectCurrency")}
              </Text>
              <Icon
                name="ic_arrow_down"
                size={Metrics.icons.smallSmall}
                color={
                  item.CustomerCode
                    ? Themes.colors.collGray40
                    : Themes.colors.textPrimary
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        {!!codAmountPay && (
          <View style={styles.generalInfoRow}>
            <Text style={styles.labelInfo}>{translate("label.newCOD")}</Text>
            <View style={styles.hView}>
              <View style={styles.moneyIcon}>
                <Icon
                  name="ic_money"
                  size={Metrics.icons.smallSmall}
                  color={Themes.colors.collGray40}
                />
              </View>
              <TextInput
                placeholder={translate("placeholder.enterCodAmount")}
                style={[styles.inputInfo, { color: Themes.colors.collGray40 }]}
                keyboardType="numeric"
                contextMenuHidden={true}
                placeholderTextColor={Themes.colors.collGray40}
                editable={false}
                defaultValue={Utils.formatMoney(codAmountPay)}
              />
              <TouchableOpacity
                style={styles.currencyButton}
                onPress={showCurrencies}
                disabled={true}
              >
                <Text
                  style={[
                    styles.labelInfo,
                    {
                      marginRight: ScreenUtils.calculatorWidth(5),
                      color: Themes.colors.collGray40,
                    },
                  ]}
                >
                  {item?.CurrencyCode || translate("label.selectCurrency")}
                </Text>
                <Icon
                  name="ic_arrow_down"
                  size={Metrics.icons.smallSmall}
                  color={Themes.colors.collGray40}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {!isConfirmed && !codAmountPay && (
          <Button
            title={translate("button.confirmPayment")}
            buttonChildStyle={styles.confirmPaymentBtn}
            isLoading={isLoadingConfirm}
            onPress={onConfirmPayment}
          />
        )}
        <View style={styles.optionView}>
          <TouchableOpacity
            style={styles.cameraView}
            onPress={showChoosePhotoModal}
          >
            <Icon
              name="ic_camera_fill"
              size={Metrics.icons.medium}
              color={Themes.colors.bg}
            />
          </TouchableOpacity>
          {item.images && item.images.length > 0 && (
            <TouchableOpacity
              style={styles.viewDocumentButton}
              onPress={showImages}
            >
              <Text>{translate("button.viewDocument")}</Text>
            </TouchableOpacity>
          )}
        </View>
        <CustomerModal
          isShowModal={isShowCustomers}
          closeModal={hideCustomers}
          customers={shipmentCustomers}
          onSelect={setCustomer}
        />
        <CurrencyModal
          isShowModal={isShowCurrencies}
          closeModal={hideCurrencies}
          currencies={shipmentCurrencies}
          onSelect={setCurrency}
        />
        <ConfirmModal
          isVisible={isShowConfirmModal}
          closeModal={hideConfirmModal}
          message={translate("alert.confirmPayment")}
          onConfirm={onConfirm}
        />
        <ImageViewModal
          images={item.images?.map(image => image.Url) || []}
          isVisible={isShowImages}
          closeModal={hideImages}
        />
        <ChoosePhotoModal
          isShowModal={isChoosePhotoModal}
          closeModal={hideChoosePhotoModal}
          prefix={item.Id}
          suffix={DATA_CONSTANT.SUFFIX_IMAGE.shipmentCod}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
