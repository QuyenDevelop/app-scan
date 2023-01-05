import { Header } from "@components";
import { useShow } from "@hooks";
import { FastImageLoading, ImagesModal, translate } from "@shared";
import { Images, Themes } from "@themes";
import React, { FunctionComponent, useState } from "react";
import { FlatList, Modal, TouchableWithoutFeedback, View } from "react-native";
import FastImage from "react-native-fast-image";
import styles from "./styles";
interface OwnProps {
  images: Array<string>;
  isVisible: boolean;
  closeModal: () => void;
}

type Props = OwnProps;

export const ImageViewModal: FunctionComponent<Props> = props => {
  const { images, isVisible, closeModal } = props;
  const [isShowImage, showImage, hideImage] = useShow();
  const [indexShowImage, setIndexShowImage] = useState<number>(0);
  const openView = (index: number) => {
    setIndexShowImage(index);
    showImage();
  };
  const renderItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <TouchableWithoutFeedback onPress={() => openView(index)}>
        <View style={styles.imageView}>
          <FastImageLoading
            sourceLoading={Images.productDefault}
            source={{ uri: item || Images.productDefault }}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.imageLibrary}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <Modal
      style={styles.container}
      animationType="slide"
      visible={isVisible}
      onRequestClose={closeModal}
      statusBarTranslucent={true}
    >
      <View style={styles.container}>
        <Header
          title={translate("label.photoModal")}
          iconLeftName={["ic_arrow_left"]}
          iconLeftOnPress={[closeModal]}
          isCenterTitle
          titleColor={Themes.colors.white}
        />
        <FlatList
          data={images}
          keyExtractor={(item, index) => `${item}_${index}`}
          renderItem={renderItem}
          numColumns={3}
          style={styles.content}
        />
        <ImagesModal
          images={images}
          isVisible={isShowImage}
          closeModal={hideImage}
          index={indexShowImage}
          isLocalImage={true}
        />
      </View>
    </Modal>
  );
};
