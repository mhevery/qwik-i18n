import { component$, getLocale, useStylesScoped$ } from "@builder.io/qwik";
import { QwikLogo } from "../icons/qwik";
import styles from "./header.css?inline";

const LocaleLink = ({
  locale,
  currentLocale,
}: {
  locale: string;
  currentLocale: string;
}) => (
  <li>
    {locale === currentLocale ? (
      <div>{locale}</div>
    ) : (
      <a href={`?locale=${locale}`}>{locale}</a>
    )}
  </li>
);

export default component$(() => {
  const locale = getLocale();
  useStylesScoped$(styles);

  return (
    <header>
      <div class="logo">
        <a href="https://qwik.builder.io/" target="_blank">
          <QwikLogo />
        </a>
      </div>
      <ul>
        <LocaleLink locale="en" currentLocale={locale} />
        <LocaleLink locale="fr" currentLocale={locale} />
        <LocaleLink locale="sk" currentLocale={locale} />
        <LocaleLink locale="sp" currentLocale={locale} />
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
