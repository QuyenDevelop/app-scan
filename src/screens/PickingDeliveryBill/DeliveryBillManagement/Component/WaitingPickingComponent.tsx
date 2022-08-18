/* eslint-disable react-hooks/exhaustive-deps */
import { deliveryBillApi } from "@api";
import { CONSTANT } from "@configs";
import { Alert, getAsyncItem, ScreenUtils } from "@helpers";
import { useShow } from "@hooks";
import {
  Account,
  DeliveryBillItemResponse,
  PostOfficeItemResponse,
} from "@models";
import { useFocusEffect } from "@react-navigation/native";
import { IRootState } from "@redux";
import { Themes } from "@themes";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { DeliveryBillItem } from "../../components/DeliveryBillItem";
import styles from "./styles";

interface Props {
  profile: Account | null;
  setNumber: (value: number) => void;
}

export const WaitingPickingComponent: FunctionComponent<Props> = ({
  profile,
  setNumber,
}) => {
  const [data, setData] = useState<Array<DeliveryBillItemResponse>>([]);
  const [isLoading, setShowLoading, setHideLoading] = useShow();
  const [isFreshing, setShowFreshing, setHideFreshing] = useShow();
  const [isLoadingFooter, setShowLoadingFooter, setHideLoadingFooter] =
    useShow();
  const [disableLoadMore, setDisableLoadMore] = useState<boolean>(false);
  const postOfficesData = useSelector(
    (state: IRootState) => state.account.postOffices,
  );
  const [pageIndex, setPageIndex] = useState<number>(1);
  const PAGE_SIZE_DEFAULT = 10;
  const [postOffices, setPostOffice] = useState<PostOfficeItemResponse>();
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
  }, [postOfficesData]);

  const getData = () => {
    setShowLoading();
    deliveryBillApi
      .getDeliveryBill({
        RequireTotalCount: true,
        Skip: 0,
        Take: 10,
        PageIndex: 1,
        PageSize: PAGE_SIZE_DEFAULT,
        PostOfficeId: postOffices?.Id || "",
        Status: 0,
        PickedBy: profile?.sub || "",
      })
      ?.then(response => {
        if (response?.data && response?.data?.data) {
          setData(response?.data?.data);
          setPageIndex(2);
          setNumber(response?.data.totalCount);
          if (
            data.length >= response?.data.totalCount ||
            response?.data?.data.length < PAGE_SIZE_DEFAULT
          ) {
            setDisableLoadMore(true);
          }
        }
      })
      .catch(error => {
        Alert.error(error);
      })
      .finally(() => {
        setHideLoading();
      });
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  const onRefresh = () => {
    setShowFreshing();
    deliveryBillApi
      .getDeliveryBill({
        RequireTotalCount: true,
        Skip: 0,
        Take: 10,
        PageIndex: 1,
        PageSize: PAGE_SIZE_DEFAULT,
        PostOfficeId: postOffices?.Id || "",
        Status: 0,
        PickedBy: profile?.sub || "",
      })
      ?.then(response => {
        if (response?.data && response?.data?.data) {
          setData(response?.data?.data);
          setPageIndex(2);
          if (
            data.length >= response?.data.totalCount ||
            response?.data?.data.length < PAGE_SIZE_DEFAULT
          ) {
            setDisableLoadMore(true);
          }
        }
      })
      .catch(error => {
        Alert.error(error);
      })
      .finally(() => {
        setHideFreshing();
      });
  };

  const onEndReached = () => {
    setShowLoadingFooter();

    deliveryBillApi
      .getDeliveryBill({
        RequireTotalCount: true,
        Skip: 0,
        Take: 10,
        PageIndex: pageIndex,
        PageSize: PAGE_SIZE_DEFAULT,
        PostOfficeId: postOffices?.Id || "",
        Status: 0,
        PickedBy: profile?.sub || "",
      })
      ?.then(response => {
        if (response?.data && response?.data?.data) {
          setData(pre => [...pre, ...response?.data?.data]);
          setPageIndex(pageIndex + 1);
          if (
            data.length >= response?.data.totalCount ||
            response?.data?.data?.length < PAGE_SIZE_DEFAULT
          ) {
            setDisableLoadMore(true);
          }
        }
      })
      .catch(error => {
        Alert.error(error);
        setDisableLoadMore(true);
      })
      .finally(() => {
        setHideLoadingFooter();
      });
  };

  const keyExtractor = (item: any, index: number) => `${item.id}_${index}`;
  const renderItem = ({ item }: { item: DeliveryBillItemResponse }) => {
    // return <Text>abc</Text>;
    return <DeliveryBillItem item={item} tab={"WAITING"} />;
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          style={styles.indicator}
          color={Themes.colors.coolGray100}
        />
      ) : (
        <View style={styles.container}>
          {!!data.length && (
            <FlatList
              data={data}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              onEndReached={disableLoadMore ? undefined : onEndReached}
              refreshControl={
                <RefreshControl refreshing={isFreshing} onRefresh={onRefresh} />
              }
              ListFooterComponent={
                isLoadingFooter ? (
                  <ActivityIndicator
                    size="small"
                    color={Themes.colors.collGray40}
                  />
                ) : (
                  <></>
                )
              }
              onEndReachedThreshold={0.1}
              contentContainerStyle={{ paddingBottom: ScreenUtils.scale(12) }}
            />
          )}
        </View>
      )}
    </View>
  );
};
