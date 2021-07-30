import { Header } from "@components";
import { SCREENS } from "@configs";
import { ScanParamsList } from "@navigation";
import CameraRoll from "@react-native-community/cameraroll";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { FunctionComponent, useEffect, useState } from "react";
import { FlatList, Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";

type NavigationRoute = RouteProp<ScanParamsList, SCREENS.UPLOAD_SCREEN>;
export interface PhotoLibraryScreenParams {
  shipment: string;
  service: string;
}

export const PhotoLibraryScreen: FunctionComponent = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<NavigationRoute>();
  const { shipment, service } = route?.params;
  const [photos, setPhotos] = useState([]);
  const [after, setAfter] = useState();
  const [hasNextPage, setHasNextPage] = useState(false);
  const getAllPhotos = () => {
    CameraRoll.getPhotos({
      first: 40,
      assetType: "Photos",
      after: after,
    })
      .then(r => {
        console.log("🚀🚀🚀 => getAllPhotos => r", JSON.stringify(r.page_info));
        setPhotos(photos => [...photos, ...r.edges]);
        setAfter(r.page_info.end_cursor);
        setHasNextPage(r.page_info.has_next_page);
      })
      .catch(err => {
        console.log("🚀🚀🚀 => getAllPhotos => err", err);
        //Error Loading Images
      });
  };

  useEffect(() => {
    getAllPhotos();
  }, []);

  const onEndReached = () => {
    if (hasNextPage) {
      getAllPhotos();
    }
  };
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header
        title="Photo library"
        iconLeftName={["ic_arrow_left"]}
        iconLeftOnPress={[() => navigation.goBack()]}
        isCenterTitle
      />
      <FlatList
        data={photos}
        keyExtractor={(item, index) => `${item.node.image.uri}_${index}`}
        renderItem={({ item }) => {
          return (
            <Image
              style={{
                width: "100%",
                height: 70,
                margin: 2,
                flex: 0.25,
              }}
              source={{ uri: item.node.image.uri }}
            />
          );
        }}
        numColumns={4}
        onEndReachedThreshold={0.8}
        onEndReached={onEndReached}
      />
    </View>
  );
};
