/* eslint-disable react-native/no-inline-styles */
import { shipmentApi } from "@api";
import { Alert, Utils } from "@helpers";
import { useShow } from "@hooks";
import { GetDashboardsRequest, ShipmentItemDashboardResponse } from "@models";
import { IRootState } from "@redux";
import { Checkbox, Icon, NoData, SearchHeader, Text, translate } from "@shared";
import { Metrics, Themes } from "@themes";
import debounce from "lodash/debounce";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { FilterModal } from "./components/FilterModal";
import { ShipmentItem } from "./components/ShipmentItem";
import styles from "./styles";

export const ShipmentManagementScreen: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  const [isShowFilter, showFilter, hideFilter] = useShow();
  const allStatus = useSelector(
    (state: IRootState) => state.shipmentInfo.shipmentStatus,
  );
  const [totalOrder, setTotalOrder] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const postOfficeToSendId = useSelector(
    (state: IRootState) => state.account.profile?.postOfficeId,
  );
  const [isLoading, showLoading, hideLoading] = useShow();
  const [isReLoading, showReLoading, hideReLoading] = useShow();
  const [isShowLoadMore, showLoadMore, hideLoadMore] = useShow();
  const [items, setItems] = useState<Array<ShipmentItemDashboardResponse>>([]);
  const defaultFilter = useMemo(
    (): GetDashboardsRequest => ({
      pendingShipment: false,
      status: -1,
      keywords: "",
      pageIndex: 1,
      pageSize: 10,
      postOfficeToSendId: postOfficeToSendId ?? "",
      customerId: "",
    }),
    [postOfficeToSendId],
  );
  const [filterValue, setFilterValue] =
    useState<GetDashboardsRequest>(defaultFilter);

  const fetchData = useCallback(
    (
      value: GetDashboardsRequest,
      showLoad: () => void,
      hideLoad: () => void,
    ) => {
      showLoad();
      return shipmentApi.getDashboards(value)?.finally(() => hideLoad());
    },
    [],
  );

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchData(defaultFilter, showLoading, hideLoading);
      if (data) {
        if (data?.success) {
          setItems(data.data.data);
          setTotalOrder(data.data.totalCount);
          setTotalPage(data.data.groupCount);
        } else {
          setItems([]);
          setTotalOrder(0);
          setTotalPage(0);
          data?.message
            ? Alert.error(data?.message, true)
            : Alert.error("error.errorServer");
        }
      }
    };

    fetch();
  }, [defaultFilter, fetchData, hideLoading, showLoading]);

  const onRefresh = async () => {
    const filter = { ...filterValue, pageIndex: 1 };
    setFilterValue(filter);
    const data = await fetchData(filter, showReLoading, hideReLoading);
    if (data) {
      if (data?.success) {
        setItems(data.data.data);
        setTotalOrder(data.data.totalCount);
        setTotalPage(data.data.groupCount);
      } else {
        setItems([]);
        setTotalOrder(0);
        setTotalPage(0);
        data?.message
          ? Alert.error(data?.message, true)
          : Alert.error("error.errorServer");
      }
    }
  };

  const loadMoreData = async () => {
    if (
      isShowLoadMore ||
      totalOrder === items.length ||
      filterValue.pageIndex === totalPage
    ) {
      return;
    }

    const filter = {
      ...filterValue,
      pageIndex: filterValue.pageIndex + 1,
    };

    const data = await fetchData(filter, showLoadMore, hideLoadMore);

    if (data) {
      if (data?.success) {
        data.data.data && setItems([...items, ...data.data.data]);
        setTotalOrder(data.data.totalCount);
        setTotalPage(data.data.groupCount);
        setFilterValue(filter);
      } else {
        setItems([]);
        setTotalOrder(0);
        setTotalPage(0);
        data?.message
          ? Alert.error(data?.message, true)
          : Alert.error("error.errorServer");
      }
    }
  };

  const applyFilter = async (value: GetDashboardsRequest) => {
    setFilterValue(value);
    const data = await fetchData(value, showLoading, hideLoading);
    if (data) {
      if (data?.success) {
        setItems(data.data.data);
        setTotalOrder(data.data.totalCount);
        setTotalPage(data.data.groupCount);
      } else {
        setItems([]);
        setTotalOrder(0);
        setTotalPage(0);
        data?.message
          ? Alert.error(data?.message, true)
          : Alert.error("error.errorServer");
      }
    }
  };

  const searchShipment = debounce((value: string) => {
    const filter = { ...filterValue, keywords: value, pageIndex: 1 };
    setFilterValue(filter);
    applyFilter(filter);
  }, 1000);

  const itemsKey = useCallback(
    (item: ShipmentItemDashboardResponse, index: number) =>
      `${item.Id}_${index}`,
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: ShipmentItemDashboardResponse }) => {
      const status = allStatus.find(st => st.Code === item.Status);
      return <ShipmentItem item={item} statusName={status?.Name} />;
    },
    [allStatus],
  );

  const renderListFooter = () => {
    return (
      <>
        {isShowLoadMore ? (
          <ActivityIndicator color={Themes.colors.collGray40} />
        ) : null}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <SearchHeader
        searchValue={filterValue.keywords}
        onChange={searchShipment}
      />
      <View style={styles.content}>
        <View style={styles.checkView}>
          <Checkbox
            onChange={() =>
              applyFilter({
                ...filterValue,
                pendingShipment: !filterValue.pendingShipment,
              })
            }
            checked={filterValue.pendingShipment}
            style={styles.checkbox}
            backgroundCheckColor={Themes.colors.brand60}
          />
          <Text style={styles.checkText}>
            {translate("label.checkboxShipmentManage")}
          </Text>
        </View>
        <View style={styles.filterView}>
          <Text style={styles.numberOrdersText}>
            {Utils.formatMoney(totalOrder)} {translate("label.order")}
          </Text>
          <TouchableOpacity style={styles.filterBtn} onPress={showFilter}>
            <Icon
              name={"ic_filter"}
              size={Metrics.icons.smallSmall}
              color={Themes.colors.brand60}
            />
            <Text style={styles.filterText}>{translate("label.filter")}</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <ActivityIndicator
            color={Themes.colors.collGray40}
            style={{ marginBottom: insets.bottom }}
          />
        ) : (
          <FlatList
            data={items}
            keyExtractor={itemsKey}
            renderItem={renderItem}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.8}
            onEndReached={loadMoreData}
            refreshControl={
              <RefreshControl refreshing={isReLoading} onRefresh={onRefresh} />
            }
            ListEmptyComponent={<NoData />}
            ListFooterComponent={renderListFooter}
          />
        )}
      </View>
      <FilterModal
        isVisible={isShowFilter}
        closeModal={hideFilter}
        filterValue={filterValue}
        apply={applyFilter}
      />
    </View>
  );
};
