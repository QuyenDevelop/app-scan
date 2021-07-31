import Realm from "realm";
import { AddServicePhotos } from "./AddServicePhotos";

export const realmConfig = {
  path: "RealmDB",
  schema: [AddServicePhotos],
};

export const realmOpen = async () => {
  return await Realm.open(realmConfig);
};

export const realmClose = (realm: Realm) => {
  realm.close();
};

export async function quickStart() {
  const realm = await Realm.open(realmConfig);
  realm.close();
}
