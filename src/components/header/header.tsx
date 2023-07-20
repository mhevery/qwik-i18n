import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { QwikLogo } from "../icons/qwik";
import styles from "./header.css?inline";
import { RouteLocation, useLocation } from "@builder.io/qwik-city";

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
          <a
            href="https://qwik.builder.io/docs/components/overview/"
            target="_blank"
          >
            Docs
          </a>
        </li>
        <li>
          <a
            href="https://qwik.builder.io/examples/introduction/hello-world/"
            target="_blank"
          >
            Examples
          </a>
        </li>
        <li>
          <a
            href="https://qwik.builder.io/tutorial/welcome/overview/"
            target="_blank"
          >
            Tutorials
          </a>
        </li>
      </ul>
    </header>
  );
});
