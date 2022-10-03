import "@angular/localize/init";
import { loadTranslations } from "@angular/localize";
import { useEnvData, isInUseContext } from "@builder.io/qwik";
import EN from "./locale/message.en.json";
import SK from "./locale/message.sk.json";

console.log("Loading translations...");

const TRANSLATIONS: Map<string, any> = new Map([["", {}]]);
let LOCALE: string | undefined = undefined;

Object.defineProperty($localize, "TRANSLATIONS", {
  get: function () {
    let locale = LOCALE || extractLocale() || "";
    let translations = TRANSLATIONS.get(locale);
    if (!translations && locale.indexOf("-") > -1) {
      locale = locale.split("-")[0];
      translations = TRANSLATIONS.get(locale);
    }
    if (!translations) {
      TRANSLATIONS.set(locale, (translations = {}));
    }
    return translations;
  },
});

loadTranslationsForLocale(SK);
loadTranslationsForLocale(EN);

function extractLocale() {
  let locale: string | undefined = undefined;
  if (isInUseContext()) {
    const url = useEnvData<string>("url");
    if (url) {
      locale = new URL(url).searchParams.get("locale") || undefined;
    }
    if (!locale) {
      const requestHeaders =
        useEnvData<Record<string, string>>("requestHeaders");
      if (requestHeaders) {
        const acceptLanguage = requestHeaders["accept-language"];
        locale = acceptLanguage?.split(",")[0];
      }
    }
  }
  return locale;
}

function loadTranslationsForLocale({
  locale,
  translations,
}: {
  locale: string;
  translations: Record<string, any>;
}) {
  try {
    LOCALE = locale;
    loadTranslations(translations);
  } finally {
    LOCALE = undefined;
  }
}

export const BASE = "/build/sk/";
