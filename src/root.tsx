import { $, component$, useEnvData } from "@builder.io/qwik";
import {
  QwikCity,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import "./global.css";
import { initTranslations } from "./i18n";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCity> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  // extract the locale language from the EnvData.
  const lang = useEnvData<string>("locale", "en" /* default to english */);

  // This component will ever only run on the server.
  // To keep the deployment simple, the server will always run in
  initTranslations();

  // Determine if we are in the dev mode.
  // In dev mode we are running `$localize` in runtime mode, so we have to
  // eagerly load the `$localize` runtime as well as the translations.
  const clientRuntimeTranslations = clientShouldLoadTranslations()
    ? { ["document:onQinit$"]: $(initTranslations) }
    : null;

  return (
    <QwikCity>
      <head>
        <meta charSet="utf-8" />
        <RouterHead />
      </head>
      <body lang={lang} {...clientRuntimeTranslations}>
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCity>
  );

  function clientShouldLoadTranslations() {
    return useEnvData<{ mode: string }>("qwikcity")!.mode == "dev";
  }
});
