import { CONSTANT } from "@configs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18n-js";
import cn from "./locales/cn";
import en from "./locales/en";
import ja from "./locales/ja";
import tw from "./locales/tw";
import vi from "./locales/vi";

i18n.defaultLocale = CONSTANT.LANGUAGES.EN;
i18n.locale = CONSTANT.LANGUAGES.EN;
i18n.fallbacks = true;
i18n.translations = { en, vi, ja, "zh-CN": cn, "zh-TW": tw };
let initialized = false;

export var currentLanguage = CONSTANT.LANGUAGES.VI;

export const onChangeLanguage = async (language: any) => {
  switch (language) {
    case CONSTANT.LANGUAGES.VI: {
      await AsyncStorage.setItem("language", language);
      currentLanguage = language;
      i18n.defaultLocale = language;
      i18n.locale = language;
      break;
    }
    case CONSTANT.LANGUAGES.EN: {
      await AsyncStorage.setItem("language", language);
      currentLanguage = language;
      i18n.defaultLocale = language;
      i18n.locale = language;
      break;
    }
    case CONSTANT.LANGUAGES.JA: {
      await AsyncStorage.setItem("language", language);
      currentLanguage = language;
      i18n.defaultLocale = language;
      i18n.locale = language;
      break;
    }
    case CONSTANT.LANGUAGES.CN: {
      await AsyncStorage.setItem("language", language);
      currentLanguage = language;
      i18n.defaultLocale = language;
      i18n.locale = language;
      break;
    }
    case CONSTANT.LANGUAGES.TW: {
      await AsyncStorage.setItem("language", language);
      currentLanguage = language;
      i18n.defaultLocale = language;
      i18n.locale = language;
      break;
    }
    default:
  }
};

const init = async () => {
  const setDefaultLanguage = () => {
    i18n.defaultLocale = CONSTANT.LANGUAGES.VI;
    i18n.locale = CONSTANT.LANGUAGES.VI;
  };
  try {
    const language = await AsyncStorage.getItem("language");
    if (language) {
      i18n.defaultLocale = language;
      i18n.locale = language;
    } else {
      setDefaultLanguage();
    }
  } catch {
    setDefaultLanguage();
  }
};

export const translate = (first: any, ...params: any[]) => {
  if (!initialized) {
    init();
    initialized = true;
  }
  return i18n.t(first, ...params);
};
