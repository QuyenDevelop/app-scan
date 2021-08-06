import { shipmentApi } from "@api";
import { CONSTANT } from "@configs";
import { getAsyncItem, setAsyncItem } from "@helpers";
import BackgroundTimer from "react-native-background-timer";

export const removeImage = async (name: string) => {
  const presentImages = await getAsyncItem(
    CONSTANT.TOKEN_STORAGE_KEY.UPLOAD_IMAGES,
  );

  if (presentImages && Array.isArray(presentImages)) {
    const newList = presentImages.filter(image => image.name !== name);
    await setAsyncItem(CONSTANT.TOKEN_STORAGE_KEY.UPLOAD_IMAGES, newList);
  }
};

export const autoUpload = async (
  allowUpdate: boolean,
  updateUploadState: (value: boolean) => void,
) => {
  // Is Uploading
  if (!allowUpdate) {
    return;
  }

  updateUploadState(false);
  // Start upload
  BackgroundTimer.runBackgroundTimer(async () => {
    const listImages = await getAsyncItem(
      CONSTANT.TOKEN_STORAGE_KEY.UPLOAD_IMAGES,
    );

    if (!listImages || !Array.isArray(listImages) || listImages.length === 0) {
      BackgroundTimer.stopBackgroundTimer();
      updateUploadState(true);
      return;
    }

    for (const item of listImages) {
      const { name, uri } = item;
      const imageForm = new FormData();
      imageForm.append("files", {
        uri: uri,
        type: "image/jpeg",
        name: name,
      });

      await shipmentApi
        .uploadImage(imageForm)
        ?.then(async () => {
          await removeImage(name);
        })
        .catch(() => {});
    }
  }, 100000);
};
