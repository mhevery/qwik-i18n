import { RequestHandler } from "@builder.io/qwik-city";
import { extractLang } from "~/i18n";

export const onGet: RequestHandler = async ({ request, redirect, url }) => {
  const guessedLocale = extractLang(request, url);
  console.log(`  ➜  GET / - Redirecting to /${guessedLocale}...`);
  throw redirect(301, `/${guessedLocale}/${url.search}`);
};
