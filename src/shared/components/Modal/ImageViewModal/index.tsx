import { Header } from "@components";
import { useShow } from "@hooks";
import { ImagesModal, translate } from "@shared";
import React, { FunctionComponent, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  TouchableWithoutFeedback,
  View,
} from "react-native";
// import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";
interface OwnProps {
  images: Array<string>;
  isVisible: boolean;
  closeModal: () => void;
}

type Props = OwnProps;

export const ImageViewModal: FunctionComponent<Props> = props => {
  const insets = useSafeAreaInsets();
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
        <Image style={styles.imageLibrary} source={{ uri: item }} />
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
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Header
          title={translate("label.photoModal")}
          iconLeftName={["ic_arrow_left"]}
          iconLeftOnPress={[closeModal]}
          isCenterTitle
        />
        <FlatList
          data={images}
          keyExtractor={(item, index) => `${item}_${index}`}
          renderItem={renderItem}
          numColumns={4}
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
