import {
  component$,
  useClientEffect$,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";
import { DocumentHead, useLocation } from "@builder.io/qwik-city";
import styles from "./flower.css?inline";

export default component$(() => {
  const state = useStore({
    count: 0,
  });

  return (
    <>
      <h1>{$localize`Counter Example`}</h1>
      <div>
        {$localize`count:`}
        {state.count}
      </div>
      <button onClick$={() => state.count++}>{$localize`increment`}</button>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik Flower",
};
