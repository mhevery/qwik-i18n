import { component$, Slot } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";
import Header from "../components/header/header";
import { extractLang } from "../i18n";

export const onRequest: RequestHandler = ({ request, response }) => {
  response.locale = extractLang(
    request.headers.get("accept-language"),
    request.url
  );
  return {};
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
