import { shipmentApi } from "@api";
import { CONSTANT } from "@configs";
import { getAsyncItem, setAsyncItem } from "@helpers";
import { StorageImages } from "@models";
import BackgroundTimer from "react-native-background-timer";

export const uploadImage = async (images: StorageImages) => {
  const { shipment, service, photos } = images;
  const uploadFail: Array<string> = [];

  //upload image
  photos.map(async (photo: string) => {
    const fileName = `${shipment}_${service}_${new Date().getTime()}.jpg`;
    const imageForm = new FormData();
    imageForm.append("files", {
      uri: photo,
      type: "image/jpeg",
      name: fileName,
    });
    await shipmentApi.uploadImage(imageForm)?.catch(() => {
      uploadFail.push(photo);
    });
  });

  // save image fail
  if (uploadFail.length > 0) {
    const listImages = await getAsyncItem(
      CONSTANT.TOKEN_STORAGE_KEY.UPLOAD_IMAGES,
    );
    let listPush: Array<StorageImages> = [];
    if (listImages) {
      listPush = [
        ...listImages,
        {
          ...images,
          photos: uploadFail,
        },
      ];
    } else {
      listPush.push({
        ...images,
        photos: uploadFail,
      });
    }

    setAsyncItem(CONSTANT.TOKEN_STORAGE_KEY.UPLOAD_IMAGES, listPush);
  }
};

export const autoUpload = (
  allowUpdate: boolean,
  updateUploadState: (value: boolean) => void,
) => {
  console.log("🚀🚀🚀 => allowUpdate", allowUpdate);
  // Is Uploading
  if (!allowUpdate) {
    return;
  }

  updateUploadState(false);
  // Start upload
  BackgroundTimer.runBackgroundTimer(async () => {
    console.log("🚀🚀🚀 => runBackgroundTimer");
    const listImages = await getAsyncItem(
      CONSTANT.TOKEN_STORAGE_KEY.UPLOAD_IMAGES,
    );
    console.log(
      "🚀🚀🚀 => BackgroundTimer.runBackgroundTimer => listImages",
      listImages,
    );

    if (!listImages || listImages.length === 0) {
      BackgroundTimer.stopBackgroundTimer();
      updateUploadState(true);
      return;
    }

    await Promise.all(
      listImages.map(async (item: StorageImages) => {
        const { shipment, service, photos } = item;
        await Promise.all(
          photos.map(async (photo: string) => {
            const fileName = `${shipment}_${service}_${new Date().getTime()}.jpg`;
            const imageForm = new FormData();
            imageForm.append("files", {
              uri: photo,
              type: "image/jpeg",
              name: fileName,
            });
            await shipmentApi.uploadImage(imageForm)?.then(async () => {
              const presentImages = await getAsyncItem(
                CONSTANT.TOKEN_STORAGE_KEY.UPLOAD_IMAGES,
              );

              for (const presentImage of presentImages) {
                if (presentImage.id === item.id) {
                  const newPhotos = presentImage.photos.filter(
                    (p: string) => p !== photo,
                  );

                  if (newPhotos.length === 0) {
                    await setAsyncItem(
                      CONSTANT.TOKEN_STORAGE_KEY.UPLOAD_IMAGES,
                      presentImages.filter(
                        (imageStore: StorageImages) =>
                          imageStore.id !== presentImage.id,
                      ),
                    );
                  } else {
                    await setAsyncItem(
                      CONSTANT.TOKEN_STORAGE_KEY.UPLOAD_IMAGES,
                      presentImages.map((imageStore: StorageImages) => {
                        if (imageStore.id !== presentImage.id) {
                          return imageStore;
                        } else {
                          return { ...imageStore, photos: newPhotos };
                        }
                      }),
                    );
                  }

                  break;
                }
              }
            });
          }),
        );
      }),
    );
  }, 1000000);
};
