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
  setNumOfFinished: (value: number) => void;
}

export const FinishingPickingComponent: FunctionComponent<Props> = ({
  profile,
  setNumOfFinished,
}) => {
  const [data, setData] = useState<Array<DeliveryBillItemResponse>>([]);
  const [isLoading, setShowLoading, setHideLoading] = useShow();
  const [isFreshing, setShowFreshing, setHideFreshing] = useShow();
  const [disableLoadMore, setDisableLoadMore] = useState<boolean>(false);
  const [isLoadingFooter, setShowLoadingFooter, setHideLoadingFooter] =
    useShow();
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
  }, []);

  const getData = useCallback(() => {
    setShowLoading();
    deliveryBillApi
      .getDeliveryBill({
        RequireTotalCount: true,
        PageIndex: 1,
        PageSize: PAGE_SIZE_DEFAULT,
        PostOfficeId: postOffices?.Id || "",
        Status: 2,
        PickedBy: profile?.sub || "",
      })
      ?.then(response => {
        if (response?.data && response?.data?.data) {
          setData(response?.data?.data);
          setNumOfFinished(response?.data?.totalCount);
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
        setHideLoading();
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [getData]),
  );

  const onRefresh = () => {
    setShowFreshing();
    deliveryBillApi
      .getDeliveryBill({
        RequireTotalCount: true,
        PageIndex: 1,
        PageSize: PAGE_SIZE_DEFAULT,
        PostOfficeId: postOffices?.Id || "",
        Status: 2,
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
        PageIndex: pageIndex,
        PageSize: PAGE_SIZE_DEFAULT,
        PostOfficeId: postOffices?.Id || "",
        Status: 2,
        PickedBy: profile?.sub || "",
      })
      ?.then(response => {
        if (response?.data && response?.data?.data) {
          setData([...data, ...response?.data?.data]);
          setPageIndex(pageIndex + 1);
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
        setHideLoadingFooter();
      });
  };

  const keyExtractor = (item: any, index: number) => `${item.id}_${index}`;
  const renderItem = ({ item }: { item: DeliveryBillItemResponse }) => {
    return <DeliveryBillItem item={item} />;
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
              onEndReached={disableLoadMore ? null : onEndReached}
              showsVerticalScrollIndicator={false}
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
              onEndReachedThreshold={0.5}
              contentContainerStyle={{ paddingBottom: ScreenUtils.scale(8) }}
            />
          )}
        </View>
      )}
    </View>
  );
};
