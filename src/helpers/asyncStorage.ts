import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAsyncItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }

    return null;
  } catch (e) {
    console.log("🚀🚀🚀 => getAsyncItem => e", e);
    return null;
  }
};

export const setAsyncItem = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    console.log("🚀🚀🚀 => setAsyncItem => e", e);
    return false;
  }
};
