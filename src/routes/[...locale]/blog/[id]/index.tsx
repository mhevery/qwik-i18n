import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const location = useLocation();
  return <div>Pretend this is the blog text for "{location.params.id}".</div>;
});
