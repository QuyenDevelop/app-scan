import { payCodApi, shipmentApi, uploadApi } from "@api";
import { CONSTANT, DATA_CONSTANT } from "@configs";
import { getAsyncItem, setAsyncItem } from "@helpers";
import { ShipmentImages, StorageImages } from "@models";
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

export const removeMultiImage = async (images: string[]) => {
  const presentImages = await getAsyncItem(
    CONSTANT.TOKEN_STORAGE_KEY.UPLOAD_IMAGES,
  );

  if (presentImages && Array.isArray(presentImages)) {
    const newList = presentImages.filter(image => !images.includes(image.name));
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

      if (name.includes(DATA_CONSTANT.SUFFIX_IMAGE.shipmentAddServices)) {
        await shipmentApi
          .uploadImage(imageForm)
          ?.then(async () => {
            console.log(
              "🚀🚀🚀 => BackgroundTimer.runBackgroundTimer => upload success: ",
              name,
            );
            await removeImage(name);
          })
          .catch(() => {});
      }

      if (name.includes(DATA_CONSTANT.SUFFIX_IMAGE.shipmentCod)) {
        await payCodApi
          .uploadImage(imageForm)
          ?.then(async () => {
            console.log(
              "🚀🚀🚀 => BackgroundTimer.runBackgroundTimer => upload success: ",
              name,
            );
            await removeImage(name);
          })
          .catch(() => {});
      }
    }
  }, 30000);
};

export const autoUploadImageService = () => {
  BackgroundTimer.runBackgroundTimer(async () => {
    console.log("upload background");
    const listImages = await getAsyncItem(
      CONSTANT.TOKEN_STORAGE_KEY.UPLOAD_IMAGES,
    );
    if (!listImages || !Array.isArray(listImages) || listImages.length === 0) {
      BackgroundTimer.stopBackgroundTimer();
      return;
    }

    const successImages = await uploadImageService(listImages);
    await removeMultiImage(successImages);
  }, 30000);
};

export const storeImageUploadFail = async (
  listImagesFail: Array<StorageImages>,
) => {
  const listImages = await getAsyncItem(
    CONSTANT.TOKEN_STORAGE_KEY.UPLOAD_IMAGES,
  );

  let listPush: Array<StorageImages> = [];
  if (listImages) {
    listPush = [...listImages, ...listImagesFail];
  } else {
    listPush = [...listImagesFail];
  }

  await setAsyncItem(CONSTANT.TOKEN_STORAGE_KEY.UPLOAD_IMAGES, listPush);
};

export const uploadImageService = async (
  listImages: Array<StorageImages>,
): Promise<Array<string>> => {
  const successImages: string[] = [];
  for (const item of listImages) {
    const { name, uri } = item;
    const imageForm = new FormData();
    imageForm.append("files", {
      uri: uri,
      type: "image/jpeg",
      name: name,
    });
    if (name.includes(DATA_CONSTANT.SUFFIX_IMAGE.shipmentAddServices)) {
      await shipmentApi
        .uploadImage(imageForm)
        ?.then(async () => {
          console.log(
            "🚀🚀🚀 => BackgroundTimer.runBackgroundTimer => upload success: ",
            name,
          );
          successImages.push(name);
        })
        .catch(() => {});
    }
    if (name.includes(DATA_CONSTANT.SUFFIX_IMAGE.shipmentCod)) {
      await payCodApi
        .uploadImage(imageForm)
        ?.then(async () => {
          console.log(
            "🚀🚀🚀 => BackgroundTimer.runBackgroundTimer => upload success: ",
            name,
          );
          successImages.push(name);
        })
        .catch(() => {});
    }
  }

  return successImages;
};

export const uploadImageShipment = async (
  listImages: Array<ShipmentImages>,
): Promise<Array<string>> => {
  const successImages: string[] = [];
  for (const item of listImages) {
    const { Name, Url } = item;
    const imageForm = new FormData();
    imageForm.append("files", {
      uri: Url,
      type: "image/jpeg",
      name: Name,
    });
    if (Name.includes(DATA_CONSTANT.SUFFIX_IMAGE.shipmentImages)) {
      await uploadApi
        .uploadImage(imageForm)
        ?.then(async response => {
          console.log("có vào");
          console.log(JSON.stringify(response));
          if (response.Data) {
          }
        })
        .catch(() => {
          console.log("có exception");
        });
    }
  }

  return successImages;
};
