import { c as create_ssr_component } from "../../../chunks/index.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-m122q_START -->${$$result.title = `<title>Windows 10 Update</title>`, ""}<!-- HEAD_svelte-m122q_END -->`, ""}
<div class="${"cursor-none select-none"}">${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Layout as default
};
