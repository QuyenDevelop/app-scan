import { FastImageLoading, Icon } from "@shared";
import { Images, Metrics, Themes } from "@themes";
import React, { FunctionComponent } from "react";
import { Image, Modal, TouchableOpacity, View, ViewStyle } from "react-native";
import FastImage, { ImageStyle } from "react-native-fast-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import styles from "./styles";
interface OwnProps {
  images: Array<string>;
  isVisible: boolean;
  closeModal: () => void;
  index?: number;
  style?: ViewStyle;
  styleImage?: ImageStyle;
  isLocalImage?: boolean;
}

type Props = OwnProps;

export const ImagesModal: FunctionComponent<Props> = props => {
  const insets = useSafeAreaInsets();
  const {
    style,
    images,
    styleImage,
    isVisible,
    closeModal,
    index,
    isLocalImage,
  } = props;

  return (
    <Modal
      style={[styles.container, style]}
      animationType="slide"
      visible={isVisible}
      onRequestClose={closeModal}
      statusBarTranslucent={true}
    >
      <Swiper
        loop={false}
        showsButtons={false}
        dotStyle={styles.dot}
        index={index || 0}
      >
        {images.map((img, i) => (
          <View style={styles.swiper} key={i}>
            {!isLocalImage ? (
              <FastImageLoading
                key={i}
                sourceLoading={Images.productDefault}
                source={{ uri: img || Images.productDefault }}
                resizeMode={FastImage.resizeMode.cover}
                style={[styles.image, styleImage]}
              />
            ) : (
              <Image
                key={i}
                source={{ uri: img || Images.productDefault }}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.image}
              />
            )}
          </View>
        ))}
      </Swiper>
      <TouchableOpacity
        style={[styles.closeButton, { top: insets.top }]}
        onPress={closeModal}
      >
        <Icon
          name="ic_close"
          size={Metrics.icons.large}
          color={Themes.colors.white}
        />
      </TouchableOpacity>
    </Modal>
  );
};
