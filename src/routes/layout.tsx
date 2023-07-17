import { component$, Slot } from "@builder.io/qwik";
import Header from "~/components/header/header";
import type { RequestHandler } from "@builder.io/qwik-city";
import { extractLang } from "../i18n";

export const onGet: RequestHandler = async ({
  request,
  locale,
  cacheControl,
}) => {
  locale(extractLang(request.headers.get("accept-language"), request.url));
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  return (
    <>
      <main>
        <Header />
        <section>
          <Slot />
        </section>
      </main>
      <footer>
        <a href="https://www.builder.io/" target="_blank">
          Made with ♡ by Builder.io
        </a>
      </footer>
    </>
  );
});
