import { c as create_ssr_component, q as add_attribute, v as validate_component } from "../../../chunks/index.js";
const Percentage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let percentage;
  let { data } = $$props;
  const updatePercentage = () => {
  };
  setTimeout(updatePercentage, 1500);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<h1><span${add_attribute("this", percentage, 0)}>0</span>% completado</h1>

`;
});
const Spinner_svelte_svelte_type_style_lang = "";
const css = {
  code: "span.svelte-1jkfcnk{@apply text-white text-5xl -indent-96 overflow-hidden w-12 h-12 block rounded-[50%] relative mb-6 mx-auto;;transform:translateZ(0);animation:svelte-1jkfcnk-spin 1.7s infinite ease, svelte-1jkfcnk-round 1.7s infinite ease}@keyframes svelte-1jkfcnk-spin{0%{box-shadow:0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,\n        0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em}5%,95%{box-shadow:0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,\n        0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em}10%,59%{box-shadow:0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em,\n        -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em,\n        -0.297em -0.775em 0 -0.477em}20%{box-shadow:0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,\n        -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em,\n        -0.749em -0.34em 0 -0.477em}38%{box-shadow:0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,\n        -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em,\n        -0.82em -0.09em 0 -0.477em}100%{box-shadow:0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,\n        0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em}}@keyframes svelte-1jkfcnk-round{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}",
  map: null
};
const Spinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<span class="${"svelte-1jkfcnk"}"></span>`;
});
const UpdateScreen = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="${"flex items-center w-full h-full justify-center"}"><section class="${"text-2xl text-white text-center font-thin h-full flex items-center justify-center w-full flex-col"}"><div class="${"h-full w-full relative"}"><div class="${"w-full absolute top-2/4"}">${validate_component(Spinner, "WindowsSpinner").$$render($$result, {}, {}, {})}
        <h1>Trabajando en las actualizaciones</h1>
        ${validate_component(Percentage, "Percentage").$$render($$result, { data }, {}, {})}
        <h1>No apague el equipo. Esto puede tomar varios minutos.</h1></div></div>
    <div class="${"h-full relative w-full"}"><h1 class="${"absolute top-2/4 w-full"}">Su equipo se reiniciará varias veces
      </h1></div></section></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<main class="${"w-screen h-screen bg-blue-windows"}">${validate_component(UpdateScreen, "WindowsUpdate").$$render($$result, { data }, {}, {})}</main>`;
});
export {
  Page as default
};
