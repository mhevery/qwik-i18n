import "@angular/localize/init";
import { loadTranslations } from "@angular/localize";
import { getLocale, withLocale, useOnDocument, $ } from "@builder.io/qwik";
import type { RenderOptions } from "@builder.io/qwik/server";

// You must declare all your locales here
import EN from "./locale/message.en.json";
import SK from "./locale/message.sk.json";
import FR from "./locale/message.fr.json";
import SP from "./locale/message.sp.json";

// Make sure it's obvious when the default locale was selected
const defaultLocale = "sk";

/**
 * Function used to load all translations variants.
 */
export function initTranslations() {
  console.log("  ➜  Loading translations...");
  [SK, EN, FR, SP].forEach(({ translations, locale }) => {
    // withLocale sets the locale for the duration of the callback
    withLocale(locale, () => loadTranslations(translations));
  });
}

/**
 * This file is left for the developer to customize to get the behavior they want for localization.
 */

/// Declare location where extra types will be stored.
const $localizeFn = $localize as any as {
  TRANSLATIONS: Record<string, any>;
  TRANSLATION_BY_LOCALE: Map<string, Record<string, any>>;
};

/**
 * This solution uses the `@angular/localize` package for translations, however out of the box
 * `$localize` works with a single translation only. This code adds support for multiple locales
 * concurrently. It does this by intercepting the `TRANSLATIONS` property read and returning
 * appropriate translation based on the current locale.
 */
if (!$localizeFn.TRANSLATION_BY_LOCALE) {
  $localizeFn.TRANSLATION_BY_LOCALE = new Map([["", {}]]);
  Object.defineProperty($localizeFn, "TRANSLATIONS", {
    get: function () {
      const locale = getLocale();
      let translations = this.TRANSLATION_BY_LOCALE.get(locale);
      if (!translations) {
        this.TRANSLATION_BY_LOCALE.set(locale, (translations = {}));
      }
      return translations;
    },
  });
}

const validateLocale = (locale: string) => {
  if ($localizeFn.TRANSLATION_BY_LOCALE.has(locale)) return locale;
  const match = /^([^-;]+)[-;]/.exec(locale);
  return (
    (match && $localizeFn.TRANSLATION_BY_LOCALE.has(match[1]) && match[1]) ||
    undefined
  );
};

/**
 * Function used to examine the request and determine the locale to use.
 *
 * in this implementation, we accept a `?locale=xx` parameter to override
 * the auto-detected locale requested by the browser.
 *
 * This function is meant to be used with `RenderOptions.locale` property.
 * It must always return a valid locale so that prod clients will always get de-$localize-d js
 *
 * @returns The locale to use, which will be stored in the render context.
 */
export function extractLang(request: Request, url: URL): string {
  // This is not really needed because we handle /locale, but it's here as an example
  let locale = url.searchParams.get("locale") || undefined;
  if (locale) {
    // note that we mutate the URL here, this will update the search property
    url.searchParams.delete("locale");
    locale = validateLocale(locale);
    if (locale) return locale;
  }
  // Parse the browser accept-language header
  const locales = request.headers.get("accept-language")?.split(",");
  if (locales)
    for (const entry of locales) {
      locale = validateLocale(entry);
      if (locale) return locale;
    }

  return defaultLocale;
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
export function extractBase({ serverData }: RenderOptions): string {
  if (import.meta.env.DEV) {
    return "/build";
  } else {
    return "/build/" + serverData!.locale;
  }
}

export function useI18n() {
  if (import.meta.env.DEV) {
    // During development only, load all translations in memory when the app starts on the client.
    // eslint-disable-next-line qwik/use-method-usage
    useOnDocument("qinit", $(initTranslations));
  }
}

// We always need the translations on the server
if (import.meta.env.SSR) initTranslations();
