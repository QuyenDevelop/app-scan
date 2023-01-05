import { warehouseInventoryApi } from "@api";
import { Header } from "@components";
import { Alert } from "@helpers";
import { useShow } from "@hooks";
import { RequestInventoryResponse } from "@models";
import { goToInventoryScreen } from "@navigation";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { IRootState } from "@redux";
import { NoData, Text, translate } from "@shared";
import { Themes } from "@themes";
import React, { FunctionComponent, useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import styles from "./styles";

export const ListInventoryScreen: FunctionComponent = () => {
  const navigation = useNavigation();
  const postOfficesId = useSelector(
    (state: IRootState) => state.account.profile?.postOfficeId,
  );
  const [isLoading, showLoading, hideLoading] = useShow();
  const [lisInventory, setListInventory] = useState<
    Array<RequestInventoryResponse>
  >([]);

  useFocusEffect(
    useCallback(() => {
      const getDataInventory = async () => {
        showLoading();
        await warehouseInventoryApi
          .getRequestInventory({
            postOfficeId: postOfficesId || "",
            status: 0,
            pageIndex: 0,
            pageSize: 30,
          })
          ?.then(response => {
            if (response.Status) {
              setListInventory(response.Data);
            }
          })
          .catch(error => {
            console.log("🚀🚀🚀 => getDataInventory => error", error);
            Alert.error("error.errorServer");
          })
          .finally(() => {
            hideLoading();
          });
      };
      getDataInventory();
    }, [hideLoading, postOfficesId, showLoading]),
  );

  const keyExtractor = useCallback(
    (item: RequestInventoryResponse) => item.Id,
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: RequestInventoryResponse }) => {
      return (
        <TouchableOpacity
          style={styles.requestInventoryItem}
          onPress={() => goToInventoryScreen({ requestInventory: item })}
        >
          <Text>{item.Name}</Text>
        </TouchableOpacity>
      );
    },
    [],
  );

  return (
    <View style={styles.container}>
      <Header
        title={translate("screens.lisInventory")}
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
        titleColor={Themes.colors.white}
      />
      <View style={styles.contentHeader}>
        <Text>{translate("label.chooseRequestInventory")}</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color={Themes.colors.collGray40} />
      ) : (
        <FlatList
          data={lisInventory}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={<NoData />}
        />
      )}
    </View>
  );
};
