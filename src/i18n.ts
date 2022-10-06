import "@angular/localize/init";
import { loadTranslations } from "@angular/localize";
import { useEnvData, isInUseContext } from "@builder.io/qwik";
import type { RenderOptions } from "@builder.io/qwik/server";
import EN from "./locale/message.en.json";
import SK from "./locale/message.sk.json";
import FR from "./locale/message.fr.json";
import SP from "./locale/message.sp.json";

console.log("Loading translations...");

/**
 * This file is left for the developer to customize to get the behavior they want for localization.
 */

/// Declare location where extra types will be stored.
const $localizeFn = $localize as any as {
  TRANSLATIONS: Record<string, any>;
  TRANSLATION_BY_LOCALE: Map<string, Record<string, any>>;
  OVERRIDE_LOCALE: string | undefined;
};

/**
 * This solution uses the `@angular/localize` package for translations, however out of the box
 * `$localize` works with a single translation only. This code adds support for multiple locales
 * concurrently. It does this by intercepting the `TRANSLATIONS` property read and returning
 * appropriate translation based on the current locale which is store in the `usEnvDate('local')`.
 */
if (!$localizeFn.TRANSLATION_BY_LOCALE) {
  $localizeFn.TRANSLATION_BY_LOCALE = new Map([["", {}]]);
  $localizeFn.OVERRIDE_LOCALE = undefined;
  Object.defineProperty($localize, "TRANSLATIONS", {
    get: function () {
      const locale =
        $localizeFn.OVERRIDE_LOCALE ||
        (isInUseContext() ? useEnvData<string>("locale", "") : "");
      let translations = $localizeFn.TRANSLATION_BY_LOCALE.get(locale);
      if (!translations) {
        $localizeFn.TRANSLATION_BY_LOCALE.set(locale, (translations = {}));
      }
      return translations;
    },
  });
}

/**
 * Function used to load all translations variants.
 */
export function initTranslations() {
  [SK, EN, FR, SP].forEach(({ translations, locale }) => {
    try {
      $localizeFn.OVERRIDE_LOCALE = locale;
      loadTranslations(translations);
    } finally {
      $localizeFn.OVERRIDE_LOCALE = undefined;
    }
  });
}

/**
 * Function used to examine the request and determine the locale to use.
 *
 * This function is meant to be used with `RenderOptions.locale` property
 *
 * @returns The locale to use which will be stored in the `useEnvData('locale')`.
 */
export function extractLocale({ envData }: RenderOptions): string {
  const { url, requestHeaders } = envData as {
    url: string;
    requestHeaders: Record<string, string>;
  };
  const acceptLanguage = requestHeaders && requestHeaders["accept-language"];
  let locale =
    (url && new URL(url).searchParams.get("lang")) ||
    acceptLanguage?.split(",")[0];
  if (locale) {
    // If we have a locale, make sure it's in the list of supported locales.
    if (!$localizeFn.TRANSLATION_BY_LOCALE.has(locale)) {
      // If not, try to remove sub-locale. (e.g. `en-US` -> `en`)
      locale = locale.split("-")[0];
      if (!$localizeFn.TRANSLATION_BY_LOCALE.has(locale)) {
        locale = ""; // If not, give up and don't translate.
      }
    }
  }
  return locale;
}

/**
 * Function used to determine the base URL to use for loading the chunks in the browser.
 *
 * The function returns `/build` in dev mode or `/build/<locale>` in prod mode.
 *
 * This function is meant to be used with `RenderOptions.base` property
 *
 * @returns The base URL to use for loading the chunks in the browser.
 */
export function extractBase({ locale, envData }: RenderOptions): string {
  const { qwikcity } = envData as {
    qwikcity: { mode: string };
  };
  if (qwikcity.mode === "dev") {
    return "/build";
  } else {
    return "/build/" + locale;
  }
}
