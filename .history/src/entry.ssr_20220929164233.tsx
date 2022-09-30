/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is render outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import { renderToStream, RenderToStreamOptions } from "@builder.io/qwik/server";
import { manifest } from "@qwik-client-manifest";
import Root from "./root";
import "@angular/localize/init";
import { loadTranslations } from "@angular/localize";

loadTranslations({
  "4724965986411579086": "Ahoj svet",
  "8399228546444251220": "Počítadlovy Príklad",
  "8283901338703124090": 'počítadlo:',
  ""
});

export default function (opts: RenderToStreamOptions) {
  return renderToStream(<Root />, {
    manifest,
    ...opts,
    prefetchStrategy: {
      implementation: {
        linkInsert: null,
        workerFetchInsert: null,
        prefetchEvent: "always",
      },
    },
  });
}
