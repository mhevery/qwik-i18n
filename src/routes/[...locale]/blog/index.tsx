import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => (
  <div>
    <p>{$localize`Blog welcome text`}</p>
    <Link
      href={$localize`/__/blog/${"hello-world"}/`}
    >{$localize`Hello world`}</Link>
  </div>
));
