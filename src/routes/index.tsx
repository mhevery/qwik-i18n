import { component$, useStore } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const state = useStore({
    count: 0,
  });
  return (
    <>
      <h1>{$localize`Counter Example`}</h1>
      <div>{$localize`count: ${state.count}`}</div>
      <button onClick$={() => state.count++}>{$localize`increment`}</button>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik Flower",
};
