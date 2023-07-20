import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { QwikLogo } from "../icons/qwik";
import styles from "./header.css?inline";
import { Link, RouteLocation, useLocation } from "@builder.io/qwik-city";

const LocaleLink = ({
  locale,
  location,
}: {
  locale: string;
  location: RouteLocation;
}) => (
  <li>
    {locale === location.params.locale ? (
      <div>{locale}</div>
    ) : (
      <a
        href={`/${locale}${location.url.pathname.slice(3)}${
          location.url.search
        }`}
      >
        {locale}
      </a>
    )}
  </li>
);

export default component$(() => {
  const location = useLocation();
  useStylesScoped$(styles);

  return (
    <header>
      <div class="logo">
        <a href="https://qwik.builder.io/" target="_blank">
          <QwikLogo />
        </a>
      </div>
      <ul>
        <LocaleLink locale="en" location={location} />
        <LocaleLink locale="fr" location={location} />
        <LocaleLink locale="sk" location={location} />
        <LocaleLink locale="sp" location={location} />
        <li>
          <span>|</span>
        </li>
        <li>
          <Link href={$localize`/__/blog`}>{$localize`Blog`}</Link>
        </li>
      </ul>
    </header>
  );
});
